import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: '',
      tipo: 'todas'
    }
  }

  ejecutarBusqueda(e) {
    e.preventDefault();
    this.props.history.push("/resultadobusqueda/" + this.state.valor + "/" + this.state.tipo)
  }
  controlarCambios(e) {
    this.setState({ valor: e.target.value })
  }
  cambiarTipo(e) {
    this.setState({ tipo: e.target.value });
  }

  render() {
    return (
      <form className="search-form" onSubmit={(e) => this.ejecutarBusqueda(e)}>

        <input type="text" className="" name="searchData" placeholder="Buscar..." value={this.state.valor}
          onChange={(e) => this.controlarCambios(e)} />


        <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        <div className="contenedorRadio">
          <label>
            <input type="radio" value="todas" checked={this.state.tipo === "todas"} onChange={(e) => this.cambiarTipo(e)} />
            Todo
          </label>

          <label>
            <input type="radio" value="movie" checked={this.state.tipo === "movie"} onChange={(e) => this.cambiarTipo(e)} />
            Películas
          </label>

          <label>
            <input type="radio" value="tv" checked={this.state.tipo === "tv"} onChange={(e) => this.cambiarTipo(e)} />
            Series
          </label>
        </div>
      </form>
    );
  }
}

export default withRouter(Buscador);
