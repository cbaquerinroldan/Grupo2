import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies()

function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function evitarSubmit(event) {
        event.preventDefault();

        let email = email;
        let password = password;

        let usuarios = localStorage.getItem("users")
        if (usuarios == null) {
            usuarios = []
        } else {
            usuarios = JSON.parse(usuarios)
        }

        let usuarioFiltrado = usuarios.filter(function (usuario) {
            return usuario.email === email && usuario.password === password;
        });
        console.log(usuarioFiltrado)
        let user = null
        if (usuarioFiltrado.length > 0) {
            user = usuarioFiltrado
            console.log(user)
            if (user) {
                cookies.set("user-auth-cookie", user[0].email);
            setError( "");
            return;
                props.history.push("/");
            }
        } else {
            setError("Credenciales incorrectas");
    
        }
    }

    function controlarCambiosEmail(event) {
        setEmail(event.target.value);
    }

    function controlarCambiosPassword(event) {
        setPassword (event.target.value);
    }

        let menu = [
            { nombre: "Home", path: "/" },
            { nombre: "Series", path: "/series" },
            { nombre: "Peliculas", path: "/peliculas" },
            { nombre: "Favoritos", path: "/favoritos" },
            { nombre: "Login", path: "/login" },
            { nombre: "Registro", path: "/registro" }

        ];
        return (
            <React.Fragment>
                <Header elementosMenu={menu} />
                <div className="container">
                    <h2 className="alert alert-primary">Iniciar sesión</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form className="" onSubmit={(e) => evitarSubmit(e)}>
                                <div className="form-group">
                                    <label for="email">Email</label>

                                    <input type="text" className="form-control" id="email" placeholder="Ingresá tu email" onChange={(e) => controlarCambiosEmail(e)} value={email} />
                                </div>

                                <div className="form-group">
                                    <label for="password">Contraseña</label>
                                    <input type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña" onChange={(e) => controlarCambiosPassword(e)} value={password} />

                                    {<p>{error}</p>}

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
            </React.Fragment>

        );
    }


export default Login;