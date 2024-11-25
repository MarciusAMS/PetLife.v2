import { styles } from '../../../styles';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { firestore } from '../../../firebaseService'; // Firestore import
import { collection, getDocs, query, where, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
//import { Notas } from '../../models/Notas';

// Tipos de parâmetros para a navegação
export type RootStackParamList = {
    TelaDiario: { pet: { petId: string; name?: string }; newNote?: Note } | undefined; // pet como objeto
    AppMenu: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
    TelaEditarNota: { noteId?: string; petId: string } | undefined; // petId obrigatório, noteId opcional
};

interface Pet {
    nome: string;
    imagemUrl: string;
    userUID: string;
    petId: string;
}

type Note = { id: string; title: string; content: string };

type TelaDiarioProps = {
    //navigation: NativeStackNavigationProp<RootStackParamList, 'TelaDiario'>;
    pet?: Pet;
    //nota?: Notas;
};


const TelaDiario: React.FC<TelaDiarioProps> = ({ pet }) => {
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<any>();
    const auth = getAuth();

    const [notes, setNotes] = useState<Note[]>([]);
    const [scrollY, setScrollY] = useState(0);
    const [notePositions, setNotePositions] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(auth.currentUser);
    //const pet = route.params?.pet; // Obtém o pet via navegação


    useEffect(() => {
        console.log('Pet recebido:', pet);
        if (user && pet) {
            fetchNotes();
        }
    }, [user, pet]);

    const fetchNotes = async () => {
        if (!user || !pet) {
            Alert.alert('Erro', 'Usuário não autenticado ou pet não selecionado.');
            return;
        }

        try {
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
        } catch (error) {
            console.error('Erro ao buscar notas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as notas.');
        }
    };

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
            const newNoteId = Date.now().toString();

            const newNote: Note = {
                id: newNoteId,
                title: '',
                content: '',
            };

            const docRef = await addDoc(collection(firestore, `pets/${pet.petId}/notes`), {
                ...newNote,
                userUID: user.uid, // Inclui o userUID obrigatório
                createdAt: new Date().toISOString(), // Adiciona data de criação
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

    useFocusEffect(
        useCallback(() => {
            if (user && pet) fetchNotes();
        }, [user, pet])
    );

    const renderNote = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={styles.note}
            onPress={() => editNote(item)}
        >
            <Image style={styles.noteImage} source={require('../../../assets/anotacao.png')} />
            <Text style={styles.noteText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainerDiario}>
                <Image source={require('../../../assets/diario.png')} style={styles.logoDiario} />
                <Text style={styles.titleDiario}>DIÁRIO</Text>
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
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default TelaDiario;
