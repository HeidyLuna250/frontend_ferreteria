import { Card, Button } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const VentasPorCategorias = ({ categorias, totales_por_categoria }) => {
  const data = {
    labels: categorias,
    datasets: [
      {
        label: 'Ventas(C$)', 
        data: totales_por_categoria,
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
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidades',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Categorias',
        },
      },
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
    doc.text("Reporte de Ventas por Mes", doc.internal.pageSize.getWidth() / 2, 20, {align: "center"});
  
    //Capturar gráfico como imagen
    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL("image/png", 1.0);
  
    if(chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 180, 100);
    }
  
    //Tabla de datos
    const columnas = ["Categoria", "Cantidades"];
    const filas = categorias.map((categoria, index) => [categoria, totales_por_categoria[index]]);
  
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
    const nombreArchivo = `VentasPorCategorias${dia}_${mes}_${anio}.pdf`;
  
    //Guardar PDF
    doc.save(nombreArchivo);
  }

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Ventas Por Categoría</Card.Title>
        <div style={{ height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Bar ref={chartRef} data={data} options={options} />
        </div>
        <Button className="btn btn-secondary mt-3" onClick={generarPDF}>
        Generar Reporte <i className="bi bi-download"></i>
      </Button>
      </Card.Body>
    </Card>
  );
};

export default VentasPorCategorias;




