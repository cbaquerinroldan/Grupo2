import React, { Component } from "react";
import Card from "../Card/Card"
import { Link } from "react-router-dom";
import Filtro from "../Filtro/Filtro";
import Cookies from "universal-cookie";
import Header from "../Header/Header";

const cookies = new Cookies();

class Peliculas extends Component {
    constructor(props){
    super(props);
    this.state = {
      datos:[ ],
      copia: [],
      cargando:true
  }
  }

componentDidMount(){
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=16a67828c6cd8c48f7481662c83f83ff")
      .then(response => response.json())
      .then(data => this.setState({
          datos: data.results,
          copia: data.results,
          cargando:false}))
      .catch(error => console.log(error))
  }

  filtrarPelis(input) {
    let pelisFiltradas = this.state.copia.filter((peli) =>
      peli.title.toLowerCase().includes(input.toLowerCase())
    );

    this.setState({
      datos: pelisFiltradas
    });
  }
   render() {
      <Header elementosMenu={this.props.elementosMenu} />
let user = cookies.get("user-auth-cookie");
  return (
    
   <div className="container">

    <h2 className="alert alert-primary"> Todas las Peliculas</h2>
    <Filtro  className="filter-form px-0 mb-3"filtrar={(input) => this.filtrarPelis(input)} />

    <section className="row cards">
      
      {this.state.datos.filter((movie, idx) => idx < 4)
      .map((movie) => (
          <Card key={movie.id} datos={movie} tipo="movie" logueado={user ? true : false} />
        ))
      }

    </section>
  <Link to="/vertodas/movie/top_rated">
      <button className="btn btn-info">Ver todas</button>
    </Link>

    </div>
  );
}
}

export default Peliculas;
