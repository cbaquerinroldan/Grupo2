import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./screens/Home/Home";
import Series from "./components/Series/Series";
import Peliculas from "./components/Peliculas/Peliculas";
import Login from "./screens/Login/Login";
import CrearCuenta from "./screens/CrearCuenta/CrearCuenta";
import PaginaNoEncontrada from "./screens/PaginaNoEncontrada/PaginaNoEncontrada";
import Footer from "./components/Footer/Footer";
import ResultadoBusqueda from "./screens/ResultadoBusqueda/ResultadoBusqueda";
import Favoritos from"./screens/Favoritos/Favoritos";
import Pelicula from "./components/Pelicula/Pelicula"
import Buscador from "./components/Buscador/Buscador";


function App() {
  let menu = [
    { nombre: "Home", path: "/" },
    { nombre: "Series", path: "/series" },
    { nombre: "Peliculas", path: "/peliculas" },
    { nombre: "Favoritos", path: "/favoritos" },
    { nombre: "Login", path: "/login" },
    { nombre: "Crear Cuenta", path: "/crearcuenta" }
    
  ];

  return (
    <BrowserRouter>
 
        <p>UdeSA Movies</p>
        <Header elementosMenu={menu} />
        <Buscador/>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/series" component={Series} />
          <Route path="/peliculas" component={Peliculas} />
          <Route path="/Pelicula/id/:id" component={Pelicula} />
          <Route path="/login" component={Login} />
          <Route path="/crearcuenta" component={CrearCuenta} />
          <Route path="/favoritos" component={Favoritos} />
          <Route path="/resultadobusqueda/:busqueda" component={ResultadoBusqueda} />
          <Route path="*" component={PaginaNoEncontrada} />
        </Switch>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
