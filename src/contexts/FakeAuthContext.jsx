import { useContext, createContext, useReducer } from "react";

// Create context
const AuthContext = createContext();

function reducer(state, action) {
    switch(action.type) {
        case "login":
            return {
                ...state, 
                user: action.payload, 
                isAuthenticated: true
            };
        
        case "logout":
            return initialValue;
        
        default: throw new Error("Action type not found");
    }
}

// Initial state
const initialValue= {
    user: null,
    isAuthenticated: false,
}

const fakeUser = JSON.parse(import.meta.env.VITE_FAKE_USER);

// Provider component
function AuthProvider({ children }) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialValue);
 
    function login(email, password) {
        if (email === fakeUser.email && password === fakeUser.password) {
            dispatch({ 
                type: "login", 
                payload: fakeUser 
            });
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    // Assigning values to provider
    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        login,
        logout
    }}
            >
        {children}
        </AuthContext.Provider>
}

// Custom hook
function useAuth() {
    const context = useContext(AuthContext);
    
    if (context === undefined) throw new Error("Auth Context was used outside of AuthProvider");

    return context;
}

export { AuthProvider, useAuth };