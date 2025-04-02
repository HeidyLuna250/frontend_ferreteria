
// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaUsuarios from '../components/usuarios/TablaUsuarios.jsx'; // Importa el componente de tabla
import ModalRegistroUsuario from '../components/usuarios/ModalRegistroUsuario.jsx';
import { Container, Button } from "react-bootstrap";

// Declaración del componente Categorias
const Usuarios = () => {
  // Estados para manejar los datos, carga y errores
  const [listaUsuarios, setListaUsuarios] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: '',
    contraseña: ''
  });

  const obtenerUsuarios = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://localhost:3000/api/usuarios');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los Clientes');
      }
      const datos = await respuesta.json();
      setListaUsuarios(datos);    // Actualiza el estado con los datos
      setCargando(false);           // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);           // Termina la carga aunque haya error
    }
  };

  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerUsuarios();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarUsuario = async () => {
    if (!nuevoUsuario.usuario || !nuevoUsuario.contraseña) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarusuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el usuario');
      }

      await obtenerUsuarios();
      setNuevoUsuario({ usuario: '', contraseña: '' });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Usuarios</h4>
      <Button variant="primary" onClick={() => setMostrarModal(true)}>
        Nuevo Usuario
      </Button>
      <br /><br />

      <TablaUsuarios usuarios={listaUsuarios} cargando={cargando} error={errorCarga} />
      <ModalRegistroUsuario
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoUsuario={nuevoUsuario}
        manejarCambioInput={manejarCambioInput}
        agregarUsuario={agregarUsuario}
        errorCarga={errorCarga}
      />
    </Container>
  );
};

// Exportación del componente
export default Usuarios;