import React from "react";
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from "react-native";
import { useCartState } from "../contexts/CartContext";

const SummaryRow = (props) => {
	const [cartState, dispatchCartState] = useCartState();
	return (
		<View style={styles.rowPositioner}>
			<View style={styles.sameLine}>
				<Image style={styles.rowImage} source={{ uri: props.image }} resizeMode='contain' />
				<View style={{ marginTop: 7 }}>
					<Text style={styles.Emphasize}>{props.Title}</Text>
					<Text style={styles.Emphasize}>{props.Price}</Text>
				</View>
			</View>
			<View style={styles.marginRight15}>
				<Text>x{cartState?.content.filter((a) => a.product == props.id)[0]?.qty}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rowImage: { width: 70, height: 70 },
	sameLine: {
		display: "flex",
		flexDirection: "row",
	},
	Emphasize: {
		fontWeight: "700",
	},
	rowPositioner: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 7,
	},
	marginRight15: {
		marginRight: 15,
	},
});

export default SummaryRow;
