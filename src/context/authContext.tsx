import React from "react";

import * as authClient from "../services/authClient";
import * as tokenService from "../services/tokenService";
import * as eventEmitter from '../services/eventEmitter';

interface Props {
  children: React.ReactNode;
}

interface Context {
  isAuthorized: boolean;
  login: (params: any) => Promise<void>;
  register: (params: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<Context>({
  isAuthorized: false,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
});

function AuthProvider({ children }: Props) {
  const [isAuthorized, setIsAuthorized] = React.useState(
    !!tokenService.getToken()
  );

  React.useEffect(() => eventEmitter.subscribe('unauthorized', logout), []);

  async function login(params: any) {
    const { user } = await authClient.login(params);
    tokenService.setToken(user.token);
    setIsAuthorized(true);
  }

  async function register(params: any) {
    const { user } = await authClient.register(params);
    tokenService.setToken(user.token);
    setIsAuthorized(true);
  }

  function logout() {
    tokenService.removeToken();
    setIsAuthorized(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}

export { AuthProvider, useAuth };
