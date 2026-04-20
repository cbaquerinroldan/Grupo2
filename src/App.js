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
import Detalle from "./screens/Detalle/Detalle"
import VerTodas from "./screens/VerTodas/VerTodas";


function App() {
let menu = [
    { nombre: "Home", path: "/" },
    { nombre: "Series", path: "/series" },
    { nombre: "Peliculas", path: "/peliculas" },
    { nombre: "Favoritos", path: "/favoritos" },
    { nombre: "Login", path: "/login" },
    { nombre: "Registro", path: "/registro" }
    
  ];

  return (
    <>
  <Header elementosMenu={menu} />
      
        <Switch>
          <Route path="/" exact={true} component={Home}  />
          <Route path="/series" component={Series}/>
          <Route path="/peliculas" component={Peliculas}/>
          <Route path="/detalle/:tipo/:id" component={Detalle}/>
          <Route path="/login" component={Login} />
          <Route path="/registro" component={CrearCuenta} />
          <Route path="/favoritos" component={Favoritos}/>
          <Route path="/resultadobusqueda/:busqueda/:tipo" component={ResultadoBusqueda}/>
          <Route path="/vertodas/:tipo/:cate" component={VerTodas}/>
          <Route path="*" component={PaginaNoEncontrada} />
        </Switch>
        <Footer/>
    </>
  );
}

export default App;
