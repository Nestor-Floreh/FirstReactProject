import React from 'react';

const FilmModal = ({ film, isOpen, onClose }) => {
    if (!isOpen || !film) return null; // Si no está abierto o no hay película seleccionada, no se muestra

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>{film.name}</h2>
                <p>{film.description}</p>
                <small>ID: {film.id}</small>
            </div>
        </div>
    );
};

export default FilmModal;
