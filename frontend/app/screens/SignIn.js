import React, { useState, useContext } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, StatusBar, TouchableHighlight, Button, TouchableWithoutFeedback } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";

import Spinner from "../components/Spinner";
import NavBar from "../components/NavBar";

import Colors from "../config/colors";

function SignIn(props) {
	const [identifier, setIdentifier] = React.useState("");
	const [password, setPassword] = React.useState("");

	const { signIn } = React.useContext(AuthContext);
	const toast = useToast();
	const [errors, setErrors] = React.useState({});
	const [showSpinner, setShowSpinner] = React.useState(false);

	const { getCurrentUser } = React.useContext(AuthContext);
	if (showSpinner) return <Spinner />;
	return (
		<SafeAreaView style={styles.root}>
			<LinearGradient style={{ ...styles.heightFix }} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
				<NavBar navigation={props.navigation} title={""} />
				<View style={styles.content}>
					<View style={styles.mainContent}>
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
						<HelperText style={styles.input} type='error' visible={errors.identifier}>
							{errors.identifier}
						</HelperText>

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
						<HelperText style={styles.input} type='error' visible={errors.password}>
							{errors.password}
						</HelperText>

						<TouchableHighlight
							style={styles.signInButton}
							onPress={async () => {
								setShowSpinner(true);
								let errorsToAdd = { ...errors };
								if (identifier == "") {
									errorsToAdd = { ...errorsToAdd, identifier: "This field is required" };
								} else {
									delete errorsToAdd.identifier;
								}

								if (password == "") {
									errorsToAdd = { ...errorsToAdd, password: "This field is required" };
								} else {
									delete errorsToAdd.password;
								}

								if (Object.keys(errorsToAdd).length > 0) {
									setErrors({ ...errorsToAdd });
									console.log(errorsToAdd);
									setShowSpinner(false);
									return;
								}

								try {
									await signIn(
										{ identifier, password },
										() => {
											props.navigation.navigate("Home");
										},
										() => {
											setShowSpinner(false);
											toast.show("Unable to login. Check your username and password again", { type: "danger", duration: 5000 });
										}
									);
								} catch (e) {
									setShowSpinner(false);
									toast.show("Unable to login. Check your username and password again", { type: "danger", duration: 5000 });
								}
							}}>
							<Text style={styles.signInButtonText}>Sign in</Text>
						</TouchableHighlight>
					</View>

					<View style={styles.registerButton}>
						<Text style={styles.registerButtonText}>
							Don't have an account?{" "}
							<TouchableWithoutFeedback
								onPress={() => {
									props.navigation.navigate("Register");
								}}>
								<Text style={styles.emphasizeText}>Sign Up</Text>
							</TouchableWithoutFeedback>
						</Text>
					</View>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10, flex: 1 },
	heightFix: {
		flex: 1,
	},
	content: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
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
		bottom: 250,
	},
	registerButton: {
		marginBottom: 35,
	},
	registerButtonText: {
		textAlign: "center",
		color: "#6c6c6c",
	},
	mainContent: {
		marginTop: 175,
	},
	emphasizeText: {
		fontWeight: "700",
	},
});

export default SignIn;
