import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../../../styles";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    TelaVacinacao: undefined;
    TelaAdicionar: undefined;
};

type TelaEntrarProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'TelaVacinacao'>;
};

export default function TelaVacinacao({ navigation }: TelaEntrarProps) {



    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/vacina.png')} style={styles.logoVacina} />
                <Text style={styles.titleVacina}>Carteira de Vacinação</Text>
            </View>

            <View style={styles.separator} />

        <View style={styles.containerBottomVacina}>
            <TouchableOpacity
                    style={styles.addVacinaButton}
                    onPress={() => navigation.navigate('TelaAdicionar')}
                >
                    <Text style={styles.addVacinaIcon}>+</Text>
                </TouchableOpacity>
                <View style={styles.separatorBottom} />
                </View>
        </View>
    );
}