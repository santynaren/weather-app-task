import { Container, Flex, Box, Text } from '@chakra-ui/react';
import AutoComplete from 'react-google-autocomplete';
import React, { useEffect, useState } from 'react';
import './App.css';

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
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&result_type=administrative_area_level_3&key=${process.env.REACT_APP_AUTOCOMPLETE_API}`)
      .then((res) => res.json())
      .then((json) => {
        setCity(json.results[0].formatted_address)
      })
  }
  const updateWeather = () => {
    // we can get forecast and also the area locality
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=1510748ac25b198ecae2f95bd9acc5d6`)
      .then((res) => res.json())
      .then((json) => {
        setWeatherDetails((json.main.temp - 273.15).toFixed(0))
      })
  }
  return (
    <Container w={"full"} h="full" alignItems={"center"} justifyContent="center">
      <Flex fontFamily={"monospace"} direction={"column"}>

        Have a great day! Weather App
        <Text fontFamily={"monospace"} fontSize="9xl" data-testid="weather">{weather} &#176; c</Text>
        <Text fontFamily={"monospace"} fontSize="3xl" data-testid="city">{city}</Text>
        <Box fontFamily={"monospace"} border={"1px"} padding="2">
          <AutoComplete
            className='AutoComplete'
            apiKey={process.env.REACT_APP_AUTOCOMPLETE_API}
            onPlaceSelected={(place) => {
              var latitude = place.geometry.location.lat();
              var longitude = place.geometry.location.lng();
              setCoords({
                lat: latitude,
                lng: longitude
              })
              updateWeather();
            }}
          />

        </Box>

      </Flex>
    </Container>
  );
}

export default App;
