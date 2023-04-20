import React, { useState, useContext } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, StatusBar, TouchableHighlight, Button, TouchableWithoutFeedback } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { AuthContext } from "../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";

import Spinner from "./../components/Spinner";
import axios from "axios";
import constants from "../config/constants";

import NavBar from "../components/NavBar";

import Colors from "../config/colors";

const Register = (props) => {
	const [identifier, setIdentifier] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");

	const [errors, setErrors] = React.useState({});
	const [showSpinner, setShowSpinner] = React.useState(false);

	const toast = useToast();

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
							label='Email'
							value={email}
							onChangeText={setEmail}
						/>
						<HelperText style={styles.input} type='error' visible={errors.email}>
							{errors.email}
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

						<TextInput
							activeOutlineColor='#000'
							activeUnderlineColor='#000'
							selectionColor='#000'
							underlineColor='#000'
							style={styles.input}
							label='Confirm password'
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry
						/>
						<HelperText style={styles.input} type='error' visible={errors.confirmPassword}>
							{errors.confirmPassword}
						</HelperText>

						<TouchableHighlight
							style={styles.registerButton}
							onPress={async () => {
								let errorsToAdd = { ...errors };
								if (email == "") {
									errorsToAdd = { ...errorsToAdd, email: "This field is required" };
								} else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
									errorsToAdd = { ...errorsToAdd, email: "Email address is invalid!" };
								} else {
									delete errorsToAdd.email;
								}

								if (password == "") {
									errorsToAdd = { ...errorsToAdd, password: "This field is required" };
								} else {
									delete errorsToAdd.password;
								}

								if (confirmPassword == "") {
									errorsToAdd = { ...errorsToAdd, confirmPassword: "This field is required" };
								} else {
									delete errorsToAdd.confirmPassword;
								}

								if (confirmPassword != "" && password != "")
									if (password != confirmPassword) {
										errorsToAdd = { ...errorsToAdd, confirmPassword: "Passwords do not match" };
									} else {
										delete errorsToAdd.confirmPassword;
									}

								if (Object.keys(errorsToAdd).length > 0) {
									setErrors({ ...errorsToAdd });
									return;
								} else {
									setShowSpinner(true);

									let userData = {
										username: email,
										email: email,
										password: password,
									};
									// console.log(userData);

									axios.post(`${constants.serverUrl}/auth/local/register`, userData)
										.then((response) => {
											if (response.data.user.email == userData.email) {
												props.navigation.navigate("RegisterSuccess");
											} else {
												toast.show("Unable create your account. Please try again later", { type: "danger", duration: 5000 });
											}
										})
										.catch((error) => {
											console.log("An error occurred:", error.response);
										});
								}
							}}>
							<Text style={styles.registerButtonText}>Register</Text>
						</TouchableHighlight>
					</View>

					<View>
						<Text style={styles.SignInText}>
							Already have an account?{" "}
							<TouchableWithoutFeedback
								onPress={() => {
									props.navigation.navigate("SignIn");
								}}>
								<Text style={styles.emphasizeText}>Log In</Text>
							</TouchableWithoutFeedback>
						</Text>
					</View>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10, flex: 1 },
	heightFix: {
		flex: 1,
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
		alignSelf: "center",
	},
	registerButton: {
		backgroundColor: "#000",
		padding: 12,
		width: 280,
		borderRadius: 15,
		marginTop: 30,
		alignSelf: "center",
	},
	registerButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	SignInText: {
		padding: 12,
		width: 280,
		borderRadius: 15,
		marginBottom: 30,
		alignSelf: "center",
		color: "#6c6c6c",
		textAlign: "center",
	},
	emphasizeText: {
		fontWeight: "700",
	},
	content: {
		flex: 1,
		justifyContent: "space-between",
	},
	mainContent: { marginTop: 25 },
});

export default Register;
