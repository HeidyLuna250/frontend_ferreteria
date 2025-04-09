// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import Paginacion from "../ordenamiento/Paginacion";
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaUsuariosu que recibe props
const TablaUsuarios = ({ 
    usuarios, 
    cargando, 
    error,
    totalElementos,
    elementosPorPagina,
    paginaActual,
    establecerPaginaActual 
    }) => {

  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando usuarios...</div>; // Muestra mensaje mientras carga
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
          <th>ID Usuario</th>
          <th>Usuario</th>
          <th>Contraseña</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id_usuario}>
            <td>{usuario.id_usuario}</td>
            <td>{usuario.usuario}</td>
            <td>{usuario.contraseña}</td>
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
export default TablaUsuarios;
