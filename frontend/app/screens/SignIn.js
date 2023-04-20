import React, { useState, useContext } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, StatusBar, TouchableHighlight, Button } from "react-native";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";

import Colors from "../config/colors";

function SignIn(props) {
	const [identifier, setIdentifier] = React.useState("");
	const [password, setPassword] = React.useState("");

	const { signIn } = React.useContext(AuthContext);
	const toast = useToast();

	return (
		<SafeAreaView style={styles.root}>
			<LinearGradient
				style={{ ...styles.heightFix }}
				// Background Linear Gradient
				colors={[Colors.background_gradient_1, Colors.background_gradient_2]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}>
				<View style={styles.content}>
					<Image style={styles.logo} source={require("../assets/images/logo.jpg")} />
					<TextInput
						activeOutlineColor='#000'
						activeUnderlineColor='#000'
						selectionColor='#000'
						underlineColor='#000'
						style={styles.input}
						label='Username'
						value={identifier}
						onChangeText={setIdentifier}
					/>
					<TextInput
						activeOutlineColor='#000'
						activeUnderlineColor='#000'
						selectionColor='#000'
						underlineColor='#000'
						style={styles.input}
						label='Password'
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>

					<TouchableHighlight
						style={styles.signInButton}
						onPress={async () => {
							if (identifier == "" || password == "") {
								toast.show("All fields are required", { type: "danger", duration: 5000, offset: 0, animationType: "slide-in" });
								return;
							}

							let status = signIn({ identifier, password });
							if (status) props.navigation.navigate("Home");
							else toast.show("Unable to login. Check your login id and password again", { type: "danger", duration: 5000 });
						}}>
						<Text style={styles.signInButtonText}>Sign in</Text>
					</TouchableHighlight>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10 },
	heightFix: {
		minHeight: 720,
	},
	content: {
		flex: 1,
		top: -80,
		justifyContent: "center",
	},
	signInButton: {
		backgroundColor: "#000",
		padding: 12,
		width: 280,
		borderRadius: 15,
		marginTop: 30,
		alignSelf: "center",
	},
	signInButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	input: {
		width: "80%",
		alignSelf: "center",
		backgroundColor: "rgba(0,0,0,0)",
	},
	logo: {
		width: 150,
		height: 150,
		borderRadius: 100,
		position: "absolute",
		alignSelf: "center",
		top: 100,
	},
});

export default SignIn;
