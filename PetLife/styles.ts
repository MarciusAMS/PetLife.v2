import { Dimensions, StyleSheet, StatusBar } from 'react-native';
import { themas } from './src/global/themes';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themas.colors.background, // Cor de fundo padrão  
  },
  containerCheckBox: {
    //flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoginAndCadastro: {
    flexDirection: 'row', // Alinha os elementos horizontalmente
    justifyContent: 'center', // Centraliza o conteúdo no eixo principal (horizontal)
    alignItems: 'center', // Centraliza no eixo cruzado (vertical)
    paddingHorizontal: 10, // Adiciona um pouco de padding para evitar que os elementos fiquem muito nas bordas
    bottom: 25,
  },
  //------------------------------------------
//------------------------------------------
containerInicioHorizontal: {
  position: 'absolute', 
  top: 0,
  left: 0,
  right: 0,
  flexDirection: 'row', 
  justifyContent: 'space-between', // Espaço entre a parte esquerda (imagem + nome) e o botão
  alignItems: 'center', 
  paddingHorizontal: 20,
  height: 80,
  paddingTop: StatusBar.currentHeight || 20, 
  zIndex: 1, 
},

conteudoEsquerda: {
  flexDirection: 'row', // Alinha imagem e nome horizontalmente
  alignItems: 'center', // Centraliza verticalmente
},

imagensTopo: {
  width: 75,
  height: 75,
  borderRadius: 25, 
  marginRight: 10, // Espaço entre a imagem e o nome do pet
},

nomeDoPet: {
  fontSize: 40,
  fontWeight: 'bold',
  color: '#000',
},

verPets: {
  width: 40,
  height: 40,
  borderRadius: 20, 
  justifyContent: 'center',
  alignItems: 'center',
},


//------------------------------
  containerHorizontal: {
    flexDirection: 'row',       // Coloca os itens em linha horizontal
    alignItems: 'center',       // Alinha verticalmente no centro
    justifyContent: 'center',   // Centraliza os itens horizontalmente
    marginBottom: -15,          // Espaçamento abaixo da logo e do texto
    marginHorizontal: 100,
    marginLeft: 90,
  },
  containerEsqSenhaGeral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: themas.colors.background, 
  },
  containerEsqueciSenha: {
    flexDirection: 'row', // Alinha os elementos horizontalmente
    justifyContent: 'center', // Centraliza o conteúdo no eixo principal (horizontal)
    alignItems: 'center', // Centraliza no eixo cruzado (vertical)
    paddingHorizontal: 10, // Adiciona um pouco de padding para evitar que os elementos fiquem muito nas bordas
    bottom: 10,
  },
  headerContainer: {
    position: 'absolute',
    top: -30,                // Fixa no topo da tela
    left: -15,               // Alinha à esquerda da tela
    right: 0,              // Alinha à direita da tela para ocupar a largura completa
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10, // Ajuste para mais ou menos espaço do topo
    paddingVertical: 3, // Adiciona padding vertical, se necessário
    padding: 10,
  },
  // containerCadastro: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginHorizontal: 100,
  //   backgroundColor: themas.colors.background,
  // },
  logo: {
    width: '60%',
    height: 500,
    aspectRatio: 1, // Mantém a proporção da imagem
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold', // Se precisar, pode adicionar estilo aqui
    fontFamily: themas.fonts.fontLetras,
    color: themas.colors.white,
    textAlign: 'center', // Centraliza o texto dentro do círculo
    marginTop: 20,
  },
  titlePet: {
    fontSize: 60,
    marginBottom: 30,
    fontWeight: 'bold', // Se precisar, pode adicionar estilo aqui
    fontFamily: themas.fonts.fontLetras2,
    color: themas.colors.black,
    textAlign: 'center', // Centraliza o texto dentro do círculo
    marginTop: 20,
    left: -30,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200, // Largura do círculo
    height: 100, // Altura do círculo
    borderRadius: 60, // Metade da largura e altura para fazer o círculo
    backgroundColor: themas.colors.buttons, // Cor de fundo do círculo (ajuste conforme necessário)
    borderColor: themas.colors.black, // Cor da borda do círculo (ajuste conforme necessário)
    borderWidth: 5, // Largura da borda
    marginBottom: 50,
    marginTop: -50,
  },
  titleContainerText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200, // Largura do círculo
    height: 100, // Altura do círculo
    borderRadius: 60, // Metade da largura e altura para fazer o círculo
    backgroundColor: themas.colors.buttons, // Cor de fundo do círculo (ajuste conforme necessário)
    borderColor: themas.colors.black, // Cor da borda do círculo (ajuste conforme necessário)
    borderWidth: 5, // Largura da borda
    marginBottom: 10,
    marginTop: 30,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  buttonColor: {
    color: themas.colors.buttons, // Exemplo de cor personalizada para o botão
  },
  orText: {
    alignSelf: 'center',
    fontSize: 16,
    marginVertical: 10,
    fontFamily: themas.fonts.fontLetras,
    fontWeight: 'bold',
  },
  orCheckBox: {
    alignSelf: 'center',
    fontSize: 16,
    marginVertical: 10,
    width: '20%',
    fontFamily: themas.fonts.fontLetras,
    fontWeight: 'bold',
  },
  Icon: {
    width: 50,
    height: 50,
    marginHorizontal: 30,
  },
  Bolinhas: {
    width: 60,
    height: 60,
    marginHorizontal: 30,
    bottom: 3,
  },
  iconImage: {
    width: 30, // Largura do ícone
    height: 30, // Altura do ícone
    resizeMode: 'contain', // Para garantir que a imagem não se distorça
    marginRight: 5,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    //height: 50,
    marginTop: 5,
    //aspectRatio: 1,
  },
  socialButton: {
    backgroundColor: '#4285F4',  // Exemplo para botão Google
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, // Ajustar o tamanho dos botões
    height: 50,
  },

  inputContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    bottom: 25,
  },
  inputContainerFoto: {
    marginVertical: 10,
    paddingHorizontal: 20,
    bottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 290,
    alignSelf: 'center',
    backgroundColor: themas.colors.white,
    //color: ,
  },
  imagemAdicionarFotoPet: {
    width: 150,                // Ajuste conforme necessário para o tamanho da imagem
    height: 200,               // Ajuste conforme necessário para o tamanho da imagem
    resizeMode: 'contain',
  },
  imagemCadastroLogin: {
    width: 250,                // Ajuste conforme necessário para o tamanho da imagem
    height: 200,               // Ajuste conforme necessário para o tamanho da imagem
    resizeMode: 'contain',     // Ajusta o tamanho mantendo a proporção
  },
  logoCadastro: {
    width: 100,  // Ajuste de largura do logo
    height: 100,  // Ajuste de altura do logo
    marginRight: 10,  // Espaço entre logo e texto
  },
  textoPetlife: {
    fontSize: 40,  // Tamanho do texto
    fontWeight: 'bold',  // Negrito para destacar
    color: themas.colors.black,  // Cor conforme o tema
    fontFamily: themas.fonts.fontLetras2,
  },
  linkContainer: {
    marginTop: 10, // Espaçamento em relação aos outros elementos
    marginBottom: 20,
    alignItems: 'center', // Centraliza o link
  },
  linkText: {
    color: 'red', // Cor do link
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Linha sublinhada para parecer um link
    fontSize: 16,
  },
});
