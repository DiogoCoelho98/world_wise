import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer,TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext.jsx";

export default function Map() {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const [mapPosition, setMapPosition] = useState([38.7, -9.2]);
    const {cities} = useCities();
    
    // Store the values of lat/lng from the last city viewed -> Fix point when the user moves from city to city on the map 
    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng])
    
    return(
        <div className={styles.mapContainer}>
            <MapContainer className={styles.map} center={mapPosition} zoom={8} scrollWheelZoom={true}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {cities.map((city, i) => 
                <Marker key={i} position={[city.position.lat, city.position.lng]}>
                    <Popup>{city.emoji} {city.cityName}</Popup>
                </Marker>)}

                <ChangeCenter position={mapPosition} />
                <HandleClick />
        </MapContainer>
        </div>
    )
}

// Center the map dynamically
function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
} 

// Open the form when the user click on the map
function HandleClick() {
    const navigate = useNavigate();

    useMapEvent({click: e => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
});
}