import { Card } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';

const VentasPorCategorias = ({ categorias, totales }) => {
  const data = {
    labels: categorias, // ✅ Cambiado de "meses"
    datasets: [
      {
        label: 'Ventas por Categoría (C$)',
        data: totales,
        backgroundColor: [
          'rgba(206, 64, 194, 0.7)',   
          'rgba(29, 89, 150, 0.7)',   
          'rgba(115, 182, 89, 0.7)', 
          'rgba(231, 76, 60, 0.7)', 
          'rgba(241, 196, 15, 0.7)', 
          'rgba(39, 174, 96, 0.7)',  
        ],
        borderColor: [
          'rgb(185, 68, 156)',
          'rgb(29, 84, 139)',
          'rgb(100, 182, 89)',
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
  };

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas por Categorías</Card.Title>
        <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Doughnut data={data} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VentasPorCategorias;
