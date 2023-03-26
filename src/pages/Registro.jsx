import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData } from "../utils";

export const Registro = () => {
  const navigate = useNavigate();

  const alerta = {
    position: "bottom-left",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    usuario: "",
    email: "",
    password: "",
    cfm_password: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, cfm_password, usuario, email } = values;
    if (password !== cfm_password) {
      toast.error("Las contraseñas deben ser las mismas.", alerta);
      return false;
    } else if (usuario.length < 4) {
      toast.error("Usuario debe tener almenos 4 caracteres.", alerta);
      return false;
    } else if (password.length < 4) {
      toast.error("La contraseña debe tener almenos 4 caracteres.", alerta);
      return false;
    } else if (email === "") {
      toast.error("El email es requerido.", alerta);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;
    try {
      const data = await postData({ url: "auth/registro", data: values, method: "post" });
      localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
      navigate("/");
      toast[data.tipo](data.msg, alerta);
    } catch (error) {
      console.error(error);
      toast[error.tipo](error.msg, alerta);
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Chat</h1>
          </div>
          <input type="text" name="usuario" placeholder="Usuario" onChange={handleChange} />
          <input type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
          <input
            type="password"
            name="cfm_password"
            placeholder="Confirmar contraseña"
            onChange={handleChange}
          />
          <button className="button" type="submit">
            Crear usuario
          </button>
          <span style={{ textAlign: "center" }}>
            ¿Ya tienes una cuenta?
            <Link to="/ingreso" style={{ display: "block" }} className="link-animated">
              Inicia sesión.{" "}
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
    display: flex;
    width: 40vw;
    flex-direction: column;
    gap: 1.3rem;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    text-transform: lowercase;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
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

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
