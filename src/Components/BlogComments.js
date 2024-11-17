import React, { useState, useEffect } from 'react';

const CommentSection = ({ movieId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Cargar comentarios específicos de la película desde localStorage al montar el componente
    useEffect(() => {
        const storedComments = localStorage.getItem(`comments_${movieId}`);
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        }
    }, [movieId]);

    // Guardar los comentarios específicos de la película en localStorage cuando cambie la lista de comentarios
    useEffect(() => {
        localStorage.setItem(`comments_${movieId}`, JSON.stringify(comments));
    }, [comments, movieId]);

    // Función para manejar el envío de un nuevo comentario
    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const comment = {
                id: Date.now(),
                text: newComment,
                date: new Date().toLocaleString(),
                important: false,
                expanded: false, // Controla si el comentario está expandido o contraído
            };
            setComments([...comments, comment]);
            setNewComment(''); // Limpiar el campo de texto
        }
    };

    // Función para eliminar un comentario por su id
    const handleDeleteComment = (id) => {
        setComments(comments.filter((comment) => comment.id !== id));
    };

    // Función para marcar/desmarcar un comentario como importante
    const toggleImportant = (id) => {
        setComments(
            comments.map((comment) =>
                comment.id === id ? { ...comment, important: !comment.important } : comment
            )
        );
    };

    // Función para alternar entre expandir y contraer un comentario largo
    const toggleExpandComment = (id) => {
        setComments(
            comments.map((comment) =>
                comment.id === id ? { ...comment, expanded: !comment.expanded } : comment
            )
        );
    };

    return (
        <div style={styles.container}>
            <h2>Comentarios</h2>

            {/* Formulario para añadir un nuevo comentario */}
            <form onSubmit={handleAddComment} style={styles.form}>
                <textarea
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={styles.textarea}
                    rows="3"
                    required
                />
                <button type="submit" style={styles.button}>Enviar</button>
            </form>

            {/* Lista de Comentarios */}
            <div style={styles.commentsList}>
                {comments.length === 0 ? (
                    <p style={styles.noComments}>Aún no hay comentarios.</p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            style={{
                                ...styles.comment,
                                borderColor: comment.important ? '#ffc107' : '#ddd',
                            }}
                        >
                            <div style={styles.commentHeader}>
                                <span style={styles.commentDate}>{comment.date}</span>
                                <div style={styles.commentActions}>
                                    {/* Icono de estrella para marcar como importante */}
                                    <span
                                        onClick={() => toggleImportant(comment.id)}
                                        style={{
                                            ...styles.icon,
                                            color: comment.important ? '#ffc107' : '#ccc',
                                        }}
                                    >
                                        ★
                                    </span>

                                    {/* Icono de papelera para eliminar el comentario */}
                                    <span onClick={() => handleDeleteComment(comment.id)} style={styles.icon}>
                                        🗑️
                                    </span>
                                </div>
                            </div>
                            <div style={styles.commentTextContainer}>
                                <p style={styles.commentText}>
                                    {comment.expanded || comment.text.length <= 100
                                        ? comment.text
                                        : `${comment.text.slice(0, 100)}...`}
                                </p>
                                {/* Botón "Leer más" si el comentario es largo */}
                                {comment.text.length > 100 && (
                                    <button
                                        onClick={() => toggleExpandComment(comment.id)}
                                        style={styles.readMoreButton}
                                    >
                                        {comment.expanded ? 'Leer menos' : 'Leer más'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Estilos básicos
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    commentsList: {
        marginBottom: '20px',
        marginTop: '20px',
    },
    comment: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commentTextContainer: {
        marginTop: '5px',
        wordWrap: 'break-word',
    },
    commentText: {
        margin: 0,
    },
    readMoreButton: {
        marginTop: '5px',
        padding: '5px',
        fontSize: '0.9em',
        color: '#007bff',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    commentDate: {
        fontSize: '0.8em',
        color: '#666',
    },
    commentActions: {
        display: 'flex',
        gap: '10px',
    },
    icon: {
        cursor: 'pointer',
        fontSize: '1.2em',
    },
    noComments: {
        color: '#888',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    textarea: {
        padding: '10px',
        fontSize: '1em',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        fontSize: '1em',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default CommentSection;
