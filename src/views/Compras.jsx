// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaCompras from '../components/compras/TablaCompras'; // Importa el componente de tabla para compras
import ModalDetallesCompra from '../components/detalles_compras/ModalDetallesCompras';
import ModalEliminacionCompra from '../components/compras/ModalEliminacionCompra';
import ModalRegistroCompra from '../components/compras/ModalRegistroCompra';
import ModalActualizacionCompra from '../components/compras/ModalActualizacionCompra';
import { Container, Button, Row, Col, Alert } from "react-bootstrap";

// Declaración del componente Compras
const Compras = () => {
  // Estados para manejar los datos, carga y errores
  const [listaCompras, setListaCompras] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);       // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);   // Maneja errores de la petición

  const [mensajeExito, setMensajeExito] = useState(null); // Estado para mostrar mensaje de confirmación

  const [mostrarModal, setMostrarModal] = useState(false);
  const [detallesCompra, setDetallesCompra] = useState([]);
  const [cargandoDetalles, setCargandoDetalles] = useState(false);
  const [errorDetalles, setErrorDetalles] = useState(null);

  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [compraAEliminar, setCompraAEliminar] = useState(null);

  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nuevaCompra, setNuevaCompra] = useState({
    id_empleado: '',
    fecha_compra: new Date(),
    total_compra: 0
  });
  const [detallesNuevos, setDetallesNuevos] = useState([]);

  const [mostrarModalActualizacion, setMostrarModalActualizacion] = useState(false);
  const [compraAEditar, setCompraAEditar] = useState(null);
  const [detallesEditados, setDetallesEditados] = useState([]);

  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerCompras();            // Ejecuta la función al montar el componente
    obtenerEmpleados();
    obtenerProductos();
  }, []);                        // Array vacío para que solo se ejecute una vez

      const obtenerCompras = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/obtenercompras'); // Ruta ajustada para compras
        if (!respuesta.ok) {
          throw new Error('Error al cargar las compras');
        }
        const datos = await respuesta.json();
        setListaCompras(datos);    // Actualiza el estado con los datos
        setCargando(false);        // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);        // Termina la carga aunque haya error
      }
    };

    const obtenerDetalles = async (id_compra) => {
    setCargandoDetalles(true);
    setErrorDetalles(null);
    try {
      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallescompra/${id_compra}`);
      if (!respuesta.ok) {
        throw new Error('Error al cargar los detalles de la compra');
      }
      const datos = await respuesta.json();
      setDetallesCompra(datos);
      setCargandoDetalles(false);
      setMostrarModal(true);
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

    const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/empleados');
      if (!respuesta.ok) throw new Error('Error al cargar los empleados');
      const datos = await respuesta.json();
      setEmpleados(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

    const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

    const eliminarCompra = async () => {
    if (!compraAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarcompra/${compraAEliminar.id_compra}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar la compra');
      }
      
      setMostrarModalEliminacion(false);
      await obtenerCompras();
      setCompraAEliminar(null);
      setErrorCarga(null);
      setMensajeExito('Compra eliminada correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
      setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (compra) => {
    setCompraAEliminar(compra);
    setMostrarModalEliminacion(true);
  };

  const agregarDetalle = (detalle) => {
        setDetallesNuevos(prev => [...prev, detalle]);
        setNuevaCompra(prev => ({
          ...prev,
          total_compra: prev.total_compra + (detalle.cantidad * detalle.precio_unitario)
        }));
      };

  const agregarCompra = async () => {
    if (!nuevaCompra.id_empleado || !nuevaCompra.fecha_compra || detallesNuevos.length === 0) {
      setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
      return;
    }

    try {
      const compraData = {
        id_empleado: nuevaCompra.id_empleado,
        fecha_compra: nuevaCompra.fecha_compra.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
        total_compra: detallesNuevos.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
        detalles: detallesNuevos
      };

      const respuesta = await fetch('http://localhost:3000/api/registrarcompra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compraData)
      });

      if (!respuesta.ok) throw new Error('Error al registrar la compra');

      await obtenerCompras();
      setNuevaCompra({ id_empleado: '', fecha_compra: new Date(), total_compra: 0 });
      setDetallesNuevos([]);
      setMostrarModalRegistro(false);
      setErrorCarga(null);
      setMensajeExito('Compra registrada correctamente😉'); //Mensaje de confirmación
      setTimeout(() => setMensajeExito(null), 3000);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

    const actualizarCompra = async (compraActualizada, detalles) => {

      if (!compraActualizada.id_empleado || !compraActualizada.fecha_compra || detalles.length === 0) {
        setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
        return;
      }
      try {
        const compraData = {
          id_compra: compraActualizada.id_compra,
          id_empleado: compraActualizada.id_empleado,
          fecha_compra: compraActualizada.fecha_compra.toLocaleString('en-CA', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
          }).replace(',', ' '),
          total_compra: detalles.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
          detalles
        };
        console.log(`Enviando ID compra: ${compraActualizada.id_compra}`, JSON.stringify(compraData));
        const respuesta = await fetch(`http://localhost:3000/api/actualizarcompra/${compraActualizada.id_compra}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(compraData)
        });
        if (!respuesta.ok) throw new Error('Error al actualizar la compra');
        await obtenerCompras();
        setMostrarModalActualizacion(false);
        setCompraAEditar(null);
        setDetallesEditados([]);
        setErrorCarga(null);
        setMensajeExito('Compra actualizada correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
        setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
      } catch (error) {
        setErrorCarga(error.message);
      }
    };

