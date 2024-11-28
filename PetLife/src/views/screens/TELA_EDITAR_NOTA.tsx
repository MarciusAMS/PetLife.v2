import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { firestore } from '../../../firebaseService';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

type Note = { id: string; title: string; content: string };

type RootStackParamList = {
    TelaDiario: { pet: { petId: string; name?: string }; newNote?: Note } | undefined;
    AppMenu: undefined;
    TelaEditarNota: { petId: string; noteId?: string } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'TelaEditarNota'>;

const TelaEditarNota = ({ navigation, route }: Props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userUid, setUserUid] = useState<string | null>(null);

    const petId = route.params?.petId; // Recebe o petId
    const noteId = route.params?.noteId; // Recebe o noteId (se estiver editando)

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserUid(user.uid);
            } else {
                Alert.alert('Erro', 'Usuário não autenticado. Faça login para continuar.');
                navigation.navigate('AppMenu');
            }
        });

        return unsubscribe; // Remove listener ao desmontar
    }, [navigation]);

    useEffect(() => {
        if (noteId && userUid && petId) {
            const loadNote = async () => {
                try {
                    const noteRef = doc(firestore, `pets/${petId}/notes/${noteId}`);
                    const noteSnap = await getDoc(noteRef);

                    if (noteSnap.exists()) {
                        const noteData = noteSnap.data();
                        setTitle(noteData?.title || '');
                        setContent(noteData?.content || '');
                    } else {
                        Alert.alert('Erro', 'Nota não encontrada.');
                        navigation.goBack();
                    }
                } catch (error) {
                    console.error('Erro ao carregar a nota:', error);
                    Alert.alert('Erro', 'Não foi possível carregar a nota.');
                }
            };

            loadNote();
        }
    }, [noteId, petId, userUid, navigation]);

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Erro', 'O título e o conteúdo não podem estar vazios.');
            return;
        }

        if (!petId || !userUid) {
            Alert.alert('Erro', 'Dados do pet ou do usuário ausentes.');
            return;
        }

        const newNote: Note = {
            id: noteId || Date.now().toString(),
            title: title.trim(),
            content: content.trim(),
        };

        try {
            const noteRef = doc(firestore, `pets/${petId}/notes/${newNote.id}`);

            const noteData: Record<string, any> = {
                id: newNote.id,
                title: newNote.title,
                content: newNote.content,
                userUID: userUid,
                petId,
            };

            if (!noteId) {
                noteData.createdAt = new Date().toISOString();
            }

            await setDoc(noteRef, noteData, { merge: true });

            Alert.alert('Sucesso', 'Nota salva com sucesso!');
            navigation.navigate('TelaDiario', { pet: { petId }, newNote });
        } catch (error) {
            console.error('Erro ao salvar a nota:', error);
            Alert.alert('Erro', 'Não foi possível salvar a nota. Tente novamente.');
        }
    };

    const handleDelete = async () => {
        if (!noteId) {
            Alert.alert('Erro', 'Nota não encontrada para exclusão.');
            return;
        }

        if (!petId) {
            Alert.alert('Erro', 'Pet não encontrado.');
            return;
        }

        try {
            const noteRef = doc(firestore, `pets/${petId}/notes/${noteId}`);
            await deleteDoc(noteRef);

            Alert.alert('Sucesso', 'Nota excluída com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao excluir a nota:', error);
            Alert.alert('Erro', 'Não foi possível excluir a nota. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, styles.largeInput]}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Conteúdo"
                value={content}
                onChangeText={setContent}
                multiline
            />
            <TouchableOpacity style={[styles.button, styles.largeButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            {noteId && (
                <TouchableOpacity style={[styles.deleteButton, styles.largeButton]} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9dcc4',
    },
    input: {
        borderWidth: 1,
        borderColor: '#8a4f37',
        backgroundColor: '#fef6ec',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        fontSize: 16,
        color: '#5a4035',
    },
    largeInput: {
        height: 100,
        fontSize: 18,
    },
    textarea: {
        height: 150,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#f39c63',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 12,
    },
    largeButton: {
        paddingVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#d35445',
        borderRadius: 25,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default TelaEditarNota;


