import { Card } from "react-bootstrap";
import { Pie } from 'react-chartjs-2';

const VentasPorEmpleado = ({ nombres, totales }) => {

  const data = {
    labels: nombres, // Nombres de empleados
    datasets: [
      {
        label: 'Ventas por empleado (C$)',
        data: totales,
        backgroundColor: [
          'rgba(0, 128, 255, 0.2)',     
          'rgba(255, 0, 128, 0.2)',     
          'rgba(255, 230, 0, 0.2)',    
          'rgba(0, 255, 128, 0.2)',     
          'rgba(255, 128, 0, 0.2)',    
          'rgba(128, 255, 0, 0.2)',     
          'rgba(0, 255, 255, 0.2)',     
          'rgba(255, 0, 0, 0.2)',      
          'rgba(0, 0, 255, 0.2)',       
          'rgba(128, 0, 0, 0.2)'        
        ],
        borderColor: [
          'rgba(0, 128, 255, 1)',
          'rgba(255, 0, 128, 1)',
          'rgb(255, 196, 0)',
          'rgba(0, 255, 128, 1)',
          'rgba(255, 128, 0, 1)',
          'rgba(128, 255, 0, 1)',
          'rgba(0, 255, 255, 1)',
          'rgba(255, 0, 0, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(128, 0, 0, 1)'
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
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Córdobas (C$)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Empleados',
        },
      },
    },
  };

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas por empleado</Card.Title>
      <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Pie data={data} options={options} />
      </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorEmpleado;