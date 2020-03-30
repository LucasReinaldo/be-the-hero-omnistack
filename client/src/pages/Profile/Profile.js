import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api';
import LogoImg from '../../assets/logo.svg';

import './Profile.css';

const Profile = () => {
    const [ incidents, setIncidents ] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, []);

    const handleDeleteIncident = async(id) => {
        try {
            await api.delete(`/incidents/delete/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Error: try again.');
        };
    };

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Logo: Be The Hero" />
                <span>Welcome, {ongName}</span>
                
                <Link className="button" to="/incidents/new">New case</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                    Logout
                </button>
            </header>
            <h1>Incidents:</h1>
            <ul>
                {incidents.map(el => (
                    <li key={el.id}>
                        <strong>INCIDENT:</strong>
                        <p>{el.title}</p>
                        <strong>DESCRIPTION:</strong>
                        <p>{el.description}</p>
                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(el.value)}</p>

                        <button onClick={() => handleDeleteIncident(el.id)} type="button">
                            <FiTrash2 size={20} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Profile;
