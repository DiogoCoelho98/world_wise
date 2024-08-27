import SideBar from "../components/SideBar.jsx";
import Map from "../components/Map.jsx";
import User from "../components/User.jsx";

import styles from "./AppLayout.module.css";

export default function AppLayout() {
    return (
        <main className={styles.app}>
            <SideBar />
            <Map/>
            <User />
        </main>
    )
}