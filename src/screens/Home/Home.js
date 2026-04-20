import React, { Component } from "react";
import Popular from "../../components/Popular/Popular";
import Cartelera from "../../components/Cartelera/Cartelera"
import Buscador from "../../components/Buscador/Buscador";
import Header from "../../components/Header/Header";


class Home extends Component {
  render() {
      <Header elementosMenu={this.props.elementosMenu} />
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