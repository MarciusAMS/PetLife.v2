import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { signUp } from '../controllers/TELA_CADASTRO';

export default function TelaCadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [additionalData, setAdditionalData] = useState({ nome: '', telefone: '' });

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, senha, additionalData);
      Alert.alert('Cadastro realizado com sucesso!', `Bem-vindo, ${user.email}`);
    } catch (error) {
        if (error instanceof Error) {
      Alert.alert('Erro', error.message);
    }
   }
};

  return (
    <ScrollView>
    <View>

      <Text>Nome</Text>
      <TextInput value={additionalData.nome} onChangeText={(text) => setAdditionalData({ ...additionalData, nome: text})} placeholder="Nome Completo:" />

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email:" />

      <Text>Telefone</Text>
      <TextInput value={additionalData.telefone} onChangeText={(text) => setAdditionalData({ ...additionalData, telefone: text })} placeholder="Digite seu telefone" />
      
      <Text>Senha</Text>
      <TextInput value={senha} onChangeText={setSenha} placeholder="Crie uma Senha:" secureTextEntry />

      <Text>Confirme a Senha</Text>
      <TextInput value={confirmarSenha} onChangeText={setConfirmarSenha} placeholder="Confirme a Senha:" secureTextEntry />
      <Button title="Cadastrar" onPress={handleSignUp} />
    </View>
    </ScrollView>
  );
}
