import React, { useEffect, useState } from 'react';

type CoOrdinateProps = {
  lat: number;
  lng: number;
}
function App() {
  const [coords, setCoords] = useState<CoOrdinateProps>({ lat: 0, lng: 0 })
  useEffect(() => {
    // Following gets the lat lng for the user location
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    });
  }, [])
  console.log(coords)
  return (
    <div>
      {/* App here */}
    </div>
  );
}

export default App;
