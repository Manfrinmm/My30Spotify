import React, { useCallback } from "react";

import { useAuth } from "../../hooks/auth";
import { Container, Search, User } from "./styles";

const Header = () => {
  const { signOut, user } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Search>
        <input placeholder="Search" />
      </Search>

      <User>
        <img src={user.avatar_url} alt={user.name} />
        {user.name}
        <button type="button" onClick={handleSignOut}>
          Sair
        </button>
      </User>
    </Container>
  );
};

export default Header;
