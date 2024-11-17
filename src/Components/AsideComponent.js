import React from 'react';
import Buscador from "./Buscador";
import AñadirPelicula from "./AñadirPelicula";

const AsideComponent = ({setListState}) => {
    return(
        <div>
            <aside className="lateral">
                <Buscador />
                <AñadirPelicula setListState={setListState}/>
            </aside>
        </div>
    )
}

export default AsideComponent;