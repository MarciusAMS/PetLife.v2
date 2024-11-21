import { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Dimensions, ImageBackground, Alert } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
    TelaRemedio: { pet?: { petId: string } };
    TelaSaude: { pet: { petId: string } } | undefined;
    TelaPet: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
    AppMenu: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
};

interface Pet {
    nome: string;
    imagemUrl: string;
    userUID: string;
    petId: string;
}

type TelaRemedioProps = {
    pet?: Pet;
};

export default function TelaRemedio({ pet }: TelaRemedioProps) {
    const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = auth.currentUser;
    const userId = user?.uid;
    const { width } = Dimensions.get('window');

    useEffect(() => {
        Alert.alert('Parâmetros recebidos na TelaRemedio:', pet?.petId);
        if (!pet?.petId) {
            //Alert.alert('Nenhum pet foi selecionado ainda. Redirecionando para TelaPet.');
            //navigator.navigate('TelaPet');
        } else {
            console.log('PetId recebido: ', pet.petId);
        }
    }, [pet, navigator]);

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/remedios.png')} style={styles.logoPetsaude} />
                <Text style={styles.titlePetSaude}>Remédios</Text>
                <Image source={require('../../../assets/patas.png')} style={styles.pawIconSaude} />
            </View>

            {/* Separador */}
            <View style={styles.separator} />

            {/* Botões centralizados */}
            </View>
    );
}
