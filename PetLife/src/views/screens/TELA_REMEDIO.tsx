import { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Alert, Modal, TextInput, FlatList } from 'react-native';
import { styles } from '../../../styles';
import { auth, firestore } from '../../../firebaseService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, deleteDoc, updateDoc, Firestore } from "firebase/firestore";
import { Remedio } from '../../models/Remedio';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export type RootStackParamList = {
    TelaRemedio: { pet?: Pet };
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

type TelaRemedioProp = {
    //navigation: NativeStackNavigationProp<RootStackParamList, 'TelaVacinacao'>;
    pet?: Pet;
  };


export default function TelaRemedio({ pet }: TelaRemedioProp) {
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
   // const { pet } = route.params;
    const petId = pet?.petId;
    //const user = auth.currentUser;
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
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
    
          if (!pet) {
            Alert.alert("Erro", "Nenhum pet selecionado. Redirecionando...");
            navigator.navigate('TelaPet');
          }
        });
    
        return unsubscribe;
      }, [auth, pet, navigator]);


    const adicionarAlarme = async () => {
        if (!alarmeNome || !horario || !frequencia) {
            Alert.alert("Atenção", "Preencha todos os campos antes de salvar o alarme.");
            return;
        }

        try {
            const novoAlarme = {
                nome: alarmeNome,
                horario,
                frequencia,
                userUID: user?.uid,
                petId: pet?.petId,
            };

            await addDoc(collection(db, "remedios"), novoAlarme);
            Alert.alert("Sucesso", "Alarme adicionado com sucesso!");
            setModalVisible(false);
            setAlarmeNome('');
            setHorario('');
            setFrequencia('');
            fetchRegistros();
        } catch (error) {
            console.error("Erro ao adicionar alarme:", error);
            Alert.alert("Erro", "Não foi possível adicionar o alarme.");
        }
    };


    const fetchRegistros = async () => {
        if (!user) {
            Alert.alert("Erro", "Usuário não autenticado ou Pet não selecionado.");
            return;
        }

        if (!pet?.petId) {
            Alert.alert("Erro", "Pet não selecionado.");
            return;
        }

        setLoading(true);

        try {
            const q = query(
                collection(db, 'remedios'),
                where('userUID', '==', user.uid), // Filtra registros pelo usuário logado
                where('petId', '==', pet.petId)  // Filtra registros pelo pet selecionado
            );
            // Alert.alert('ID pet:', pet.petId)
            // Alert.alert('ID pet:', user.uid)
            const querySnapshot = await getDocs(q);

            // if (querySnapshot.empty) {
            //     Alert.alert("Nenhum registro", "Você não tem registros de remédios para este pet.");
            // }

            const registrosList: Alarme[] = querySnapshot.docs.map((doc) => {
                const data = doc.data() as Remedio;
                return {
                    id: doc.id,
                    nome: data.nome ?? 'Sem Nome',
                    horario: data.horario ?? 'Sem Horário',
                    frequencia: data.frequencia ?? 'Sem Frequência',
                };
            });

            setRegistros(registrosList);

            // if (registrosList.length === 0) {
            //     Alert.alert("Nenhum registro", "Você não tem registros de remédio para este pet.");
            // }
        } catch (error) {
            console.error("Erro ao buscar registros de remédio:", error);
            Alert.alert("Erro", "Erro ao buscar registros de remédio.");
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

    const validarExclusao = async () => {
        Alert.alert(
            "Confirmação",
            "Deseja realmente excluir este registro?",
            [
                {
                    text: "Não", // Botão "Não"
                    onPress: () => Alert.alert("Operação cancelada!"), // Mensagem de cancelamento
                    style: "cancel", // Define o estilo do botão
                },
                {
                    text: "Sim", // Botão "Sim"
                    onPress: async () => {
                        try {
                            await excluirRegistro(registroSelecionado?.id); // Função para excluir o registro
                            Alert.alert("Sucesso", "Registro excluído com sucesso!");
                        } catch (error) {
                            console.error("Erro ao excluir registro:", error);
                            Alert.alert("Erro", "Ocorreu um erro ao tentar excluir o registro.");
                        }
                    },
                    style: "destructive", // Destaca o botão como uma ação destrutiva
                },
            ],
            { cancelable: false } // Impede que o alerta seja fechado tocando fora dele
        );
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
                    <View style={styles.modalContentRemedio}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitulo}>{registroSelecionado?.nome}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image
                                    source={require('../../../assets/iconeFechar.png')}
                                    style={styles.iconeFechar}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Digite o novo nome do alarme:</Text>
                        <TextInput
                            style={styles.input}
                            value={registroSelecionado?.nome}
                            onChangeText={(text) =>
                                setRegistroSelecionado((prev) => prev ? { ...prev, nome: text } : null)
                            }
                            placeholder="Nome do Alarme"
                        />
                        <Text style={styles.label}>Digite o novo Horário (HH:MM):</Text>
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '99:99', // Máscara no formato HH:MM
                            }}
                            style={styles.input}
                            value={registroSelecionado?.horario}
                            onChangeText={(text) =>
                                setRegistroSelecionado((prev) => prev ? { ...prev, horario: text } : null)
                            }
                            placeholder="Novo Horário (Ex: 08:30)"
                            keyboardType="numeric"
                        />
                        <Text style={styles.label}>Digite a sequência:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Frequência (ex: todos os dias)"
                            value={registroSelecionado?.frequencia}
                            onChangeText={(text) =>
                                setRegistroSelecionado((prev) => prev ? { ...prev, frequencia: text } : null)
                            }
                        />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    validarExclusao();
                                    setModalOpcoesVisible(false); // Fecha o modal após excluir
                                }}>
                                <Text style={styles.buttonTextRemedio}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => {
                                    salvarAlteracoes();
                                    setModalOpcoesVisible(false); // Fecha o modal após salvar
                                }}>
                                <Text style={styles.buttonTextRemedio}>Salvar</Text>
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
