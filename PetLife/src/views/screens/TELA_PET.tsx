import React from "react";
import { View, Text, Alert, Image } from "react-native";
import { styles } from "../../../styles";
import MenuGlobal from "../../global/menuGlobal";

export default function telaPet() {


    return (
        <View style={styles.container}>
            <View style={styles.containerHorizontal}>
                <Image
                style={styles.containerLoginAndCadastro}
                    source={require('../../../assets/Logo.png')}
                />
            </View>
        </View>
    );
}
