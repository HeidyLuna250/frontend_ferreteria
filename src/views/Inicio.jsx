import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Proposito from "../components/inicio/Proposito";
import Portada from "../assets/Portada.jpg"
import { Container, Image } from "react-bootstrap";

const Inicio = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navegar("/");
    } else {
      setNombreUsuario(usuarioGuardado);
    }
  }, [navegar]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  return (
    <Container>
      <h1>¡Bienvenido, {nombreUsuario}!</h1>
      <Image src={Portada} fluid rounded />
      <Proposito />
    </Container>
  );
};

export default Inicio;