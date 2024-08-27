import PageNav from "../components/PageNav";

import styles from "./Home.module.css";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <main className={styles.homepage}>
            <PageNav />

            <section>
                <h1>You travel the world<br/>WorldWise keeps track of your adventure</h1>
                <h2>A world map that tracks your footsteps into every city you can think of. Never forget your wonderful experiences, and show your friends how you have wandered the world.</h2>
                <Link to="/login" className="cta">Start Tracking now</Link>
            </section>
        </main>
    )
}