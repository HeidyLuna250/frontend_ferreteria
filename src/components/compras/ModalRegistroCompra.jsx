import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Row, Col, FormControl } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ModalRegistroCompra = ({
  mostrarModal,
  setMostrarModal,
  nuevaCompra,
  setNuevaCompra,
  detallesCompra = [],
  setDetallesCompra,
  agregarDetalle,
  agregarCompra,
  errorCarga,
  empleados = [],
  productos = []
}) => {
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoDetalle, setNuevoDetalle] = useState({ id_producto: '', cantidad: '', precio_unitario: '' });

  // Calcular total de la compra con validación
  const totalCompra = detallesCompra.length > 0
    ? detallesCompra.reduce((sum, detalle) => {
        const cantidad = Number(detalle.cantidad) || 0;
        const precio = Number(detalle.precio_unitario) || 0;
        return sum + (cantidad * precio);
      }, 0)
    : 0;

  // Cargar opciones para AsyncSelect con validación
  const cargarEmpleados = (inputValue, callback) => {
    if (!Array.isArray(empleados)) {
      callback([]);
      return;
    }
    const filtrados = empleados.filter(empleado => {
      if (!empleado || !empleado.primer_nombre || !empleado.primer_apellido) return false;
      return `${empleado.primer_nombre} ${empleado.primer_apellido}`.toLowerCase().includes(inputValue.toLowerCase());
    });
    callback(filtrados.map(empleado => ({
      value: empleado.id_empleado,
      label: `${empleado.primer_nombre} ${empleado.primer_apellido}`
    })));
  };

  const cargarProductos = (inputValue, callback) => {
    if (!Array.isArray(productos)) {
      callback([]);
      return;
    }
    const filtrados = productos.filter(producto => {
      if (!producto || !producto.nombre_producto) return false;
      return producto.nombre_producto.toLowerCase().includes(inputValue.toLowerCase());
    });
    callback(filtrados.map(producto => ({
      value: producto.id_producto,
      label: producto.nombre_producto,
      precio: producto.precio_unitario || 0
    })));
  };

  // Manejar cambios en los selectores
  const manejarCambioEmpleado = (seleccionado) => {
    setEmpleadoSeleccionado(seleccionado);
    setNuevaCompra(prev => {
      const updated = { ...prev, id_empleado: seleccionado ? seleccionado.value : '' };
      console.log('Nueva compra después de seleccionar empleado:', updated);
      return updated;
    });
  };

  const manejarCambioProducto = (seleccionado) => {
    setProductoSeleccionado(seleccionado);
    setNuevoDetalle(prev => ({
      ...prev,
      id_producto: seleccionado ? seleccionado.value : '',
      precio_unitario: seleccionado ? seleccionado.precio : ''
    }));
  };

  // Manejar cambios en el detalle
  const manejarCambioDetalle = (e) => {
    const { name, value } = e.target;
    setNuevoDetalle(prev => ({ ...prev, [name]: value }));
  };

  // Agregar detalle a la lista
  const manejarAgregarDetalle = () => {
    if (!nuevoDetalle.id_producto || !nuevoDetalle.cantidad || Number(nuevoDetalle.cantidad) <= 0) {
      alert("Por favor, selecciona un producto y una cantidad válida.");
      return;
    }

    const detalle = {
      id_producto: nuevoDetalle.id_producto,
      nombre_producto: productoSeleccionado?.label || '',
      cantidad: parseInt(nuevoDetalle.cantidad),
      precio_unitario: parseFloat(nuevoDetalle.precio_unitario || 0)
    };
    agregarDetalle(detalle);
    console.log('Detalle agregado:', detalle);
    setNuevoDetalle({ id_producto: '', cantidad: '', precio_unitario: '' });
    setProductoSeleccionado(null);
  };

  // Limpiar el formulario cuando el modal se cierra
  const manejarCerrarModal = () => {
    setEmpleadoSeleccionado(null);
    setProductoSeleccionado(null);
    setNuevoDetalle({ id_producto: '', cantidad: '', precio_unitario: '' });
    setMostrarModal(false);
  };

  // Depuración antes de crear la compra
  const manejarCrearCompra = () => {
    console.log('Datos antes de crear la compra:', {
      id_empleado: nuevaCompra.id_empleado,
      fecha_compra: nuevaCompra.fecha_compra,
      detallesCompra: detallesCompra
    });
    agregarCompra();
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={manejarCerrarModal}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group className="mb-3" controlId="formEmpleado">
                <Form.Label>Empleado</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarEmpleados}
                  onChange={manejarCambioEmpleado}
                  value={empleadoSeleccionado}
                  placeholder="Buscar empleado..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group className="mb-3" controlId="formFechaCompra">
                <Form.Label>Fecha de Compra</Form.Label>
                <br />
                <DatePicker
                  selected={nuevaCompra?.fecha_compra instanceof Date ? nuevaCompra.fecha_compra : new Date()}
                  onChange={(date) => setNuevaCompra(prev => ({ ...prev, fecha_compra: date }))}
                  className="form-control"
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h5>Agregar Detalle de Compra</h5>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Form.Group className="mb-3" controlId="formProducto">
                <Form.Label>Producto</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarProductos}
                  onChange={manejarCambioProducto}
                  value={productoSeleccionado}
                  placeholder="Buscar producto..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <Form.Group className="mb-3" controlId="formCantidad">
                <Form.Label>Cantidad</Form.Label>
                <FormControl
                  type="number"
                  name="cantidad"
                  value={nuevoDetalle.cantidad}
                  onChange={manejarCambioDetalle}
                  placeholder="Cantidad"
                  min="1"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={7} sm={8} md={3} lg={3}>
              <Form.Group className="mb-3" controlId="formPrecioUnitario">
                <Form.Label>Precio Unitario</Form.Label>
                <FormControl
                  type="number"
                  name="precio_unitario"
                  value={nuevoDetalle.precio_unitario}
                  disabled
                  placeholder="Automático"
                />
              </Form.Group>
            </Col>
            <Col xs={5} sm={4} md={2} lg={2} className="d-flex align-items-center mt-3">
              <Button style={{ width: '100%' }} variant="success" onClick={manejarAgregarDetalle}>
                Agregar Producto
              </Button>
            </Col>
          </Row>

          {detallesCompra.length > 0 && (
            <>
              <h5 className="mt-4">Detalles Agregados</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detallesCompra.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.nombre_producto || 'Sin nombre'}</td>
                      <td>{detalle.cantidad || 0}</td>
                      <td>{(detalle.precio_unitario || 0).toFixed(2)}</td>
                      <td>{((detalle.cantidad || 0) * (detalle.precio_unitario || 0)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                    <td><strong>{totalCompra.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}

          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={manejarCerrarModal}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={manejarCrearCompra}>
          Crear Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCompra;