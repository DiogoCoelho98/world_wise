import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { MapContainer,TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext.jsx";
import { useGeolocation } from "../hooks/useGeolocation.js";
import { useURLGeoposition } from "../hooks/useURLGeoposition.js";

import Button from "../components/Button.jsx";

export default function Map() {
    const [mapPosition, setMapPosition] = useState([39.97899046830462, -3.7475582957267766]);

    const { cities } = useCities();
    const { 
            isLoading: loadingPosition, 
            position: geoPosition, 
            getPosition
        } = useGeolocation();

    const [ lat, lng ] = useURLGeoposition();
    
    // Stores the values of lat/lng from the last city clicked  
    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng])

    // Centering the map with geolocation
    useEffect(() => {
        if (geoPosition) {
            setMapPosition([geoPosition.lat, geoPosition.lng]);
        }
    }, [geoPosition])
    
    return(
        <div className={styles.mapContainer}>
            <Button type="position" 
                onClick={getPosition}
            >
                {loadingPosition ? "Loading ..." : "Get Location"}
            </Button>
            <MapContainer 
                className={styles.map} 
                center={mapPosition} 
                zoom={6} 
                scrollWheelZoom={true}
            >
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cities.map((city, i) => 
                <Marker  
                    key={i} 
                    position={[city.position.lat, city.position.lng]}
                >
                    <Popup>
                        {city.emoji} 
                        {city.cityName}
                    </Popup>
                </Marker>)}

                <ChangeCenter position={mapPosition} />
                <HandleClick />
        </MapContainer>
        </div>
    )
}

// Centers the map dynamically
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
} 

// Open the form when the user click on the map
function HandleClick() {
    const navigate = useNavigate();

    useMapEvent({
        click: e => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
});
}