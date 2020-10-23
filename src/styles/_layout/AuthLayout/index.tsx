import React from "react";

import ErrorBox from "../../../components/ErrorBox";
import Player from "../../../components/Player";
import { Wrapper, Container, Content } from "../../components";

// import { Container } from './styles';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <ErrorBox />
          {children}
        </Content>
      </Container>
    </Wrapper>
  );
};

export default AuthLayout;
