import { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Alert, Modal, TextInput, FlatList } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Remedios } from '../../models/Remedio';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';

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
    const [registroSelecionado, setRegistroSelecionado] = useState<Alarme | null>(null);
    const [modalOpcoesVisible, setModalOpcoesVisible] = useState(false);


    useEffect(() => {
        const carregarRegistros = async () => {
            setLoading(true);
            try {
                const firestore = getFirestore();
                const querySnapshot = await getDocs(collection(firestore, 'remedios')); // Confirme se o nome da coleção está correto

                // Debug: Verifique o conteúdo do snapshot
                if (querySnapshot.empty) {
                    Alert.alert('Aviso', 'Nenhum registro encontrado na coleção.');
                }

                const registrosList: Alarme[] = querySnapshot.docs.map((doc) => {
                    const data = doc.data() as Remedios; // Inspeciona os dados retornados
                    console.log('Documento:', data);
                    return {
                        id: doc.id, // ID do documento
                        nome: data.nome ?? 'Sem Nome',
                        horario: data.horario ?? 'Sem Horário',
                        frequencia: data.frequencia ?? 'Sem Frequência',
                    };
                });

                setRegistros(registrosList); // Atualiza o estado com os registros
            } catch (error) {
                console.error('Erro ao carregar registros:', error);
                Alert.alert('Erro', 'Não foi possível carregar os registros.');
            } finally {
                setLoading(false);
            }
        };

        carregarRegistros();
    }, []);

    // const handleAdicionarAlarme = () => {
    //     if (!horario || horario.length < 5) {
    //         alert('Por favor, insira um horário válido no formato HH:MM.');
    //         return;
    //     }
    //     // Lógica para adicionar o alarme
    //     console.log('Horário do Alarme:', horario);
    // };


    const adicionarAlarme = async () => {
        if (alarmeNome && horario && frequencia) {
            try {
                const firestore = getFirestore();
                const userUID = auth.currentUser?.uid; // ID do usuário logado
                const petId = route.params?.pet?.petId; // ID do pet selecionado

                if (!userUID || !petId) {
                    Alert.alert("Erro", "Não foi possível identificar o usuário ou o pet.");
                    return;
                }
                if (!horario || horario.length < 5) {
                    alert('Por favor, insira um horário válido no formato HH:MM.');
                    return;
                }
                // Lógica para adicionar o alarme
                console.log('Horário do Alarme:', horario);

                // Criação do objeto alarme
                const novoAlarme: Alarme = {
                    id: "", // O Firestore gerará automaticamente o ID
                    nome: alarmeNome,
                    horario,
                    frequencia,
                };

                // Enviar para Firestore
                const docRef = await addDoc(collection(firestore, "remedios"), {
                    ...novoAlarme,
                    userUID, // Relaciona o registro ao usuário logado
                    petId,   // Relaciona o registro ao pet selecionado
                });

                await fetchRegistros();

                Alert.alert("Sucesso", "Alarme adicionado com sucesso!");
                setListaAlarmes((prevLista) => [
                    ...prevLista,
                    { ...novoAlarme, id: docRef.id }, // Atualiza localmente com o ID do documento
                ]);
                setModalVisible(false);
                setAlarmeNome("");
                setHorario("");
                setFrequencia("");
            } catch (error) {
                console.error("Erro ao adicionar alarme:", error);
                Alert.alert("Erro", "Não foi possível adicionar o alarme.");
            }
        } else {
            Alert.alert("Atenção", "Preencha todos os campos antes de salvar o alarme.");
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
                collection(db, "remedios"),
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
                Alert.alert("Nenhum registro", "Você não tem registros de remedio para este pet.");
            }
        } catch (error) {
            console.error("Erro ao buscar registros de remedio:", error);
            Alert.alert("Erro", "Erro ao buscar registros de remedio.");
        } finally {
            setLoading(false);
        }
    };

    const salvarAlteracoes = async () => {
        if (!registroSelecionado) return;

        try {
            const firestore = getFirestore();
            const docRef = doc(firestore, "remedios", registroSelecionado.id);

            await updateDoc(docRef, {
                nome: registroSelecionado.nome,
                horario: registroSelecionado.horario,
                frequencia: registroSelecionado.frequencia,
            });

            setListaAlarmes((prevLista) =>
                prevLista.map((registro) =>
                    registro.id === registroSelecionado.id ? registroSelecionado : registro
                )
            );

            await fetchRegistros();

            Alert.alert("Sucesso", "Registro atualizado com sucesso!");
            handleCloseModal();
            setModalVisible(false);
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            Alert.alert("Erro", "Não foi possível salvar as alterações.");
        }
    };

    const excluirRegistro = async (id?: string) => {
        if (!id) return;

        try {
            const firestore = getFirestore();
            const docRef = doc(firestore, "remedios", id);

            await deleteDoc(docRef);

            setListaAlarmes((prevLista) =>
                prevLista.filter((registro) => registro.id !== id)
            );

            await fetchRegistros();

            Alert.alert("Sucesso", "Registro excluído com sucesso!");
            setModalVisible(false);
        } catch (error) {
            console.error("Erro ao excluir registro:", error);
            Alert.alert("Erro", "Não foi possível excluir o registro.");
        }
    };
    const handleCloseModal = () => {
        setModalVisible(false);
        fetchRegistros(); // Atualiza os registros após o modal ser fechado
    };

    useFocusEffect(
        useCallback(() => {
            if (user) {
                fetchRegistros(); // Atualiza os registros sempre que a tela ganhar o foco
            }
        }, [user, pet?.petId]) // Adicionamos user e pet?.petId como dependências para garantir a atualização correta
    );

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
                        <TouchableOpacity
                            key={registro.id}
                            onPress={() => {
                                setRegistroSelecionado(registro); // Define o registro selecionado
                                setModalOpcoesVisible(true); // Abre o modal para opções
                            }}
                            style={styles.alarmeContainer}>
                            <Text style={styles.alarmeNome}>{registro.nome.toUpperCase()}</Text>
                            <Text style={styles.alarmeHorario}>Horário: {registro.horario}</Text>
                            <Text style={styles.alarmeFrequencia}>Frequência: {registro.frequencia}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.textoVazio}>Nenhum alarme adicionado ainda</Text>
                )}
            </ScrollView>

            {/* Botão Laranja */}
            <View style={styles.botaoContainer}>
                <TouchableOpacity
                    style={styles.botaoAdicionar}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.botaoAdicionarTexto}>ADICIONAR ALARME</Text>
                    <Image
                        style={styles.logoAddRemedio}
                        source={require('../../../assets/icone_addAlarme.png')}
                    />
                </TouchableOpacity>
            </View>

            {/* Modal de Criação */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
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
                        <Text style={styles.label}>Digite o nome do alarme:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do alarme"
                            value={alarmeNome}
                            onChangeText={setAlarmeNome}
                        />
                        <Text style={styles.label}>Digite o Horário (HH:MM):</Text>
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '99:99', // Máscara no formato HH:MM
                            }}
                            value={horario}
                            onChangeText={(text) => setHorario(text)}
                            style={styles.input}
                            placeholder="Ex: 08:30"
                            keyboardType="numeric" // Abre teclado numérico
                        />
                        <Text style={styles.label}>Digite a sequência:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Frequência (ex: todos os dias)"
                            value={frequencia}
                            onChangeText={setFrequencia}
                        />
                        <TouchableOpacity style={styles.botaoCriar} onPress={adicionarAlarme}>
                            <Text style={styles.textoCriar}>Adicionar Alarme</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Edição/Exclusão */}
            <Modal
                visible={modalOpcoesVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalOpcoesVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{registroSelecionado?.nome}</Text>
                        <TextInput
                            style={styles.input}
                            value={registroSelecionado?.nome}
                            onChangeText={(text) =>
                                setRegistroSelecionado((prev) => prev ? { ...prev, nome: text } : null)
                            }
                            placeholder="Nome do Alarme"
                        />
                        <TextInput
                            style={styles.input}
                            value={registroSelecionado?.horario}
                            onChangeText={(text) =>
                                setRegistroSelecionado((prev) => prev ? { ...prev, horario: text } : null)
                            }
                            placeholder="Horário"
                        />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    excluirRegistro(registroSelecionado?.id);
                                    setModalOpcoesVisible(false); // Fecha o modal após excluir
                                }}>
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => {
                                    salvarAlteracoes();
                                    setModalOpcoesVisible(false); // Fecha o modal após salvar
                                }}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalOpcoesVisible(false)}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}
