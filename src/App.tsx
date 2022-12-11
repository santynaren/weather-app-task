import React, { useEffect, useState } from 'react';

type CoOrdinateProps = {
  lat: number;
  lng: number;
}
function App() {
  const [coords, setCoords] = useState<CoOrdinateProps>({ lat: 0, lng: 0 })
  const [weather, setWeatherDetails] = useState<string>("");
  const [city, setCity] = useState<string>("");
  useEffect(() => {
    // Following gets the lat lng for the user location
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    });
  }, [])
  useEffect(() => {
    updateLocation();
    updateWeather();
  })
  const updateLocation = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&result_type=administrative_area_level_3&key=AIzaSyDt_i7_mJ0RhPZUTTF2L38jaewS8fU77dg`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.results[0].formatted_address)
        setCity(json.results[0].formatted_address)
      })
  }
  const updateWeather = () => {
    // we can get forecast and also the area locality
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=1510748ac25b198ecae2f95bd9acc5d6`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setWeatherDetails((json.main.temp - 273.15).toFixed(0))
      })
  }
  return (
    <div>
      {city}
      {weather}
    </div>
  );
}

export default App;
