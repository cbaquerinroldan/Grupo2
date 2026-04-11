import React, { Component } from "react";

import { Link } from "react-router-dom";
import Buscador from "../Buscador/Buscador";

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sesion: false
        }
    }

  cambiarEstadoSesion() {
    this.setState({
      sesion: this.state.sesion === true ? false : true
    });
  }


    render() {


        return (

            <div className="container">
                <section className="sectionTitulo">
                    <h1 className= "cinefuria">Cinefuria UdeSA</h1>
                    <img className="logo" src="./img/imgCinefuria.jpeg" alt="Logo"></img>
                </section>
                <nav>

                    <ul className="nav nav-tabs my-4">
                        {
                            this.props.elementosMenu.map((Menu, idx) =>
                                <li className="nav-item" key={Menu.nombre + idx}><Link to={Menu.path} className="nav-link" >{Menu.nombre}</Link></li>
                            )}
                    </ul>

                </nav>

                <Buscador/>
            </div>


        )
    }
}

export default Header;