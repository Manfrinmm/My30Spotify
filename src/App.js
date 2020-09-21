import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./config/reactotron";
import ErrorBox from "./components/ErrorBox";
import Header from "./components/Header";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import Routes from "./routes";
import store from "./store";
import { Wrapper, Container, Content } from "./styles/components";
import GlobalStyle from "./styles/global";

const App = () => (
  <>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <Wrapper>
          <Container>
            <Sidebar />
            <Content>
              <ErrorBox />
              <Header />
              <Routes />
            </Content>
          </Container>
          <Player />
        </Wrapper>
      </BrowserRouter>
    </Provider>
  </>
);

export default App;
