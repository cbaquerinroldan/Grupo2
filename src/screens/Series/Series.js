import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card"
import { Link } from "react-router-dom";
import Filtro from "../../components/Filtro/Filtro";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies();

function Series() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true)
  const [copia, setCopia] = useState([])
  

  useEffect(
    ()=> 
    fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=16a67828c6cd8c48f7481662c83f83ff")
      .then(response => response.json())
      .then(data => {
        setDatos(data.results)
        setCopia(data.results)
        setCargando(false) }
       )
      .catch(error => console.log(error)) , [] )

  function filtrarSeries(input) {
    let seriesFiltradas = copia.filter((serie) =>
      serie.name.toLowerCase().includes(input.toLowerCase())
    );
    setDatos (seriesFiltradas);
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

          <h2 className="alert alert-primary"> Todas las Series</h2>

          <Filtro filtrar={(input) => filtrarSeries(input)} />

          <section className="row cards">

            {datos.filter((serie, idx) => idx < 4)
              .map((serie) => (
                <Card key={serie.id} datos={serie} tipo="tv" logueado={user ? true : false} />
              ))
            }
          </section>
         <section className="row cards">
  {
    cargando
      ? <p>Cargando...</p>
      : datos.filter((serie, idx) => idx < 4)
          .map((serie) => (
            <Card 
              key={serie.id} 
              datos={serie} 
              tipo="tv" 
              logueado={user ? true : false} 
            />
          ))
  }
</section>
          

          <Link to="/vertodas/tv/top_rated">
            <button className="btn btn-info">Ver todas</button>
          </Link>
        </div>
      </React.Fragment>
    );
}


export default Series;
