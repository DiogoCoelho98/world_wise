import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const navigate = useNavigate();
    
    return(
        <div className={styles.mapContainer} onClick={() =>navigate("form")}>
            <h1>Position of the selected city</h1>
            <h2>lat: <span>{lat}</span> lng: <span>{lng}</span></h2>
        </div>
    )
}