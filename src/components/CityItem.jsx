import styles from "./CityItem.module.css";
import {Link} from "react-router-dom";

export const formatDate = (date) => 
     new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(date))

export default function CityItem({city}) {
    const {cityName, date, emoji, id, position: {lat, lng}} = city;
    return (
        <li>
            <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}