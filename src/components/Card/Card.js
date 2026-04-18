import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      favorito: false
      
    };
  }

  cambiarEstadoDesc() {
    this.setState({
      verMas: this.state.verMas === true ? false : true
    });
  }
  agregarFav() {
    const tipo = this.props.tipo ? this.props.tipo : "movie";

    if (tipo === "movie") {
      let pelisFav = localStorage.getItem("pelisFav");

      if (pelisFav == null) {
        pelisFav = [];
      } else {
        pelisFav = JSON.parse(pelisFav);
      }

      if (pelisFav.includes(this.props.datos.id)) {
        pelisFav = pelisFav.filter(id => id !== this.props.datos.id);

        this.setState({
          favorito: false
        });
      } else {
        pelisFav.push(this.props.datos.id);

        this.setState({
          favorito: true
        });
      }

      localStorage.setItem("pelisFav", JSON.stringify(pelisFav));
    } else {
      let seriesFav = localStorage.getItem("seriesFav");

      if (seriesFav == null) {
        seriesFav = [];
      } else {
        seriesFav = JSON.parse(seriesFav);
      }

      if (seriesFav.includes(this.props.datos.id)) {
        seriesFav = seriesFav.filter(id => id !== this.props.datos.id);

        this.setState({
          favorito: false
        });
      } else {
        seriesFav.push(this.props.datos.id);

        this.setState({
          favorito: true
        });
      }

      localStorage.setItem("seriesFav", JSON.stringify(seriesFav));
    }
  
  }

  render() {
    let user = cookies.get("user-auth-cookie");
    const tipo = this.props.tipo ? this.props.tipo : "movie";
    const titulo = tipo=== "movie" ? this.props.datos.title : this.props.datos.name;

    return (

      <article className="
      single-card-movie">

        <Link to={`/detalle/${tipo}/${this.props.datos.id}`}>
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/w342${this.props.datos.poster_path}`} alt={this.props.datos.title} />
        </Link>
        <div className="cardBody">
          <h5 className="card-title">
            {titulo}
          </h5>

          {
            this.state.verMas === true ?
              <section>
                <p className="card-text">{this.props.datos.overview}</p>
              </section>
              :
              null
          }

          <button className="btn btn-primary" onClick={() => this.cambiarEstadoDesc()}>
            {this.state.verMas ? "Ver menos" : "Ver descripción"}
          </button>

          {user ? (
            <button className="btn alert-primary corazon" onClick={() => this.agregarFav()}>
              {this.state.favorito ? "🩶" : "♥️"}
            </button>
          ) : null}


        </div>
      </article>
    );
  }

}

export default Card;