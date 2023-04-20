import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Button, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../config/colors";

class Home extends Component {
	render() {
		return (
			<SafeAreaView style={styles.root}>
				<LinearGradient colors={["#fff", Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
					<Text>Home Screens</Text>
					<Button title='Go to Details' onPress={() => this.props.navigation.navigate("Details")} />
				</LinearGradient>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		marginTop: StatusBar.currentHeight,
	},
});

export default Home;
