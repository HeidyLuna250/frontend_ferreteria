import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaCompras = ({ compras, cargando, error, obtenerDetalles, abrirModalEliminacion, abrirModalActualizacion }) => {
  if (cargando) {
    return <div>Cargando compras...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>; // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>ID Compra</th>
          <th>Fecha Compra</th>
          <th>Empleado</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {compras.map((compra) => (
          <tr key={`${compra.id_compra}`}>
            <td>{compra.id_compra}</td>
            <td>{compra.fecha_compra}</td>
            <td>{compra.nombre_empleado}</td>
            <td>C$ {compra.total_compra.toFixed(2)}</td>
            <td>
              <Button
                variant="outline-success"
                size="sm"
                className="me-2"
                onClick={() => obtenerDetalles(compra.id_compra)}
              >
                <i className="bi bi-list-ul"></i>
              </Button>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => abrirModalActualizacion(compra)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(compra)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaCompras;