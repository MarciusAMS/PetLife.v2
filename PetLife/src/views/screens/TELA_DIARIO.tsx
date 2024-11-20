import { styles } from '../../../styles';
import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    TelaDiario: undefined;
    AppMenu: undefined;
};

type TelaDiarioProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'TelaDiario'>;
};

export default function TelaDiario({ navigation }: TelaDiarioProps) {
    type Note = { id: string; content: string };

    const [notes, setNotes] = useState<Note[]>([]);
    const [scrollY, setScrollY] = useState(0);
    const [notePositions, setNotePositions] = useState<{ [key: string]: number }>({});

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        const updatedPositions: { [key: string]: number } = {};
        viewableItems.forEach((viewable: any) => {
            updatedPositions[viewable.item.id] = viewable.index * 100; // Supondo altura de cada item como 100px
        });
        setNotePositions((prevPositions) => ({
            ...prevPositions,
            ...updatedPositions,
        }));
    }).current;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50, // Percentual mínimo de visibilidade para um item ser considerado visível
    };

    const addNote = () => {
        const newNote = { id: Date.now().toString(), content: 'Nova nota' };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    const handleNoteClick = (note: Note) => {
        Alert.alert('Nota Selecionada', `Você clicou na nota: ${note.content}`);
    };

    const renderNote = ({ item }: { item: Note }) => {
        const position = notePositions[item.id];
        const hideThreshold = 50; // Altura limite
        const shouldHide = position !== undefined && position < scrollY + hideThreshold;

        return (
            <TouchableOpacity
                style={[
                    styles.note,
                    shouldHide && { opacity: 0.3, transform: [{ translateY: -30 }] },
                ]}
                onPress={() => handleNoteClick(item)}
            >
                <Image style={styles.noteImage} source={require('../../../assets/anotacao.png')} />
                <Text style={styles.noteText}>{item.content}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho e separador fixos */}
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
}