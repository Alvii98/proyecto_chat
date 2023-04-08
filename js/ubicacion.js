// Inicia la ubicacion actual
const obtenerUbicacion = () => {
	if (!"geolocation" in navigator) {
		return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro")
	}
	idWatcher = navigator.geolocation.watchPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud)
}
const onUbicacionConcedida = ubicacion => {
	const coordenadas = ubicacion.coords
	// console.log(coordenadas)
	ubicacion = {latitud : coordenadas.latitude, longitud : coordenadas.longitude}
	console.log(ubicacion)
    // Detengo la busqueda de la ubicacion
	navigator.geolocation.clearWatch(idWatcher);
}
const onErrorDeUbicacion = err => {
	console.log("Error obteniendo ubicación: ", err)
}
// Parametros para la geolocation
const opcionesDeSolicitud = {
	enableHighAccuracy: true, // Alta precisión
	maximumAge: 0, // No queremos caché
	timeout: 10000 // Esperar solo 5 segundos
}
// click iniciar ubicacion
document.querySelector("#btnIniciar").addEventListener("click", obtenerUbicacion)


const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    // Convertir todas las coordenadas a radianes
    lat1 = lat1 * Math.PI / 180
    lon1 = lon1 * Math.PI / 180
    lat2 = lat2 * Math.PI / 180
    lon2 = lon2 * Math.PI / 180
    // Aplicar fórmula
    const RADIO_TIERRA_EN_KILOMETROS = 6371
    let longitudes = (lon2 - lon1)
    let latitudes = (lat2 - lat1)
    let a = Math.pow(Math.sin(latitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(longitudes / 2.0), 2)
    let dif = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	let distancia = RADIO_TIERRA_EN_KILOMETROS * dif
	distancia = parseInt(distancia) == 0 ? distancia.toString().substring(2,5)+'Mts' : distancia.toString().substring(0,3)+'Kms'
    
	return distancia
}

// ejemplo de kilometros
//console.log(calcularDistancia(-34.599156, -58.402657, -34.588954, -58.408852))

// ejemplo de metros
console.log(calcularDistancia(-34.599156, -58.402657, -34.594876, -58.401299))
