import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ICliente from "../models/ICliente";

interface AuthContextData {
  signed: boolean;
  user: ICliente | undefined;
  signIn(cliente: ICliente): Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: any = ({ children }: any) => {
  const [user, setUser] = useState<ICliente | undefined>(undefined);
  const [logando, setlogando] = useState(false);
  const [signedUser, setSignedUser] = useState(false);

  useEffect(() => {
    let user: ICliente = {
      nome: "Mauro Gomes",
      email: "mauroGomes@gmail.com",
      documento: "36614295071",
      origemAssociado: "app",
      autoCadastro: true,
      saldo: 10000,
      premiacao: 0,
      dataNascimento: "1997-08-11",
      telefone: "99999999999",
      raspadinhas: [],
      extrato: [],
      senha: "",
      confirmacaoSenha: "",
      tipoChavePix: "",
      chavePix: "",
    };
    signIn(user);
  }, []);

  async function signIn(cliente: ICliente) {
    setUser(cliente);
    setSignedUser(true);
    await AsyncStorage.setItem("@Cliente:user", JSON.stringify(cliente));

    return Promise.resolve();
  }

  return (
    <AuthContext.Provider
      value={{
        signed: signedUser,
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
