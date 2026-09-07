import React, {
    createContext,
    useContext,
    useState,
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("userInfo");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // LOGIN
    const login = (userData) => {

        setUser(userData);

        localStorage.setItem(
            "userInfo",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "token",
            userData.token
        );
    };

    // LOGOUT
    const logout = () => {

        setUser(null);

        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


// Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};