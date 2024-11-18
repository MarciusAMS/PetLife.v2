import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
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
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/Logo.png')} style={styles.logoPet} />
                <Text style={styles.titlePet}>DIÁRIO</Text>
                <Image source={require('../../../assets/patas.png')} style={styles.pawIcon} />
            </View>

            <View style={styles.separator} />

        </View>
            );

}