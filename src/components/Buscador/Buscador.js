import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = { valor: '' };
  }

  ejecutarBusqueda(e) {
    e.preventDefault();
    this.props.history.push("/resultadobusqueda/" + this.state.valor)
  }
  controlarCambios(e) {
    this.setState({ valor: e.target.value })
  }

  render() {
    return (
      <form className="search-form" onSubmit={(e) => this.ejecutarBusqueda(e)}>

        <input type="text" className="" name="searchData" placeholder="Buscar..." value={this.state.valor}
          onChange={(e) => this.controlarCambios(e)} />
        <button type="submit" className="btn btn-success btn-sm">Buscar</button>
      </form>
    );
  }
}

export default withRouter(Buscador);
