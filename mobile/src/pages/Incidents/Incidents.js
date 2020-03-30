import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { Image, FlatList, Text, View, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import LogoImg from '../../assets/logo.png';

import styles from './IncidentsStyle';

const Incidents = () => {
    const [ incidents, setIncidents ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();

    const navigationToDetail = (incident) => {
        navigation.navigate('Detail', { incident });
    }

    const loadIncidents = async() => {
        if (loading) {
            return; //to avoid many request at the same time.
        };

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('/incidents', {
            params: { page },
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={LogoImg} />
                <Text style={styles.headerText}>
                    Total of <Text style={styles.headerTextBold}>{total} cases</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.description}>Chose one of the cases below and save the day, be a hero!</Text>

            <FlatList 
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>NGO:</Text>
                        <Text style={styles.incidentValue}>{ incident.name }</Text>

                        <Text style={styles.incidentProperty}>INCIDENT:</Text>
                        <Text style={styles.incidentValue}>{ incident.description }</Text>

                        <Text style={styles.incidentProperty}>VALUE:</Text>
                        <Text style={styles.incidentValue}>
                            { Intl.NumberFormat('en', 
                            { style: 'currency', currency: 'EUR'})
                            .format(incident.value) }
                        </Text>
                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>More details</Text>
                            <Feather name="arrow-right" size={18} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default Incidents;