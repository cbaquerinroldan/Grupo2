import React, { Component } from "react";
import Card from "../../components/Card/Card"
import { Link } from "react-router-dom";
import Filtro from "../../components/Filtro/Filtro";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies();

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      cargando: true,
      copia: []
    }
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=16a67828c6cd8c48f7481662c83f83ff")
      .then(response => response.json())
      .then(data => this.setState({
        datos: data.results,
        copia: data.results,
        cargando: false
      }))
      .catch(error => console.log(error))
  }
  filtrarSeries(input) {
    let seriesFiltradas = this.state.copia.filter((serie) =>
      serie.name.toLowerCase().includes(input.toLowerCase())
    );

    this.setState({
      datos: seriesFiltradas
    });
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
    let user = cookies.get("user-auth-cookie");

    return (
      <React.Fragment>
        <Header elementosMenu={menu} />

        <div className="container">

          <h2 className="alert alert-primary"> Todas las Series</h2>

          <Filtro filtrar={(input) => this.filtrarSeries(input)} />

          <section className="row cards">

            {this.state.datos.filter((movie, idx) => idx < 4)
              .map((movie) => (
                <Card key={movie.id} datos={movie} tipo="tv" logueado={user ? true : false} />
              ))
            }
          </section>

          <Link to="/vertodas/tv/top_rated">
            <button className="btn btn-info">Ver todas</button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Series;
