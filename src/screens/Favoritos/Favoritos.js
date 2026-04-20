import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";
const cookies = new Cookies();

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      series: [],
      cargadoPeliculas: false,
      cargadoSeries: false
    };
  }

  componentDidMount() {
    let user = cookies.get("user-auth-cookie");

    if (user !== undefined) {
    let pelisFav = localStorage.getItem("pelisFav");
    let pelisFavJson = pelisFav === null ? [] : JSON.parse(pelisFav);

      if (pelisFavJson.length === 0) {
        this.setState({
          cargadoPeliculas: true
        });
      } else {
        let pelisRecuperadas = [];

        pelisFavJson.map(id =>
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=16a67828c6cd8c48f7481662c83f83ff`)
            .then(res => res.json())
            .then(data => {
              pelisRecuperadas.push(data);

              this.setState({
                peliculas: pelisRecuperadas,
                cargadoPeliculas: true
              });
            })
            .catch(err => console.log(err))
        );
      }
      let seriesFav = localStorage.getItem("seriesFav");

      let seriesFavJson = seriesFav === null? [] : JSON.parse(seriesFav);
      
      if (seriesFavJson.length === 0) {
        this.setState({
          cargadoSeries: true
        });
      } else {
        let seriesRecuperadas = [];

        seriesFavJson.map(id =>
          fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=16a67828c6cd8c48f7481662c83f83ff`)
            .then(res => res.json())
            .then(data => {
            seriesRecuperadas.push(data);

              this.setState({
                series: seriesRecuperadas,
                cargadoSeries: true
              });
            })
            .catch(err => console.log(err))
        );
      }
    }
  }
    sacarDeFavoritos(id,tipo){
      if (tipo ==="movie"){
        let pelisFiltradas= this.state.peliculas.filter (peli => peli.id !== id)
        this.setState({
          peliculas: pelisFiltradas
        })
      }else{
        let seriesFiltradas = this.state.series.filter(serie => serie.id !== id)
        this.setState({
          series: seriesFiltradas
        })
      }
    }
  render() {
      <Header elementosMenu={this.props.elementosMenu} />
    let user = cookies.get("user-auth-cookie");

    if (user === undefined) {
      return <h2>Tenés que iniciar sesión</h2>;
    }

    return (
      <div className="container">
        <h2 className="alert alert-primary">Películas favoritas</h2>
        <div className="row cards">
          {this.state.cargadoPeliculas === false ? (
            <p>Cargando...</p>
          ) : this.state.peliculas.length === 0 ? (
            <p>No tenés películas favoritas</p>
          ) : (
            this.state.peliculas.map((peli, i) => (
              <Card key={i} datos={peli} tipo="movie" sacarDeFavoritos= {(id,tipo) => this.sacarDeFavoritos(id,tipo)} />
            ))
          )}
        </div>

        <h2 className="alert alert-primary">Series favoritas</h2>

        <div className="row cards">
          {this.state.cargadoSeries === false ? (
            <p>Cargando...</p>
          ) : this.state.series.length === 0 ? (
            <p>No tenés series favoritas</p>
          ) : (
            this.state.series.map((serie, i) => (
              <Card key={i} datos={serie} tipo="tv" sacarDeFavoritos= {(id,tipo) => this.sacarDeFavoritos(id,tipo)} />
            ))
          )}
        </div>

      </div>
    );
  }
}

export default Favoritos;