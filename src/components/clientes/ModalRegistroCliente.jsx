import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
  errorCarga,
}) => {

const validarLetras = (e) => {
  const charCode = e.which ? e.which : e.keyCode;
  // Permitir solo letras (A-Z, a-z)
  if (
    (charCode < 65 || charCode > 90) &&  // Letras mayúsculas
    (charCode < 97 || charCode > 122) && // Letras minúsculas
    charCode !== 8 &&  // Retroceso
    charCode !== 46 && // Borrar
    charCode !== 9     // Tab
  ) {
    e.preventDefault(); // Evita que se escriba el carácter
  }
};

const validacionFormulario = () => {
  return (
    nuevoCliente.primer_nombre.trim() !== "" &&
    nuevoCliente.segundo_nombre.trim() !== "" &&
    nuevoCliente.primer_apellido.trim() !== "" &&
    nuevoCliente.segundo_apellido.trim() !== "" &&
    nuevoCliente.celular.trim() !== "" &&
    nuevoCliente.direccion.trim() !== "" &&
    nuevoCliente.cedula.trim() !== ""
  );
};

const validarNumeros = (e) => {
  const charCode = e.which ? e.which : e.keyCode;
  // Permitir solo números (0-9), retroceso, borrar y Tab
  if (
    (charCode < 48 || charCode > 57) && // Números (0-9)
    charCode !== 8 &&  // Retroceso
    charCode !== 46 && // Borrar
    charCode !== 9     // Tab
  ) {
    e.preventDefault(); // Evita que se escriba el carácter
  }
};

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoCliente.primer_nombre}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              placeholder="Ingresa el primer nombre"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoNombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoCliente.segundo_nombre}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              placeholder="Ingresa el segundo nombre (opcional)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrimerApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevoCliente.primer_apellido}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              placeholder="Ingresa el primer apellido"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevoCliente.segundo_apellido}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              placeholder="Ingresa el segundo apellido (opcional)"
              maxLength={20}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCelular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevoCliente.celular}
              onChange={manejarCambioInput}
              onKeyDown={validarNumeros}
              placeholder="Ingresa el número de celular"
              maxLength={8}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={manejarCambioInput}
              placeholder="Ingresa la dirección"
              maxLength={150}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={nuevoCliente.cedula}
              onChange={manejarCambioInput}
              placeholder="Ingresa el número de cédula"
              maxLength={14}
              required
            />
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" 
        onClick={agregarCliente}
        disabled={!validacionFormulario()}
        >
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;
