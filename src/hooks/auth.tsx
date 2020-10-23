import React, { useContext, createContext, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { Creators as ErrorActions } from "../store/ducks/error";

interface IUser {
  id: string;
  name: string;
  avatar_url: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface IAuthContextData {
  user: IUser;
  setToken(token: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const [authData, setAuthData] = useState<IAuthState>(() => {
    const token = localStorage.getItem("@my30spotify:token");
    const user = localStorage.getItem("@my30spotify:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      api.get("/me").catch(() => {
        localStorage.removeItem("@my30spotify:token");
        localStorage.removeItem("@my30spotify:user");

        dispatch(ErrorActions.setError("Faça login novamente"));

        setAuthData({} as IAuthState);
      });

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const setToken = useCallback(
    async (token: string) => {
      try {
        api.defaults.headers.authorization = `Bearer ${token}`;

        const { data } = await api.get("/me");

        const user = {
          id: data.id,
          name: data.display_name,
          avatar_url: data.images[0].url,
        };

        localStorage.setItem("@my30spotify:token", token);
        localStorage.setItem("@my30spotify:user", JSON.stringify(user));

        setAuthData({
          user,
          token,
        });
      } catch (error) {
        dispatch(
          ErrorActions.setError("Falha ao salvar o token de autenticação"),
        );
      }
    },
    [dispatch],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@my30spotify:token");
    localStorage.removeItem("@my30spotify:user");

    setAuthData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: authData.user, setToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
