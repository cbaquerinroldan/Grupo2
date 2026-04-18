import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritosPelis: [],
      favoritosSeries: []
    };
  }

  componentDidMount() {
    if (!cookies.get("user-auth-cookie")) {
      return;
    }

    let storagePeliculas = localStorage.getItem("favPeliculas");
    let storageSeries = localStorage.getItem("favSeries");

    if (storagePeliculas !== null) {
      let storageParseado = JSON.parse(storagePeliculas);

      let peliculas = [];

      storageParseado.map((id) =>
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=eaa57596af1d15ddb4b8b1c407e61403`)
          .then((response) => response.json())
          .then((data) => {
            peliculas.push(data);
            this.setState({
              favoritosPelis: peliculas
            });
          })
          .catch((error) => console.log(error))
      );
    }

    if (storageSeries !== null) {
      let storageParseado = JSON.parse(storageSeries);

      let series = [];

      storageParseado.map((id) =>
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=eaa57596af1d15ddb4b8b1c407e61403`)
          .then((response) => response.json())
          .then((data) => {
            series.push(data);
            this.setState({
              favoritosSeries: series
            });
          })
          .catch((error) => console.log(error))
      );
    }
  }

  render() {
    if (!cookies.get("user-auth-cookie")) {
      return <h2 className="subtitulo">Debes iniciar sesión para ver favoritos</h2>;
    }

    return (
      <React.Fragment>
        <h2 className="subtitulo">Tus Películas Favoritas</h2>
        <section className="row-cards">
          {this.state.favoritosPelis.length === 0 ? (
            <h3>No tenés películas agregadas a favoritos</h3>
          ) : (
            this.state.favoritosPelis.map((pelicula) => (
              <Card
                key={pelicula.id}
                id={pelicula.id}
                title={pelicula.original_title}
                image={pelicula.poster_path}
                description={pelicula.overview}
              />
            ))
          )}
        </section>

        <h2 className="subtitulo">Tus Series Favoritas</h2>
        <section className="row-cards">
          {this.state.favoritosSeries.length === 0 ? (
            <h3>No tenés series agregadas a favoritos</h3>
          ) : (
            this.state.favoritosSeries.map((serie) => (
              <Card
                key={serie.id}
                id={serie.id}
                title={serie.name}
                image={serie.poster_path}
                description={serie.overview}
              />
            ))
          )}
        </section>
      </React.Fragment>
    );
  }
}

export default Favoritos;