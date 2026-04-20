import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorito: false,
      valor: "♥️",
      verMas: false
    };
  }

  componentDidMount() {
    let tipo = this.props.tipo === "movie" ? "pelisFav" : "seriesFav";
    let storage = localStorage.getItem(tipo);
    let storageJson = storage == null ? [] : JSON.parse(storage);

    if (storageJson.filter(id => id === this.props.datos.id).length > 0) {
      this.setState({
        favorito: true,
        valor: "🩶"
      });
    }
  }

  agregarFav(id, tipo) {
    tipo = tipo === "movie" ? "pelisFav" : "seriesFav";
    let storage = localStorage.getItem(tipo);
    let storageJson = storage == null ? [] : JSON.parse(storage);
    storageJson.push(id);
    localStorage.setItem(tipo, JSON.stringify(storageJson));

    this.setState({
      favorito: true,
      valor: "🩶"
    });
  }

  eliminar(id, tipo) {
    tipo = tipo === "movie" ? "pelisFav" : "seriesFav";
    let storage = localStorage.getItem(tipo);
    let storageJson = storage == null ? [] : JSON.parse(storage);

    let nuevaLista = storageJson.filter(idx => idx !== id);
    localStorage.setItem(tipo, JSON.stringify(nuevaLista));

    this.setState({
      favorito: false,
      valor: "♥️"
    });
    if (this.props.sacarDeFavoritos) {
      this.props.sacarDeFavoritos(id, this.props.tipo);
    }
  }

  cambiarEstadoDesc() {
    this.setState({
      verMas: this.state.verMas === true ? false : true
    });
  }
  render() {
    let user = cookies.get("user-auth-cookie");
    const tipo = this.props.tipo ? this.props.tipo : "movie";
    const titulo = tipo === "movie" ? this.props.datos.title : this.props.datos.name;

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
            <button className="btn alert-primary" onClick={() => this.state.favorito === false ? this.agregarFav(this.props.datos.id, this.props.tipo) : this.eliminar(this.props.datos.id, this.props.tipo)}>
              {this.state.valor}
            </button>
          ) : null}

        </div>
      </article>
    );
  }
}

export default Card;