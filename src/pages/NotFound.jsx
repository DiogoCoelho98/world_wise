import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className={styles.homepage} style={{
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
            }}>
            <h1>Page not found 🥹</h1>
            <Link to="/" className="cta" style={{marginTop: "2rem"}}>Homepage</Link>
        </div>
    )
}