import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";

function ResultadoBusqueda () {
    const [resultadosPeliculas, setResultadosPeliculas] = useState([])
    const [resultadosSeries, setResultadosSeries] = useState([])
    const [cargandoPeliculas, setCargandoPeliculas] = useState(true)
    const [cargandoSeries, setCargandoSeries] = useState(true)
   
  useEffect ( 
    () => {
    let busqueda = props.match.params.busqueda;
    let tipo = props.match.params.tipo;

    if (tipo === "todas" || tipo === "movie") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=b545a645aca9ca390f2bb637dff787e6&query=${busqueda}`
      )
        .then((res) => res.json())
        .then((data) => {
            setResultadosPeliculas (data.results)
            setCargandoPeliculas (false)
          })
        
        .catch((error) => console.log(error));
    }
    else {
     setCargandoPeliculas (false);
    }

    if (tipo === "todas" || tipo === "tv") {
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=b545a645aca9ca390f2bb637dff787e6&query=${busqueda}`
      )
        .then((res) => res.json())
        .then((data) =>{
            setResultadosSeries(data.results),
            setCargandoSeries(false)
          }
        )
        .catch((error) => console.log(error));
    } else {
      setCargandoSeries(false);
    }
  }
  )

    let menu = [
      { nombre: "Home", path: "/" },
      { nombre: "Series", path: "/series" },
      { nombre: "Peliculas", path: "/peliculas" },
      { nombre: "Favoritos", path: "/favoritos" },
      { nombre: "Login", path: "/login" },
      { nombre: "Registro", path: "/registro" }

    ];
    let tipo = props.match.params.tipo;

    return (
      <React.Fragment>
        <Header elementosMenu={menu} />
        <section className="container">
          <h2 className="alert alert-primary">Resultados de búsqueda</h2>

          {tipo === "todas" || tipo === "movie" ? (
            <div>
              <h3 className="alert alert-primary" >Películas</h3>
              <section className="cards">
                {cargandoPeliculas === true ? (
                  <p>Cargando...</p>
                ) : resultadosPeliculas.length > 0 ? (
                  resultadosPeliculas.map((movie) => (
                    <Card key={movie.id} datos={movie} tipo="movie" />
                  ))
                ) : (
                  <p>No hay resultados de películas</p>
                )}
              </section>
            </div>
          ) : null}

          {tipo === "todas" || tipo === "tv" ? (
            <>
              <h3 className="alert alert-primary" >Series</h3>
              <section className="cards">
                {cargandoSeries === true ? (
                  <p>Cargando...</p>
                ) : resultadosSeries.length > 0 ? (
                  resultadosSeries.map((serie) => (
                    <Card key={serie.id} datos={serie} tipo="tv" />
                  ))
                ) : (
                  <p>No hay resultados de series</p>
                )}
              </section>
            </>
          ) : null}
        </section>
      </React.Fragment>
    );
  }


export default ResultadoBusqueda;