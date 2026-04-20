import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Filtro from "../../components/Filtro/Filtro";
import Header from "../../components/Header/Header";

class VerTodas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      copia: [],
      cargando: true,
      page: 1
    };
  }

  componentDidMount() {
    let tipo = this.props.match.params.tipo;
    let cate = this.props.match.params.cate;

    fetch(`https://api.themoviedb.org/3/${tipo}/${cate}?api_key=b545a645aca9ca390f2bb637dff787e6`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          datos: data.results,
          copia: data.results,
          cargando: false
        })
      )
      .catch((error) => console.log(error));
  }

  cargarMas() {
    let tipo = this.props.match.params.tipo;
    let cate = this.props.match.params.cate;

    this.setState(
      { page: this.state.page + 1 },
      () => {
        fetch(`https://api.themoviedb.org/3/${tipo}/${cate}?api_key=b545a645aca9ca390f2bb637dff787e6&page=${this.state.page}`)
          .then((response) => response.json())
          .then((data) =>
            this.setState({
              datos: this.state.datos.concat(data.results),
              copia: this.state.datos.concat(data.results),
              cargando: false
            })
          )
          .catch((error) => console.log(error))
      }
    )
  }


  filtrarTodas(input) {
    let tipo = this.props.match.params.tipo;
    let todasFiltradas = this.state.copia.filter((cadaUna) => {
      let tipoIngresado = tipo === "movie" ? cadaUna.title : cadaUna.name;
      return tipoIngresado.toLowerCase().includes(input.toLowerCase());
    });

    this.setState({
      datos: todasFiltradas
    });
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
    return (
      <React.Fragment>
        <Header elementosMenu={menu} />
        <div className="container">
          <h2 className="alert alert-primary">Ver todas</h2>
          <Filtro filtrar={(input) => this.filtrarTodas(input)} />
          <section className="row cards">
            {this.state.cargando ? (
              <p>Cargando...</p>
            ) : (
              this.state.datos.map((movie) => (
                <Card key={movie.id} datos={movie} tipo={this.props.match.params.tipo} />
              ))
            )}
          </section>
          <button className="btn btn-info" onClick={() => this.cargarMas()}>Ver más</button>
        </div>
      </React.Fragment>
    );
  }
}

export default VerTodas;