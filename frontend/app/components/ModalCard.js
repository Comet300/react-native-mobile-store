import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const ModalCard = (props) => {
	return (
		<Modal animationType='fade' presentationStyle='fullScreen' transparent={true} visible={props.modalVisible} onRequestClose={props.onRequestClose}>
			<View style={styles.modalWrapper}>
				<View style={styles.modalCard}>
					{props.children}
					<View style={styles.actionsWrapper}>
						<Button labelStyle={{ fontSize: 12 }} style={styles.firstActionButton} compact={true} color='#000' mode='text' onPress={props.onCancel}>
							Anulează
						</Button>
						<Button compact={true} color='#000' mode='contained' onPress={props.onConfirm}>
							Confirmă
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalWrapper: {
		width: "100%",
		height: "100%",
		backgroundColor: "#00000066",
		justifyContent: "center",
		alignItems: "center",
	},
	modalCard: {
		backgroundColor: "#fff",
		padding: 25,
		borderRadius: 15,
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
});

export default ModalCard;
