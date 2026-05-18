import React, { useState, useEffect} from "react";
import Card from "../../components/Card/Card"
import { Link } from "react-router-dom";
import Filtro from "../../components/Filtro/Filtro";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies();

function Peliculas () {

  const [datos, setDatos] = useState([])
  const [copia, setCopia] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(
    () => {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=16a67828c6cd8c48f7481662c83f83ff")
      .then(response => response.json())
      .then(data => {
        setDatos(data.results);
        setCopia(data.results);
        setCargando(false);
      })
          x  
      .catch(error => console.log(error)) }, [])
  
  function filtrarPelis(input) {
    let pelisFiltradas = copia.filter((peli) =>
      peli.title.toLowerCase().includes(input.toLowerCase())
    );
    setDatos(pelisFiltradas);
  }

    let menu = [
      { nombre: "Home", path: "/" },
      { nombre: "Series", path: "/series" },
      { nombre: "Peliculas", path: "/peliculas" },
      { nombre: "Favoritos", path: "/favoritos" },
      { nombre: "Login", path: "/login" },
      { nombre: "Registro", path: "/registro" }

    ];
    let user = cookies.get("user-auth-cookie");
    return (
      <React.Fragment>
        <Header elementosMenu={menu} />

        <div className="container">

          <h2 className="alert alert-primary"> Todas las Peliculas</h2>
          <Filtro className="filter-form px-0 mb-3" filtrar ={(input) => filtrarPelis(input)} />

          <section className="row cards">

            {datos.filter((movie, idx) => idx < 4)
              .map((movie) => (
                <Card key={movie.id} datos={movie} tipo="movie" logueado={user ? true : false} />
              ))
            }

          </section>
          <Link to="/vertodas/movie/top_rated">
            <button className="btn btn-info">Ver todas</button>
          </Link>

        </div>
      </React.Fragment>
    );
}

export default Peliculas;
