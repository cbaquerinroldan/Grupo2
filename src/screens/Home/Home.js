import React, { Component } from "react";
import Popular from "../../components/Popular/Popular";
import Cartelera from "../../components/Cartelera/Cartelera"

class Home extends Component {
  render() {
    return (
      <>
        <Popular />
        <Cartelera/>
      </>
    );
  }
}

export default Home;