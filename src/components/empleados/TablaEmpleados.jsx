// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Spinner, Alert, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaEmpleados = ({ empleados, cargando, error }) => {
  if (cargando) {
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }
  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (empleados.length === 0) {
    return <Alert variant="warning">No hay empleados registrados.</Alert>;
  }

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Primer Nombre</th>
          <th>Segundo Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th>
          <th>Celular</th>
          <th>Cargo</th>
          <th>Fecha de Contratación</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado) => (
          <tr key={empleado.id_empleado}>
            <td>{empleado.id_empleado}</td>
            <td>{empleado.primer_nombre}</td>
            <td>{empleado.segundo_nombre || 'N/A'}</td>
            <td>{empleado.primer_apellido}</td>
            <td>{empleado.segundo_apellido || 'N/A'}</td>
            <td>{empleado.celular}</td>
            <td>{empleado.cargo}</td>
            <td>{new Date(empleado.fecha_contratacion).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaEmpleados;
