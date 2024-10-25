import { Dimensions, StyleSheet } from 'react-native';
import { themas } from './src/global/themes';

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
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -420, // Ajuste para mais ou menos espaço do topo
    paddingVertical: 3, // Adiciona padding vertical, se necessário
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
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold', // Se precisar, pode adicionar estilo aqui
    fontFamily: themas.fonts.fontLetras,
    color: themas.colors.black,
    textAlign: 'center', // Centraliza o texto dentro do círculo
    marginTop: 20,
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
  // Tela Pet
  pawIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  petContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  petCard: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#D2A24C',
    marginBottom: 5,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#D2A24C',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addPetButton: {
    backgroundColor: '#D2A24C',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPetIcon: {
    fontSize: 50,
    color: '#FFF',
  },
  separator: {
    height: 3,             // Altura da linha
    backgroundColor: '#D2A24C',  // Cor da linha (você pode ajustar conforme o tema)
    marginVertical: 10,    // Espaçamento vertical para separar o título e os ícones
    width: '100%',          // Largura da linha para ficar centralizada
    alignSelf: 'center',   // Centraliza a linha no container
    top: -70,
  },
});
