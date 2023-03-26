import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";

import { ChatContainer, Strem, Inicio } from "../components";
import { postData } from "../utils";

export const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/ingreso");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.avatar) {
        const data = await postData({
          url: `auth/traer-usuarios/${currentUser._id}`,
          method: "get",
        });
        setContacts(data);
      } else {
        navigate("/seleccionar-avatar");
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    console.log(chat);
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Strem contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Inicio changeChat={handleChatChange} />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #e0e4e7;
  .container {
    border-radius: 1rem;
    padding: 0.5rem 0.5rem;
    height: 95vh;
    width: 95vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 70% 50%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 70% 50%;
    }
  }
`;
