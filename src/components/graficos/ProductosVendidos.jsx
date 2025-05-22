import { Card } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';

const ProductosVendidos = ({ productos, cantidades }) => {

  const data = {
    labels: productos, 
    datasets: [
      {
        label: 'Cantidad Vendida',
        data: cantidades, 
        backgroundColor: [
          'rgba(44, 62, 80, 0.7)',  
          'rgba(16, 59, 102, 0.7)',   
          'rgba(155, 89, 182, 0.7)', 
          'rgba(231, 76, 60, 0.7)',  
          'rgba(241, 196, 15, 0.7)', 
          'rgba(39, 174, 96, 0.7)',  
        ],
        borderColor: [
          'rgba(44, 62, 80, 1)',
          'rgb(11, 53, 95)',
          'rgba(155, 89, 182, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(241, 196, 15, 1)',
          'rgba(39, 174, 96, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Productos',
        },
      },
    },
  };

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Productos más vendidos</Card.Title>
        <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body> 
    </Card> 
  );
};

export default ProductosVendidos;