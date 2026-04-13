import React, { Component } from "react";
import { Link } from "react-router-dom";


class CrearCuenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valor1: ``,
            valor2: ``
        };
    }

    evitarSubmite(event) {
        event.preventDefault();

    }

    controlarCambiosEmail(event) {
        this.setState({
            valor1: event.target.value
        },
            () => console.log(event.target.value)
        )

    }

    controlarCambiosPassword(event) {
        this.setState({
            valor2: event.target.value
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

                                <input type="text" className="form-control" id="email" placeholder="Ingresá tu email" onChange={(e) => this.controlarCambiosEmail(e)} value={this.state.valor1} />

                            </div>

                            <div className="form-group">
                                <label for="password">Contraseña</label>
                                <input type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña" onChange={(e) => this.controlarCambiosPassword(e)} value={this.state.valor2} />
                                {
                                    this.state.valor2.length < 6 ? <p className="alert alert-danger">La contraseña debe tener al menos 6 caracteres</p> : null
                                }
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Registrarse</button>

                        </form>



                        <p className="mt-3 text-center">¿Ya tenes cuenta?
                            <Link to="/login">
                                Iniciar sesión
                            </Link>
                        </p>




                    </div>
                </div>

            </div>

        );
    }
}


export default CrearCuenta;