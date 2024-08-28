import styles from "./User.module.css";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
import { useNavigate } from "react-router-dom";


export default function User() {
    const { user, logout } = useAuth();
    
    const navigate = useNavigate();

    function handleClick() {
        logout();
        navigate("/");
    }

    return(
        <div className={styles.user}>
            <img 
                src={user.avatar} 
                alt={user.userName} 
            />
            <span>Welcome, {user.userName}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

 