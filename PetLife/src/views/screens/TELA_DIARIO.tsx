import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, Animated, TouchableOpacity, Alert } from "react-native";
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

    const [notes, setNotes] = useState(
        Array.from({ length: 20 }, (_, i) => ({ id: i.toString(), content: `Nota ${i + 1}` }))
      );
      const [scrollY, setScrollY] = useState(0); // Armazena a posição do scroll

    // Adicionar uma nova nota
    const addNote = () => {
        const newNote = { id: Date.now().toString(), content: `Nota ${notes.length + 1}` };
        setNotes((prevNotes) => [...prevNotes, newNote]);
      };

    // Quando uma nota é clicada
    const handleNoteClick = (note: Note) => {
        Alert.alert('Nota Selecionada', `Você clicou na nota: ${note.content}`);
    };

    const renderNote = ({ item }: { item: Note }) => {
        const shouldHide = scrollY > 1000 && parseInt(item.id) < 3; // Esconde as 3 primeiras notas ao ultrapassar 100px no scroll
          return (
            <Animated.View style={[styles.note, shouldHide && { opacity: 0 }]}>
              <Text style={styles.noteText}>{item.content}</Text>
            </Animated.View>
          
    //     <TouchableOpacity style={styles.note} onPress={() => handleNoteClick(item)}>
    //          <Image style={styles.noteImage} source={require('../../../assets/anotacao.png')} />
    //         <Text style={styles.noteText}>{item.content}</Text>
    //     </TouchableOpacity>
    );
}
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
                numColumns={2} // Duas colunas
                contentContainerStyle={styles.notesContainer}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );

}

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#fbe6d3', paddingHorizontal: 10 },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: 20,
//         backgroundColor: '#fcdab7',
//         paddingHorizontal: 15,
//         borderBottomWidth: 1,
//         borderColor: '#d3a589',
//     },
//     headerText: { fontSize: 24, fontWeight: 'bold', color: '#4a3f35' },
//     addButton: {
//         backgroundColor: '#f08a5d',
//         borderRadius: 50,
//         width: 40,
//         height: 40,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     addButtonText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
//     notesContainer: { paddingTop: 20 },
//     note: {
//         backgroundColor: '#d8c3a5',
//         width: '45%',
//         margin: '2.5%',
//         aspectRatio: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#caa374',
//     },
//     noteText: { fontSize: 16, color: '#4a3f35' },
// });