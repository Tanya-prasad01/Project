/*
import React, { useState } from 'react';
import './Login.css'; 

const App = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            console.log('Registering:', formData);
            alert('Registration successful!');
        } else {
            console.log('Logging in:', { email: formData.email, password: formData.password });
            alert('Login successful!');
        }
        setFormData({ username: '', email: '', password: '' });
    };

    return (
        <div className="container">
            <h1>Blood Management System</h1>
            <div className="form-toggle">
                <button onClick={() => setIsRegistering(true)}>Register</button>
                <button onClick={() => setIsRegistering(false)}>Login</button>
            </div>
            <form onSubmit={handleSubmit} className="form">
                {isRegistering && (
                    <>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    </>
                )}
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
        </div>
    );
};

export default App;

*/

import React, { useState } from 'react';
import './Login.css';

const App = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            console.log('Registering:', formData);
            alert('Registration successful!');
        } else {
            console.log('Logging in:', { email: formData.email, password: formData.password });
            alert('Login successful!');
        }
        setFormData({ username: '', email: '', password: '' });
    };

    return (
        <div className="container">
            <h1>Blood Management System</h1>
            <div className="form-toggle">
                <button onClick={() => setIsRegistering(true)} style={{ background: isRegistering ? '#ff4d4d' : '#eee', color: isRegistering ? '#fff' : '#000' }}>Register</button>
                <button onClick={() => setIsRegistering(false)} style={{ background: !isRegistering ? '#ff4d4d' : '#eee', color: !isRegistering ? '#fff' : '#000' }}>Login</button>
            </div>
            <form onSubmit={handleSubmit} className="form">
                {isRegistering && (
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                )}
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
        </div>
    );
};

export default App;
