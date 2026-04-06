import React, { Component } from "react";
import Card from "../../components/Card/Card";

class ResultadoBusqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: []
    };
  }

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b545a645aca9ca390f2bb637dff787e6&query=${this.props.match.params.busqueda}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          resultados: data.results
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <section className="container">
        <h2>Resultados de búsqueda</h2>

        {this.state.resultados.map((movie) => (
          <Card key={movie.id} datos={movie} />
        ))}
      </section>
    );
  }
}

export default ResultadoBusqueda;