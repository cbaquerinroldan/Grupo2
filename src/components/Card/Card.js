import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false
    };
  }

  cambiarEstado() {
    this.setState({
      verMas: this.state.verMas === true ? false : true
    });
  }


  render() {
    return (
        
      <article className="single-card-movie">

        <Link to={`/pelicula/id/${this.props.datos.id}`}>
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/w342${this.props.datos.poster_path}`} alt={this.props.datos.title} />
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

        <button className="btn btn-primary" onClick={() => this.cambiarEstado()}>
          {this.state.verMas ? "Ver menos" : "Ver descripción"}
        </button>

</div>
      </article>
    );
  }

}

export default Card;