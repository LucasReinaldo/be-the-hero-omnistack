import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Image, Text, View, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import LogoImg from '../../assets/logo.png';

import styles from './DetailStyle';

const Detail = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const incident = route.params.incident;

	const message = `Hello there, ${
		incident.name
	}, hope you are doing well. I'm getting in touch because I'd like to help in the incident ${
		incident.title
	}, with the amount of ${Intl.NumberFormat('en', {
		style: 'currency',
		currency: 'EUR',
	}).format(incident.value)}`;

	const navigateBack = () => {
		navigation.goBack();
	};

	const sendMail = () => {
		MailComposer.composeAsync({
			subject: `Hero of the incident: ${incident.title}`,
			recipients: [incident.email],
			body: message,
		});
	};

	const sendWhatsApp = () => {
		Linking.openURL(
			`whatsapp://send?phone=${incident.whatsapp}&text=${message}`
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={LogoImg} />

				<TouchableOpacity onPress={navigateBack}>
					<Feather name="arrow-left" size={28} color="#E82041" />
				</TouchableOpacity>
			</View>

			<View style={styles.incident}>
				<Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
				<Text style={styles.incidentValue}>
					{incident.name} from {incident.city} - {incident.uf}{' '}
				</Text>

				<Text style={styles.incidentProperty}>INCIDENT:</Text>
				<Text style={styles.incidentValue}>{incident.description}</Text>

				<Text style={styles.incidentProperty}>VALUE:</Text>
				<Text style={styles.incidentValue}>
					{Intl.NumberFormat('en', {
						style: 'currency',
						currency: 'EUR',
					}).format(incident.value)}
				</Text>
			</View>

			<View style={styles.contactBox}>
				<Text style={styles.heroTitle}>Save the day!</Text>
				<Text style={styles.heroTitle}>Be the hero of this case.</Text>

				<Text style={styles.heroDescription}>Get in touch:</Text>

				<View style={styles.actions}>
					<TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
						<Text style={styles.actionText}>WhatsApp</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.action} onPress={sendMail}>
						<Text style={styles.actionText}>E-mail</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Detail;
