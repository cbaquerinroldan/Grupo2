import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies()

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

        let email = this.state.email;
        let password = this.state.password;

        let usuarios = localStorage.getItem("users")
        if (usuarios == null) {
            usuarios = []
        } else {
            usuarios= JSON.parse(usuarios)
        }

        let usuarioFiltrado = usuarios.filter(function (usuario) {
            return usuario.email === email && usuario.password === password;
        });
        console.log(usuarioFiltrado)
        let user= null
        if (usuarioFiltrado.length > 0) {
            user = usuarioFiltrado
            console.log(user)
        if (user){
            cookies.set("user-auth-cookie", user[0].email);

            this.setState({
                error: "" });
            this.props.history.push("/");
        }
        } else {
            this.setState({
                error: "Credenciales incorrectas."}) 
           }   }

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
          <Header elementosMenu={this.props.elementosMenu} />
        return (
            <div className="container">
                <h2 className="alert alert-primary">Iniciar sesión</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="" onSubmit={(e) => this.evitarSubmit(e)}>
                            <div className="form-group">
                                <label for="email">Email</label>

                                <input type="text" className="form-control" id="email" placeholder="Ingresá tu email" onChange={(e) => this.controlarCambiosEmail(e)} value={this.state.email} />
                            </div>

                            <div className="form-group">
                                <label for="password">Contraseña</label>
                                <input type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña" onChange={(e) => this.controlarCambiosPassword(e)} value={this.state.password} />

                                {<p>{this.state.error}</p>}

                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>

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