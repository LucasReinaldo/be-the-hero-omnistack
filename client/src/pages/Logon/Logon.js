import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import LogoImg from '../../assets/logo.svg';
import HerosImg from '../../assets/heroes.png';

import './Logon.css';

const Logon = () => {
    const [ id, setId ] = useState('');

    const history = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (error) {
            alert('Error: Check your ID or register.')
        }
    }

    return (
        <div>
            <div className="logon-container">
                <section className="form">
                <img src={LogoImg} alt="Logo: Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Logon</h1>
                    <input type="text" placeholder="Your ID"
                        value={id}
                        onChange={e => setId(e.target.value)} 
                    />
                    <button className="button" type="submit">SUBMIT</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Register now
                    </Link>
                </form>
                </section>
            <img src={HerosImg} alt="Heroes"/>
            </div>
        </div>
    )
}

export default Logon;