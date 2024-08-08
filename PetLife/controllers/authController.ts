import authService from '../services/authService';

export const login = async (email: string, password: string): Promise<void> => {
  try {
    await authService.signIn(email, password);
    // Redirecione o usuário para a próxima tela após o login bem-sucedido
  } catch (error) {
    // Trate erros de login aqui
    throw new Error('Erro ao fazer login');
  }
};