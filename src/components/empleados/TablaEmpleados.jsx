import React from 'react';
import Paginacion from '../ordenamiento/Paginacion';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaEmpleados = ({
  empleados, 
  cargando,
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  abrirModalEliminacion,
  abrirModalEdicion
}) => {
  if (cargando) {
    return <div>Cargando empleados...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Table striped bordered hover responsive>
      <thead className="table-dark">
          <tr>
            <th>ID Empleado</th>
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Celular</th>
            <th>Cargo</th>
            <th>Fecha Contratación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id_empleado}>
              <td>{empleado.id_empleado}</td>
              <td>{empleado.primer_nombre}</td>
              <td>{empleado.segundo_nombre}</td>
              <td>{empleado.primer_apellido}</td>
              <td>{empleado.segundo_apellido}</td>
              <td>{empleado.celular}</td>
              <td>{empleado.cargo}</td>
              <td>{empleado.fecha_contratacion}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEliminacion(empleado)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => abrirModalEdicion(empleado)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
              </td>
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

export default TablaEmpleados;