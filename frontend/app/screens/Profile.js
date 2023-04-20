import React from "react";
import { View, Button, StyleSheet, Text, StatusBar, SafeAreaView, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../contexts/AuthContext";

import Colors from "../config/colors";
import NavBar from "../components/NavBar";

const Profile = (props) => {
	const { getCurrentUser, signOut } = React.useContext(AuthContext);

	return (
		<SafeAreaView style={styles.root}>
			<ScrollView>
				<LinearGradient
					style={styles.heightFix}
					// Background Linear Gradient
					colors={[Colors.background_gradient_1, Colors.background_gradient_2]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}>
					<NavBar navigation={props.navigation} title={"Profile"} />
					<Button title='Print user' onPress={() => console.log(getCurrentUser())} />
					<Button
						title='Sign out'
						onPress={() => {
							let success = signOut();
							if (success) props.navigation.navigate("Home");
						}}
					/>
					<Button title='Sign in' onPress={() => props.navigation.navigate("SignIn")} />
				</LinearGradient>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10 },
	heightFix: {
		minHeight: 720,
	},
});

export default Profile;
