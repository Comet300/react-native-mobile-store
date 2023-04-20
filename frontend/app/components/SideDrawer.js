import React from "react";
import { View, Text, Modal, Button, StyleSheet, TouchableWithoutFeedback } from "react-native";

function mapElementsToLinks(elements, navigate, close) {
	return elements.map((item) => (
		<TouchableWithoutFeedback
			onPress={() => {
				close();
				navigate("Details", { category: item.id });
			}}>
			<View style={styles.menuButton}>
				<Text style={styles.menuButtonText}>{item.name}</Text>
			</View>
		</TouchableWithoutFeedback>
	));
}

const SideDrawer = (props) => {
	return (
		<Modal animationType='fade' presentationStyle='fullScreen' transparent={true} visible={props.modalVisible} onRequestClose={props.onRequestClose}>
			<TouchableWithoutFeedback onPress={props.onCancel}>
				<View style={styles.modalWrapper}></View>
			</TouchableWithoutFeedback>
			<View style={styles.modalCard}>{mapElementsToLinks(props.elements, props.navigation.navigate, props.onCancel)}</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalWrapper: {
		width: "100%",
		height: "100%",
		backgroundColor: "#00000066",
		justifyContent: "flex-end",
		alignItems: "flex-start",
	},
	modalCard: {
		backgroundColor: "#fff",
		padding: 105,
		borderRadius: 15,
		height: "95%",
		bottom: -15,
		left: -15,
		position: "absolute",
	},
	actionsWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		bottom: 0,
		marginTop: 30,
	},
	firstActionButton: {
		marginRight: 7,
	},
	menuButton: {
		backgroundColor: "#fff",
		padding: 15,
		marginBottom: 25,
	},
	menuButtonText: {
		color: "#000",
		fontSize: 20,
		fontWeight: "700",
	},
});

export default SideDrawer;
