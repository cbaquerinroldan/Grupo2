import React, { Component } from "react";

class Filtro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: ""
    };
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  guardarCambios(event) {
    this.setState(
      { valor: event.target.value }, () => this.props.filtrar(this.state.valor)
    );
  }

  render() {
    return (
      <form onSubmit={(event) => this.evitarSubmit(event)} className="filter-form px-0 mb-3">
        <input type="text" placeholder="Buscar..."
          onChange={(event) => this.guardarCambios(event)}
          value={this.state.valor}
        />
      </form>
    );
  }
}

export default Filtro;