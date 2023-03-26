import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { postData } from "../utils";

export const Ingreso = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({ usuario: "", password: "" });

  const alerta = {
    position: "bottom-left",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { usuario, password } = values;
    if (usuario === "") {
      toast.info("Email es requerido", alerta);
      return false;
    } else if (password === "") {
      toast.info("Email es requerido", alerta);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const data = await postData({ url: "auth/ingreso", data: values, method: "post" });
        if ("_id" in data) {
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data));
          navigate("/");
        }
        toast[data.tipo](data.msg, alerta);
      } catch (error) {
        toast.info(error.msg, alerta);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Chat</h1>
          </div>
          <input min="4" type="text" name="usuario" placeholder="Usuario" onChange={handleChange} />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
          <button className="button" type="submit">
            Iniciar
          </button>
          <span style={{ textAlign: "center" }}>
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" style={{ display: "block" }} className="link-animated">
              {" "}
              Crea una.
            </Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #e0e4e7;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }

  form {
    width: 40vw;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    text-transform: lowercase;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
  span {
    color: black;
    // text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
