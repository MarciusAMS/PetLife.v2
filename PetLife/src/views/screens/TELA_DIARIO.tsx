import { styles } from '../../../styles';
import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

export type RootStackParamList = {
    TelaDiario: { newNote?: Note } | undefined;
    AppMenu: undefined;
    TelaEditarNota: { noteId: string } | undefined;
};
type Note = { id: string; title: string; content: string };

type Props = NativeStackScreenProps<RootStackParamList, 'TelaDiario'>;

const TelaDiario: React.FC<Props> = ({ navigation, route }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [scrollY, setScrollY] = useState(0);
    const [notePositions, setNotePositions] = useState<{ [key: string]: number }>({});

    // Processar parâmetros recebidos ao retornar de `TelaEditarNota`
    useFocusEffect(
        React.useCallback(() => {
            if (route.params?.newNote) {
                const { newNote } = route.params;

                setNotes((prevNotes) => {
                    const updatedNotes = prevNotes.filter((note) => note.id !== newNote.id); // Remover duplicatas
                    return [...updatedNotes, newNote]; // Adicionar nova/atualizada
                });

                // Limpar parâmetros para evitar duplicações
                navigation.setParams({ newNote: undefined });
            }
        }, [route.params])
    );

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        const updatedPositions: { [key: string]: number } = {};
        viewableItems.forEach((viewable: any) => {
            updatedPositions[viewable.item.id] = viewable.index * 90; // Ajustar a posição
        });
        setNotePositions((prevPositions) => ({
            ...prevPositions,
            ...updatedPositions,
        }));
    }).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 10,
    };

    // Criar uma nova nota e navegar para edição
    const addNote = () => {
        const newNoteId = Date.now().toString(); // Gerar ID único
        navigation.navigate('TelaEditarNota', { noteId: newNoteId });
    };

    // Editar nota existente
    const editNote = (note: Note) => {
        navigation.navigate('TelaEditarNota', { noteId: note.id });
    };

    // Renderizar uma nota
    const renderNote = ({ item }: { item: Note }) => {
        const position = notePositions[item.id];
        const hideThreshold = 10;
        const shouldHide = position !== undefined && position + hideThreshold < scrollY;

        return (
            <TouchableOpacity
                style={[
                    styles.note,
                    shouldHide && { opacity: 0.3, transform: [{ translateY: -30 }] },
                ]}
                onPress={() => editNote(item)} // Navegar para editar ao clicar
            >
                <Image style={styles.noteImage} source={require('../../../assets/anotacao.png')} />
                <Text style={styles.noteText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho fixo */}
            <View style={styles.fixedHeader}>
                <View style={styles.headerContainer}>
                    <Image source={require('../../../assets/diario.png')} style={styles.logoDiario} />
                    <Text style={styles.titleDiario}>DIÁRIO</Text>
                    <Image source={require('../../../assets/patas.png')} style={styles.pawDiarioIcon} />
                </View>
                <View style={styles.separator} />
            </View>

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
                onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
                scrollEventThrottle={16}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
    );
};

export default TelaDiario;
