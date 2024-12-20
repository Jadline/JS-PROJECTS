import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, TileLayer, Popup, useMap,useMapEvents} from "react-leaflet";
import { useState,useEffect } from "react";
import {useCities} from '../Context/CitiesContext'
import { useGeolocation } from "../Hooks/useGeolocation";
import { useURLPosition } from "../Hooks/useURLPosition";
import Button from './Button'

function Map() {
  
  const {cities} = useCities()
  const [mapPosition, setMapPosition] = useState([40, 0]);
 
  const {isLoading :isLoadingPosition,position :geolocationPosition,getPosition} = useGeolocation()
  const {mapLat,mapLng,} = useURLPosition()
  useEffect(() => {
    if(geolocationPosition) setMapPosition([geolocationPosition.lat,geolocationPosition.lng])
  },[geolocationPosition])
  useEffect(() => {
    if(mapLat && mapLng) setMapPosition([mapLat,mapLng])
  },[mapLat,mapLng])

  return (
    <div className={styles.mapContainer}>
    <Button type='position' onClick={getPosition}>
      {isLoadingPosition ? 'Loading...' : 'use your position'}
    </Button>
      <MapContainer 
      center={mapPosition}
      // center={[mapLat,mapLng]}
       zoom={6} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {cities.map((city) => <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span><span>{city.cityName}</span>
      </Popup>
    </Marker>)}
    {geolocationPosition && <Marker position={[geolocationPosition.lat,geolocationPosition.lng]}>
      <Popup>
        <p>Your current location</p>
      </Popup>
      </Marker>}
    <ChangeCenter position={mapPosition}/>
    <DetectClick/>
  </MapContainer>
)
    </div>
  );
}
function ChangeCenter({position}){
  const map = useMap()
  map.setView(position)
  return null
}
function DetectClick(){
  const navigate = useNavigate()
  useMapEvents({
    click : e => 
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
  return null
}

export default Map;
