import { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styles } from "../../../styles";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePetContext } from "../../contextos/PetContext";

export type RootStackParamList = {
    TelaPet: undefined;
    TelaCadastroPet2: undefined;
    AppMenu: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
    //TelaInicio: { pet: { nome: string; imagemUrl: string, petId: string } } | undefined;
    TelaDiario: { pet: { nome: string; imagemUrl: string } } | undefined;
};

type TelaPetProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'TelaPet'>;
};

interface Pet {
    nome: string;
    imagemUrl: string;
    userUID: string;
    petId: string;
}

export default function TelaPet({ navigation }: TelaPetProps) {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(false);
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    // Função que busca os pets do banco de dados
    const fetchPets = async () => {
        setLoading(true);
        try {
            if (user) {
                console.log('UID do usuário:', user.uid);
                const q = query(
                    collection(db, "pets"),
                    where("userUID", "==", user.uid)
                );
                const querySnapshot = await getDocs(q);

                const petList: Pet[] = querySnapshot.docs.map((doc) => ({
                    ...(doc.data() as Pet), // Conversão explícita para o tipo Pet
                    petId: doc.id
                }));
                setPets(petList);
                console.log('Pets recuperados:', petList);
            } else {
                Alert.alert("Erro", "Usuário não autenticado.");
            }
        } catch (error) {
            console.error('Erro ao buscar pets:', error);
            Alert.alert("Erro", "Erro ao buscar pets.");
        } finally {
            setLoading(false);
        }
    };

    // UseFocusEffect para buscar pets sempre que a tela ganhar foco
    useFocusEffect(
        useCallback(() => {
            fetchPets();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/Logo.png')} style={styles.logoPet} />
                <Text style={styles.titlePet}>PETS</Text>
                <Image source={require('../../../assets/patas.png')} style={styles.pawIcon} />
            </View>

            <View style={styles.separator} />

            <View style={styles.petContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    pets.map((pet, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.petCard}
                            onPress={() => navigation.navigate('AppMenu', {
                                pet: {
                                    nome: pet.nome,
                                    imagemUrl: pet.imagemUrl,
                                    petId: pet.petId, // Passando o petId corretamente
                                },
                            })}
                        >
                            {pet.imagemUrl ? (
                                <Image source={{ uri: pet.imagemUrl }} style={styles.petImage} />
                            ) : (
                                <Text style={styles.petName}>Imagem não disponível</Text>
                            )}
                            <Text style={styles.petName}>{pet.nome}</Text>
                        </TouchableOpacity>
                    ))
                )}
                <TouchableOpacity
                    style={styles.addPetButton}
                    onPress={() => navigation.navigate('TelaCadastroPet2')}
                >
                    <Text style={styles.addPetIcon}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
