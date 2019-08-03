import React from "react";

import { Container, Search, User } from "./styles";

const Header = () => (
  <Container>
    <Search>
      <input placeholder="Search" />
    </Search>

    <User>
      <img
        src="https://scontent.fgyn1-1.fna.fbcdn.net/v/t1.0-1/p240x240/31841629_1534536563323875_1900707119368241152_n.jpg?_nc_cat=104&_nc_oc=AQkB5x2DLiIbIIiWHL2wfoU5T2i0-hOc0QCmnKZysxw38eaCERIxgpQ_l4r6-yuVAnE&_nc_pt=1&_nc_ht=scontent.fgyn1-1.fna&oh=2fd03da03d2e75234ce53af8d7e28c44&oe=5DE3F8E0"
        alt="Avatar"
      />
      Matheus Menezes
    </User>
  </Container>
);

export default Header;
