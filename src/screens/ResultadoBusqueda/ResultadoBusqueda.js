import React, { Component } from "react";
import Card from "../../components/Card/Card";

class ResultadoBusqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultadosPeliculas: [],
      resultadosSeries: [],
      cargandoPeliculas: true,
      cargandoSeries: true
    };
  }
  componentDidMount() {
    let busqueda = this.props.match.params.busqueda;

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b545a645aca9ca390f2bb637dff787e6&query=${busqueda}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
            resultadosPeliculas: data.results,
            cargandoPeliculas: false})
      )
      .catch((error) => console.log(error));

    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=b545a645aca9ca390f2bb637dff787e6&query=${busqueda}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          resultadosSeries: data.results,
          cargandoSeries: false})
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <section className="container">
        <h2  className="alert alert-primary">Resultados de búsqueda</h2>

        <h3>Películas</h3>
       <section className="cards">
          {this.state.cargandoPeliculas === true ? (
            <p>Cargando...</p>
          ) : this.state.resultadosPeliculas.length > 0 ? (
            this.state.resultadosPeliculas.map((movie) => (
              <Card key={movie.id} datos={movie} tipo="movie" />
            ))
          ) : (
            <p>No hay resultados de películas</p>
          )}
       </section>
        <h3>Series</h3>
         <section className="cards">
          {this.state.cargandoSeries === true ? (
            <p>Cargando...</p>
          ) : this.state.resultadosSeries.length > 0 ? (
            this.state.resultadosSeries.map((serie) => (
              <Card key={serie.id} datos={serie} tipo="tv" />
            ))
          ) : (
            <p>No hay resultados de series</p>
          )}
       </section>
      </section>
    );
  }
}

export default ResultadoBusqueda;