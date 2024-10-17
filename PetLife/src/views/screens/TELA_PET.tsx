import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { styles } from "../../../styles";

// Definir um tipo para os pets
interface Pet {
    name: string;
    imagemUrl: string;
    userUid: string; // Adicione outros campos conforme necessário
}

export default function TelaPet() {
    // Inicializar o estado como uma lista de objetos do tipo Pet
    const [pets, setPets] = useState<Pet[]>([]);  // Especificar que 'pets' é uma lista de 'Pet'
    const navigation = useNavigation();
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const q = query(
                    collection(db, "pets"),
                    where("userUid", "==", user?.uid)
                );
                const querySnapshot = await getDocs(q);

                // Mapear os dados para o tipo Pet e atualizar o estado
                const petList: Pet[] = querySnapshot.docs.map(doc => doc.data() as Pet);
                setPets(petList); // Atualizar o estado com os dados corretos
            } catch (error) {
                Alert.alert("Erro", "Erro ao buscar pets.");
            }
        };

        fetchPets();
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerHorizontal}>
                    <Text style={styles.title}>PETS</Text>
                </View>

                {/* Exibe os pets cadastrados */}
                <View style={styles.petContainer}>
                    {pets.map((pet, index) => (
                        <View key={index} style={styles.petCard}>
                            <Image source={{ uri: pet.imagemUrl }} style={styles.petImage} />
                            <Text style={styles.petName}>{pet.name}</Text>
                        </View>
                    ))}

                    {/* Ícone de "+" para adicionar um novo pet */}
                    <TouchableOpacity
                        style={styles.addPetButton}
                        onPress={() => navigation.navigate("TelaCadastroPet")}
                    >
                        <Text style={styles.addPetIcon}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
