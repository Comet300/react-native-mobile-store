import React from "react";
import { View, Image, Button, StyleSheet, Text, StatusBar, SafeAreaView, ScrollView, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../contexts/AuthContext";

import Colors from "../config/colors";
import NavBar from "../components/NavBar";
import constants from "../config/constants";

const Profile = (props) => {
	const { getCurrentUser, signOut } = React.useContext(AuthContext);
	let user = getCurrentUser();
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

					<View style={styles.content}>
						<Image
							style={styles.profilePic}
							source={
								user && user.user.profile_pic
									? { uri: constants.serverUrl + user.user.profile_pic.formats.small.url }
									: require(`../assets/images/generic-user.jpg`)
							}
						/>

						{user ? (
							<>
								<Text style={styles.name}>{user.user.name}</Text>
								<Text style={styles.email}>{user.user.email}</Text>
							</>
						) : (
							<TouchableWithoutFeedback style={styles.signIn} onPress={() => props.navigation.navigate("SignIn")}>
								<Text style={styles.transparentButtonText}>Sign in</Text>
							</TouchableWithoutFeedback>
						)}
					</View>
					<View style={styles.actions}>
						{user ? (
							<TouchableWithoutFeedback
								onPress={() => {
									let success = signOut();
									if (success) props.navigation.navigate("Home");
								}}>
								<Text style={styles.transparentButtonText}>Sign out</Text>
							</TouchableWithoutFeedback>
						) : (
							<></>
						)}
					</View>
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
	content: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		height: "100%",
	},
	profilePic: {
		height: 150,
		width: 150,
		borderRadius: 500,
		marginBottom: 15,
	},
	email: {
		fontWeight: "700",

		color: "#777",
	},
	actions: {
		position: "absolute",
		bottom: 100,
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
	transparentButtonText: {
		fontWeight: "700",
	},
	name: {
		fontWeight: "700",
		fontSize: 23,
	},
});

export default Profile;
