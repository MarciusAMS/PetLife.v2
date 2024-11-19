import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { styles } from "../../../styles";
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
    const [scrollY, setScrollY] = useState(0); // Adicionado estado para monitorar scroll

    // Adicionar uma nova nota
    const addNote = () => {
        const newNote = { id: Date.now().toString(), content: 'Nova nota' };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    // Quando uma nota é clicada
    const handleNoteClick = (note: Note) => {
        Alert.alert('Nota Selecionada', `Você clicou na nota: ${note.content}`);
    };

    const renderNote = ({ item, index }: { item: Note, index: number }) => {
        const shouldHide = scrollY > 700 && index < 2; // Altere o "120" para ajustar a linha de referência

        return (
            <TouchableOpacity
                style={[
                    styles.note,
                    shouldHide && { opacity: 0, transform: [{ translateY: 30 }] } // Estilo dinâmico
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
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/diario.png')} style={styles.logoDiario} />
                <Text style={styles.titleDiario}>DIÁRIO</Text>
                <Image source={require('../../../assets/patas.png')} style={styles.pawDiarioIcon} />
            </View>

            <View style={styles.separator} />

            <TouchableOpacity onPress={addNote} style={styles.addDiarioButton}>
                <Text style={styles.addDiarioButtonText}>+</Text>
            </TouchableOpacity>

            {/* Lista de Notas */}
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={renderNote}
                numColumns={2}
                contentContainerStyle={styles.notesContainer}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)} // Monitorar scroll
                scrollEventThrottle={16}
            />
        </View>
    );
}
