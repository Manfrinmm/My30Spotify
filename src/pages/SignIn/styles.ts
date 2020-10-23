import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  height: 100%;

  a {
    color: #6f4edd;
    text-decoration: none;
  }

  header {
    display: flex;
    flex-direction: column;

    align-items: center;

    margin: 56px 0;

    h2 {
      text-shadow: 2px 2px #7dd787;
    }

    img {
      width: 256px;
      height: 256px;

      margin-bottom: 16px;
    }
  }

  button {
    padding: 16px 24px;
    margin: 16px 0;

    font-size: 24px;
    color: #fff;

    border-radius: 37px;

    border-color: #000;

    background: #7dd787;

    p {
      text-shadow: 2px 1px black;
    }
  }

  footer {
    display: flex;
    flex-direction: column;

    align-items: center;

    margin-top: 24px;

    p {
      margin-bottom: 24px;
    }

    span {
      font-size: 14px;
    }
  }
`;

export const Info = styled.div`
  margin-bottom: 24px;
`;
