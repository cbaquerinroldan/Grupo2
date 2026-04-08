import React, { Component } from "react";
import Card from "../Card/Card"
import { Link } from "react-router-dom";

class Popular extends Component {
  constructor(props){
    super(props);
    this.state = {
      datos:[ ]
    }
  }

componentDidMount(){
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=b545a645aca9ca390f2bb637dff787e6")
      .then(response => response.json())
      .then(data => this.setState({
          datos: data.results}))
      .catch(error => console.log(error))
  }
   render() {
  return (
   <div className="container">
    <h2 className="alert alert-primary"> Películas más Populares</h2>

    <section className="row cards">
      
      {this.state.datos.filter((movie, i) => i < 4)
      .map((movie) => (
          <Card key={movie.id} datos={movie} />
        ))
      }

    </section>

    <Link to="/ver-todas/movies/popular">
       <button>Ver todas</button>
    </Link>
    </div>
  );
}
}


export default Popular;


