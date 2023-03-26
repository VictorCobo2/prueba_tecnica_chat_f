import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Inicio = ({ changeChat }) => {
  const [usuario, setUsuario] = useState("");

  useEffect(async () => {
    setUsuario(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).usuario);
  }, []);
  const cambiarChat = () => {
    changeChat(true);
  };

  return (
    <Container>
      <div className="pyramid-loader welcome">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
      <h2>
        Bienvenido, <span>{usuario}</span>
      </h2>
      <button className="button" onClick={cambiarChat}>
        Iniciar
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 30vw;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  .welcome {
    height: 10rem;
  }
  span {
    color: #4e0eff;
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 0.4rem 1rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-top: 10px;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
