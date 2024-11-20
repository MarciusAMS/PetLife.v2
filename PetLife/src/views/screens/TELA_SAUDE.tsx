import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Dimensions, ImageBackground } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomCarousel from '../../global/carousel';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
    TelaSaude: { pet: { petId: string } } | undefined;
    TelaInicio: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
    TelaPet: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
    AppMenu: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
};

interface Pet {
    nome: string;
    imagemUrl: string;
    userUID: string;
    petId: string;
}

type TelaSaudeProps = {
    pet?: Pet;
};

export default function TelaSaude({ pet }: TelaSaudeProps) {
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = auth.currentUser;
    const userId = user?.uid;
    const { width } = Dimensions.get('window');

    // const route = useRoute<RouteProp<RootStackParamList, 'AppMenu'>>();
    // const pet = route.params?.pet;

    useEffect(() => {
        if (!pet) {
            console.log('Nenhum pet foi selecionado ainda. Redirecionando para TelaPet.');
            navigator.navigate('TelaPet');
        } else {
            console.log('Pet já foi selecionado. Esse é o ', pet.nome);
        }
    }, [pet, navigator]);

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/Logo.png')} style={styles.logoPetsaude} />
                <Text style={styles.titlePetSaude}>Saúde</Text>
                <Image source={require('../../../assets/patas.png')} style={styles.pawIconSaude} />
            </View>

            {/* Separador */}
            <View style={styles.separator} />

            {/* Botões centralizados */}
            <View style={styles.buttonContainerSaude}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigator.navigate('TelaPet')} // Navegar para a tela de Consultas
                >
                    <Image source={require('../../../assets/consulta.png')} style={styles.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigator.navigate('TelaPet')} // Navegar para a tela de Remédios
                >
                    <Image source={require('../../../assets/remedios.png')} style={styles.buttonImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
