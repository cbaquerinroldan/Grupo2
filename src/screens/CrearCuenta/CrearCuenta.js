import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

function CrearCuenta () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    

   function evitarSubmit(event) {
        event.preventDefault();

        let email = email;
        let password = password;

        let usuarios = JSON.parse(localStorage.getItem("users"))
        if (usuarios == null) {
            usuarios = []
        }
        let emailFiltrado = usuarios.filter(function (usuario) {
            return usuario.email === email;
        })

        if (password.length < 6) {
            setError( "La contraseña debe tener al menos 6 caracteres");
            return;
        }
        else if (emailFiltrado.length > 0) {
            setError( "Este email ya fue registrado")
            return;
        }
        else {
            let nuevoUsuario = { email, password };
            usuarios.push(nuevoUsuario);
            setError( "" )
            localStorage.setItem("email", email)
            localStorage.setItem("password", password)
            localStorage.setItem("users", JSON.stringify(usuarios));
            props.history.push("/login")

        }
    }

    function controlarCambiosEmail(event) {
        setEmail(event.target.value);
    }

    function controlarCambiosPassword(event) {
        setPassword(event.target.value);
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
                    <h2 className="alert alert-primary">Registro</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form onSubmit={(e) => evitarSubmit(e)}>
                                <div className="form-group">
                                    <label for="email">Email</label>

                                    <input type="text" placeholder="Email" className="form-control" onChange={(e) => controlarCambiosEmail(e)} value={email} />
                                </div>
                                <div className="form-group">
                                    <label for="password">Contraseña</label>
                                    <input type="password" placeholder="Contraseña" className="form-control" onChange={(e) => controlarCambiosPassword(e)} value={password} />

                                    {<p>{error}</p>}
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
            </React.Fragment>
        );
    
}

export default CrearCuenta;