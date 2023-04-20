import React from "react";
import { View, StyleSheet, Text, StatusBar, Button, Image, TouchableHighlight, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../config/colors";

const RegisterSuccess = (props) => {
	return (
		<SafeAreaView style={styles.root}>
			<LinearGradient style={{ ...styles.heightFix }} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
				<View style={styles.content}>
					<View>
						<View style={styles.headerContainer}>
							<Text style={styles.header}>Account created</Text>
							<Image style={styles.headerIcon} source={require("./../assets/icons/check-mark.png")} />
						</View>
						<Text style={styles.subheader}>Check your inbox to confirm your account</Text>
					</View>

					<View>
						<TouchableHighlight
							style={styles.confirmButton}
							onPress={async () => {
								props.navigation.navigate("Home");
							}}>
							<Text style={styles.confirmButtonText}>Continue</Text>
						</TouchableHighlight>
					</View>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10, flex: 1 },
	heightFix: { flex: 1 },
	content: { marginTop: 50, display: "flex", flex: 1, justifyContent: "space-between" },
	headerContainer: { display: "flex", flexDirection: "row", alignItems: "baseline", padding: 20, marginTop: 10 },
	header: { fontSize: 28, marginRight: 18 },
	headerIcon: { height: 40, width: 40 },
	subheader: { paddingLeft: 20, paddingRight: 20 },
	confirmButton: {
		backgroundColor: "#000",
		padding: 12,
		width: 280,
		borderRadius: 15,
		marginBottom: 30,
		alignSelf: "center",
	},
	confirmButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	continueWithoutSignIn: {
		padding: 12,
		width: 280,
		borderRadius: 15,
		marginBottom: 30,
		alignSelf: "center",
		color: "#6c6c6c",
		textAlign: "center",
	},
});

export default RegisterSuccess;
