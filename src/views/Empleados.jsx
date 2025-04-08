// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaEmpleados from '../components/empleados/TablaEmpleados.jsx'; // Ajustado para empleados
import ModalRegistroEmpleado from '../components/empleados/ModalRegistroEmpleado.jsx'; // Ajustado para empleados
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas.jsx';
import { Container, Button, Row, Col } from "react-bootstrap";

// Declaración del componente Empleados
const Empleados = () => {
  // Estados para manejar los datos, carga y errores
  const [listaEmpleados, setListaEmpleados] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);          // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);      // Maneja errores de la petición

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
  
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  
  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/empleados'); // Ajusta la ruta API
      if (!respuesta.ok) {
        throw new Error('Error al cargar los empleados');
      }
      const datos = await respuesta.json();
      setListaEmpleados(datos);
      setEmpleadosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  }; 

  // Lógica de obtención de datos con useEffect
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

  // Manejo la inserción de un nuevo empleado
  const agregarEmpleado = async () => {
    if (!nuevoEmpleado.primer_nombre || !nuevoEmpleado.primer_apellido || !nuevoEmpleado.celular || !nuevoEmpleado.cargo || !nuevoEmpleado.fecha_contratacion) {
      setErrorCarga("Por favor, completa los campos obligatorios (primer nombre, primer apellido, celular, cargo y fecha de contratación).");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarempleado', { // Ajusta la ruta API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEmpleado),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el empleado');
      }

      await obtenerEmpleados(); // Refresca la lista desde el servidor
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

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    
    const filtrados = listaEmpleados.filter(
      (empleado) =>
        empleado.primer_nombre.toLowerCase().includes(texto) ||
        (empleado.segundo_nombre && empleado.segundo_nombre.toLowerCase().includes(texto)) ||
        empleado.primer_apellido.toLowerCase().includes(texto) ||
        (empleado.segundo_apellido && empleado.segundo_apellido.toLowerCase().includes(texto)) ||
        empleado.celular.toLowerCase().includes(texto) ||
        empleado.cargo.toLowerCase().includes(texto) ||
        empleado.fecha_contratacion.toString().toLowerCase().includes(texto)
    );
    setEmpleadosFiltrados(filtrados);
  };

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Empleados</h4>

        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button 
              variant="primary"
              onClick={() => setMostrarModal(true)}
              style={{width: "100%"}}
            >
              Nuevo Empleado
            </Button>
          </Col>
          
          <Col lg={6} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row> 

        <br/>

        <TablaEmpleados 
          empleados={empleadosFiltrados} 
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