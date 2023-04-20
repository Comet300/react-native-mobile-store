import React from "react";
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Switch, StatusBar, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../config/colors";

const OrderConfirmation = (props) => {
	return (
		<SafeAreaView style={styles.root}>
			<ScrollView>
				<LinearGradient style={styles.heightFix} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
					<View style={styles.content}>
						<View>
							<View style={styles.sameline}>
								<Text style={styles.title}>Order placed!</Text>
								<Image source={require("./../assets/icons/checkout.png")} style={styles.icon} />
							</View>
							<Text style={styles.subtitle}>Your items are already on the way!</Text>
						</View>

						<TouchableHighlight
							style={styles.checkoutButton}
							onPress={() => {
								props.navigation.navigate("Home");
							}}>
							<Text style={styles.checkoutButtonText}>Continue</Text>
						</TouchableHighlight>
					</View>
				</LinearGradient>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10, flex: 1 },
	heightFix: {
		minHeight: 720,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
	},
	icon: {
		width: 45,
		height: 45,
		marginLeft: 15,
	},
	sameline: {
		display: "flex",
		flexDirection: "row",
	},
	content: {
		paddingTop: 40,
		paddingBottom: 30,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1,
	},
	checkoutButton: {
		backgroundColor: "#000",
		padding: 12,
		width: 170,
		borderRadius: 15,
	},
	checkoutButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	subtitle: {
		marginTop: 10,
	},
});

export default OrderConfirmation;
