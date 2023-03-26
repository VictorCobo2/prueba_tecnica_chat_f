import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat, Ingreso, Registro, Avatar } from "../pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/ingreso" element={<Ingreso />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/seleccionar-avatar" element={<Avatar />} />
      </Routes>
    </BrowserRouter>
  );
};
