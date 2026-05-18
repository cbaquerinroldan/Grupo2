import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies();

function  Favoritos () {
    const [peliculas, setPeliculas] = useState([])
    const [series, setSeries]= useState([])
    const [ cargadoPeliculas, setCargadoPeliculas]= useState(false)
    const [cargadoSeries, setCargadoSeries]= useState(false)
 

   useEffect(
       () => {
        let user = cookies.get("user-auth-cookie");

        if (user !== undefined) {
            let pelisFav = localStorage.getItem("pelisFav");
            let pelisFavJson = pelisFav === null ? [] : JSON.parse(pelisFav);

            if (pelisFavJson.length === 0) {
                setCargadoPeliculas(true)
            } else {
                let pelisRecuperadas = [];

                pelisFavJson.map(id =>
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=16a67828c6cd8c48f7481662c83f83ff`)
                        .then(res => res.json())
                        .then(data => {
                            pelisRecuperadas.push(data);
                                setPeliculas(pelisRecuperadas),
                                setCargadoPeliculas (true)
                            }
                        )
                        .catch(err => console.log(err)))
            
            let seriesFav = localStorage.getItem("seriesFav");

            let seriesFavJson = seriesFav === null ? [] : JSON.parse(seriesFav);

            if (seriesFavJson.length === 0) {
                
                setCargadoSeries (true)
               ;
            } else {
                let seriesRecuperadas = [];

                seriesFavJson.map(id =>
                    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=16a67828c6cd8c48f7481662c83f83ff`)
                        .then(res => res.json())
                        .then(data => {
                            seriesRecuperadas.push(data);
                            setSeries (seriesRecuperadas),
                            setCargadoSeries(true)})
                        .catch(err => console.log(err))
                );
            }
        }
    }
}, [])
   function sacarDeFavoritos(id, tipo) {
        if (tipo === "movie") {
            let pelisFiltradas = peliculas.filter(peli => peli.id !== id)
            setPeliculas(pelisFiltradas)
        } else {
            let seriesFiltradas = series.filter(serie => serie.id !== id)
           setSeries(seriesFiltradas)
        }
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

        if (user === undefined) {
            return <h2>Tenés que iniciar sesión</h2>;
        }

        return (
            <React.Fragment>
                <Header elementosMenu={menu} />
                <div className="container">
                    <h2 className="alert alert-primary">Películas favoritas</h2>
                    <div className="row cards">
                        {cargadoPeliculas === false ? (
                            <p>Cargando...</p>
                        ) : peliculas.length === 0 ? (
                            <p>No tenés películas favoritas</p>
                        ) : (
                            peliculas.map((peli, i) => (
                                <Card key={i} datos={peli} tipo="movie" sacarDeFavoritos = {(id, tipo) => sacarDeFavoritos(id, tipo)} />
                            ))
                        )}
                    </div>

                    <h2 className="alert alert-primary">Series favoritas</h2>

                    <div className="row cards">
                        {cargadoSeries === false ? (
                            <p>Cargando...</p>
                        ) : series.length === 0 ? (
                            <p>No tenés series favoritas</p>
                        ) : (series.map((serie, i) => (
                                <Card key={i} datos={serie} tipo="tv" sacarDeFavoritos={(id, tipo) => sacarDeFavoritos(id, tipo)} />
                            ))
                        )}
                    </div>

                </div>
            </React.Fragment>
        );
    
}

export default Favoritos;