import React, { Component } from "react";
import { Link } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }
    evitarSubmit(event) {
        event.preventDefault();
    }

     controlarCambiosEmail(event) {
    this.setState({
        email: event.target.value
    });
}

controlarCambiosPassword(event) {
    this.setState({
        password: event.target.value
    });
}


    render() {
        return (
            <div className="container">
                <h2 class="alert alert-primary">Iniciar sesión</h2>
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <form className="" onSubmit={(e) => this.evitarSubmit(e)}>
                            <div className="form-group">
                                <label for="email">Email</label>

                                <input type="text" className="form-control" id="email" placeholder="Ingresá tu email" onChange={(e) => this.controlarCambiosEmail(e)} value={this.state.valor1} />
                            </div>

                            <div className="form-group">
                                <label for="password">Contraseña</label>
                                <input type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña" onChange={(e) => this.controlarCambiosPassword(e)} value={this.state.valor2} />

                               {<p>{this.state.error}</p>}
                               
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>

                        </form>
                        <p className="mt-3 text-center">¿No tenes cuenta?
                            <Link to="/registro">
                                Registrarse
                            </Link>
                        </p>




                    </div>
                </div>

            </div>

        );
    }
}


export default Login;