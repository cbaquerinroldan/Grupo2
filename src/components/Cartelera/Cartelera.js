import React, { Component } from "react";
import Card from "../Card/Card"
import { Link } from "react-router-dom";

class Cartelera extends Component {
  constructor(props){
    super(props);
    this.state = {
     datos:[ ],
    cargando:true
    }
  }

componentDidMount(){
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=b545a645aca9ca390f2bb637dff787e6")
      .then(response => response.json())
      .then(data => this.setState({
          datos: data.results,
          cargando:false}))
      .catch(error => console.log(error))
  }
   render() {
  return (
   <div className="container">
    <h2 className="alert alert-primary"> Películas en Cartelera</h2>

    <section className="row cards">
      
       {this.state.datos.filter((movie, i) => i < 4)
      .map((movie) => (
          <Card key={movie.id} datos={movie} />
        ))
      }

    </section>

     <Link to="/vertodas/movie/now_playing">
         <button className="btn btn-info">Ver todas</button>
       </Link>
    
    </div>
  );
}
}


export default Cartelera;


