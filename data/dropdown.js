import { ciudades } from './ciudades.js'

let selectHTML = document.getElementById('selectCiudad');

const obtenerCiudades = (laCiudad) => {
    return new Promise((resolve, reject)=>{
        let ciudad = ciudades[laCiudad]
        ciudad ? resolve(ciudad) : reject (' ')
    });
}

const presentarCiudades = async () => {
    let dropdown = [];
    for (let i = 0; i < ciudades.length; i++){
        dropdown[i] = await obtenerCiudades(i);
        let optionHTML = `<option value="${dropdown[i].city}">${dropdown[i].city}</option>`
        selectHTML.innerHTML += optionHTML
    }
}

presentarCiudades()