import React from "react";
import { View, Text, Alert, Image, ScrollView } from "react-native";
import { styles } from "../../../styles";

export default function telaPet() {


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.containerHorizontal}>
                    <Image
                        source={require('../../../assets/Logo.png')}
                    />
                    <Text style={styles.orText}>PETS</Text>
                    <Image
                        source={require('../../../assets/imgPet.png')}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
