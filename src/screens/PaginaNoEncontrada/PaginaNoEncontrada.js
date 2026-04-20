import Header from "../../components/Header/Header";
import React, { Component } from "react";
class PaginaNoEncontrada extends Component {
  constructor(props) {
    super(props);
  }

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

        <h1>Error 404</h1>
      </React.Fragment>
    )
  }
}

export default PaginaNoEncontrada;