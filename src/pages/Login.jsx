import PageNav from "../components/PageNav.jsx";
import Button from "../components/Button.jsx";

import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
 
export default function Login() {
    const [email, setEmail] = useState("diogo@example.com");
    const [password, setPassword] = useState("");

    const { login, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        // Replace key overwrites the path
        if (isAuthenticated) navigate("/app", {replace: true});
    }, [navigate, isAuthenticated])


    function handleSubmit(e) {
        e.preventDefault();

        if (email && password) login(email, password);

        setEmail("");
        setPassword("");
    }

    return (
        <main className={styles.login}>
            <PageNav/>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        onChange={e => setEmail(e.target.value)} 
                        value={email}
                    />
                </div>
                
                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        onChange={e => setPassword(e.target.value)} 
                        value={password}
                    />
                </div>

                <div>
                    <Button type="primary">Login</Button>
                </div>
            </form>
        </main>
    )
}