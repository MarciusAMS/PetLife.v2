import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { styles } from "../../../styles";

export type AppRootParamList = {
    TelaCadastroPet: { userUID: string } // Adicionando um parâmetro opcional
};

// Definir um tipo para os pets
interface Pet {
    nome: string;
    imagemUrl: string; // URL da imagem no Storage
    userUID: string;
}

export default function TelaPet() {
    const [pets, setPets] = useState<Pet[]>([]);
    const navigation = useNavigation();
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {

        const fetchPets = async () => {
            try {
                if (user) {  // Certifica-se de que o usuário está autenticado
                    console.log('UID do usuário:', user.uid);
                    const q = query(
                        collection(db, "pets"),
                        where("userUID", "==", user.uid) // Certifique-se de que é 'userUID' no filtro
                    );
                    const querySnapshot = await getDocs(q);

                    const petList: Pet[] = querySnapshot.docs.map(doc => doc.data() as Pet);
                    setPets(petList);
                    console.log('Pets recuperados:', petList);
                } else {
                    Alert.alert("Erro", "Usuário não autenticado.");
                }
            } catch (error) {
                console.error('Erro ao buscar pets:', error);
                Alert.alert("Erro", "Erro ao buscar pets.");
            }
        };


        // const fetchPets = async () => {
        //     try {
        //         const querySnapshot = await getDocs(collection(db, "pets")); // Buscando todos os pets
        //         const petList: Pet[] = querySnapshot.docs.map(doc => doc.data() as Pet);
        //         console.log('Todos os pets:', petList); // Verifica todos os pets
        //         setPets(petList); 
        //         console.log('Pets recuperados', petList);
        //     } catch (error) {
        //         console.error('Erro ao buscar pets:', error);
        //         Alert.alert("Erro", "Erro ao buscar pets.");
        //     }
        // };

        fetchPets();
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerHorizontal}>
                    <Text style={styles.titlePet}>PETS</Text>
                </View>

                {/* Exibe os pets cadastrados */}
                <View style={styles.petContainer}>
                    {pets.map((pet, index) => {
                        console.log('Pet:', pet); // Verifica o objeto pet
                        console.log('Imagem URL:', pet.imagemUrl); // Verifica a URL da imagem

                        return (
                            <View key={index} style={styles.petCard}>
                                {pet.imagemUrl ? (
                                    <Image source={{ uri: pet.imagemUrl }} style={styles.petImage} />
                                ) : (
                                    <Text style={styles.petName}>Imagem não disponível</Text>
                                )}
                                <Text style={styles.petName}>{pet.nome}</Text>
                            </View>
                        );
                    })}

                    {/* Ícone de "+" para adicionar um novo pet */}
                    <TouchableOpacity
                        style={styles.addPetButton}
                        onPress={() => navigation.navigate('TelaCadastroPet')}
                    >
                        <Text style={styles.addPetIcon}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
