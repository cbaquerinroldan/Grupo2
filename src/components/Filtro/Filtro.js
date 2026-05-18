import React, { useState } from "react";

function Filtro () {
 const [valor, setValor] = useState("")
  
  function evitarSubmit(event) {
    event.preventDefault();
  }

  function guardarCambios(event) {
    setValor ( event.target.value );
    props.filtrar(valor)
  }

 
    return (
      <form onSubmit={(event) => evitarSubmit(event)} className="filter-form px-0 mb-3">
        <input type="text" placeholder="Buscar..."
          onChange={(event) => guardarCambios(event)}
          value={valor}
        />
      </form>
    );
  }

export default Filtro;