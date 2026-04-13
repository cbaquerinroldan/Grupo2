import React, { Component } from "react";
import { Link } from "react-router-dom";

class CrearCuenta extends Component {
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

        let email = this.state.email;
        let password = this.state.password;

        let usuarios = JSON.parse(localStorage.getItem("users"))
        if (usuarios == null){
            usuarios=[]
        }
        let emailFiltrado = usuarios.filter(function (usuario){
            return usuario.email === email;
        })

        if (password.length < 6) {
            this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }
        else if (emailFiltrado.length > 0 ){
            this.setState({error: "Este email ya fue registrado"})
            return;
        }
        else {
            let nuevoUsuario = { email, password };
            usuarios.push(nuevoUsuario);
            this.setState({error:""})
            localStorage.setItem("email", email)
            localStorage.setItem("password", password)
            localStorage.setItem("users", JSON.stringify(usuarios));
            this.props.history.push("/login")
            
        }
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
                <h2 className="alert alert-primary">Registro</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={(e) => this.evitarSubmit(e)}>
                            <div className="form-group">
                                <label for="email">Email</label>

                            <input type="text" placeholder="Email" className="form-control" onChange={(e) => this.controlarCambiosEmail(e)} value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label for="password">Contraseña</label>
                                <input type="password" placeholder="Contraseña" className="form-control" onChange={(e) => this.controlarCambiosPassword(e)} value={this.state.password} />

                                {<p>{this.state.error}</p>}
                            </div>
                           <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
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