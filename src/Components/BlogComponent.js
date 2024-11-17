import React, { useEffect, useState } from "react";
import BlogComments from "./BlogComments";

const BlogComponent = () => {
    const [blogFilms, setBlogFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null); // Estado para la película seleccionada
    const [blogView, setBlogView] = useState("blog");

    // Obtener las películas desde localStorage
    const getFilms = () => {
        const films = JSON.parse(localStorage.getItem('pelis')) || [];
        setBlogFilms(films);
    };

    useEffect(() => {
        getFilms();
    }, []);

    // Función para manejar el clic en las estrellas y actualizar la puntuación
    const handleRating = (id, rating) => {
        // Actualiza la puntuación en blogFilms
        const updatedFilms = blogFilms.map(film =>
            film.id === id ? { ...film, rating } : film
        );
        setBlogFilms(updatedFilms);
        localStorage.setItem('pelis', JSON.stringify(updatedFilms));

        // También actualiza la película seleccionada con la nueva puntuación
        if (selectedFilm && selectedFilm.id === id) {
            setSelectedFilm({ ...selectedFilm, rating });
        }
    };

    // Cambia la vista a la publicación de blog y guarda la película seleccionada
    const showBlogPost = (film) => {
        setSelectedFilm(film); // Guarda la película seleccionada
        setBlogView("blogPost");
    };

    const goBackToBlog = () => {
        setSelectedFilm(null);
        setBlogView("blog");
    };

    const editReview = () => {
        // Lógica para editar reseña
    };

    const changeBannerImage = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const updatedFilm = { ...selectedFilm, image: reader.result };
                    setSelectedFilm(updatedFilm);

                    // Actualizar el arreglo de blogFilms y guardarlo en localStorage
                    const updatedFilms = blogFilms.map(film =>
                        film.id === updatedFilm.id ? updatedFilm : film
                    );
                    setBlogFilms(updatedFilms);
                    localStorage.setItem('pelis', JSON.stringify(updatedFilms));
                };
                reader.readAsDataURL(file);
            }
        };

        fileInput.click();
    };

    return (
        <div id="content" className="content">
            {blogView === "blog" && (
                <>
                    <h2 className="title-content">Reviews</h2>
                    <section id="blog-section">
                        {blogFilms.map((item) => (
                            <article
                                className="blog-film-item"
                                key={item.id}
                                onClick={() => showBlogPost(item)} // Pasa la película seleccionada
                            >
                                <h3 className="title">{item.name}</h3>
                                <p className="description">{item.description}</p>

                                {/* Estrellas para la puntuación */}
                                <div className="rating">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <span
                                            key={index}
                                            className={`star ${index < item.rating ? 'filled' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevenir que el clic en la estrella cambie la vista
                                                handleRating(item.id, index + 1);
                                            }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </section>
                </>
            )}

            {blogView === "blogPost" && selectedFilm && (
                <section className="blog-section">
                    {/* Imagen del banner con botón para cambiar */}
                    <div className="banner">
                        <img
                            src={selectedFilm.image || "placeholder.jpg"}
                            alt={selectedFilm.name}
                            className="banner-image"
                        />
                        <button onClick={changeBannerImage} className="change-banner-button">
                            Cambiar Imagen
                        </button>
                    </div>

                    {/* Título y Descripción de la Película */}
                    <h3 className="film-title">{selectedFilm.name}</h3>
                    <p className="film-description">{selectedFilm.description}</p>

                    <div className="review-content">
                        {/* Reseña */}
                        <h4>Reseña</h4>
                        <p>{selectedFilm.review || "Aún no hay una reseña. ¡Sé el primero en escribir una!"}</p>
                    </div>

                    {/* Estrellas de puntuación al lado de la reseña */}
                    <div className="rating">
                        {Array.from({length: 5}).map((_, index) => (
                            <span
                                key={index}
                                className={`star ${index < selectedFilm.rating ? 'filled' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRating(selectedFilm.id, index + 1);
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <div id="comments-section" className="comments-section">
                        <BlogComments movieId={selectedFilm.id} />
                    </div>


                    {/* Botones de acción para editar y volver */}
                    <div className="button-group">
                        <button onClick={editReview} className="button edit-review-button">
                            Editar Reseña
                        </button>
                        <button onClick={goBackToBlog} className="button back-button">
                            Volver al Blog
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogComponent;
