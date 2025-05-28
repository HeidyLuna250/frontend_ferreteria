import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup, Spinner, Table } from 'react-bootstrap';

const ChatIA = ({ mostrarChatModal, setMostrarChatModal }) => {

  // Lógica del componente aquí
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState(null);
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async () => {
  if (!mensaje.trim()) return; // Evita enviar mensajes vacíos

  setCargando(true); // Activa el estado de carga
  setRespuesta(null); // Limpia la respuesta anterior
  setMensaje(''); // Limpia el campo de entrada

  try {
    // Prompt para enviar a Gemini
    const prompt = `
      Genera una consulta SQL válida para un Data Mart con las siguientes tablas y relaciones:
      - Dim_Tiempo (fecha, año, mes, dia, trimestre, nombre_mes, dia_semana)
      - Dim_Clientes (id_cliente, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, nombre_completo, cedula)
      - Dim_Empleados (id_empleado, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, nombre_completo, cargo, fecha_contratacion)
      - Dim_Productos (id_producto, nombre_producto, nombre_categoria, precio_unitario, stock)
      - Hecho_Ventas (id_venta, id_detalle_venta, id_cliente, id_empleado, id_producto, fecha, cantidad, precio_unitario, total_linea)
      Relaciones:
      - Hecho_Ventas.id_cliente -> Dim_Clientes.id_cliente
      - Hecho_Ventas.id_empleado -> Dim_Empleados.id_empleado
      - Hecho_Ventas.id_producto -> Dim_Productos.id_producto
      - Hecho_Ventas.fecha -> Dim_Tiempo.fecha
      Instrucciones:
      - Toma en cuenta que son consultas SQL para MySQL.
      - Usa solo las columnas listadas en cada tabla.
      - Asegúrate de que los JOINs sean correctos y utilicen las claves foráneas especificadas.
      - Si se solicita información de múltiples tablas, usa JOINs explícitos.
      - No generes subconsultas complejas ni funciones avanzadas a menos que sean explícitamente solicitadas.
      - Devuelve la consulta SQL en una sola línea, sin saltos de línea, comillas triples, ni formato adicional.
      Pregunta del usuario: "${mensaje}"
    `;

    // Obtener la clave de la API desde las variables de entorno
    const apiKey = import.meta.env.VITE_API_KEY;

    // Llamada a la API de Gemini
    const respuestaGemini = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { response_mime_type: 'text/plain' },
        }),
      }
    );
    
    //Verificar la respuesta de Gemini
    if (!respuestaGemini.ok) {
      throw new Error('Error en la respuesta de Gemini API');
    }

    //Capturar la respuesta y consulta generada por Gemini
    const datosGemini = await respuestaGemini.json();
    const consultaSQL = datosGemini.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Validar la consulta SQL generada
    if (!consultaSQL.trim().startsWith('SELECT') || consultaSQL.includes('DROP') || consultaSQL.includes('DELETE') || consultaSQL.includes('UPDATE')) {
      throw new Error('Consulta SQL generada inválida o insegura. SOLO SE PUEDEN REALIZAR CONSULTAS SELECT.');
    }

    // Enviar la consulta al backend
    const response = await fetch('http://localhost:3000/ia/consultarconia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consultaSQL }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en la respuesta del backend: ${errorText}`);
    }

    const resultadoConsulta = await response.json();

    // Actualizar la respuesta con el mensaje del usuario y el resultado
    setRespuesta({
      usuario: mensaje,
      ia: resultadoConsulta.resultados || 'No se encontraron resultados.',
    });
  } catch (error) {
    console.error('Error:', error);
    setRespuesta({
      usuario: mensaje,
      ia: `Error: ${error.message}`,
    });
  } finally {
    setCargando(false); // Desactiva el estado de carga
    }
  };

return (
  <Modal show={mostrarChatModal} onHide={() => setMostrarChatModal(false)} size="lg">
    {/* Encabezado del modal */}
    <Modal.Header closeButton>
      <Modal.Title>Consulta al Data Mart con IA</Modal.Title>
    </Modal.Header>

    {/* Cuerpo del modal */}
    <Modal.Body>
      {/* Mostrar mensaje del usuario y respuesta de la IA */}
      {respuesta && (
        <ListGroup style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <ListGroup.Item variant="secondary">
            <strong>Tú: </strong>
            {respuesta.usuario}
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <strong>IA: </strong>
            {Array.isArray(respuesta.ia) && respuesta.ia.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    {Object.keys(respuesta.ia[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {respuesta.ia.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i}>{value !== null ? value : ''}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <pre>{respuesta.ia}</pre>
            )}
          </ListGroup.Item>
        </ListGroup>
      )}

      {/* Campo de entrada para el mensaje del usuario */}
      <Form.Control
        className="mt-3"
        type="text"
        placeholder="Escribe una consulta (ej. 'Ventas totales por categoría en 2025')"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
        disabled={cargando}
      />
    </Modal.Body>

    {/* Pie del modal con botones */}
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setMostrarChatModal(false)}>
        Cerrar
      </Button>
      <Button onClick={enviarMensaje} disabled={cargando || !mensaje.trim()}>
        {cargando ? <Spinner size="sm" animation="border" /> : 'Enviar'}
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default ChatIA;