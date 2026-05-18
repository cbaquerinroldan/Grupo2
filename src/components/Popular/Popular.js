import React, { useState, useEffect } from "react";
import Card from "../Card/Card"
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Popular (props) {
  const[ datos, setDatos] = useState ([])
  const [cargando, setCargando ]= useState (true)

  useEffect(
    () => (
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=b545a645aca9ca390f2bb637dff787e6")
        .then(response => response.json())
        .then( data => {
          setDatos(data.results)
          setCargando (false)})
        .catch(error => console.log(error))), [])

  
    let user = cookies.get("user-auth-cookie");
    return (
      <div className="container">
        <h2 className="alert alert-primary"> Películas más Populares</h2>

        <section className="row cards">

          {cargando ? (<p>Cargando...</p>) : datos.filter((movie, idx) => idx < 4)
            .map((movie) => (
              <Card key={movie.id} datos={movie} tipo="movie" logueado={user ? true : false} />
            ))
          }

        </section>

        <Link to="/vertodas/movie/popular">
          <button className="btn btn-info">Ver todas</button>
        </Link>
      </div>
    );
  }



export default Popular;


