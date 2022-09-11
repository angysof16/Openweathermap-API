import { banderas } from "./data/banderas.js";

const obtenerBanderaPais = (pais) => {
    let bandera = banderas.find( (b) => b.name == pais )?.url
    if(bandera == undefined) bandera = 'https://icons.iconarchive.com/icons/everaldo/crystal-clear/128/Action-flag-icon.png';
    return bandera
}

let contenidoHTML = document.querySelector('.contenidoClimaCiudad');
const cityHTML = document.getElementById('selectCiudad'),
    botonHTML = document.getElementById('boton'),
    apiKey = 'c2bdbd22b26cad665323eedea1784a49';

botonHTML.addEventListener('click', () => {
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityHTML.value}&appid=${apiKey}`;

    const apiRequest = async () => {
        const response = await fetch(urlApi)
        if(!response.ok) throw new Error(`HTTP ERROR PROPIO!!! status: ${response.status}`)
        const data = await response.json()
        console.log(data)
        let tem = Math.round(data.main.temp - 273.15)
        let pais = data.sys.country
        let imgBandera = obtenerBanderaPais(pais)
        let contendoCiudad = `
        <div class="container">
            <div>
                <div>
                    <h1 class="xd">${data.name}</h1>
                    <p class="texto">Country: ${pais}</p>
                    <img id="banderaId" src="${imgBandera}">
                </div>
                <div>
                    <img id="clima" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                    <p class="texto">
                        ${data.weather[0].main} <br>
                        ${data.weather[0].description}
                    </p>
                    <p id="temperatura" class="texto">
                        Temperature: ${tem}°
                    </p>
                </div>
            </div>
        </div>
        `;
        contenidoHTML.innerHTML = contendoCiudad;
    }
    apiRequest()
});
