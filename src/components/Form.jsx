import styles from "./Form.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "./CityItem";
import { useURLGeoposition } from "../hooks/useURLGeoposition.js";

import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

export default function Form() {
    const [cityName, setCityName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [emoji, setEmoji] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const [lat, lng] = useURLGeoposition();
    
    // Get city name with lat/lng
    useEffect(() => {
        async function getCity() {  
            try {
                setLoading(true);
                setError("");

                    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
                    if (!res.ok) throw new Error("Error while fetching data");
                    
                    const data = await res.json();
                    if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else");

                    setCityName(data.city || data.locality);
                    setCountryName(data.countryName);
                    setEmoji(convertToEmoji(data.countryCode));
                }
                catch(err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
        }
        getCity();
    }, [lat, lng]);

    if (loading) return <Spinner />
    if (error) return <Message message={error}/>

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
                <span className={styles.flag}>{emoji}</span>
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
                <BackButton />
            </div>
        </form>
    )
}