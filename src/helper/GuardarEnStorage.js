export const GuardarEnStorage = (key, element) => {
    // Obtener los elementos que ya tenemos en localStorage o inicializar como array vacío
    let elements = JSON.parse(localStorage.getItem(key)) || [];

    // Filtrar elementos para eliminar cualquier valor null existente
    elements = elements.filter(item => item !== null);

    // Agregar la nueva película a la lista existente
    elements.push(element);

    // Guardar el array completo de películas actualizado en localStorage
    localStorage.setItem(key, JSON.stringify(elements));

    console.log(elements);
}