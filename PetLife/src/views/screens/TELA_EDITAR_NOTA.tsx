import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { firestore } from '../../../firebaseService';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

type Notas = { id: string; title: string; content: string };

type RootStackParamList = {
    TelaDiario: { pet: { petId: string; name?: string }; newNote?: Notas } | undefined;
    AppMenu: undefined;
    TelaEditarNota: { petId: string; noteId?: string } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'TelaEditarNota'>;

const TelaEditarNota = ({ navigation, route }: Props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userUid, setUserUid] = useState<string | null>(null);

    const petId = route.params?.petId;
    const noteId = route.params?.noteId;

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

        return unsubscribe;
    }, []);

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
    }, [noteId, petId, userUid]);

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Erro', 'O título e o conteúdo não podem estar vazios.');
            return;
        }

        if (!petId) {
            Alert.alert('Erro', 'Pet não selecionado.');
            return;
        }

        const newNoteId = noteId || Date.now().toString();
        const newNote: Notas = { id: newNoteId, title, content };

        try {
            const noteRef = doc(firestore, `pets/${petId}/notes`, newNoteId);
            const noteData: any = {
                id: newNote.id,
                title: newNote.title.trim(),
                content: newNote.content.trim(),
                userUID: userUid,
                petId: petId,
            };

            if (!noteId) {
                noteData.createdAt = new Date().toISOString();
            }

            await setDoc(noteRef, noteData, { merge: true });

            Alert.alert('Sucesso', 'Nota salva com sucesso!');
            navigation.navigate('TelaDiario', {
                pet: { petId },
                newNote,
            });
        } catch (error) {
            console.error('Erro ao salvar a nota:', error);
            Alert.alert('Erro', 'Não foi possível salvar a nota. Por favor, tente novamente.');
        }
    };

    const handleDelete = async () => {
        if (!noteId) {
            Alert.alert('Erro', 'Nota não encontrada para exclusão.');
            return;
        }

        if (!petId) {
            Alert.alert('Erro', 'Pet não selecionado.');
            return;
        }

        try {
            const noteRef = doc(firestore, `pets/${petId}/notes`, noteId);
            await deleteDoc(noteRef);

            Alert.alert('Sucesso', 'Nota excluída com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao excluir a nota:', error);
            Alert.alert('Erro', 'Não foi possível excluir a nota. Por favor, tente novamente.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
                returnKeyType="next"
                onSubmitEditing={() => {
                    // Implementa navegação para o próximo campo, se necessário
                }}
            />
            <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Conteúdo"
                value={content}
                onChangeText={setContent}
                multiline
            />
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} activeOpacity={0.8} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        height: 80,
        textAlignVertical: 'top',
    },
    textarea: {
        height: 120,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#f39c63',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 12,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#d35445',
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TelaEditarNota;
