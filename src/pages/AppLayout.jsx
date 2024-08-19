import SideBar from "../components/SideBar.jsx";
import Map from "../components/Map.jsx";

import styles from "./AppLayout.module.css";

export default function AppLayout() {
    return (
        <main className={styles.app}>
            <SideBar />
            <Map/>
        </main>
    )
}