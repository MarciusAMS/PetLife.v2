import { useState, useCallback, useEffect } from "react";
import { View, Text, Alert, ActivityIndicator, TouchableOpacity, Modal, TextInput, Image, Platform, PermissionsAndroid, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { styles } from "../../../styles";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RegistroVacina } from "../../models/Vacina";
import * as DocumentPicker from 'expo-document-picker';
import { usePetContext } from "../../contextos/PetContext";
import { RouteProp, useRoute } from "@react-navigation/native";

// type TelaVacinaRouteProp = RouteProp<RootStackParamList, "TelaVacina">;


export type RootStackParamList = {
  TelaVacinacao: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
  TelaInicio: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
  TelaPet: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
  AppMenu: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
};

type TelaVacinaProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TelaVacinacao'>;
  pet?: { nome: string; imagemUrl: string; petId: string };
};

export default function TelaVacinacao({ navigation, pet }: TelaVacinaProps) {
  const [registros, setRegistros] = useState<RegistroVacina[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileName, setFileName] = useState("Nenhum arquivo escolhido");
  const db = getFirestore();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [documentUri, setDocumentUri] = useState<string | null>(null);
  //const route = useRoute();
  // const { selectedPetId } = route.params as { selectedPetId?: string };
  // const route = useRoute<TelaVacinaRouteProp>();
  // const { selectedPetId } = route.params;

  // const { pet } = usePetContext(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!pet) {
        Alert.alert("Erro", "Nenhum pet selecionado. Redirecionando...");
        navigation.navigate('TelaPet');
      }
    });

    return unsubscribe;
  }, [auth, pet, navigation]);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permissão de Armazenamento',
            message: 'Precisamos de acesso ao armazenamento para selecionar e enviar arquivos.',
            buttonNegative: 'Negar',
            buttonPositive: 'Permitir',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // No iOS, a permissão geralmente é automática para DocumentPicker
  };

  const abrirDocumento = async () => {

    const hasPermission = await requestStoragePermission();

    if (!hasPermission) {
      Alert.alert('Permissão Negada', 'A permissão de acesso ao armazenamento é necessária.');
      console.log('Permissão:', hasPermission);
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Permitir todos os tipos para testar application/pdf ou */*
        copyToCacheDirectory: true,
      });

      console.log('Resultado do DocumentPicker:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri, name } = result.assets[0];
        setFileName(name);
        setDocumentUri(uri);
      } else {
        Alert.alert('Operação cancelada', 'Nenhum documento foi selecionado.');
      }
    } catch (error) {
      console.error('Erro ao selecionar documento:', error);
      Alert.alert('Erro', 'Não foi possível selecionar o documento.');
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

      const registrosList: RegistroVacina[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as RegistroVacina));

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

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchRegistros();
      } // Chama fetchRegistros quando a tela ganha foco e o usuário está autenticado
    }, [user])
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/vacina.png')} style={styles.logoVacina} />
        <Text style={styles.titleVacina}>Carteira de Vacinação</Text>
      </View>

      <View style={styles.separator} />

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          style={styles.scrollContainer}>
          {registros.map((registro) => (
            <View key={registro.id} style={styles.registroItem}>
              <Text style={styles.registroText}>{registro.nome}</Text>
              <Text style={styles.registroText}>{registro.data}</Text>
              {/* {registro.dose && <Text style={styles.registroText}>Dose: {registro.dose}</Text>}
              {registro.observacoes && <Text style={styles.registroText}>Observações: {registro.observacoes}</Text>} */}
            </View>
          ))}
        </ScrollView>
      )}

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
          <View style={styles.modalContent}>
            <View style={styles.headerContaineAddVacina}>
              <Text style={styles.modalTitle}>Escolher Arquivo</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.fileSelector} onPress={abrirDocumento}>
              <TextInput
                style={styles.fileInput}
                placeholder="Escolher arquivo"
                value={fileName}
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addFileButton} onPress={enviarArquivo}>
              <Text style={styles.addFileButtonText}>Adicionar arquivo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
