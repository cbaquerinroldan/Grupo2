import React, { Component } from "react";
import {withRouter} from "react-router-dom";

class Buscador extends Component {
    constructor(props) { 
    super(props);
    this.state = {valor: ''};
}

ejecutarBusqueda(e){
    e.preventDefault();
    this.props.history.push("/resultadobusqueda/"+ this.state.valor)

controlarCambios(event){
    this.setState({valor: event.target.value})
}
this.render(){
    return(
        <form onSubmit={(e)=> this.ejecutarBusqueda(e)}>
            <label>Name:</label>
            <input type= "text" onChange={(e)} => this ......bla bla bla 

    )
}
}


export default withRouter(Buscador)