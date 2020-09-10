import React from "react";

import { Container, Search, User } from "./styles";

const Header = () => (
  <Container>
    <Search>
      <input placeholder="Search" />
    </Search>

    <User>
      <img
        src="https://media-exp1.licdn.com/dms/image/C4D03AQFT_RrYP1_BFg/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=0Fcoa5IE7jaTHhIva9RazjPLH0HAdSKYdVfeRaJ_49I"
        alt="Avatar"
      />
      Matheus Menezes
    </User>
  </Container>
);

export default Header;
