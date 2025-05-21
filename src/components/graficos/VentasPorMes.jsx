import { Card } from "react-bootstrap";
import { Line } from 'react-chartjs-2';

const VentasPorMes = ({ meses, totales_por_mes }) => {

const data = {
  labels: meses, //Nombres de los meses
  datasets: [
  {
    label: 'Ventas(C$)',
    data: totales_por_mes, //Total de ventas por mes 
    backgroundColor: 'rgba(153, 102, 255, 0.2)',
    borderColor: 'rgba(153, 102, 255, 1)',
    borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend:{
      postion: 'top',
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
        text: 'Meses',
      },
    },
  },
};

return (
  <Card style={{ height: "100%" }}>
    <Card.Body>
      <Card.Title>Ventas por mes</Card.Title>
      <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Line data={data} options={options} />
      </div>
      </Card.Body> 
    </Card> 
);
};
export default VentasPorMes;