import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Form.module.css";
import { formatDate } from "./CityItem";

import Button from "./Button.jsx";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  } 

export default function Form() {
    const navigate = useNavigate();

    const [cityName, setCityName] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        setCityName("");
        setDate(new Date());
        setNotes("");
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City Name</label>
                <input type="text" id="cityName" onChange={e => setCityName(e.target.value)} value={cityName}/>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to the city?</label>
                <input type="text" id="date" onChange={e => setDate(e.target.value)} value={formatDate(date)}/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to</label>
                <input type="text" id="notes" onChange={e => setNotes(e.target.value)} value={notes}/>
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <Button type="back" onClick={() => navigate(-1)}>&larr; Back</Button>
            </div>
        </form>
    )
}