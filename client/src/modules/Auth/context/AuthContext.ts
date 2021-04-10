import { createContext, MutableRefObject } from "react";
import { UserBase } from "../../../common/types";

type AuthContextType = {
  jwt: MutableRefObject<string | undefined>;
  hasUser: boolean;
  register: (userToRegister: UserBase) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  waitingForToken: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
