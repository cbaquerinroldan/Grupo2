import React, { Component } from "react";
import {withRouter} from "react-router-dom";

class Buscador extends Component {
    constructor(props) { 
    super(props);
    this.state ={valor: ''};
}

ejecutarBusqueda(e){
    e.preventDefault();
    this.props.history.push("/resultadobusqueda/"+ this.state.valor)
}
controlarCambios(e){
    this.setState({valor: e.target.value})
}

  render() {
    return (
      <form onSubmit={(e) => this.ejecutarBusqueda(e)}>
        <label className="search-form">Buscar:</label>
        <input type="text" value={this.state.valor}
         onChange={(e) => this.controlarCambios(e)} />
        <button type="submit">Buscar</button>
      </form>
    );
  }
}

export default withRouter(Buscador);
