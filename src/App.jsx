import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Encabezado from "./components/encabezado/Encabezado";
import Clientes from "./views/Clientes";
import Empleados from "./views/Empleados";
import Productos from "./views/Productos";
import Categorias from "./views/Categorias";
import Ventas from "./views/Ventas";
import Compras from "./views/Compras";
import Usuarios from "./views/Usuarios";
import './App.css';

const App = () => {
  return (
    <Router>
      <main className="margen-superior-main">

        <Encabezado />

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio/>} />
          <Route path="/clientes" element={<Clientes/>} />
          <Route path="/empleados" element={<Empleados/>} />
          <Route path="/productos" element={<Productos/>} />
          <Route path="/categorias" element={<Categorias/>} />
          <Route path="/ventas" element={<Ventas/>} />
          <Route path="/compras" element={<Compras/>} />
          <Route path="/usuarios" element={<Usuarios/>} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;