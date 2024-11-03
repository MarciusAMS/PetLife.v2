import { View, Text, Image } from "react-native";
import { styles } from "../../../styles";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    TelaVacinacao: undefined;
};

type TelaEntrarProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'TelaVacinacao'>;
};

export default function TelaVacinacao() {



    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/Logo.png')} style={styles.logoPet} />
                <Text style={styles.titlePet}>PETS</Text>
                <Image source={require('../../../assets/patas.png')} style={styles.pawIcon} />
            </View>
        </View>
    );
}