import React,{ Component } from "react";
import { Link } from "react-router-dom"; 

class Card extends Component{
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
      <article className="AGREGAR CLASE">
        <img src= {`https://image.tmdb.org/t/p/w342/${this.props.poster_path}.jpg`} alt={this.props.title} />
        <h2>{this.props.title}</h2>
        {
          this.state.verMas === true ?
          <section>
            <p>{this.props.overview}</p>
          </section>
          :
          null
        }
        <Link to={`/Pelicula/id/${this.props.id}`}>Ir a Detalle</Link>


        <button className="Agregar CLase" onClick={() => this.cambiarEstado()}>
          {this.state.verMas ? "Ver menos" : "Ver más"}
        </button>


        {
          this.state.verMas === true ?
          <section>
            <p>{this.props.overview}</p>
          </section>
          :
          null
        }
      </article>
    );
  }

}

export default Card;