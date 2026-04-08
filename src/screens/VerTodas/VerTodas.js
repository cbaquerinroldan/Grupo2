import React, { Component } from "react";
import Card from "../Card/Card";

class VerTodas extends Component {
  constructor(props){
    super(props);
    this.state = {
      datos: [],
    
    }
  }

 
componentDidMount(){
    fetch(this.props.url)
      .then(response => response.json())
      .then(data => this. setState({
        datos:data.results
      }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container">
        <h2 className="alert alert-primary">Ver todas</h2>

        <section className="row cards">
          {this.state.datos.map((movie) => (
            <Card key={movie.id} datos={movie} />
          ))}
        </section>

       
      </div>
    );
  }
}

export default VerTodas;