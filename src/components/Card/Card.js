import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      pelisFav: false
      seriesFav: false
    };
  }

cambiarEstadoDesc() {
    this.setState({
      verMas: this.state.verMas === true ? false : true
    });
  }
agregarFav() {

        let pelisFav = localStorage.getItem("pelisFav")
        if (pelisFav == null) {
            pelisFav = []
        } else {
            pelisFav= JSON.parse(pelisFav)
        }
       if(pelisFav.includes(this.props.datos.id)){
        pelisFav = pelisFav.filter(id => id != this.props.datos.id)
        this.setState({
          pelisFav
        })
       }else {
        pelisFav.push(this.state.datos.id)
        localStorage.setItem("pelisFav", JSON.stringify(pelisFav));
       }

  }

  render() {

    return (
        
      <article className="single-card-movie">

{/* QUEDA COMPLETAR BIEN ESTA RUTA CUANDO SE HAGA LA PGINA DE DETALLE */}
        <Link to={`/detalle/${this.props.fav.tipo}/${this.props.datos.id}`}>
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/w342${this.props.favoritos.poster_path}`} alt={this.props.datos.title} />
        </Link>
        <div class="cardBody">
        <h5 className="card-title">{this.props.datos.title}</h5>

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
        {this.props.logueado ?(
          <button className="btn alert-primary corazon" onClick={() => this.agregarFav()}>
          {this.state.favorito ? "🩶" : "♥️"}
        </button>
        ): null}
        

</div>
      </article>
    );
  }

}

export default Card;