import React, { useState, useCallback } from "react";
import { View, Text, Alert, ActivityIndicator, TouchableOpacity, Modal, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { styles } from "../../../styles";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RegistroVacina } from "../../models/Vacina";
import * as DocumentPicker from 'expo-document-picker';

export type RootStackParamList = {
  TelaVacina: undefined;
};

type TelaVacinaProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TelaVacina'>;
};

export default function TelaVacinacao({ navigation }: TelaVacinaProps) {
  const [registros, setRegistros] = useState<RegistroVacina[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const [documentUri, setDocumentUri] = useState<string | null>(null);

  const abrirDocumento = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Permite todos os tipos de documentos, ou especifique 'application/pdf' para PDFs
      });
  
      if (result.type === 'success') {
        setDocumentUri(result.uri); // Definindo a URI do documento
        Alert.alert('Documento selecionado', `Você selecionou: ${result.name}`);
      } else {
        Alert.alert('Operação cancelada', 'Nenhum documento foi selecionado.');
      }
    } catch (error) {
      console.error('Erro ao selecionar documento:', error);
      Alert.alert('Erro', 'Não foi possível acessar os documentos.');
    }
  };

const fetchRegistros = async () => {
  setLoading(true);
  try {
    if (user) {
      console.log("UID do usuário:", user.uid);
      const q = query(
        collection(db, "registrosVacina"),
        where("userUID", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      const registrosList: RegistroVacina[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as RegistroVacina));

      setRegistros(registrosList);
      console.log("Registros de vacinação recuperados:", registrosList);
    } else {
      Alert.alert("Erro", "Usuário não autenticado.");
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
    fetchRegistros(); // Chama fetchRegistros quando a tela ganha foco
  }, [])
);

return (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Carteira de Vacinação</Text>
    </View>

    <View style={styles.separator} />

    {loading ? (
      <ActivityIndicator size="large" color="#000" />
    ) : (
      registros.map((registro) => (
        <View key={registro.id} style={styles.registroItem}>
          <Text style={styles.registroText}>{registro.nome}</Text>
          <Text style={styles.registroText}>{registro.data}</Text>
          {registro.dose && <Text style={styles.registroText}>Dose: {registro.dose}</Text>}
          {registro.observacoes && <Text style={styles.registroText}>Observações: {registro.observacoes}</Text>}
        </View>
      ))
    )}

    <TouchableOpacity
      style={styles.addVacinaButton}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.addVacinaIcon}>+</Text>
    </TouchableOpacity>

    {/* Modal para adicionar nova vacina */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalTitle}>Escolher Arquivo</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fileSelector}>
            <TextInput style={styles.fileInput} placeholder="Escolher arquivo" editable={false} />
            <Text style={styles.filePlaceholder}>Nenhum arquivo escolhido</Text>
          </View>

          <TouchableOpacity style={styles.addFileButton}>
            <Text style={styles.addFileButtonText}>Adicionar arquivo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
);
}
