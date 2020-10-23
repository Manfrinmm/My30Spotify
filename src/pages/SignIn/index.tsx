import React, { useCallback } from "react";

import imgLogo from "../../assets/images/logo.svg";
import { Container, Info } from "./styles";

const SignIn: React.FC = () => {
  const handleLogin = useCallback(() => {
    const client_id = "321ecb6e015f4a8db4c6c85ef1fe2c53";
    const scopes = [
      "user-read-email",
      "user-read-private",
      "playlist-read-collaborative",
      "playlist-read-private",
      "user-library-read",
      "user-top-read",
    ];
    const redirect_uri = "http://localhost:3000/sign-in-success";

    const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(
      redirect_uri,
    )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token`;

    window.open(url);
  }, []);

  return (
    <Container>
      <header>
        <img src={imgLogo} alt="My30Spotify" />
        <h2>My30Spotify</h2>
      </header>
      <Info>
        <h3>
          Essa não é uma aplicação oficial do{" "}
          <a
            href="https://www.spotify.com/br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spotify
          </a>
        </h3>

        <p>
          Essa é uma aplicação para ouvir os previews das músicas das suas
          playlists.
        </p>
      </Info>
      <button type="button" onClick={handleLogin}>
        <p>Entrar com sua conta do Spotify</p>
      </button>

      <footer>
        <p>
          O código dessa aplicação pode ser encontrado no{" "}
          <a
            href="https://github.com/Manfrinmm/My30Spotify#readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Github</strong>
          </a>
        </p>

        <span>
          Made by Matheus Menezes Manfrin 🦥
          <a
            href="https://www.linkedin.com/in/matheusmmm/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>See my LinkedIn</strong>
          </a>
        </span>
      </footer>
    </Container>
  );
};

export default SignIn;
