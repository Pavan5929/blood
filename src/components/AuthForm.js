import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthForm({ onLogin }) {
    const [isLogin, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('donor');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Admin credentials
    const ADMIN_CREDENTIALS = {
        email: "admin@gmail.com",
        password: "admin123"
    };

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:8080/api/Get');
            console.log('Fetched users:', response.data);
            setUsers(Array.isArray(response.data) ? response.data : []);
            setError(null);
        } catch (error) {
            console.error("Error fetching users", error);
            setError("Failed to fetch users. Please try again later.");
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Check if trying to register as admin
        if (role === 'admin') {
            if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
                alert("Invalid admin credentials. Please use correct admin email and password.");
                return;
            }
        }

        try {
            await axios.post('http://localhost:8080/api/create', { email, password, role });
            setEmail("");
            setPassword('');
            setConfirmPassword("");
            alert("Signup successful! Please login.");
            setLogin(true);
            fetchUsers();
        } catch (error) {
            console.error("Error during signup", error);
            alert("Signup failed. Please try again.");
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        // Check for admin login
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            onLogin({ email: ADMIN_CREDENTIALS.email, role: 'admin' });
            return;
        }

        const user = users.find(u => 
            u.email?.toLowerCase().trim() === email.toLowerCase().trim() && 
            u.password === password
        );
        
        if (user) {
            // Only allow admin login if credentials match
            if (user.role === 'admin' && 
                (user.email !== ADMIN_CREDENTIALS.email || 
                 user.password !== ADMIN_CREDENTIALS.password)) {
                alert("Invalid admin credentials");
                return;
            }
            onLogin({ email: user.email, role: user.role || role });
        } else {
            alert("Invalid email or password");
        }
    };

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setRole(newRole);
        if (newRole === 'admin') {
            setEmail(ADMIN_CREDENTIALS.email);
            alert("For admin role, please use the correct admin credentials");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            handleLogin();
        } else {
            handleSignup();
        }
    };

    return (
        <div className='container'>
            <div className="form-container">
                <div className="form-toggle">
                    <button className={isLogin ? 'active' : ""} onClick={() => setLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ""} onClick={() => setLogin(false)}>Signup</button>
                </div>
                {isLoading ? (
                    <div>Loading users...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {isLogin ? (
                            <div className="form">
                                <h2>Login Form</h2>
                                <input 
                                    type="email" 
                                    placeholder='Email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                                <input 
                                    type="password" 
                                    placeholder='Password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                                <button type="submit">Login</button>
                                <p><a href="#">Forgot Password?</a></p>
                            </div>
                        ) : (
                            <div className="form">
                                <h2>Signup Form</h2>
                                <input 
                                    type="email" 
                                    placeholder='Email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    readOnly={role === 'admin'}
                                />
                                <input 
                                    type="password" 
                                    placeholder='Password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                                <input 
                                    type="password" 
                                    placeholder='Confirm Password' 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required 
                                />
                                <select 
                                    value={role} 
                                    onChange={handleRoleChange} 
                                    className="form-control mt-2"
                                >
                                    <option value="donor">Donor</option>
                                    <option value="acceptor">Acceptor</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <button type="submit">Signup</button>
                            </div>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthForm;