import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VentasPorMes from '../components/graficos/VentasPorMes';
import VentasPorEmpleado from '../components/graficos/VentasPorEmpleado';
import VentasPorCategorias from '../components/graficos/VentasPorCategorias';
import ProductosVendidos from '../components/graficos/ProductosVendidos';

const Estadisticas = () => {

  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);

  const [empleados, setEmpleados] = useState([]);
  const [ventasPorEmpleado, setVentasPorEmpleado] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [totalesPorCategoria, setTotalesPorCategoria] = useState([]);

  const [productos, setProductos] = useState([]); 
  const [cantidadesVendidas, setCantidadesVendidas] = useState([]); 


  useEffect(() => {
    cargaVentas();
    cargaVentasEmpleado();
    cargaVentasPorCategoria();
    cargaProductosVendidos();
    }, []);

        const cargaVentas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/totalVentasPorMes');
        const data = await response.json();
        console.log(data); // Verificación para no mostrar datos vacios

        setMeses(data.map(item => item.mes));
        setTotalesPorMes(data.map(item => item.total_ventas));

      } catch (error) {
        console.error('Error al cargar  ventas:', error);
        alert('Error al cargar ventas: ' + error.message);
      }
    };

    const cargaVentasEmpleado = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/totalVentasPorEmpleado');
      const data = await response.json();

      setEmpleados(data.map(emp => `${emp.primer_nombre} ${emp.primer_apellido}`));
      setVentasPorEmpleado(data.map(emp => emp.total_ventas));

    } catch (error) {
      console.error('Error al cargar ventas por empleado:', error);
      alert('Error al cargar ventas por empleado: ' + error.message);
    }
  };

    const cargaVentasPorCategoria = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/TotalVentasPorCategorias');
      const data = await response.json();
      console.log(data); // Verificación para no mostrar datos vacíos

      setCategorias(data.map(item => item.nombre_categoria));
      setTotalesPorCategoria(data.map(item => item.total_ventas));

    } catch (error) {
      console.error('Error al cargar ventas por categoría:', error);
      alert('Error al cargar ventas por categoría: ' + error.message);
    }
  };

    const cargaProductosVendidos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/ProductosMasVendidosPorTotal');
      const data = await response.json();
      console.log(data); // Validar en consola

      setProductos(data.map(item => item.nombre_producto));
      setCantidadesVendidas(data.map(item => parseInt(item.cantidad_vendida)));

    } catch (error) {
      console.error('Error al cargar productos más vendidos:', error);
      alert('Error al cargar productos más vendidos: ' + error.message);
    }
  };

return (
  <Container className='mt-5'>
    <br />
    <h4>Estadíscas</h4>
    <Row className='mt-4'>
      <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>
      <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <VentasPorEmpleado nombres={empleados} totales={ventasPorEmpleado} />
        </Col>
      <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <VentasPorCategorias categorias={categorias} totales={totalesPorCategoria} />
       </Col>
      <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <ProductosVendidos productos={productos} cantidades={cantidadesVendidas} />
      </Col>

    </Row>
  </Container>
  );
};

export default Estadisticas;