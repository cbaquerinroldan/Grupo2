import React, { Component } from "react";
import Popular from "../../components/Popular/Popular";
import Cartelera from "../../components/Cartelera/Cartelera"
import Buscador from "../../components/Buscador/Buscador";
import Header from "../../components/Header/Header";


class Home extends Component {
  render() {
    let menu = [
      { nombre: "Home", path: "/" },
      { nombre: "Series", path: "/series" },
      { nombre: "Peliculas", path: "/peliculas" },
      { nombre: "Favoritos", path: "/favoritos" },
      { nombre: "Login", path: "/login" },
      { nombre: "Registro", path: "/registro" }

    ];
    return (
      <React.Fragment>
        <Header elementosMenu={menu} />
        <div className="container">
          <Buscador />
          <Popular />
          <Cartelera />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;