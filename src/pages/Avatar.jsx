import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { Buffer } from "buffer";

import { postData, Api } from "../utils";

export const Avatar = () => {
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [is_loading, setIsLoading] = useState(true);
  const [seleccion_avatar, setAvatar] = useState(undefined);

  const alerta = {
    position: "bottom-left",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) navigate("/ingreso");
  }, []);

  const setProfilePicture = async () => {
    if (seleccion_avatar === undefined) {
      toast.info("Porfavor seleciona un avatar", alerta);
    } else {
      const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      const data = await postData({
        url: `auth/post-avatar/${user._id}`,
        data: {
          image: avatars[seleccion_avatar],
        },
        method: "post",
      });

      if (data.is_set) {
        user.avatar = true;
        user.avatar_image = data.image;
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error seleccionando el avatar intentalo de nuevo.", alerta);
      }
    }
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await Api({
        url: `https://api.multiavatar.com/4645646/${Math.round(Math.random() * 1000)}`,
        method: "get",
      });

      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      {is_loading ? (
        <Container>
          <div className="loader">
            <span className="l">c</span>
            <span className="o">a</span>
            <span className="a">r</span>
            <span className="d">g</span>
            <span className="i">a</span>
            <span className="n">n</span>
            <span className="g">d</span>
            <span className="o">o</span>
            <span className="d1">.</span>
            <span className="d2">.</span>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Elije tu avatar para poder navegar</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div className={`avatar ${seleccion_avatar === index ? "selected" : ""}`}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Iniciar
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #e0e4e7;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: black;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
