// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaVentas = ({ ventas, cargando, error }) => {
  if (cargando) {
    return <div>Cargando ventas...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>ID Venta</th>
          <th>ID Detalle</th>
          <th>Fecha Venta</th>
          <th>Cliente</th>
          <th>Empleado</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta) => (
          <tr key={`${venta.id_venta}-${venta.id_detalle_venta}`}> {/* GENERA UNA CLAVE ÚNICA USANDO ID_VENTA Y ID_DETALLE_VENTA */}
            <td>{venta.id_venta}</td>
            <td>{venta.id_detalle_venta}</td>
            <td>{venta.fecha_venta}</td>
            <td>{venta.nombre_cliente}</td> {/* MUESTRA EL NOMBRE DEL CLIENTE ASOCIADO A LA VENTA */}
            <td>{venta.nombre_empleado}</td> {/* MUESTRA EL NOMBRE DEL EMPLEADO QUE REGISTRÓ LA VENTA */}
            <td>{venta.nombre_producto}</td> {/* MUESTRA EL NOMBRE DEL PRODUCTO VENDIDO */}
            <td>{venta.cantidad}</td> {/* MUESTRA LA CANTIDAD DE PRODUCTOS VENDIDOS */}
            <td>C$ {venta.precio_unitario.toFixed(2)}</td> {/* FORMATEA EL PRECIO UNITARIO A DOS DECIMALES */}
            <td>C$ {venta.subtotal.toFixed(2)}</td> {/* CALCULA Y MUESTRA EL SUBTOTAL DE LA VENTA */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaVentas;
