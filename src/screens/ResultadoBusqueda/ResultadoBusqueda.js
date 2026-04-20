import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";

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
    let tipo = this.props.match.params.tipo;

    if (tipo === "todas" || tipo === "movie") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=b545a645aca9ca390f2bb637dff787e6&query=${busqueda}`
      )
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            resultadosPeliculas: data.results,
            cargandoPeliculas: false
          })
        )
        .catch((error) => console.log(error));
    }
    else {
      this.setState({ cargandoPeliculas: false });
    }

    if (tipo === "todas" || tipo === "tv") {
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=b545a645aca9ca390f2bb637dff787e6&query=${busqueda}`
      )
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            resultadosSeries: data.results,
            cargandoSeries: false
          })
        )
        .catch((error) => console.log(error));
    } else {
      this.setState({ cargandoSeries: false });
    }
  }

  render() {
    let menu = [
      { nombre: "Home", path: "/" },
      { nombre: "Series", path: "/series" },
      { nombre: "Peliculas", path: "/peliculas" },
      { nombre: "Favoritos", path: "/favoritos" },
      { nombre: "Login", path: "/login" },
      { nombre: "Registro", path: "/registro" }

    ];
    let tipo = this.props.match.params.tipo;

    return (
      <React.Fragment>
        <Header elementosMenu={menu} />
        <section className="container">
          <h2 className="alert alert-primary">Resultados de búsqueda</h2>

          {tipo === "todas" || tipo === "movie" ? (
            <div>
              <h3 className="alert alert-primary" >Películas</h3>
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
            </div>
          ) : null}

          {tipo === "todas" || tipo === "tv" ? (
            <>
              <h3 className="alert alert-primary" >Series</h3>
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
            </>
          ) : null}
        </section>
      </React.Fragment>
    );
  }
}

export default ResultadoBusqueda;