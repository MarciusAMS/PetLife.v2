import { useRef, useState } from "react";

// Estados para gerenciar os erros de validação
export const useFormValidation = () => {
  const [inputErrors, setInputErrors] = useState({
    nome: false,
    email: false,
    telefone: false,
    senha: false,
    confirmarSenha: false,
  });

  // Referências para os campos
  const nomeInputRef = useRef<any>();
  const emailInputRef = useRef<any>();
  const telefoneInputRef = useRef<any>();
  const senhaInputRef = useRef<any>();
  const confirmarSenhaInputRef = useRef<any>();

  // Função de validação
  const validarCampos = (
    nome: string,
    email: string,
    telefone: string,
    senha: string,
    confirmarSenha: string
  ) => {
    const errors = {
      nome: false,
      email: false,
      telefone: false,
      senha: false,
      confirmarSenha: false,
    };

    let hasError = false;

    if (!nome.trim()) {
      errors.nome = true;
      nomeInputRef.current.focus();
      hasError = true;
    }

    const emailRegex = /\S+@\S+\.\S+/; // Expressão regular simples para email
    if (!emailRegex.test(email)) {
      errors.email = true;
      if (!hasError) {
        emailInputRef.current.focus();
        hasError = true;
      }
    }

    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/; // Expressão regular para telefone
    if (!phoneRegex.test(telefone)) {
      errors.telefone = true;
      if (!hasError) {
        telefoneInputRef.current.focus();
        hasError = true;
      }
    }

    if (!senha) {
      errors.senha = true;
      if (!hasError) {
        senhaInputRef.current.focus();
        hasError = true;
      }
    } else if (senha !== confirmarSenha) {
      errors.confirmarSenha = true;
      if (!hasError) {
        confirmarSenhaInputRef.current.focus();
        hasError = true;
      }
    }

    setInputErrors(errors);
    return !hasError; // Retorna true se não houver erro
  };

  return {
    inputErrors,
    nomeInputRef,
    emailInputRef,
    telefoneInputRef,
    senhaInputRef,
    confirmarSenhaInputRef,
    validarCampos,
  };
};

  