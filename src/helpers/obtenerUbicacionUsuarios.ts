export const obtenerUbicacionUsuario = async (): Promise<[number, number]> => {
    // Aquí se retorno una promesa, que lo que hace es que obtiene la posición actual del usuario
    return new Promise( (resolve, reject) => {
        // Aquí estamos obteniendo la posicion actual del usuario
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => { // Obtenemos las coordenadas del usuario
                resolve([ coords.longitude, coords.latitude ]) // Resolvemos retornando un arreglo con la coordenadas
            },
            ( err ) => {
                alert('No se pudo obtener la geolocalización')
                console.log(err)
                reject()
            }
        )
    });
}