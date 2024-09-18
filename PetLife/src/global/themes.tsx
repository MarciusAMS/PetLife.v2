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
        white: '#FFFFFF',
        errorColor: '#ff0000', // Cor de erro
        placeholderColor: '#a9a9a9', // Cor do placeholder
    },
    fonts:{
        fontLetras: 'Glacial Indifference',
        fontLetras2: 'Chau Philomene',
    },
    textStyles: {
        errorText: {
          color: '#ff0000',
          fontSize: 12,
          marginTop: 5,
        },
      },
    buttonStyles:{
        roundedButton: {
            backgroundColor: '#ff8934',
            padding: 10,
            borderRadius: 30, // Força a borda arredondada
            alignItems: 'center',
            flexDirection: 'row',
        } as ViewStyle,
        buttonText: {
            color: '#FFFFFF', // Cor do texto
            fontSize: 35,
            fontWeight: 'bold',
            paddingHorizontal: 30,
          } as TextStyle,
    },
}