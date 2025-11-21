import { useState } from 'react';

function WeatherApp(){
  const[city, setCity] = useState("");
  const[weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const[loading, setLoading] = useState(false);


  async function fetchWeather(){
    setError("");
    setWeather(null);
    setLoading(true);
    const url =`http://localhost:3001/weather?city=${city}`;
    try{
      const response = await fetch(url);
      if(!response.ok){
        setError("city not found or error fetching data");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setWeather(data);
      setCity("");
    } catch(error){
      setError("An error occured while fetching data")
    }
    setLoading(false);
    }

    function handleKeyDown(e){
      if(e.key === 'Enter'){
        fetchWeather()
      }
    }

      
  return(
    <div className="weather-app">
     <h1>Weather App</h1>
      <p>Get information about the weather on your location</p>
      <input
      type="text"
      value={city}
      onChange={(e)=> setCity(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Enter city name"
      disabled={loading}
      />
      <button onClick={fetchWeather} disabled={loading || !city }>
        {loading ? "Buscando...": "Buscar"}</button>
      {error && <p style={{color: "red"}}>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>         
          <p>{weather.main.temp}ºC</p>
          </div>
      )}
    </div>
  )
}

export default WeatherApp ;


