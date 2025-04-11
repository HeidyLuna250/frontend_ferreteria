// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import Paginacion from "../ordenamiento/Paginacion";
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaProductos que recibe props
const TablaProductos = ({
  productos, 
  cargando, 
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  categorias // Nueva prop para las categorías
}) => {

  // Función para obtener el nombre de la categoría a partir del ID
  const obtenerNombreCategoria = (idCategoria) => {
    const categoria = categorias.find(cat => cat.id_categoria === idCategoria);
    return categoria ? categoria.nombre_categoria : 'Categoría no encontrada';
  };

  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando productos...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;         // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Descripción</th>
            <th>Categoría</th> {/* Cambiado el encabezado de "ID Categoría" a "Categoría" */}
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td>{producto.nombre_producto}</td>
              <td>{producto.descripcion_producto}</td>
              <td>{obtenerNombreCategoria(producto.id_categoria)}</td> {/* Mostrar nombre en lugar de ID */}
              <td>{producto.precio_unitario}</td>
              <td>{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
};

// Exportación del componente
export default TablaProductos;