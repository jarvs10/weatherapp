
export const generarFecha = () => {
    const fechaNew = new Date()
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNew.toLocaleDateString('es-ES', opciones);
}