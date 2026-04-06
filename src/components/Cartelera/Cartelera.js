import React, { Component } from "react";
import Card from "../Card/Card"

class Cartelera extends Component {
  constructor(props){
    super(props);
    this.state = {
      datos:[ ]
    }
  }

componentDidMount(){
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=b545a645aca9ca390f2bb637dff787e6")
      .then(response => response.json())
      .then(data => this.setState({
          datos: data.results}))
      .catch(error => console.log(error))
  }
   render() {
  return (
   <div className="container">
    <h2 className="alert alert-primary"> Películas en Cartelera</h2>

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


export default Cartelera;


