import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, TouchableHighlight } from "react-native";

import { AuthContext } from "../contexts/AuthContext";
import { useCartState } from "../contexts/CartContext";

const CartRow = (props) => {
	const { getCurrentUser } = React.useContext(AuthContext);
	const [cartState, dispatchCartState] = useCartState();

	const user = getCurrentUser();
	const { style } = props;
	const [favState, setFavState] = useState(false);
	return (
		<TouchableWithoutFeedback
			style={styles.touchWrapper}
			onPress={() => {
				props.navigation.navigate("ProductView", { id: props.id });
			}}>
			<View style={{ ...style, ...styles.root }}>
				<View style={styles.sameRow}>
					<Image style={styles.cardImage} source={props.Image} />
					<View style={styles.fillWidth}>
						<View style={styles.carouselCardRow}>
							<Text style={styles.carouselCardTitle}>{props.Title}</Text>
						</View>
						<View style={styles.productCardRow}>
							<Text>{props.Subtitle}</Text>
						</View>
						<View style={styles.productCardRow}>
							<Text>
								{cartState.content.filter((a) => a.product == props.id)[0] && parseInt(cartState.content.filter((a) => a.product == props.id)[0].qty) > 1
									? "Quantity: " + cartState.content.filter((a) => a.product == props.id)[0].qty
									: ""}
							</Text>
						</View>
						<View style={{ ...styles.carouselCardRow }}>
							<Text style={styles.carouselCardPrice}>{props.Price}</Text>
						</View>
					</View>
					{props.showMenuDots ? (
						<TouchableHighlight
							style={styles.buttonWrapper}
							onPress={() => {
								props.onOpenMenuRequest(props.id);
							}}
							underlayColor='#eee'>
							<View style={styles.buttonWrapper}>
								<Image source={require("./../assets/icons/more.png")} style={styles.icon} />
							</View>
						</TouchableHighlight>
					) : (
						<></>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: "#fff",
		borderRadius: 15,
		padding: 5,
		paddingTop: 10,
		paddingRight: 15,
		width: 150,
		marginRight: 10,
		width: "100%",
		position: "relative",
		marginBottom: 7,
	},
	cardImage: {
		height: 80,
		width: 80,
		marginBottom: 7,
		resizeMode: "contain",
		marginRight: 25,
		padding: 20,
	},
	productCardRow: {
		width: "100%",
	},
	carouselCardRow: {
		width: "100%",
	},
	carouselCardTitle: {
		fontWeight: "700",
	},
	carouselCardPrice: {
		fontWeight: "700",
		fontSize: 13,
		marginTop: 10,
	},
	carouselCardFav: {
		borderRadius: 100,
		width: 27,
		height: 27,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		right: 0,
	},
	carouselCardFavIcon: {
		width: 15,
		height: 15,
	},
	priceRow: {
		color: "black",
	},
	sameRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	fillWidth: {
		flex: 1,
		alignSelf: "flex-start",
	},
	buttonWrapper: {
		width: 40,
		height: 40,
		borderRadius: 25,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		width: 15,
		height: 15,
	},
});

export default CartRow;
