import { TextStyle, ViewStyle } from "react-native";

export const themas = {
    colors:{
        background: '#faddc0',
        buttons: '#ff8934',
        consulta: '#c69a5a',
        textCadPet: '#a07323',
        petElements: '#2e2929',
        notification: '#a06948',
        diary: '#cead8e',
        black: '#000000',
        white: '#FFFFFF'
    },
    buttonStyles:{
        roundedButton: {
            backgroundColor: '#ff8934',
            padding: 15,
            borderRadius: 30, // Força a borda arredondada
            alignItems: 'center',
        } as ViewStyle,
        buttonText: {
            color: '#FFFFFF', // Cor do texto
            fontSize: 25,
            fontWeight: 'bold',
            paddingHorizontal: 100
          } as TextStyle,
    },
    fonts:{
        fontLetras: 'Glacial Indifference',
    },
}