import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ImageResolver = (icon) => {
	if (icon == "plant") return <Image source={require("./../assets/icons/highlights/plant.png")} style={styles.icon} />;
	if (icon == "hands-globe") return <Image source={require("./../assets/icons/highlights/hands-globe.png")} style={styles.icon} />;
	if (icon == "hand-leaves") return <Image source={require("./../assets/icons/highlights/hand-leaves.png")} style={styles.icon} />;
	if (icon == "parfume") return <Image source={require("./../assets/icons/highlights/parfume.png")} style={styles.icon} />;
	if (icon == "diamond") return <Image source={require("./../assets/icons/highlights/diamond.png")} style={styles.icon} />;
	if (icon == "trend") return <Image source={require("./../assets/icons/highlights/trend.png")} style={styles.icon} />;
};

const Highlightcell = (props) => {
	return (
		<View style={styles.root}>
			{ImageResolver(props.icon)}
			<Text style={styles.label}>{props.label}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 30,
		width: 105,
		height: 105,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		width: 45,
		height: 45,
	},
	label: {
		textAlign: "center",
		marginTop: 10,
		color: "#777",
	},
});

export default Highlightcell;
