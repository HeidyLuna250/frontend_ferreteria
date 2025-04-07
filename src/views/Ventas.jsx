// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaVentas from '../components/ventas/TablaVentas'; // Importa el componente de tabla
import ModalRegistroVenta from '../components/ventas/ModalRegistroVenta'; // IMPORTA EL MODAL DE REGISTRO DE VENTA
import { Container, Button } from "react-bootstrap";

// Declaración del componente Ventas
const Ventas = () => {
  // Estados para manejar los datos, carga y errores
  const [listaVentas, setListaVentas] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);     // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null); // Maneja errores de la petición

  const [listaClientes, setListaClientes] = useState([]); // ALMACENA CLIENTES PARA EL FORMULARIO
  const [listaEmpleados, setListaEmpleados] = useState([]); // ALMACENA EMPLEADOS PARA EL FORMULARIO
  const [listaProductos, setListaProductos] = useState([]); // ALMACENA PRODUCTOS PARA EL FORMULARIO

  const [mostrarModal, setMostrarModal] = useState(false); // CONTROL DE VISIBILIDAD DEL MODAL
  const [nuevaVenta, setNuevaVenta] = useState({
    id_cliente: '',
    id_empleado: '',
    id_producto: '',
    cantidad: '',
    precio_unitario: ''
  });

  // Obtener ventas con detalles
  const obtenerVentas = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/ventas'); // Ruta ajustada al controlador
      if (!respuesta.ok) throw new Error('Error al cargar las ventas');
      const datos = await respuesta.json();
      setListaVentas(datos);    // Actualiza el estado con los datos
      setCargando(false);       // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);       // Termina la carga aunque haya error
    }
  };

  // OBTENER CLIENTES, EMPLEADOS Y PRODUCTOS PARA LA VENTA
  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes');
      if (!respuesta.ok) throw new Error('Error al cargar los clientes');
      const datos = await respuesta.json();
      setListaClientes(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/empleados');
      if (!respuesta.ok) throw new Error('Error al cargar los empleados');
      const datos = await respuesta.json();
      setListaEmpleados(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProductos(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  useEffect(() => {
    obtenerVentas();
    obtenerClientes();
    obtenerEmpleados();
    obtenerProductos();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaVenta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FUNCIÓN PARA AGREGAR UNA NUEVA VENTA
  const agregarVenta = async () => {
    if (!nuevaVenta.id_cliente || !nuevaVenta.id_empleado || 
        !nuevaVenta.id_producto || !nuevaVenta.cantidad || 
        !nuevaVenta.precio_unitario) {
      setErrorCarga("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarventa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaVenta),
      });

      if (!respuesta.ok) throw new Error('Error al registrar la venta');

      await obtenerVentas();
      setNuevaVenta({
        id_cliente: '',
        id_empleado: '',
        id_producto: '',
        cantidad: '',
        precio_unitario: ''
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
        <h4>Ventas con Detalles</h4>
        <Button variant="primary" onClick={() => setMostrarModal(true)}>
          Nueva Venta
        </Button>
        <br/><br/>

        {/* Pasa los estados como props al componente TablaVentas */}
        <TablaVentas
          ventas={listaVentas}
          cargando={cargando}
          error={errorCarga}
        />

        {/* MODAL PARA REGISTRAR NUEVA VENTA */}
        <ModalRegistroVenta
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaVenta={nuevaVenta}
          manejarCambioInput={manejarCambioInput}
          agregarVenta={agregarVenta}
          errorCarga={errorCarga}
          clientes={listaClientes}
          empleados={listaEmpleados}
          productos={listaProductos}
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Ventas;
