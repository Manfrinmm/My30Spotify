import React from "react";

import ErrorBox from "../../../components/ErrorBox";
import Header from "../../../components/Header";
import Player from "../../../components/Player";
import Sidebar from "../../../components/Sidebar";
import { Wrapper, Container, Content } from "../../components";

// import { Container } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <Sidebar />
        <Content>
          <ErrorBox />
          <Header />
          {children}
        </Content>
      </Container>
      <Player />
    </Wrapper>
  );
};

export default DefaultLayout;
