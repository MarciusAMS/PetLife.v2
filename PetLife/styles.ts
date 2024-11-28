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
    top: 28,
    left: 6,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaço entre a parte esquerda (imagem + nome) e o botão
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: 80,
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
    fontSize: 27,
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
    zIndex: 1,
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
  // Tela Pet
  logoPet: {
    width: '50%',
    height: 500,
    aspectRatio: 1, // Mantém a proporção da imagem
    marginBottom: 10,
    left: -10,
  },
  pawIcon: {
    width: 45,
    height: 45,
    marginLeft: 1,
  },
  petContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    top: -60,
  },
  petCard: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    marginTop: 56,
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
    marginTop: 70,
  },
  addPetIcon: {
    fontSize: 50,
    color: '#FFF',
  },
  separator: {
    position: 'absolute',
    height: 3,               // Altura da linha
    backgroundColor: '#D2A24C', // Cor da linha
    width: '95%',             // Ajuste a largura para centralizar visualmente
    alignSelf: 'center',      // Centraliza a linha horizontalmente
    top: 150,            // Espaçamento para ficar logo abaixo do título
    marginBottom: 20,         // Espaçamento inferior para o conteúdo a seguir
    zIndex: 1,
  },
  separatorBottom: {
    height: 3,               // Altura da linha
    backgroundColor: '#D2A24C', // Cor da linha
    width: '100%',            // Largura para centralizar visualmente
    alignSelf: 'center',     // Centraliza dentro do container
    position: 'absolute',
  },


  // Tela Vacinação
  logoVacina: {
    width: 100,                // Define a largura exata para reduzir o tamanho
    height: 100,               // Define a altura correspondente
    resizeMode: 'contain',    // Evita distorções e mantém a proporção
    alignSelf: 'center',      // Centraliza horizontalmente
    marginTop: 50,
    left: 10,
  },
  titleVacina: {
    fontSize: 30,
    marginBottom: -67,
    fontWeight: 'bold', // Se precisar, pode adicionar estilo aqui
    fontFamily: themas.fonts.fontLetras2,
    color: themas.colors.black,
    textAlign: 'center', // Centraliza o texto dentro do círculo
    left: 8,
  },
  addVacinaButton: {
    position: 'absolute',
    bottom: 20,           // Distância do fundo da tela
    alignSelf: 'center',  // Centraliza horizontalmente
    backgroundColor: '#D2A24C',  // Cor de fundo do botão
    width: 60,
    height: 60,
    borderRadius: 30,     // Deixa o botão circular
    justifyContent: 'center',
    alignItems: 'center',
  },
  addVacinaIcon: {
    fontSize: 50,
    color: '#FFF',
    textAlign: 'center',
    bottom: -10,
    //left: 16,
    position: 'absolute',
    marginBottom: 10,       // Espaçamento entre o ícone e o separador
  },
  containerBottomVacina: {
    position: 'absolute',
    bottom: 20,             // Define a posição do container na parte inferior da tela
    width: '100%',          // Ocupa a largura total da tela
    alignItems: 'center',   // Centraliza o conteúdo horizontalmente
    paddingBottom: 10,      // Espaço extra para evitar que fique muito próximo do final da tela
  },
  registroContainer: {
    backgroundColor: '#FAE8C8', // Fundo bege claro
    borderRadius: 10, // Bordas arredondadas
    padding: 10, // Espaçamento interno
    marginBottom: 10, // Espaçamento entre registros
    borderWidth: 2, // Borda fina
    borderColor: '#D2A24C', // Cor da borda
    shadowColor: '#000', // Sombras para destaque
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombras no Android
  },
  registroText: {
    fontSize: 16, // Tamanho legível
    color: '#333', // Cor do texto
    fontFamily: 'Glacial Indifference', // Fonte do projeto
    marginBottom: 5, // Espaçamento inferior
  },
  registroData: {
    fontSize: 14, // Tamanho menor para a data
    color: '#666', // Cor mais clara para a data
    fontFamily: 'Chau Philomene', // Outra fonte do projeto
  },
  addButton: {
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFE5CC',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  headerContaineAddVacina: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D2A24C',
    textAlign: 'center',
    marginLeft: 85,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'red',
    marginLeft: 292,
  },
  fileSelector: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#D2A24C',
  },
  fileInput: {
    width: '100%',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    textAlign: 'center',
  },
  filePlaceholder: {
    color: '#7A7A7A',
    fontSize: 12,
  },
  addFileButton: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  addFileButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20, // margem inferior para o botão flutuante
    left: 10,
  },

  // Tela Diario

  headerContainerDiario: {
    flexDirection: 'row', // Alinha os itens na horizontal
    alignItems: 'center', // Alinha os itens no centro verticalmente
    justifyContent: 'space-between', // Espaço entre os elementos
    padding: 10, // Espaçamento interno
  },

  logoDiario: {
    width: '40%',
    height: 450,
    aspectRatio: 1, // Mantém a proporção da imagem
    marginBottom: 10,
    left: -10,
    marginTop: 30,
  },
  titleDiario: {
    fontSize: 24, // Tamanho adequado para o título
    fontWeight: 'bold', // Deixe o texto em negrito para maior visibilidade
    color: '#000', // Certifique-se de que a cor não se mistura com o fundo
    textAlign: 'center', // Centraliza o texto
    marginHorizontal: 10, // Adiciona espaçamento lateral, se necessário
  },
  pawDiarioIcon: {
    width: 45,
    height: 45,
    marginLeft: 10,
  },
  notesContainer: {
    paddingHorizontal: 10,
    paddingTop: '40%',
  },
  note: {
    flexBasis: '48%', // Cada item ocupa ~48% do espaço horizontal (ajuste para o layout)
    margin: '1%', // Espaço entre os itens
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  noteImage: {
    width: '100%',
    height: '50%',
    aspectRatio: 1, // Mantém proporção 1:1
    resizeMode: 'contain',
  },
  noteText: {
    fontSize: 16,
    color: '#4a3f35',
    marginTop: 5,
  },
  addDiarioButton: {
    position: 'absolute',
    bottom: 20,
    right: 20, // Ajuste para posicioná-lo no canto inferior
    backgroundColor: '#f08a5d',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20, // Para destacar o botão
    zIndex: 40, // Garante que o botão esteja acima do FlatList
  },
  addDiarioButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: themas.colors.background,
  },
  // Tela Saude
  headerContainerSaude: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoPetsaude: {
    width: '40%',
    height: 450,
    aspectRatio: 1, // Mantém a proporção da imagem
    marginBottom: 10,
    left: -10,
    marginTop: 30,
  },
  pawIconSaude: {
    width: 60,
    height: 60,
    //marginLeft: 1,
    left: -10,
  },
  titlePetSaude: {
    fontSize: 60,
    marginBottom: 30,
    fontWeight: 'bold', // Se precisar, pode adicionar estilo aqui
    fontFamily: themas.fonts.fontLetras2,
    color: themas.colors.black,
    textAlign: 'center', // Centraliza o texto dentro do círculo
    marginTop: 30,
    left: -30,
    marginHorizontal: 10,
  },
  button: {
    width: 200,
    height: 200,
    backgroundColor: '#F5E0C3',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30, // Espaço específico entre os botões
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: themas.colors.consulta,
    borderRadius: 20,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D2904C',
  },
  buttonContainerSaude: {
    marginTop: 500,
    width: '80%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between', // Espaçamento uniforme entre os botões
    marginVertical: 50, // Ajusta o espaço geral no container
    bottom: 80,
  },

  // Tela Remédio
  closeButtonTextRemedio: {
    fontSize: 20,
    marginLeft: 260,
    width: '20%',
  },
  inputModalRemedio: {
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    width: 290,
    alignSelf: 'center',
    backgroundColor: themas.colors.white,
    fontSize: 15,
    top: 5,
  },
  fileSelectorRemedio: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    //padding: 5,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#D2A24C',
  },
  modalContentRemedio: {
    backgroundColor: '#FFE5CC',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitleRemedio: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: themas.colors.white,
    textAlign: 'center',
    marginLeft: 85,
  },
  logoPetRemedio: {
    width: '20%', // Mantém a largura proporcional
    height: undefined, // Permite que a altura seja ajustada pela proporção
    aspectRatio: 1, // Mantém a proporção da imagem
    marginBottom: 10, // Espaçamento inferior
    marginLeft: -10, // Remove deslocamento lateral
    marginTop: 60, // Remove o deslocamento superior
    alignSelf: 'flex-start', // Alinha ao topo e à esquerda do container
  },
  titlePetRemedio: {
    fontSize: 50, // Tamanho do texto
    marginBottom: 10, // Espaçamento inferior reduzido
    fontWeight: 'bold', // Deixa o texto em negrito
    fontFamily: themas.fonts.fontLetras2, // Fonte personalizada
    color: themas.colors.black, // Cor do texto
    textAlign: 'left', // Alinha o texto à esquerda
    marginTop: 65, // Remove o deslocamento superior
    marginLeft: 10, // Espaçamento lateral esquerdo para ajustar a posição
  },
  pawIconRemedio: {
    width: 60,
    height: 60,
    top: 30,
    marginLeft: 10,
  },
  headerContainerRemedio: {
    position: 'absolute',
    top: -10,                // Fixa no topo da tela
    left: 5,               // Alinha à esquerda da tela
    right: 0,              // Alinha à direita da tela para ocupar a largura completa
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -10, // Ajuste para mais ou menos espaço do topo
    paddingVertical: 3, // Adiciona padding vertical, se necessário
    padding: 16,
    marginBottom: 16,
  },
  alarmeContainer: {
    //marginTop: 100, // Adiciona espaço acima de cada registro
    top: 150,
    width: '90%',
    backgroundColor: themas.colors.consulta, // Exemplo de cor de fundo
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    left: 15,
  },
  alarmeHorario: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 15,
    marginBottom: 3,
  },
  alarmeNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  alarmeFrequencia: {
    fontSize: 14,
    color: '#fff',
  },
  iconeEditar: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
  },
  botaoAdicionar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F96C0D',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
    width: '100%',
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    width: '80%',
  },
  botaoAdicionarIcone: {
    color: '#fff',
    fontSize: 8, // Tamanho reduzido
    fontWeight: 'bold',
    marginLeft: 0, // Remova margens desnecessárias
    alignSelf: 'center', // Alinha o ícone dentro do botão
  },
  botaoContainer: {
    flexDirection: 'row', // Alinha ícone e texto lado a lado
    justifyContent: 'center', // Centraliza conteúdo horizontalmente
    alignItems: 'center', // Centraliza conteúdo verticalmente
    padding: 0, // Remove espaços extras
    marginBottom: 120,
    marginLeft: 10,
    marginRight: 10,
    top: 100,
  },
  modalOverlayRemedio: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconeFechar: {
    width: 24,
    height: 24,
  },
  inputRemedio: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  botaoCriar: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
  },
  textoCriar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoAddRemedio: {
    width: '20%', // Largura do ícone
    height: 50, // Altura do ícone
    resizeMode: 'center', // Para garantir que a imagem não se distorça
    marginLeft: 0, // Remove deslocamento lateral
    marginTop: 5, // Remove o deslocamento superior
  },
  flatContainer: {

  },
  textoVazio: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa', // Cor cinza clara
    marginTop: 300, // Espaço superior
    fontStyle: 'italic', // Faz o texto parecer uma mensagem de placeholder
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    backgroundColor: "#f00",
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#0b0",
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  itemContainer: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemHorario: {
    fontSize: 14,
    color: '#555',
  },
  botao: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
  },
  buttonTextRemedio: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },

 // Tela de consultas
 todayButton: {
  borderWidth: 2,
  borderColor: '#FF914D',
},
todayText: {
  color: '#FF914D',
  fontWeight: 'bold',
},
logoPetConsultas: {
  width: '40%',
  height: 450,
  aspectRatio: 1, // Mantém a proporção da imagem
  marginBottom: 10,
  left: -10,
  marginTop: 10,
},
pawIconConsultas: {
  width: 60,
  height: 60,
  marginLeft: -35,
},
titlePetConsultas: {
  fontSize: 40,
  marginBottom: 30,
  fontWeight: 'bold', // Se precisar, pode adicionar estilo aqui
  fontFamily: themas.fonts.fontLetras2,
  color: themas.colors.black,
  textAlign: 'center', // Centraliza o texto dentro do círculo
  marginTop: 30,
  left: -30,
  marginHorizontal: 10,
},
calendarContainer: {
  backgroundColor: '#FCD2AF',
  borderRadius: 10,
  padding: 20,
  marginBottom: 20,
},
monthText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  marginBottom: 10,
},
weekHeader: {
  flexDirection: 'row',
  justifyContent: 'space-around',
},
weekDayText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#555',
},
daysContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
},
dayButton: {
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 5,
  borderRadius: 20,
  backgroundColor: '#FFF',
},
selectedDayButton: {
  backgroundColor: '#FF914D',
},
dayText: {
  fontSize: 16,
  color: '#333',
},
selectedDayText: {
  color: '#FFF',
  fontWeight: 'bold',
},
notificationsContainer: {
  alignItems: 'center',
  marginTop: 20,
},
notificationsText: {
  fontSize: 16,
  color: '#FF914D',
  marginBottom: 10,
},
selectedDaysText: {
  fontSize: 16,
  color: '#333',
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContentConsultas: {
backgroundColor: 'white',
padding: 20,
borderRadius: 10,
width: '80%',
},
modalTitleConsultas: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 10,
},
inputConsultas: {
borderWidth: 1,
borderColor: '#ccc',
padding: 10,
borderRadius: 5,
marginVertical: 10,
},
modalButtons: {
flexDirection: 'row',
justifyContent: 'space-between',
marginTop: 10,
},
confirmButton: {
backgroundColor: '#007bff',
padding: 10,
borderRadius: 5,
marginTop: 20,
},
confirmButtonText: {
color: 'white',
textAlign: 'center',
},

  // --------------------------------------------------------------------------------- IMPORTANTE
  separatorTelaFora: {
    position: 'absolute',
    height: 3,               // Altura da linha
    backgroundColor: '#D2A24C', // Cor da linha
    width: '95%',             // Ajuste a largura para centralizar visualmente
    alignSelf: 'center',      // Centraliza a linha horizontalmente
    top: 100,            // Espaçamento para ficar logo abaixo do título
    marginBottom: 16,         // Espaçamento inferior para o conteúdo a seguir
    marginVertical: 16,
    zIndex: 1,
  },
  // ---------------------------------------------------------------------------------
});
