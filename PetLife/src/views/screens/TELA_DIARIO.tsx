import { styles } from '../../../styles';
import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { firestore } from '../../../firebaseService'; // Firestore import
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Tipos de parâmetros para a navegação
export type RootStackParamList = {
    TelaDiario: { pet: { petId: string; name?: string }; newNote?: Note } | undefined; // pet como objeto
    AppMenu: undefined;
    TelaEditarNota: { noteId?: string; petId: string } | undefined; // petId obrigatório, noteId opcional
};

type Note = { id: string; title: string; content: string };

type Props = NativeStackScreenProps<RootStackParamList, 'TelaDiario'>;

const TelaDiario: React.FC<Props> = ({ navigation, route }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [scrollY, setScrollY] = useState(0);
    const [notePositions, setNotePositions] = useState<{ [key: string]: number }>({});
    const auth = getAuth();

    const pet = route.params?.pet;

    console.log('Pet:', pet);
    console.log('Pet ID:', pet?.petId);

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
                collection(firestore, `pets/${pet.petId}/notes`), // Ajusta para subcoleções de notas
                where('userUID', '==', user.uid) // Verifica o userUID
            );

            const notesSnapshot = await getDocs(notesQuery);
            const fetchedNotes: Note[] = notesSnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
            }));
            setNotes(fetchedNotes);
        } catch (error: any) {
            if (error.code === 'permission-denied') {
                Alert.alert('Erro', 'Você não tem permissão para acessar essas notas.');
            } else {
                Alert.alert('Erro', 'Algo deu errado. Tente novamente mais tarde.');
            }
            console.error('Erro ao buscar notas:', error.code, error.message);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNotes();
            if (route.params?.newNote) {
                const { newNote } = route.params;

                setNotes((prevNotes) => {
                    const updatedNotes = prevNotes.filter((note) => note.id !== newNote.id);
                    return [...updatedNotes, newNote];
                });

                navigation.setParams({ newNote: undefined });
            }
        }, [route.params, pet])
    );

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        const updatedPositions: { [key: string]: number } = {};
        viewableItems.forEach((viewable: any) => {
            updatedPositions[viewable.item.id] = viewable.index * 90;
        });
        setNotePositions((prevPositions) => ({
            ...prevPositions,
            ...updatedPositions,
        }));
    }).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 10,
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

            navigation.navigate('TelaEditarNota', {
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
        navigation.navigate('TelaEditarNota', { noteId: note.id, petId: pet.petId });
    };

    const renderNote = ({ item }: { item: Note }) => {
        const position = notePositions[item.id];
        const hideThreshold = 10;
        const shouldHide = position !== undefined && position + hideThreshold < scrollY;

        return (
            <TouchableOpacity
                style={[styles.note, shouldHide && { opacity: 0, transform: [{ translateY: -20 }] }]}
                onPress={() => editNote(item)}
            >
                <Image style={styles.noteImage} source={require('../../../assets/anotacao.png')} />
                <Text style={styles.noteText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.fixedHeader}>
                <View style={styles.headerContainer}>
                    <Image source={require('../../../assets/diario.png')} style={styles.logoDiario} />
                    <Text style={styles.titleDiario}>DIÁRIO</Text>
                    <Image source={require('../../../assets/patas.png')} style={styles.pawDiarioIcon} />
                </View>
                <View style={styles.separator} />
            </View>

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
                onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
                scrollEventThrottle={16}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
    );
};

export default TelaDiario;
