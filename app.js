window.addEventListener('load', ()=>{
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')
    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')
    let vientoVelocidad = document.getElementById('viento-velocidad')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion =>{
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=c8ff28390d244beb5960d2d8e9e8fc85`
            fetch(url)
                .then(Response => {return Response.json()})
                .then(data =>{
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp} °C`

                    let desc = data.weather[0].description
                    temperaturaDescripcion.textContent = desc.toUpperCase()

                    ubicacion.textContent = data.name

                    vientoVelocidad.textContent = `${data.wind.speed} m/s`

                    //Atrapar el icono de la pagina openweather
                    // let iconCode = data.weather[0].icon
                    // const urlIcon = `https://openweathermap.org/img/wn/${iconCode}.png`
                    // console.log(urlIcon)

                    console.log(data.weather[0].main)
                    switch(data.weather[0].main){
                        case 'Thunderstorm':
                            iconoAnimado.src = 'animated/thunder.svg'
                            console.log('TORMENTA')
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = 'animated/rainy-2.svg'
                            console.log('LLOVIZNA')
                            break;
                        case 'Rain':
                            iconoAnimado.src = 'animated/rainy-7.svg'
                            console.log('NIEVE')
                            break;
                        case 'Snow':
                            iconoAnimado.src = 'animated/snowy-6.svg'
                            console.log('LIMPIO')
                            break;
                        case 'Clear':
                            iconoAnimado.src = 'animated/day.svg'
                            console.log('LIMPIO')
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = 'animated/weather.svg'
                            console.log('ATMOSFERA')
                            break;
                        case 'Clouds':
                            iconoAnimado.src = 'animated/cloudy-day-1.svg'
                            console.log('NUBES')
                            break;
                        default:
                            iconoAnimado.src = 'animated/cloudy-day-1.svg'
                            console.log('POR DEFECTO');
                    }

                })
                .catch(error =>{
                    console.log(error)
                })
        })
    }    
})