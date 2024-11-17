import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FilmModal from './FilmModal';

// Definimos los estilos de los botones de gradiente
const GradientButton = styled.button`
  border: none;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ variant }) =>
    variant === 'edit' ? 'linear-gradient(135deg, #6253e1, #04befe)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};

  &:hover {
    opacity: 0.9;
  }
`;

const ArticleComponent = ({ listState, setListState }) => {
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getFilms = () => {
        const films = JSON.parse(localStorage.getItem('pelis')) || [];
        setListState(films);
    };

    useEffect(() => {
        getFilms();
    }, []);

    const openModal = (film) => {
        setSelectedFilm(film);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedFilm(null);
        setIsModalOpen(false);
    };

    const deleteFilm = (id) => {
        const films = JSON.parse(localStorage.getItem('pelis')) || [];
        const updatedFilms = films.filter((film) => film.id !== id);
        localStorage.setItem('pelis', JSON.stringify(updatedFilms));
        setListState(updatedFilms);
    };

    return (
        <div id="content" className="content">
            <h2 className="title-content">Películas</h2>
            <section id="film-section">
                {listState.map((item) => (
                    <article
                        className="peli-item"
                        key={item.id}
                        onClick={() => openModal(item)}
                    >
                        <div className="banner-article">
                            <img
                                src={item.image || 'placeholder.jpg'}
                                alt={`Banner de ${item.name}`}
                                className="banner-image"
                            />
                        </div>
                        <h3 className="title">{item.name}</h3>
                        <p className="description">{item.description}</p>
                        <div className="button-group">
                            <GradientButton variant="edit">
                                Editar
                            </GradientButton>
                            <GradientButton
                                variant="delete"
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita que el modal se abra al eliminar
                                    deleteFilm(item.id);
                                }}
                            >
                                Eliminar
                            </GradientButton>
                        </div>
                    </article>
                ))}
            </section>

            {/* Modal con la información de la película seleccionada */}
            <FilmModal film={selectedFilm} isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default ArticleComponent;
