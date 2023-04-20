import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, TouchableWithoutFeedback, Text, Image } from "react-native";
import { Divider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import { useCartState } from "../contexts/CartContext";

const CartMenu = (props) => {
	const [cartState, dispatchCartState] = useCartState();
	const currentCartItem = cartState?.content.filter((a) => a.product == props.ProductContext)[0];
	const [value, setValue] = useState(`${currentCartItem?.qty}`);
	const [showQuantityAdjust, setShowQuantityAdjust] = useState(false);

	useEffect(() => {
		setValue(`${currentCartItem?.qty}`);
	}, [cartState, currentCartItem]);

	if (showQuantityAdjust)
		return (
			<Modal animationType='fade' presentationStyle='fullScreen' transparent={true} visible={props.modalVisible} onRequestClose={props.onRequestClose}>
				<TouchableWithoutFeedback onPress={props.onCancel}>
					<View style={styles.modalWrapper}></View>
				</TouchableWithoutFeedback>
				<View style={styles.modalCard}>
					<View style={styles.actionsContainer}>
						<TouchableWithoutFeedback
							onPress={() => {
								setShowQuantityAdjust(false);
								setValue(`${currentCartItem?.qty}`);
							}}>
							<Text style={styles.emphasizeText}>Cancel</Text>
						</TouchableWithoutFeedback>
						<Text style={styles.deemphasizeText}>Adjust quantity</Text>

						<TouchableWithoutFeedback
							onPress={() => {
								dispatchCartState({
									content: [
										...cartState.content.map((a) => {
											if (a.product == props.ProductContext) return { ...a, qty: parseInt(value) };
											return a;
										}),
									],
								});
								setShowQuantityAdjust(false);
								props.onRequestClose();
							}}>
							<Text style={styles.emphasizeText}>Confirm</Text>
						</TouchableWithoutFeedback>
					</View>
					<Divider style={styles.dividerSpacing} />
					<Picker selectedValue={value} onValueChange={(itemValue, itemIndex) => setValue(itemValue)}>
						<Picker.Item label='1' value='1' />
						<Picker.Item label='2' value='2' />
						<Picker.Item label='3' value='3' />
						<Picker.Item label='4' value='4' />
						<Picker.Item label='5' value='5' />
						<Picker.Item label='6' value='6' />
						<Picker.Item label='7' value='7' />
						<Picker.Item label='8' value='8' />
						<Picker.Item label='9' value='9' />
						<Picker.Item label='10' value='10' />
					</Picker>
				</View>
			</Modal>
		);
	else
		return (
			<Modal animationType='fade' presentationStyle='fullScreen' transparent={true} visible={props.modalVisible} onRequestClose={props.onRequestClose}>
				<TouchableWithoutFeedback onPress={props.onCancel}>
					<View style={styles.modalWrapper}></View>
				</TouchableWithoutFeedback>
				<View style={styles.modalCard}>
					<TouchableWithoutFeedback
						onPress={() => {
							setShowQuantityAdjust(true);
						}}>
						<View style={styles.menuOption}>
							<Image source={require("./../assets/icons/hashtag.png")} style={styles.icon} />
							<Text>Adjust quantity</Text>
						</View>
					</TouchableWithoutFeedback>

					<TouchableWithoutFeedback
						onPress={() => {
							const filteredData = cartState?.content.filter((a) => a.product != props.ProductContext)[0];
							if (filteredData && filteredData.length >= 0) {
								dispatchCartState({ content: [...cartState.content.filter((a) => a.product != props.ProductContext)[0]] });
							} else if (filteredData) {
								dispatchCartState({ content: [filteredData] });
							} else {
								dispatchCartState({ content: [] });
							}
							props.onRequestClose(0);
						}}>
						<View style={styles.menuOption}>
							<Image source={require("./../assets/icons/close.png")} style={styles.icon} />
							<Text>Remove product</Text>
						</View>
					</TouchableWithoutFeedback>

					<Divider style={styles.dividerSpacing} />
					<TouchableWithoutFeedback onPress={props.onRequestClose}>
						<View style={styles.menuOption}>
							<Text style={styles.emphasizeText}>Cancel</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</Modal>
		);
};

const styles = StyleSheet.create({
	modalWrapper: {
		width: "100%",
		height: "100%",
		backgroundColor: "#00000066",
	},
	modalCard: {
		backgroundColor: "#fff",
		borderRadius: 15,
		paddingTop: 20,
		paddingBottom: 30,
		width: "100%",
		padding: 15,
		position: "absolute",
		bottom: -15,
	},
	menuOption: {
		margin: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 15,
		height: 15,
		marginRight: 10,
	},
	dividerSpacing: {
		marginTop: 15,
		marginBottom: 5,
	},
	emphasizeText: {
		fontWeight: "700",
	},
	deemphasizeText: {
		color: "#888",
	},
	actionsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default CartMenu;
