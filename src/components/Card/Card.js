import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Card (props){
  const [ favorito, setEsFavorito] = useState(false)
  const [ valor, setValor] = useState("♥️")
  const [ verMas, setVerMas] = useState(false)

    
useEffect(
  () => {
    let tipo = props.tipo === "movie" ? "pelisFav" : "seriesFav";
        let storage = localStorage.getItem(tipo);
        let storageJson = storage == null ? [] : JSON.parse(storage);

        if (storageJson.filter(id => id === props.datos.id).length > 0) {
          setEsFavorito(true)
          setValor("🩶")}
  }, [])


  function agregarFav(id, tipo) {
    tipo = tipo === "movie" ? "pelisFav" : "seriesFav";
    let storage = localStorage.getItem(tipo);
    let storageJson = storage == null ? [] : JSON.parse(storage);
    storageJson.push(id);
    localStorage.setItem(tipo, JSON.stringify(storageJson));
    setEsFavorito(true);
    setValor("🩶");
  }

  function eliminar(id, tipo) {
    tipo = tipo === "movie" ? "pelisFav" : "seriesFav";
    let storage = localStorage.getItem(tipo);
    let storageJson = storage == null ? [] : JSON.parse(storage);
    let nuevaLista = storageJson.filter(idx => idx !== id);
    localStorage.setItem(tipo, JSON.stringify(nuevaLista));
    setEsFavorito(false);
    setValor("♥️")
    if (props.sacarDeFavoritos) {
      props.sacarDeFavoritos(id, props.tipo);
    }
  }

   function cambiarEstadoDesc() {
    setVerMas(verMas === true ? false : true)
  }

    let user = cookies.get("user-auth-cookie");
    const tipo = props.tipo ? props.tipo : "movie";
    const titulo = tipo === "movie" ? props.datos.title : props.datos.name;


    return (

      <article className= "single-card-movie">

        <Link to={`/detalle/${tipo}/${props.datos.id}`}>
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/w342${props.datos.poster_path}`} alt={titulo} />
        </Link>
        <div className="cardBody">
          <h5 className="card-title">
            {titulo}
          </h5>

          {
         verMas === true ?
              <section>
                <p className="card-text">{props.datos.overview}</p>
              </section>
              :
              null
          }

          <button className="btn btn-primary" onClick={() => cambiarEstadoDesc()}>
            {verMas ? "Ver menos" : "Ver descripción"}
          </button>

          {user ? (
            <button className="btn alert-primary" onClick={() => favorito === false ? agregarFav(props.datos.id, props.tipo) : eliminar(props.datos.id, props.tipo)}>
              {valor}
            </button>
          ) : null}

        </div>
      </article>
    );
  
  }

export default Card;