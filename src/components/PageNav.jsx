import Logo from "./Logo.jsx";

import {NavLink, Link} from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><Link to="/"><Logo/></Link></li>
                <li><NavLink to="/pricing">Pricing</NavLink></li>
                <li><NavLink to="/product">Product</NavLink></li>
                <li><NavLink to="/login" className={styles.ctaLink}>Login</NavLink></li>
            </ul>
        </nav>
    )
}