const abrirModalActualizacion = async (compra) => {
  setCargandoDetalles(true);
  try {
    const respuestacompra = await fetch(`http://localhost:3000/api/obtenercompraporid/${compra.id_compra}`);
    if (!respuestacompra.ok) throw new Error('Error al cargar la compra');
    const datoscompra = await respuestacompra.json();

    const datoscompletos = {
      id_compra: datoscompra.id_compra,
      id_empleado: datoscompra.id_empleado,
      fecha_compra: datoscompra.fecha_compra,
      total_compra: datoscompra.total_compra,
      nombre_empleado: compra.nombre_empleado
    };

    setCompraAEditar(datoscompletos);

    const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallescompra/${compra.id_compra}`);
    if (!respuesta.ok) throw new Error('Error al cargar los detalles de la compra');
    const datos = await respuesta.json();
    setDetallesEditados(datos);

    setCargandoDetalles(false);
    setMostrarModalActualizacion(true);
  } catch (error) {
    setErrorDetalles(error.message);
    setCargandoDetalles(false);
  }
};

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Compras con Detalles</h4>
        {mensajeExito && ( //para que este visible en pantalla la confirmación
          <Alert variant="success" onClose={() => setMensajeExito(null)} dismissible>
            {mensajeExito}
          </Alert>
        )}
                <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="secondary" onClick={() => setMostrarModalRegistro(true)} style={{ width: "100%" }}>
              Nueva Compra
            </Button>
          </Col>
        </Row>
        <br />

        {/* Pasa los estados como props al componente TablaCompras */}
        <TablaCompras
          compras={listaCompras}
          cargando={cargando}
          error={errorCarga}
          obtenerDetalles={obtenerDetalles} // Pasar la función
          abrirModalEliminacion={abrirModalEliminacion}
          abrirModalActualizacion={abrirModalActualizacion}
        />

        <ModalDetallesCompra
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          detalles={detallesCompra}
          cargandoDetalles={cargandoDetalles}
          errorDetalles={errorDetalles}
        />

         <ModalEliminacionCompra
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarCompra={eliminarCompra}
        />

        <ModalRegistroCompra
          mostrarModal={mostrarModalRegistro}
          setMostrarModal={setMostrarModalRegistro}
          nuevaCompra={nuevaCompra}
          setNuevaCompra={setNuevaCompra}
          detallesCompra={detallesNuevos}
          setDetallesCompra={setDetallesNuevos}
          agregarDetalle={agregarDetalle}
          agregarCompra={agregarCompra}
          errorCarga={errorCarga}
          empleados={empleados}
          productos={productos}
        />

        <ModalActualizacionCompra
          mostrarModal={mostrarModalActualizacion}
          setMostrarModal={setMostrarModalActualizacion}
          compra={compraAEditar}
          detallesCompra={detallesEditados}
          setDetallesCompra={setDetallesEditados}
          actualizarCompra={actualizarCompra}
          errorCarga={errorCarga}
          empleados={empleados}
          productos={productos}
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Compras;