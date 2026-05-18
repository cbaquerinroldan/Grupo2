import React, { useState} from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";


const cookies = new Cookies();

function Header(props) {
  const [sesion, setSesion] = useState(false);

  function logout() {
    cookies.remove("user-auth-cookie");
   setSesion( sesion === true ? false : true );
  }

  let user = cookies.get("user-auth-cookie");

        return (

            <div className="container">
                <section className="sectionTitulo">
                    <h1 className="cinefuria">UdeSA Movies</h1>
                    <img className="logo" src="./img/logo.png" alt="Logo"></img>
                </section>
                <nav>

                    <ul className="nav nav-tabs my-4">

                        {
                            user ? props.elementosMenu.map((Menu, idx) => (
                                Menu.nombre !== "Login" && Menu.nombre !== "Registro" ?
                                    <li className="nav-item" key={Menu.nombre + idx}>
                                        <Link className="nav-link" to={Menu.path}>{Menu.nombre}</Link>
                                    </li>
                                    : null
                            ))

                                :


                                props.elementosMenu.map((Menu, idx) => (
                                    Menu.nombre !== "Favoritos" ?
                                        <li className="nav-item" key={Menu.nombre + idx}>
                                            <Link className="nav-link" to={Menu.path}>{Menu.nombre}</Link>
                                        </li>
                                        : null
                                ))
                        }

                        {
                            user ?
                                <li className="nav-item">
                                    <span className="nav-link" onClick={() => logout()}>
                                        Cerrar sesión
                                    </span>
                                </li>
                                : null
                        }

                    </ul>

                </nav>

            </div>


        )
    }


export default Header;