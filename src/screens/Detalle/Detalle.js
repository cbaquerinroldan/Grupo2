import React, { Component } from "react";
import Cookies from "universal-cookie";
import Header from "../../components/Header/Header";

const cookies = new Cookies();

class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detalle: "",
            favorito: false
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const tipo = this.props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=16a67828c6cd8c48f7481662c83f83ff`)
            .then(response => response.json())
            .then(data => this.setState({ detalle: data }))
            .catch(error => console.log(error));
    }

    agregarFav() {
        let tipo = this.props.match.params.tipo;
        let id = this.state.detalle.id;

        if (tipo === "movie") {

            let pelisFav = localStorage.getItem("pelisFav");

            if (pelisFav == null) {
                pelisFav = [];
            } else {
                pelisFav = JSON.parse(pelisFav);
            }

            if (pelisFav.includes(id)) {
                pelisFav = pelisFav.filter(peli => peli !== id);
                this.setState({
                    favorito: false
                });
            } else {
                pelisFav.push(id);
                this.setState({
                    favorito: true
                });
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
                this.setState({
                    favorito: false
                });
            } else {
                seriesFav.push(id);
                this.setState({
                    favorito: true
                });
            }

            localStorage.setItem("seriesFav", JSON.stringify(seriesFav));
        }
    }
    render() {
        let menu = [
            { nombre: "Home", path: "/" },
            { nombre: "Series", path: "/series" },
            { nombre: "Peliculas", path: "/peliculas" },
            { nombre: "Favoritos", path: "/favoritos" },
            { nombre: "Login", path: "/login" },
            { nombre: "Registro", path: "/registro" }

        ];
        const tipo = this.props.match.params.tipo;
        let user = cookies.get("user-auth-cookie");

        return (
            <React.Fragment>
                <Header elementosMenu={menu} />
                <div className="container">
                    <div>{this.state.detalle !== "" ? (
                        <div>

                            <h2 className="alert alert-primary">{tipo === "movie" ? this.state.detalle.title : this.state.detalle.name}</h2>
                            <section className="row">
                                <img className="col-md-6"
                                    src={`https://image.tmdb.org/t/p/w342${this.state.detalle.poster_path}`}
                                    alt={tipo === "movie" ? this.state.detalle.title : this.state.detalle.name} >
                                </img>

                                <section className="col-md-6 info">

                                    <h3>Descripción:</h3>

                                    <p className="description">{this.state.detalle.overview}</p>

                                    <p className="mt-0">
                                        <strong>Clasificación: </strong>{this.state.detalle.vote_average}
                                    </p>

                                    <p className="mt-0">
                                        <strong> Fecha de estreno:</strong> {tipo === "movie" ? this.state.detalle.release_date : this.state.detalle.first_air_date}
                                    </p>

                                    {tipo === "movie" ? (<p className="mt-0 mb-0 length"> <strong> Duración: </strong> {this.state.detalle.runtime} min</p>) : null}

                                    <p>
                                        <strong>Géneros:</strong>{" "}{this.state.detalle.genres ? this.state.detalle.genres.map(gen => gen.name).join(", ") : null}
                                    </p>
                                    {user ? (
                                        <button className="btn alert-primary corazon" onClick={() => this.agregarFav()}>
                                            {this.state.favorito ? "🩶" : "♥️"}
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
}

export default Detalle;