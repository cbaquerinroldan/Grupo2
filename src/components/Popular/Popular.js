import React, { Component } from "react";
import Card from "../Card/Card"

class Popular extends Component {
  constructor(props){
    super(props);
    this.state = {
      datos:[ ]
    }
  }

componentDidMount(){
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTQ1YTY0NWFjYTljYTM5MGYyYmI2MzdkZmY3ODdlNiIsIm5iZiI6MTc3NDI5NTY3MS45ODUsInN1YiI6IjY5YzE5YTc3YWY0MjMxMjg0YjRmZjk2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PmAIAvvwGkCjuft0B57OINxngM3Li3YtRb4fNrcTaGY")
      .then(response => response.json())
      .then(data => this.setState({ datos: data.results }))
      .catch(error => console.log(error))
  }
   render(){
    return(
      <section className='container'>
        <h2>Peliculas mas Populares</h2>
       {
          this.state.datos.map((movie, idx) =>
            <Card key={movie.id + idx} datos={movie} />
          )
        }
      </section>
    )
  }
}


export default Popular;