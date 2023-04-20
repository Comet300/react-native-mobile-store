import React, { useState, useContext } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

function SignIn(props) {
	const [identifier, setIdentifier] = React.useState("");
	const [password, setPassword] = React.useState("");

	const { signIn } = React.useContext(AuthContext);

	return (
		<View style={styles.root}>
			<TextInput placeholder='Username' value={identifier} onChangeText={setIdentifier} />
			<TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
			<Button
				title='Sign in'
				onPress={async () => {
					let status = signIn({ identifier, password });
					if (status) props.navigation.navigate("Home");
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		marginTop: 150,
	},
});

export default SignIn;
