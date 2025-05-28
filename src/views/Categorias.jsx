// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaCategorias from '../components/categorias/TablaCategorias.jsx'; // Importa el componente de tabla
import ModalRegistroCategoria from '../components/categorias/ModalRegistroCategoria.jsx';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas.jsx';
import ModalEliminacionCategoria from '../components/categorias/ModalEliminacionCategoria.jsx';
import ModalEdicionCategoria from '../components/categorias/ModalEdicionCategoria.jsx';
import { Container, Button, Row, Col, Alert } from "react-bootstrap";

// Declaración del componente Categorias
const Categorias = () => {
  // Estados para manejar los datos, carga y errores
  const [listaCategorias, setListaCategorias] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [mensajeExito, setMensajeExito] = useState(null); // Estado para mostrar mensaje de confirmación

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: '',
    descripcion_categoria: ''
  });
  
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4; // Número de elementos por página

  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  
  const obtenerCategorias = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://localhost:3000/api/categorias');
      if (!respuesta.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const datos = await respuesta.json();
      setListaCategorias(datos);    // Actualiza el estado con los datos
      setCategoriasFiltradas(datos);
      setCargando(false);           // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);           // Termina la carga aunque haya error
    }
  }; 

  // Lógica de obtención de datos con useEffect
  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerCategorias();            // Ejecuta la función al montar el componente
  }, []); 

  // Maneja los cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setCategoriaEditada(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejo la inserción de una nueva categoría
  const agregarCategoria = async () => {

    if (!nuevaCategoria.nombre_categoria || !nuevaCategoria.descripcion_categoria) {
    setErrorCarga("Por favor, completa todos los campos antes de guardar.");
    return;
  }

  try {
    const respuesta = await fetch('http://localhost:3000/api/registrarcategoria', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaCategoria),
    });

    if (!respuesta.ok) {
      throw new Error('Error al agregar la categoría');
    }

    await obtenerCategorias(); // Refresca toda la lista desde el servidor
    setNuevaCategoria({ nombre_categoria: '', descripcion_categoria: '' });
    setMostrarModal(false);
    setErrorCarga(null);
    setMensajeExito('Categoria registrada correctamente😉'); //Mensaje de confirmación
    setTimeout(() => setMensajeExito(null), 3000);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);
    
    const filtradas = listaCategorias.filter(
      (categoria) =>
        categoria.nombre_categoria.toLowerCase().includes(texto) ||
        categoria.descripcion_categoria.toLowerCase().includes(texto)
    );
    setCategoriasFiltradas(filtradas);
  };

      // Calcular elementos paginados
    const categoriasPaginadas = categoriasFiltradas.slice(
      (paginaActual - 1) * elementosPorPagina,
      paginaActual * elementosPorPagina
    );

    const eliminarCategoria = async () => {
      if (!categoriaAEliminar) return;

      try {
        const respuesta = await fetch(`http://localhost:3000/api/eliminarcategoria/${categoriaAEliminar.id_categoria}`, {
          method: 'DELETE',
        });

        if (!respuesta.ok) {
          throw new Error('Error al eliminar la categoría');
        }

        await obtenerCategorias(); // Refresca la lista
        setMostrarModalEliminacion(false);
        establecerPaginaActual(1); // Regresa a la primera página
        setCategoriaAEliminar(null);
        setErrorCarga(null);
        setMensajeExito('Categoria eliminada correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
        setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
      } catch (error) {
        setErrorCarga(error.message);
      }
    };

    const abrirModalEliminacion = (categoria) => {
      setCategoriaAEliminar(categoria);
      setMostrarModalEliminacion(true);
    };

    const actualizarCategoria = async () => {
      if (!categoriaEditada?.nombre_categoria || !categoriaEditada?.descripcion_categoria) {
        setErrorCarga("Por favor, completa todos los campos antes de guardar.");
        return;
      }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarcategoria/${categoriaEditada.id_categoria}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_categoria: categoriaEditada.nombre_categoria,
          descripcion_categoria: categoriaEditada.descripcion_categoria,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar la categoría');
      }

    await obtenerCategorias();
    setMostrarModalEdicion(false);
    setCategoriaEditada(null);
    setErrorCarga(null);
    setMensajeExito('Categoria Actualizada correctamente😉'); // Mensaje de confirmación al eliminar exitosamente
    setTimeout(() => setMensajeExito(null), 3000); // Oculta el mensaje automáticamente luego de 3 segundos
  } catch (error) {
    setErrorCarga(error.message);
  }
};

    const abrirModalEdicion = (categoria) => {
      setCategoriaEditada(categoria);
      setMostrarModalEdicion(true);
    };


  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Categorías</h4>
        {mensajeExito && ( //para que este visible en pantalla la confirmación
          <Alert variant="success" onClose={() => setMensajeExito(null)} dismissible>
            {mensajeExito}
          </Alert>
        )}
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button 
              variant="secondary"
              onClick={() => setMostrarModal(true)}
              style={{width: "100%"}}
            >
              Nueva Categoría
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

        <TablaCategorias 
          categorias={categoriasPaginadas} 
          cargando={cargando} 
          error={errorCarga} 
          totalElementos={listaCategorias.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion}
          abrirModalEdicion={abrirModalEdicion}
        />  
            

        <ModalRegistroCategoria
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaCategoria={nuevaCategoria}
          manejarCambioInput={manejarCambioInput}
          agregarCategoria={agregarCategoria}
          errorCarga={errorCarga}
        />

        <ModalEliminacionCategoria
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarCategoria={eliminarCategoria}
        />

        <ModalEdicionCategoria
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        categoriaEditada={categoriaEditada}
        manejarCambioInputEdicion={manejarCambioInputEdicion}
        actualizarCategoria={actualizarCategoria}
        errorCarga={errorCarga}
      />

      </Container>
    </>
  );
};

// Exportación del componente
export default Categorias;