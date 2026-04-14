import React, { Component } from "react";
import Card from "../Card/Card"
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Series extends Component {
    constructor(props){
    super(props);
    this.state = {
      datos:[ ],
      cargando:true
    }
  }

componentDidMount(){
    fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=16a67828c6cd8c48f7481662c83f83ff")
      .then(response => response.json())
      .then(data => this.setState({
          datos: data.results,
          cargando:false}))
      .catch(error => console.log(error))
  }
   render() {
    let user = cookies.get("user-auth-cookie");
  return (
   <div className="container">       

    <h2 className="alert alert-primary"> Todas las Series</h2>

    <section className="row cards">
      
    {this.state.datos.filter((movie, i) => i < 4)
      .map((movie) => (
          <Card key={movie.id} datos={movie} logueado={user ? true : false}  />
        ))
      }

    </section>

      <Link to="/vertodas/tv/top_rated">
          <button className="btn btn-info">Ver todas</button>
        </Link>
    </div>
  );
}
}

export default Series;
