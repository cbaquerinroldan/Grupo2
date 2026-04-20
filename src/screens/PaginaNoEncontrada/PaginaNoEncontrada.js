import Header from "../../components/Header/Header";

function PaginaNoEncontrada() {

  let menu = [
    { nombre: "Home", path: "/" },
    { nombre: "Series", path: "/series" },
    { nombre: "Peliculas", path: "/peliculas" },
    { nombre: "Favoritos", path: "/favoritos" },
    { nombre: "Login", path: "/login" },
    { nombre: "Registro", path: "/registro" }

  ];
  return (
    <div>
      <Header elementosMenu={menu} />
      <h1>Error 404</h1>
    </div>
  )
}

export default PaginaNoEncontrada;