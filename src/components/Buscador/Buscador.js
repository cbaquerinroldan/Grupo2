import React, { Component } from "react";
import { withRouter } from "react-router-dom";

function Buscador(props){

  const [valor, setValor] = useState ('')
  const [tipo, setTipo] = useState ('todas')

  function ejecutarBusqueda(e) {
    e.preventDefault();
    props.history.push("/resultadobusqueda/" + valor + "/" + tipo)
  }
  function controlarCambios(e) {
   setValor (e.target.value)
  }
  function cambiarTipo(e) {
    setTipo (e.target.value)
  }

    return (
      <form className="search-form" onSubmit={(e) => ejecutarBusqueda(e)}>

        <input type="text" className="" name="searchData" placeholder="Buscar..." value={valor}
          onChange={(e) => controlarCambios(e)} />


        <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        <div className="contenedorRadio">
          <label>
            <input type="radio" value="todas" checked={tipo === "todas"} onChange={(e) => cambiarTipo(e)} />
            Todo
          </label>

          <label>
            <input type="radio" value="movie" checked={tipo === "movie"} onChange={(e) => cambiarTipo(e)} />
            Películas
          </label>

          <label>
            <input type="radio" value="tv" checked={tipo === "tv"} onChange={(e) => cambiarTipo(e)} />
            Series
          </label>
        </div>
      </form>
    );
  }

export default withRouter(Buscador);