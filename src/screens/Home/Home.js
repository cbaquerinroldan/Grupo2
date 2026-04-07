import React, { Component } from "react";
import Popular from "../../components/Popular/Popular";
import Cartelera from "../../components/Cartelera/Cartelera"

class Home extends Component {
  render() {
    return (
      <div className="container">
        <Popular />
        <Cartelera/>
      </div>
    );
  }
}

export default Home;