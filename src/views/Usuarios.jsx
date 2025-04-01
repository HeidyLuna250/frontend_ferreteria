
// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaUsuarios from '../components/usuarios/TablaUsuarios.jsx'; // Importa el componente de tabla
import { Container } from "react-bootstrap";

// Declaración del componente Categorias
const Usuarios = () => {
  // Estados para manejar los datos, carga y errores
  const [listaUsuarios, setListaUsuarios] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  // Lógica de obtención de datos con useEffect
  useEffect(() => {
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
    obtenerUsuarios();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Usuarios</h4>

        {/* Pasa los estados como props al componente TablaCategorias */}
        <TablaUsuarios
          usuarios={listaUsuarios} 
          cargando={cargando} 
          error={errorCarga} 
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Usuarios;