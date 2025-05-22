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
  const [totales_Ventas, setTotalVentas] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [totalesPorCategoria, setTotalesPorCategoria] = useState([]);

  const [productos, setProductos] = useState([]); 
  const [cantidadesVendidas, setCantidadesVendidas] = useState([]); 

  useEffect(() => {
    cargaVentasPorMes();
    cargaVentasPorEmpleado();
    cargarVentasPorCategoria();
    cargaProductosVendidos();
  }, []); 

  const cargaVentasPorMes = async () => {
  try{
    const response = await fetch('http://localhost:3000/api/totalventaspormes');
    const data = await response.json();

    setMeses(data.map(item => item.mes));
    setTotalesPorMes(data.map(item => item.total_ventas));
  } catch (error) {
    console.error('Error al cargar ventas:', error);
    alert('Error al cargar ventas: ' + error.message);
  }
  };

    const cargaVentasPorEmpleado = async () => {
  try{
    const response = await fetch('http://localhost:3000/api/totalventasporempleado');
    const data = await response.json();

    setEmpleados(data.map(item => item.primer_nombre + ' ' + item.segundo_nombre + ' ' + item.primer_apellido));
    setTotalVentas(data.map(item => item.total_ventas));
  } catch (error) {
    console.error('Error al cargar ventas por empleado:', error);
    alert('Error al cargar ventas por empleado: ' + error.message);
  }
  };

    const cargarVentasPorCategoria = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/totalventasporcategorias');
    const data = await response.json();

    // Usamos 'nombre_categoria' como etiqueta
    setCategorias(data.map(item => item.nombre_categoria));

    // Total de ventas por cada categoría
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

      setProductos(data.map(item => item.nombre_producto));
      setCantidadesVendidas(data.map(item => parseInt(item.cantidad_vendida)));

    } catch (error) {
      console.error('Error al cargar productos más vendidos:', error);
      alert('Error al cargar productos más vendidos: ' + error.message);
    }
  };

  return(
    <Container className='mt-5'>
      <br />
      <h4>Estadísticas</h4>
      <Row className='mt-4'>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
         <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <VentasPorEmpleado empleados={empleados} totales_Ventas={totales_Ventas} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <VentasPorCategorias categorias={categorias} totales_por_categoria={totalesPorCategoria} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
          <ProductosVendidos productos={productos} cantidades={cantidadesVendidas} />
      </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;