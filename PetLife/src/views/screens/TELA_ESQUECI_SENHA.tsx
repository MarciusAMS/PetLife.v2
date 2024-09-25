import React, { useRef, useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { themas } from "../../global/themes";
import { styles } from "../../../styles";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function telaEsqueciSenha() {
    const [email, setEmail] = useState('');
    const [inputError, setInputError] = useState({
        email: false,
    });

    const validarCampo = () => {
        let isValid = true;
        const error = {
            email: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        };

        setInputError(error);

        if (error.email && emailInputRef.current) {
            emailInputRef.current.focus();
            isValid = false;
        }

        return isValid;
    };

    const handleResetPassword = () => {
        console.log('Entrou na função!!!');

        if (validarCampo()) {
            console.log('Entrou aqui no IF!');
            const auth = getAuth(); // Obtém a instância do Firebase Auth
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    console.log('Quase no Alert!!');
                    Alert.alert(
                        "E-mail enviado!",
                        "Verifique sua caixa de entrada para redefinir a senha."
                    );
                })
                .catch((error) => {
                    console.log("Aqui eu não tô!!");
                    // Tratar possíveis erros
                    console.error(error);
                    Alert.alert(
                        "Erro",
                        "Não foi possível enviar o e-mail de redefinição. Verifique o endereço de e-mail."
                    );
                });
        }
    };

    const emailInputRef = useRef<TextInput>(null);

    // const handleEmailChange = (text: string) => {
    //     setEmail(text);
    //     if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    //         setInputError({ ...inputError, email: false });
    //     }
    // };

    return (
        <ScrollView>
            <View style={styles.containerEsqSenhaGeral}>

                <View style={styles.container}>
                    <Text style={styles.textoPetlife}>Esqueceu a Senha?</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.orText}>
                        Para redefinir sua senha insira seu E-mail de recuperação abaixo.
                    </Text>
                </View>

                <View style={styles.orText}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={[
                            styles.input,
                            inputError.email && { borderColor: themas.colors.errorColor }
                        ]}
                        ref={emailInputRef}
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {inputError.email && <Text style={themas.textStyles.errorText}>Email inválido ou vazio.</Text>}
                </View>

                <View style={styles.containerEsqueciSenha}>
                    <View style={themas.buttonStyles.roundedButton}>
                        <TouchableOpacity onPress={handleResetPassword}>
                            <Text style={themas.buttonStyles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );

} 