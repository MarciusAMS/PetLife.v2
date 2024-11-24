import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
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

        const newNote: Note = { id: noteId || Date.now().toString(), title, content };

        try {
            const noteRef = doc(firestore, `pets/${petId}/notes/${newNote.id}`);

            // Montar o objeto de dados, excluindo campos com valores inválidos
            const noteData: any = {
                id: newNote.id,
                title: newNote.title,
                content: newNote.content,
                userUID: userUid,
                petId: petId,
            };

            // Adicionar `createdAt` apenas se for uma nova nota
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
            Alert.alert('Erro', 'Não foi possível salvar a nota. Tente novamente.');
        }
    };

    // Função para excluir a nota
    const handleDelete = async () => {
        if (!noteId || !petId) {
            Alert.alert('Erro', 'Nota não encontrada para exclusão.');
            return;
        }

        try {
            const noteRef = doc(firestore, `pets/${petId}/notes/${noteId}`);
            await deleteDoc(noteRef);

            Alert.alert('Sucesso', 'Nota excluída com sucesso!');
            navigation.goBack(); // Volta para a tela anterior
        } catch (error) {
            console.error('Erro ao excluir a nota:', error);
            Alert.alert('Erro', 'Não foi possível excluir a nota. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
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
            <Button title="Salvar" onPress={handleSave} />
            <Button title="Excluir" onPress={handleDelete} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
        borderRadius: 4,
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default TelaEditarNota;
