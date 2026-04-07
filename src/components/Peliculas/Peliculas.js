import React, { Component } from "react";
import Card from "../Card/Card"

class Peliculas extends Component {
    constructor(props){
    super(props);
    this.state = {
      datos:[ ]
    }
  }

componentDidMount(){
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=16a67828c6cd8c48f7481662c83f83ff")
      .then(response => response.json())
      .then(data => this.setState({
          datos: data.results}))
      .catch(error => console.log(error))
  }
   render() {
  return (
   <div className="container">
    <h2 className="alert alert-primary"> Todas las Peliculas</h2>

    <section className="row cards">
      
      {this.state.datos.map((movie) => (
          <Card key={movie.id} datos={movie} />
        ))
      }

    </section>
    </div>
  );
}
}

export default Peliculas;
