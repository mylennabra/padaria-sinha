import { createContext, useContext } from "react";
import { User } from "../entities/User.type";

export type AuthSignInData = {
  user: User;
  authToken: string;
  storeTokenLocally?: boolean;
};

export type AuthContextType = {
  user: User;
  authToken: string;
  isSigned: boolean;
  isLoading: boolean;
  signIn: (data: AuthSignInData) => void;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);
