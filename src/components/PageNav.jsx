import Logo from "./Logo.jsx";

import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
    return (
        <nav className={styles.nav}>
            <Logo/>
            <ul>
                <li>
                    <NavLink to="/pricing">
                        Pricing
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/product">
                        Product
                    </NavLink>
                </li>
                
                    
                
            </ul>
            <NavLink 
            to="/login" 
            className={styles.ctaLink}
            >
                Login
            </NavLink>
        </nav>
    )
}