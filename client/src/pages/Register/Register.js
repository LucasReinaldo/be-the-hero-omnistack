import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import LogoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './Register.css';

const Register = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ uf, setUf ] = useState('');

    const history = useHistory()

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
    
        try {
            const response = await api.post('/ongs', data);

            alert(`Your ID: ${response.data.id}`);

            history.push('/')
        } catch (error) {
            alert(`Error: Please, try again.`)
        };

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Logo: Be The Hero" />
                    <h1>Register</h1>
                    <p>Register and help people make a difference for good!</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input type="text"
                        placeholder="NGO name" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                    />
                    <input type="email" 
                        placeholder="E-mail"
                        value={email} 
                        onChange={e => setEmail(e.target.value)} />
                    <input type="text" 
                        placeholder="WhatsApp"
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)} />
                    <div className="input-group">
                        <input type="text" 
                            placeholder="City"
                            value={city} 
                            onChange={e => setCity(e.target.value)} />
                        <input type="text" 
                            placeholder="County" style={{ width: 140 }}
                            value={uf} 
                            onChange={e => setUf(e.target.value)} />
                    </div>
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
