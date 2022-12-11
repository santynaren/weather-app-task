import React, { useEffect, useState } from 'react';

type CoOrdinateProps = {
  lat: number;
  lng: number;
}
function App() {
  const [coords, setCoords] = useState<CoOrdinateProps>({ lat: 0, lng: 0 })
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
  return (
    <div>
{city}
    </div>
  );
}

export default App;
