import React, { Component } from "react";
import Popular from "../../components/Popular/Popular";
import Cartelera from "../../components/Cartelera/Cartelera"
import Buscador from "../../components/Buscador/Buscador";


class Home extends Component {
  render() {
    return (
      <div className="container">
        <Buscador/>
        <Popular />
        <Cartelera/>
      </div>
    );
  }
}

export default Home;