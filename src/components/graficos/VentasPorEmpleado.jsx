import { Card } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';

const VentasPorEmpleado = ({ nombres, totales }) => {

  const data = {
    labels: nombres, // Nombres de empleados
    datasets: [
      {
        label: 'Ventas por empleado (C$)',
        data: totales,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
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
        <div style={{ height: "100%", position: "relative" }}>
          <Bar data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorEmpleado;
