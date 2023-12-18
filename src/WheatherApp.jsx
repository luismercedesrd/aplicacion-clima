import React, { useState } from 'react'

export const WheatherApp = () => {

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setdataClima] = useState(null)

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const APIKEY = '35551b071938e0d42c2192f3f93c8467'
  const difKelvin = 273.15

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value)

  }

  const handleSubmit = (e) => {
      e.preventDefault()
      if(ciudad.length > 0) fetchClima()
  }


  const fetchClima = async () => {
    try {
        const respose = await fetch(`${urlBase}?q=${ciudad}&appid=${APIKEY}`)
        const data = await respose.json()
        console.log(data)
        setdataClima(data)
      } catch (error) {
        console.error('Ocurrió el siguiente problema', error)
      
    }
  }

  return (
    <div className="container">
      <h1>Aplicación de clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)} ºC</p>
          <p>condición meteorológica: {dataClima.weather[0].description}</p>
           <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt={dataClima.weather[0].description} />
        </div>
      )}
    </div>
  );
}
