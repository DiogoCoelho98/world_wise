import styles from "./Logo.module.css";
import {Link} from "react-router-dom";

export default function Logo() {
    return(
    <>    
        <Link to="/"><img src="/logo.png" alt="logo" className={styles.logo}/></Link>
    </>
    )
}