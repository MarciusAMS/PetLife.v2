import React, { useState, useCallback } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { styles } from "../../../styles";

type RegistroVacina = {
  id: string;
  nome: string;
  data: string;
  dose?: string;
  observacoes?: string;
  userUID: string;
};

export default function TelaVacinacao({ navigation }) {
  const [registros, setRegistros] = useState<RegistroVacina[]>([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

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
        registros.map((registro, index) => (
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
        onPress={() => navigation.navigate("TelaAdicionar")}
      >
        <Text style={styles.addVacinaIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
