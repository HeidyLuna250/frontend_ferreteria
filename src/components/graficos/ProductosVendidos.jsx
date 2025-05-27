import { Card, Button } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const chartRef = useRef(null);
  
  const generarPDF = () => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFillColor(0, 102, 102);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255, 255, 255); //Texto del encabezado
    doc.setFontSize(22);
    doc.text("Reporte de Productos Más Vendidos", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

    // Gráfico como imagen
    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL("image/png", 1.0);

    if (chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 180, 100);
    }

    // Tabla de productos
    const columnas = ["Producto", "Cantidad Vendida"];
    const filas = productos.map((prod, index) => [prod, cantidades[index]]);

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

    // Nombre del archivo
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `ProductosVendidos_${dia}_${mes}_${anio}.pdf`;

    doc.save(nombreArchivo);
  };

  return (
    <Card style={{ height: "100%" }}>
      <Card.Body>
        <Card.Title>Productos más vendidos</Card.Title>
        <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Bar ref={chartRef} data={data} options={options} />
        </div>
        <Button className="btn btn-secondary mt-3" onClick={generarPDF}>
        Generar Reporte <i className="bi bi-download"></i>
      </Button>
      </Card.Body> 
    </Card> 
  );
};

export default ProductosVendidos;