// ModalRegistroCategoria.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCategoria = ({
  mostrarModal,
  setMostrarModal,
  nuevaCategoria,
  manejarCambioInput,
  agregarCategoria,
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
    nuevaCategoria.nombre_categoria.trim() !== "" &&
    nuevaCategoria.descripcion_categoria.trim() !== "" 
  );
};

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreCategoria">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              name="nombre_categoria"
              value={nuevaCategoria.nombre_categoria}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescripcionCategoria">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_categoria"
              value={nuevaCategoria.descripcion_categoria}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              placeholder="Ingresa la descripción (máx. 100 caracteres)"
              maxLength={100}
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
        onClick={agregarCategoria}
        disabled={!validacionFormulario()}
        >
          Guardar Categoría
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCategoria;