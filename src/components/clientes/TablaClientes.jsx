// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaClientes = ({ clientes, cargando, error }) => {
  
  if (cargando) {
    return <div>Cargando TablaClientes...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;         // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>ID Cliente</th>
          <th>Primer nombre</th>
          <th>Segundo nombre</th>
          <th>Primer apellido</th>
          <th>Segundo apellido</th>
          <th>Celular</th>
          <th>Direccion</th>
          <th>Cedula</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id_cliente}>
            <td>{cliente.id_cliente}</td>
            <td>{cliente.primer_nombre}</td>
            <td>{cliente.segundo_nombre}</td>
            <td>{cliente.primer_apellido}</td>
            <td>{cliente.segundo_apellido}</td>
            <td>{cliente.celular}</td>
            <td>{cliente.direccion}</td>
            <td>{cliente.cedula}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaClientes;
