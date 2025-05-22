import { Card } from "react-bootstrap";
import { Line} from 'react-chartjs-2';
import Chart, { plugins } from 'chart.js/auto';


const VentasPorMes = ({ meses, totales_por_mes }) => {

  const data = {
    labels: meses, //Nombre de los meses
    datasets: [
      {
        label: 'Ventas(C$)', 
        data: totales_por_mes,//Total de ventas por mes
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgb(110, 75, 192)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
      responsive: true,
      plugins: {
        legend:{
          position: 'top',
        }
      },
      scales: {
        y:{
          begingAtZero: true,
          tittle: {
          display: true,
          text: 'Cordobas (C$)',
        },
      },
      x:{
        tittle: {
          display: true,
          text: 'Meses',
        },
      },
    },
  };

  return(
    <Card  style={{height: "100%"}}>
    <Card.Body>
      <Card.Title>Ventas Por Mes</Card.Title>
      <div style={{height: "100%", position: "relative"}}>
        <Line data={data} options={options}/>
    </div>
    </Card.Body>
  </Card>
  )
  };

export default VentasPorMes;