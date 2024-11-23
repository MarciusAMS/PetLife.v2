import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Alert, Modal, TextInput, FlatList } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Remedios } from '../../models/Remedio';
import { ScrollView } from 'react-native-gesture-handler';

export type RootStackParamList = {
    TelaRemedio: { pet: Pet };
    TelaSaude: { pet: { petId: string } } | undefined;
    TelaPet: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
    AppMenu: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
};

interface Pet {
    nome: string;
    imagemUrl: string;
    userUID: string;
    petId: string;
}

interface Alarme {
    id: string;
    nome: string;
    horario: string;
    frequencia: string;
}

type TelaRemedioProp = RouteProp<RootStackParamList, 'TelaRemedio'>;

export default function TelaRemedio() {
    const route = useRoute<TelaRemedioProp>();
    const pet = route.params?.pet;
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = auth.currentUser;
    // const userId = user?.uid;
    const { width } = Dimensions.get('window');
    const [modalVisible, setModalVisible] = useState(false);
    const [fileName, setFileName] = useState("Nenhum arquivo escolhido");
    const [documentUri, setDocumentUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [registros, setRegistros] = useState<Alarme[]>([]);
    const db = getFirestore();
    const [alarmeNome, setAlarmeNome] = useState('');
    const [horario, setHorario] = useState('');
    const [frequencia, setFrequencia] = useState('');
    const [listaAlarmes, setListaAlarmes] = useState<Alarme[]>([]);


    useEffect(() => {
        Alert.alert('Parâmetros recebidos na TelaRemedio:', pet?.petId);
        if (!pet?.petId) {
            Alert.alert('Nenhum pet foi selecionado ainda. Redirecionando para TelaPet.');
            navigator.navigate('TelaPet');
        } else {
            console.log('PetId recebido: ', pet.petId);
        }

        const carregarRegistros = async () => {
            setLoading(true);
            try {
                const firestore = getFirestore();
                const querySnapshot = await getDocs(collection(firestore, 'remedios')); // Substitua 'remedios' pelo nome correto da coleção
                const registrosList: Alarme[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data() as Remedios; // Converte os dados para o tipo Remedios
                    return {
                        id: doc.id, // Inclui o ID do documento
                        nome: data.nome ?? 'Sem Nome',
                        horario: data.horario ?? 'Sem Horário',
                        frequencia: data.frequencia ?? 'Sem Frequência',
                    };
                });
                setRegistros(registrosList); // Atualiza o estado com os registros
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os registros.');
            } finally {
                setLoading(false);
            }
        };

        carregarRegistros();
    }, [pet, navigator]);

    const adicionarAlarme = () => {
        if (alarmeNome && horario && frequencia) {
            const novoAlarme: Alarme = {
                id: (listaAlarmes.length + 1).toString(),
                nome: alarmeNome,
                horario,
                frequencia,
            };
            setListaAlarmes((prevLista) => [...prevLista, novoAlarme]);
            setRegistros((prevRegistros) => [...prevRegistros, novoAlarme]); // Adiciona o alarme ao estado exibido
            setModalVisible(false);
            setAlarmeNome('');
            setHorario('');
            setFrequencia('');
        }
    };

    const enviarArquivo = async () => {

        if (!documentUri) {
            Alert.alert("Nenhum arquivo selecionado", "Por favor, escolha um arquivo antes de enviar.");
            console.log('Documento:', documentUri);
            return;
        }

        if (!user) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
        }

        setLoading(true); // Ativar um indicador de carregamento
        const storage = getStorage();

        try {
            const fileRef = ref(storage, `documentos_vacina/${fileName}`);
            const response = await fetch(documentUri);
            const blob = await response.blob();

            // Upload do arquivo
            await uploadBytes(fileRef, blob);
            const downloadURL = await getDownloadURL(fileRef);

            // Salvar o registro no Firestore
            if (user && pet) {
                await addDoc(collection(db, "registrosVacina"), {
                    nome: fileName,
                    data: new Date().toISOString(),
                    userUID: user.uid,
                    fileURL: downloadURL,
                    petId: pet.petId,  // Adicionando o petId ao documento
                });

                await fetchRegistros();

                Alert.alert("Sucesso", "Arquivo enviado e salvo com sucesso!");
                setFileName("Nenhum arquivo escolhido");
                setDocumentUri(null);
                setModalVisible(false);
            } else {
                Alert.alert("Erro", "Usuário não autenticado.");
            }
        } catch (error) {
            console.error("Erro ao enviar arquivo:", error);
            console.log("user:", user?.uid);
            console.log("URI do documento:", documentUri);
            Alert.alert("Erro", "Não foi possível enviar o arquivo.");
        } finally {
            setLoading(false);
        }
    };

    const fetchRegistros = async () => {
        if (!user) {
            Alert.alert("Erro", "Usuário não autenticado ou Pet não selecionado.");
            return;
        }

        if (!pet?.petId) {  // Verifique se o petId está disponível
            Alert.alert("Erro", "Pet não selecionado.");
            return;
        }

        setLoading(true);

        try {
            // Agora, além do filtro pelo userUID, adicionamos o filtro para o petId
            const q = query(
                collection(db, "registrosVacina"),
                where("userUID", "==", user.uid),
                where("petId", "==", pet.petId)  // Filtra pelo petId
            );
            const querySnapshot = await getDocs(q);

            const registrosList: Alarme[] = querySnapshot.docs.map((doc) => {
                const data = doc.data() as Remedios; // Converte explicitamente para Remedios
                return {
                    id: doc.id, // Inclui o ID do documento
                    nome: data.nome ?? 'Sem Nome', // Garante que o campo "nome" exista
                    horario: data.horario ?? 'Sem Horário', // Garante que o campo "horario" exista
                    frequencia: data.frequencia ?? 'Sem Frequência', // Garante que o campo "frequencia" exista
                };
            });

            setRegistros(registrosList);

            if (registrosList.length === 0) {
                Alert.alert("Nenhum registro", "Você não tem registros de vacinação para este pet.");
            }
        } catch (error) {
            console.error("Erro ao buscar registros de vacinação:", error);
            Alert.alert("Erro", "Erro ao buscar registros de vacinação.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.headerContainerRemedio}>
                <Image source={require('../../../assets/remedio_liso.png')} style={styles.logoPetRemedio} />
                <Text style={styles.titlePetRemedio}>Remédios</Text>
                <Image source={require('../../../assets/patas.png')} style={styles.pawIconRemedio} />
            </View>

            {/* Separador */}
            <View style={styles.separatorTelaFora} />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: registros.length ? 'flex-start' : 'center' }}
                style={styles.scrollContainer}>
                {registros.length ? (
                    registros.map((registro) => (
                        <View key={registro.id} style={styles.alarmeContainer}>
                            <Text style={styles.alarmeNome}>{registro.nome.toUpperCase()}</Text>
                            <Text style={styles.alarmeHorario}>Horário: {registro.horario}</Text>
                            <Text style={styles.alarmeFrequencia}>Frequência: {registro.frequencia}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.textoVazio}>Nenhum alarme adicionado ainda</Text>
                )}
            </ScrollView>

            {/* Botão Laranja */}
            <View style={styles.botaoContainer}>
                <TouchableOpacity
                    style={styles.botaoAdicionar}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.botaoAdicionarTexto}>ADICIONAR ALARME</Text>
                    <Image
                        style={styles.logoAddRemedio}
                        source={require('../../../assets/icone_addAlarme.png')}
                    />
                </TouchableOpacity>
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContentRemedio}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitulo}>CRIAR ALARME</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image
                                    source={require('../../../assets/iconeFechar.png')}
                                    style={styles.iconeFechar}
                                />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do alarme"
                            value={alarmeNome}
                            onChangeText={setAlarmeNome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Horário (ex: 10:30)"
                            value={horario}
                            onChangeText={setHorario}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Frequência (ex: todos os dias)"
                            value={frequencia}
                            onChangeText={setFrequencia}
                        />
                        <TouchableOpacity style={styles.botaoCriar} onPress={adicionarAlarme}>
                            <Text style={styles.textoCriar}>CRIAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
