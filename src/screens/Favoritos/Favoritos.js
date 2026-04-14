import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculasFav: [],
            seriesFav: []
        };
    }


}

export default Favoritos;
