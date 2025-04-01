// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaEmpleados from '../components/empleados/TablaEmpleados.jsx'; // Importa el componente de tabla
import { Container } from "react-bootstrap";

// Declaración del componente Empleados
const Empleados = () => {
  // Estados para manejar los datos, carga y errores
  const [listaEmpleados, setListaEmpleados] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    const obtenerEmpleados = async () => { // Método renombrado a español
      try {
        const respuesta = await fetch('http://localhost:3000/api/empleados');
        if (!respuesta.ok) {
          throw new Error('Error al cargar los Empleados');
        }
        const datos = await respuesta.json();
        setListaEmpleados(datos);    // Actualiza el estado con los datos
        setCargando(false);           // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);           // Termina la carga aunque haya error
      }
    };
    obtenerEmpleados();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Empleados</h4>

        {/* Pasa los estados como props al componente TablaEmpleados */}
        <TablaEmpleados
          empleados={listaEmpleados} 
          cargando={cargando} 
          error={errorCarga} 
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Empleados;