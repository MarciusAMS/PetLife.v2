declare module "*.png";

// Criando para o reconhecimento das fontes globais
declare module 'react-native-global-font' {
    const GlobalFont: {
      applyGlobal(fontName: string): void;
    };
    export default GlobalFont;
  }
  