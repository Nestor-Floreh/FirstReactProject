import React from "react";
import AsideComponent from "./AsideComponent";
import {GuardarEnStorage} from "../helper/GuardarEnStorage";

const AñadirPelicula = ({setListState}) => {

    const title = "Añadir Pelicula";
    const [filmState, setFilmState] = React.useState({
        id: new Date().getTime(),
        name: '',
        description: ''
    });

    const getFromForm = (e) => {
        e.preventDefault();

        let target = e.currentTarget;
        let title = target.title.value;
        let description = target.description.value;

        let film = {
            id: new Date().getTime(),
            name: title,
            description: description
        };

        setFilmState(film);

        GuardarEnStorage('pelis', film);

        let listFilms = JSON.parse(localStorage.getItem('pelis')) || [];
        setListState(listFilms);

        target.title.value = "";
        target.description.value = "";
    };

    return (
        <div className="add">
            <h3 className="title">{title}</h3>
            <form onSubmit={getFromForm}>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Titulo"
                    required
                />
                <textarea
                    id="description"
                    name="description"
                    placeholder="Descripción"
                    required
                ></textarea>
                <input
                    type="submit"
                    id="save"
                    value="Guardar"
                />
            </form>
        </div>
    );
};

export default AñadirPelicula;
