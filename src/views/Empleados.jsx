// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaEmpleados from '../components/empleados/TablaEmpleados.jsx'; // Importa el componente de tabla
import ModalRegistroEmpleado from '../components/empleados/ModalRegistroEmpleado.jsx';
import { Container, Button, Row, Col } from "react-bootstrap";

// Declaración del componente Empleados
const Empleados = () => {
  // Estados para manejar los datos, carga y errores
  const [listaEmpleados, setListaEmpleados] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);         // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);     // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    cargo: '',
    fecha_contratacion: ''
  });

  // Función para obtener la lista de empleados desde la API
  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/empleados');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los empleados');
      }
      const datos = await respuesta.json();
      setListaEmpleados(datos); // Actualiza el estado con los datos
      setCargando(false);      // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);           // Termina la carga aunque haya error
    }
  };

  // Llamar a obtenerEmpleados cuando el componente se monta
  useEffect(() => {
    obtenerEmpleados();
  }, []);

  // Maneja los cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Maneja la inserción de un nuevo empleado
  const agregarEmpleado = async () => {
    // Validar que todos los campos obligatorios estén llenos
    if (!nuevoEmpleado.primer_nombre || !nuevoEmpleado.primer_apellido || !nuevoEmpleado.celular || !nuevoEmpleado.cargo || !nuevoEmpleado.fecha_contratacion) {
      setErrorCarga("Por favor, completa todos los campos obligatorios antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarempleado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEmpleado),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el empleado');
      }

      await obtenerEmpleados(); // Refresca toda la lista desde el servidor
      setNuevoEmpleado({
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        celular: '',
        cargo: '',
        fecha_contratacion: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Empleados</h4>

        <Button variant="primary" onClick={() => setMostrarModal(true)}>
          Nuevo Empleado
        </Button>
        <br/><br/>

        {/* Pasa los estados como props al componente TablaEmpleados */}
        <TablaEmpleados 
          empleados={listaEmpleados} 
          cargando={cargando} 
          error={errorCarga}   
        />

        <ModalRegistroEmpleado
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoEmpleado={nuevoEmpleado}
          manejarCambioInput={manejarCambioInput}
          agregarEmpleado={agregarEmpleado}
          errorCarga={errorCarga}
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Empleados;