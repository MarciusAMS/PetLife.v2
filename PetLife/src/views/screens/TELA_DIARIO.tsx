import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { firestore } from '../../../firebaseService';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { styles } from '../../../styles';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Tipos de parâmetros para a navegação
export type RootStackParamList = {
  TelaDiario: { pet: { petId: string; name?: string }; newNote?: Note } | undefined;
  TelaEditarNota: { noteId?: string; petId: string } | undefined;
  TelaPet: undefined;
};

interface Pet {
  nome: string;
  imagemUrl: string;
  userUID: string;
  petId: string;
}

type Note = { id: string; title: string; content: string };

type TelaDiarioProps = {
  pet?: Pet; // `pet` pode ser opcional
  note?: Note;
};

export default function TelaDiario({ pet }: TelaDiarioProps) {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  // Efeito para monitorar o estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        Alert.alert('Erro', 'Você precisa estar autenticado para acessar esta tela.');
        navigator.navigate('TelaPet');
      }
    });

    return () => unsubscribe();
  }, [auth, navigator]);

  // Função para buscar as notas do Firestore
  const fetchNotes = async () => {
    if (!user) return;
    if (!pet) {
      Alert.alert('Erro', 'Nenhum pet foi selecionado. Redirecionando...');
      navigator.navigate('TelaPet');
      return;
    }

    try {
      setIsLoading(true);

      const notesQuery = query(
        collection(firestore, `pets/${pet.petId}/notes`),
        where('userUID', '==', user.uid),
        where('petId', '==', pet.petId)
      );

      const notesSnapshot = await getDocs(notesQuery);
      const fetchedNotes: Note[] = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
      }));

      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as notas.');
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega as notas ao focar na tela
  useFocusEffect(
    React.useCallback(() => {
      if (user) fetchNotes();
    }, [pet, user])
  );

  // Navega para a tela de edição (nova nota)
  const addNote = () => {
    if (!pet) {
      Alert.alert('Erro', 'Pet inválido. Não é possível adicionar uma nota.');
      return;
    }
    navigator.navigate('TelaEditarNota', { petId: pet.petId });
  };

  // Navega para a tela de edição com a nota existente
  const editNote = (note: Note) => {
    if (!pet) {
      Alert.alert('Erro', 'Pet inválido. Não é possível editar a nota.');
      return;
    }
    navigator.navigate('TelaEditarNota', { noteId: note.id, petId: pet.petId });
  };

  // Renderiza cada nota na lista
  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity style={styles.note} onPress={() => editNote(item)}>
      <Image style={styles.noteImage} source={require('../../../assets/anotacao.png')} />
      <Text style={styles.noteText}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Renderiza uma tela de carregamento enquanto os dados são carregados
  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#f39c63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerContainerDiario}>
        <Image source={require('../../../assets/diario.png')} style={styles.logoPetRemedio} />
        <Text style={styles.titlePetRemedio}>DIÁRIO</Text>
        <Image source={require('../../../assets/patas.png')} style={styles.pawIconRemedio} />
      </View>
      <View style={styles.separator} />

      {/* Botão de adicionar nota */}
      <TouchableOpacity onPress={addNote} style={styles.addDiarioButton}>
        <Text style={styles.addDiarioButtonText}>+</Text>
      </TouchableOpacity>

      {/* Lista de notas */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
        numColumns={2}
        contentContainerStyle={styles.notesContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
