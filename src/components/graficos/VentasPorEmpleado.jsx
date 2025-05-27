import { Card, Button } from "react-bootstrap";
import { Pie} from 'react-chartjs-2';
import Chart, { LineElement } from 'chart.js/auto';
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const VentasPorEmpleado = ({ empleados, totales_Ventas }) => {
  const data = {
    labels: empleados, //Nombres de los meses
    datasets: [
      {
        label: 'Ventas(C$)',
        data: totales_Ventas, //total de ventas por empleado
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

    },
  };

  const chartRef = useRef(null);
  
  const generarPDF = () => {
    const doc = new jsPDF();
  
    // Encabezado 
    doc.setFillColor(0, 102, 102);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255,255,255);
    doc.setFontSize(22);
    doc.text("Reporte de Ventas por Empleado", doc.internal.pageSize.getWidth() / 2, 20, {align: "center"});
  
    //Capturar gráfico como imagen
    const chartInstance = chartRef.current;
    const chartImage = chartInstance?.toBase64Image();
  
    if(chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 100, 100);
    }
  
    //Tabla de datos
    const columnas = ["Empleado", "Ventas (C$)"];
    const filas = empleados.map((empleado, index) => [empleado, totales_Ventas[index]]);
  
    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 150,
      theme: "grid",
      margin: { top: 20, left: 14, right: 14 },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        textColor: 20, // Gris oscuro
      },
      headStyles: {
        fillColor: [64, 224, 208], // Turquesa
        textColor: [0, 0, 0], // Negro
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [224, 255, 255], // Celeste claro
      },
      rowStyles: {
        fillColor: [255, 255, 255], // Blanco (para filas normales)
      },
    });
  
    //Generar un nombre dinámico para el archivo PDF
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() +1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `VentasPorEmpleado_${dia}_${mes}_${anio}.pdf`;
  
    //Guardar PDF
    doc.save(nombreArchivo);
  }

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas por Empleado</Card.Title>
        <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Pie ref={chartRef} data={data} options={options} />
        </div>
        <Button className="btn btn-secondary mt-3" onClick={generarPDF}>
          Generar Reporte <i className="bi bi-download"></i>
        </Button>
      </Card.Body>
    </Card>
    );
  };
  
export default VentasPorEmpleado;