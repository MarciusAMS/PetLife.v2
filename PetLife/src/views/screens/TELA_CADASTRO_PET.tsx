import React from 'react';
import { styles } from '../../../styles';
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';


export default function TelaCadastroPet(){
return(
    <ScrollView contentContainerStyle={styles.container}> 
    
   <View style={styles.titleContainerText}>
        <Text style={styles.title}>Cadastro de PET</Text>
      </View>

</ScrollView>
)
}