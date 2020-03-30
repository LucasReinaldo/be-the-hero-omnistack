import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import LogoImg from '../../assets/logo.svg';

import './NewIncident.css'

const NewIncident = () => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            history.push('/profile')
        } catch (error) {
            alert('Error: Please, try again.')
        }
        
    }

    const handleButtonCancel = () => {
        setTitle("");
        setDescription("")
        setValue("");
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Logo: Be The Hero" />
                    <h1>Register new incident</h1>
                    <p>Describe the incident with as manu detail possible to find a hero to help it!</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Incidents
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Incident title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                    />
                    <textarea placeholder="Description" 
                        value={description} onChange={e => setDescription(e.target.value)}
                    />
                    <input type="text" placeholder="Value (€)" 
                        value={value} 
                        onChange={e => setValue(e.target.value)}
                    />
                    <div className="button-group">
                        <button className="button" type="submit">Register</button>
                        <button onClick={handleButtonCancel} className="button-cancel" type="reset">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewIncident;