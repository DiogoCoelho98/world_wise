import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";

import styles from "./CountriesList.module.css";

export default function CountriesList({cities, loading}) {
    if (loading) return <Spinner />;
    
    if (cities.length === 0) return <Message message={"Add your first city by clicking on a city on the map"}/>;

     const countries = cities.reduce((acc, cur) => {
        if (!acc.map(el => el.country).includes(cur.country)) {
            return [...acc, {country: cur.country, emoji: cur.emoji}];
        } else {
            return acc;
        }
    }, []) 

    return (
        <ul className={styles.countriesList}>
            {countries.map((country, i) => <CountryItem country={country} key={i}/>)}
        </ul>   
    )
}