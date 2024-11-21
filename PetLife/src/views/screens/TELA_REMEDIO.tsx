import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Dimensions, ImageBackground, Alert, Modal, TextInput } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Remedios } from '../../models/Remedio';

export type RootStackParamList = {
    TelaRemedio: { pet?: { petId: string } };
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

type TelaRemedioProps = {
    pet?: Pet;
};

export default function TelaRemedio({ pet }: TelaRemedioProps) {
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = auth.currentUser;
    const userId = user?.uid;
    const { width } = Dimensions.get('window');
    const [modalVisible, setModalVisible] = useState(false);
    const [fileName, setFileName] = useState("Nenhum arquivo escolhido");
    const [documentUri, setDocumentUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [registros, setRegistros] = useState<Remedios[]>([]);
    const db = getFirestore();

    useEffect(() => {
        Alert.alert('Parâmetros recebidos na TelaRemedio:', pet?.petId);
        if (!pet?.petId) {
            //Alert.alert('Nenhum pet foi selecionado ainda. Redirecionando para TelaPet.');
            //navigator.navigate('TelaPet');
        } else {
            console.log('PetId recebido: ', pet.petId);
        }
    }, [pet, navigator]);

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

            const registrosList: Remedios[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            } as Remedios));

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
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/remedios.png')} style={styles.logoPetsaude} />
                <Text style={styles.titlePetSaude}>Remédios</Text>
                <Image source={require('../../../assets/patas.png')} style={styles.pawIconSaude} />
            </View>

            {/* Separador */}
            <View style={styles.separator} />

            <TouchableOpacity
                style={styles.addVacinaButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addVacinaIcon}>+</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContentRemedio}>
                        <View style={styles.headerContaineAddVacina}>
                            <Text style={styles.modalTitleRemedio}>CRIAR ALARME</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image style={styles.closeButtonTextRemedio} source={require('../../../assets/iconeFechar.png')} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.fileSelectorRemedio}>
                            <TextInput
                                style={[styles.inputModalRemedio,]}
                                placeholder="Nome do alarme:"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text>Horário</Text>
                            <TextInput placeholder='00:00'></TextInput>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.addFileButton} onPress={enviarArquivo}>
                            <Text style={styles.addFileButtonText}>CRIAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
