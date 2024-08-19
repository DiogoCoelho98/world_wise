import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";

import styles from "./CityList.module.css";

export default function CityList({cities, loading}) {
    if (loading) return <Spinner />
    if (cities.length === 0) return <Message message={"Add your first city by clicking on a city on the map"}/>

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => <CityItem key={city.id} city={city}/>)}
        </ul>
    )
}