import React, { Component } from "react";
import { Link } from "react-router-dom";


class CrearCuenta extends Component {
    constructor(props) {
        super(props);
        this.state = { valor: `` };
    }

    evitarSubmite(event) {
        event.preventDefault();
    }

    controlarCambios(event) {
        this.setState({
            valor: event.target.value
        },
            () => console.log(event.target.value)
        )

    }

    render() {
        return (
            <div className="container">
                <h2 class="alert alert-primary">Registro</h2>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form className="" onSubmit={(e) => this.evitarSubmite(e)}>
                    <div className="form-group">
                        <label for="email">Email</label>

                        <input type="text" className="form-control" id="email" placeholder="Ingresá tu email" onChange={(e) => this.controlarCambios(e)} value={this.state.valor} />
                    </div>

                    <div className="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña" onChange={(e) => this.controlarCambios(e)} value={this.state.valor} />

                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Registrarse</button>

                </form>



                </div>
                </div>

            </div>

        );
    }
}


export default CrearCuenta;