import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

const SignInSuccess: React.FC = () => {
  const { hash } = useLocation();
  const { setToken } = useAuth();

  const getHashParams = useCallback((): string | null => {
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = hash.substring(1);

    const e = r.exec(q);

    if (!e) {
      return null;
    }
    const hashParams = e[2];

    return hashParams;
  }, [hash]);

  useEffect(() => {
    const token = getHashParams();

    if (token) {
      setToken(token);
    }
  }, [setToken, getHashParams]);

  return (
    <div>
      <h1>Você será redirecionada em breve...</h1>
    </div>
  );
};

export default SignInSuccess;
