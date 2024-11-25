import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { firestore } from '../../../firebaseService'; // Firestore import
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { styles } from '../../../styles';

// Tipos de parâmetros para a navegação
export type RootStackParamList = {
  TelaDiario: { pet: { petId: string; name?: string }; newNote?: Note } | undefined;
  AppMenu: undefined;
  TelaEditarNota: { noteId?: string; petId: string } | undefined;
};

interface Pet {
  nome: string;
  imagemUrl: string;
  userUID: string;
  petId: string;
}

type Note = { id: string; title: string; content: string };

type TelaDiarioProps = {
  pet: Pet;
};

const TelaDiario: React.FC<TelaDiarioProps> = ({ pet }) => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [notePositions, setNotePositions] = useState<{ [key: string]: number }>({});
  const auth = getAuth();

  const fetchNotes = async () => {
    try {
      if (!pet) {
        Alert.alert('Erro', 'Pet não encontrado.');
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Erro', 'Você precisa estar autenticado para acessar as notas.');
        return;
      }

      const notesQuery = query(
        collection(firestore, `pets/${pet.petId}/notes`),
        where('userUID', '==', user.uid)
      );

      const notesSnapshot = await getDocs(notesQuery);
      const fetchedNotes: Note[] = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
      }));
      setNotes(fetchedNotes);
    } catch (error: any) {
      Alert.alert('Erro', 'Algo deu errado. Tente novamente mais tarde.');
      console.error('Erro ao buscar notas:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes();
    }, [pet])
  );

  const addNote = async () => {
    if (!pet) {
      Alert.alert('Erro', 'Pet não encontrado.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar autenticado para adicionar uma nota.');
      return;
    }

    try {
      const newNote: Omit<Note, 'id'> = {
        title: '',
        content: '',
      };

      const docRef = await addDoc(collection(firestore, `pets/${pet.petId}/notes`), {
        ...newNote,
        userUID: user.uid,
        createdAt: new Date().toISOString(),
      });

      navigator.navigate('TelaEditarNota', {
        noteId: docRef.id,
        petId: pet.petId,
      });
    } catch (error) {
      console.error('Erro ao adicionar nota:', error);
      Alert.alert('Erro', 'Não foi possível criar a nota.');
    }
  };

  const editNote = (note: Note) => {
    if (!pet) {
      Alert.alert('Erro', 'Pet não encontrado.');
      return;
    }
    navigator.navigate('TelaEditarNota', { noteId: note.id, petId: pet.petId });
  };

  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity style={styles.note} onPress={() => editNote(item)}>
      <Image style={styles.noteImage} source={require('../../../assets/anotacao.png')} />
      <Text style={styles.noteText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

        <View style={styles.headerContainerDiario}>
          <Image source={require('../../../assets/diario.png')} style={styles.logoPetRemedio} />
          <Text style={styles.titlePetRemedio}>DIÁRIO</Text>
          <Image source={require('../../../assets/patas.png')} style={styles.pawIconRemedio} />
        </View>
        <View style={styles.separator} />

      <TouchableOpacity onPress={addNote} style={styles.addDiarioButton}>
        <Text style={styles.addDiarioButtonText}>+</Text>
      </TouchableOpacity>

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
};

export default TelaDiario;
