import PageNav from "../components/PageNav.jsx";

import styles from "./Login.module.css";
import {useState} from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setEmail("");
        setPassword("");
    }

    return (
        <main className={styles.login}>
            <PageNav/>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} value={email}/>
                </div>
                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} value={password}/>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </main>
    )
}