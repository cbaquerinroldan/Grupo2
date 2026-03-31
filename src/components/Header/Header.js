import React from "react";
import { Link } from "react-router-dom";
function Header(props){
    return(    
    <nav>
        <ul className="nav nav-tabs my-4">
            {
            props.elementosMenu.map((Menu, idx) =>
            <li className="nav-item" key={Menu.nombre+idx}><Link to={Menu.path} className="nav-link" >{Menu.nombre}</Link></li>
            )}  
        </ul>
        </nav>)
}

export default Header;