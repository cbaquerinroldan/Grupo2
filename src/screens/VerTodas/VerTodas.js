import React, { Component } from "react";
import Card from "../../components/Card/Card";

class VerTodas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
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
              cargando: false
            })
          )
          .catch((error) => console.log(error))
        }
    )
  }

  render() {
    return (
      <div className="container">
        <h2 className="alert alert-primary">Ver todas</h2>

        <section className="row cards">
          {this.state.cargando ? (
            <p>Cargando...</p>
          ) : (
            this.state.datos.map((movie) => (
              <Card key={movie.id} datos={movie} />
            ))
          )}
        </section>
        <button onClick={() => this.cargarMas()}>Ver más</button>
      </div>
    );
  }
}

export default VerTodas;