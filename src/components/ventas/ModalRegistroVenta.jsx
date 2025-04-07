import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroVenta = ({
  mostrarModal,
  setMostrarModal,
  nuevaVenta,
  manejarCambioInput,
  agregarVenta,
  errorCarga,
  clientes,  // Lista de clientes obtenida
  empleados, // Lista de empleados obtenida
  productos // Lista de productos obtenida
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Selección de Cliente */}
          <Form.Group className="mb-3" controlId="formClienteVenta">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              name="id_cliente"
              value={nuevaVenta.id_cliente}
              onChange={manejarCambioInput}
              required
            >
              <option value="">Selecciona un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nombre_cliente}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Selección de Empleado */}
          <Form.Group className="mb-3" controlId="formEmpleadoVenta">
            <Form.Label>Empleado</Form.Label>
            <Form.Select
              name="id_empleado"
              value={nuevaVenta.id_empleado}
              onChange={manejarCambioInput}
              required
            >
              <option value="">Selecciona un empleado</option>
              {empleados.map((empleado) => (
                <option key={empleado.id_empleado} value={empleado.id_empleado}>
                  {empleado.nombre_empleado}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Selección de Productos y Cantidad */}
          <Form.Group className="mb-3" controlId="formProductosVenta">
            <Form.Label>Productos</Form.Label>
            {nuevaVenta.productos.map((producto, index) => (
              <div key={index} className="mb-3">
                <Form.Select
                  name={`producto-${index}`}
                  value={producto.id_producto}
                  onChange={(e) => manejarCambioInput(e, index)}
                  required
                >
                  <option value="">Selecciona un producto</option>
                  {productos.map((prod) => (
                    <option key={prod.id_producto} value={prod.id_producto}>
                      {prod.nombre_producto}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control
                  type="number"
                  name={`cantidad-${index}`}
                  value={producto.cantidad}
                  onChange={(e) => manejarCambioInput(e, index)}
                  placeholder="Cantidad"
                  min="1"
                  required
                />
              </div>
            ))}
          </Form.Group>

          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarVenta}>
          Registrar Venta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroVenta;
