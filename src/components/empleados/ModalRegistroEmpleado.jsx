import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
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
    nuevoEmpleado.primer_nombre.trim() !== "" &&
    nuevoEmpleado.segundo_nombre.trim() !== "" &&
    nuevoEmpleado.primer_apellido.trim() !== "" &&
    nuevoEmpleado.segundo_apellido.trim() !== "" &&
    nuevoEmpleado.celular.trim() !== "" &&
    nuevoEmpleado.cargo.trim() !== "" &&
    nuevoEmpleado.fecha_contratacion.trim() !== ""
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
        <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoEmpleado.primer_nombre}
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
              value={nuevoEmpleado.segundo_nombre}
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
              value={nuevoEmpleado.primer_apellido}
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
              value={nuevoEmpleado.segundo_apellido}
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
              value={nuevoEmpleado.celular}
              onChange={manejarCambioInput}
              onKeyDown={validarNumeros}
              placeholder="Ingresa el número de celular"
              maxLength={12}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={nuevoEmpleado.cargo}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              placeholder="Ingresa el cargo del empleado"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFechaContratacion">
            <Form.Label>Fecha de Contratación</Form.Label>
            <Form.Control
              type="date"
              name="fecha_contratacion"
              value={nuevoEmpleado.fecha_contratacion}
              onChange={manejarCambioInput}
              required
            />
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
        <Button variant="primary" onClick={agregarEmpleado}>
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;