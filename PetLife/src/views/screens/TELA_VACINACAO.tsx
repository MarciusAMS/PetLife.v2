import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../../../styles";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RegistroVacina } from "../../models/Vacina";
export type RootStackParamList = {
    TelaVacinacao: undefined;
    TelaAdicionar: undefined;
};

type TelaEntrarProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'TelaVacinacao'>;
};

export default function TelaVacinacao({ navigation }: TelaEntrarProps) {
    const [registros, setRegistros] = useState<Registros[]>([]);



    return (
        <View style={styles.container}>
            {/* Cabeçalho e separador superior */}
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/vacina.png')} style={styles.logoVacina} />
                <Text style={styles.titleVacina}>Carteira de Vacinação</Text>
            </View>
            <View style={styles.separator} />

            {/* Container para exibir os registros horizontalmente */}
            <View style={styles.registroContainer}>
                {/* Aqui você pode mapear e exibir os registros */}
                {registros.map((registro, index) => (
                    <View key={index} style={styles.registroItem}>
                        <Text>{registro.nome}</Text>
                        {/* Outras informações do registro */}
                    </View>
                ))}
            </View>

            {/* Container inferior com o botão e o separador */}
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