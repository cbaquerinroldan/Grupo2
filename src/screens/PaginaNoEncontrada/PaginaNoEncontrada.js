import Header from "../../components/Header/Header";
import React, { Component } from "react";
class PaginaNoEncontrada extends Component {
  constructor(props) {
    super(props);}

    render(){
         <Header elementosMenu={this.props.elementosMenu} />
    return (
       
            <h1>Error 404</h1> 
      
    )
}
}

export default PaginaNoEncontrada;