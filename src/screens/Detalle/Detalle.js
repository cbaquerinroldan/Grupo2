import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies();

function Detalle (props) {
    const [detalle, setDetalle] = useState("")
    const [favorito, setFavorito] = useState(false)
  
    useEffect( 
        ()=> {
        const id = props.match.params.id;
        const tipo = props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=16a67828c6cd8c48f7481662c83f83ff`)
            .then(response => response.json())
            .then(data => setDetalle(data))
            .catch(error => console.log(error));}, [])

    function agregarFav() {
        let tipo = props.match.params.tipo;
        let id = detalle.id;

        if (tipo === "movie") {

            let pelisFav = localStorage.getItem("pelisFav");

            if (pelisFav == null) {
                pelisFav = [];
            } else {
                pelisFav = JSON.parse(pelisFav);
            }

            if (pelisFav.includes(id)) {
                pelisFav = pelisFav.filter(peli => peli !== id);
                setFavorito(false);
            } else {
                pelisFav.push(id);
                setFavorito(true);
            }

            localStorage.setItem("pelisFav", JSON.stringify(pelisFav));

        } else {

            let seriesFav = localStorage.getItem("seriesFav");

            if (seriesFav == null) {
                seriesFav = [];
            } else {
                seriesFav = JSON.parse(seriesFav);
            }

            if (seriesFav.includes(id)) {
                seriesFav = seriesFav.filter(serie => serie !== id);
                 setFavorito(false);
            } else {
                seriesFav.push(id);
                 setFavorito(true);
            }

            localStorage.setItem("seriesFav", JSON.stringify(seriesFav));
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
        const tipo = props.match.params.tipo;
        let user = cookies.get("user-auth-cookie");

        return (
            <React.Fragment>
                <Header elementosMenu={menu} />
                <div className="container">
                    <div>{detalle !== "" ? (
                        <div>

                            <h2 className="alert alert-primary">{tipo === "movie" ? detalle.title : detalle.name}</h2>
                            <section className="row">
                                <img className="col-md-6"
                                    src={`https://image.tmdb.org/t/p/w342${detalle.poster_path}`}
                                    alt={tipo === "movie" ? detalle.title : detalle.name} >
                                </img>

                                <section className="col-md-6 info">

                                    <h3>Descripción:</h3>

                                    <p className="description">{detalle.overview}</p>

                                    <p className="mt-0">
                                        <strong>Clasificación: </strong>{detalle.vote_average}
                                    </p>

                                    <p className="mt-0">
                                        <strong> Fecha de estreno:</strong> {tipo === "movie" ? detalle.release_date : detalle.first_air_date}
                                    </p>

                                    {tipo === "movie" ? (<p className="mt-0 mb-0 length"> <strong> Duración: </strong> {detalle.runtime} min</p>) : null}

                                    <p>
                                        <strong>Géneros:</strong>{" "}{detalle.genres ? detalle.genres.map(gen => gen.name).join(", ") : null}
                                    </p>
                                    {user ? (
                                        <button className="btn alert-primary corazon" onClick={() => agregarFav()}>
                                            {favorito ? "🩶" : "♥️"}
                                        </button>
                                    ) : null}


                                </section>

                            </section>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                    </div>
                </div>
            </React.Fragment>
        );
    }

export default Detalle;