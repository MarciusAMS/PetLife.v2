import React from "react";
import { View, Text, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../../../styles";
import { Icon } from "react-native-elements";

export default function telaPet() {


    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Header */}
                <View>
                    <Image source={require('../../../assets/Logo.png')} style={styles.logo} />
                    <Text>PETS</Text>
                    <Icon name="paw" type="font-awesome" color="#f2a65a" size={24} />
                </View>

                {/* Lista de Pets */}
                {/* Botão de adicionar */}
                <TouchableOpacity>
                    <Icon name="plus" type="font-awesome" color="#fff" size={24} />
                </TouchableOpacity>

                {/* Pet Cards */}
                <View>
                    <Image source={require('../../../assets/lion.png')} />
                    <Text>Lion</Text>
                </View>

                <View>
                    <Image source={require('../../../assets/clara.png')} />
                    <Text>Clara</Text>
                </View>

                <View >
                    <Image source={require('../../../assets/rocky.png')} />
                    <Text >Rocky</Text>
                </View>
            </View>
        </ScrollView>
    );
}
