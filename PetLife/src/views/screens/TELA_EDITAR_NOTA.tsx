import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Note = { id: string; title: string; content: string };

type RootStackParamList = {
    TelaDiario: { newNote?: Note } | undefined;
    AppMenu: undefined;
    TelaEditarNota: { noteId: string } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'TelaEditarNota'>;

const TelaEditarNota: React.FC<Props> = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const noteId = route.params?.noteId;

    // Simulação de carregamento de notas (adapte para o seu caso)
    const notes: Note[] = [
        { id: '1', title: 'Nota 1', content: 'Conteúdo da Nota 1' },
        { id: '2', title: 'Nota 2', content: 'Conteúdo da Nota 2' },
    ];

    useEffect(() => {
        if (noteId) {
            // Buscar a nota existente pelo ID
            const existingNote = notes.find((note) => note.id === noteId);
            if (existingNote) {
                setTitle(existingNote.title);
                setContent(existingNote.content);
            }
        }
    }, [noteId]);

    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Erro', 'O título e o conteúdo não podem estar vazios.');
            return;
        }

        const newNote: Note = { id: noteId || Date.now().toString(), title, content };
        navigation.navigate('TelaDiario', { newNote }); // Enviar a nota de volta para TelaDiario
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
