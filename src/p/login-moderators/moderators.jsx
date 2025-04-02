import React, { useState } from 'react';
import "./moderators.scss";
import { useNavigate } from 'react-router-dom';

const Moderators = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://online.raqamliavlod.uz/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('accessToken', data.access);
                alert('Tizimga muvaffaqiyatli kirdingiz!');
                navigate("/users-list");
            } else {
                setError(data.message || 'Login muvaffaqiyatsiz. Maʼlumotlarni tekshiring!');
            }
        } catch (err) {
            setError('Server bilan bog‘lanishda xatolik yuz berdi!');
        }
    };

    return (
        <div className='moderators'>
            <div className="login-container">
                <h2>Moderatorlar bo'limiga kirish</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-row">
                        <input
                            type="text"
                            id='username'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="username">Moderator nomini kiriting</label>
                    </div>
                    <div className="input-row">
                        <input
                            type="password"
                            id='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Parol kiriting</label>
                    </div>
                    <div className="input-row">
                        <button type="submit">
                            Kirish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Moderators;
