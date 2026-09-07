import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import '../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await API.post('/auth/login', {
                email,
                password
            });

            login(data);
            navigate('/');

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Login failed');
       }
   };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">

                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn">
                    Login
                </button>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
    );
};

export default Login;