import styles from "./Form.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useURLGeoposition } from "../hooks/useURLGeoposition.js";
import { useCities } from "../contexts/CitiesContext.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    const [country, setCountry] = useState("");
    const [emoji, setEmoji] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());


    const navigate = useNavigate();

    const [lat, lng] = useURLGeoposition();

    const {createCity, isLoading} = useCities();
    
    // Get city name with lat/lng
    useEffect(() => {
        async function getCity() {  
            if (!lat && !lng) return;

            try {
                setLoading(true);
                setError("");

                const apiKey = import.meta.env.VITE_API_KEY;
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&key=${apiKey}`);
                    if (!res.ok) throw new Error("Error while fetching data");
                    
                    const data = await res.json();
                    if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else");

                    setCityName(data.city || data.locality);
                    setCountry(data.countryName);
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

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {
                lat,
                lng
            }
        };

        await createCity(newCity);
        navigate("/app/cities");

        setCityName("");
        setNotes("");
    }

    if (loading) return <Spinner />
    if (!lat && !lng) return <Message message="Start by clicking somewhere on the map"/>
    if (error) return <Message message={error}/>

    return(
        <form className={`${styles.form} ${isLoading ? styles.loading: ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City Name</label>
                <input type="text" id="cityName" onChange={e => setCityName(e.target.value)} value={cityName} disabled/>
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to the city?</label>
                <DatePicker selected={date} onChange={date => setDate(date)} dateFormat="dd/MM/yyyy" id="date"/>

            </div>


            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to</label>
                <input type="text" id="notes" onChange={e => setNotes(e.target.value)} value={notes} required/>
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton />
            </div>
        </form>
    )
}