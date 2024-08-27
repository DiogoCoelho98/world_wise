import { useContext, createContext, useReducer } from "react";

// Create context
const AuthContext = createContext();

function reducer(state, action) {
    switch(action.type) {
        case "login":
            return {...state, user: action.payload, isAuthenticated: true};
        
        case "logout":
            return initialValue;
        
        default: throw new Error("Action type not found");
    }
}

const initialValue= {
    user: null,
    isAuthenticated: false,
}

const fakeUser = {
    userName: "diogo",
    email: "diogo@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz"
}

// Provider
function AuthProvider({ children }) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialValue);
 
    function login(email, password) {
        if (email === fakeUser.email && password === fakeUser.password) {
            dispatch({ 
                type: "login", 
                payload: fakeUser });
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        login,
        logout
    }}>
        {children}
        </AuthContext.Provider>
}

// Custom Hook
function useAuth() {
    const context = useContext(AuthContext);
    
    if (context === undefined) throw new Error("Auth Context was used outside of AuthProvider");

    return context;
}

export { AuthProvider, useAuth };