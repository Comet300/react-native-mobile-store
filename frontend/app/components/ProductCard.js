import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const ProductCard = (props) => {
	const { getCurrentUser } = React.useContext(AuthContext);
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
				<Image style={styles.cardImage} source={props.Image} />
				<View style={styles.productCardRow}>
					<Text style={styles.productCardTitle}>{props.Title}</Text>
				</View>
				<View style={styles.productCardRow}>
					<Text style={styles.productCardDescription}>{props.Subtitle}</Text>
				</View>
				<View style={{ ...styles.productCardRow, ...styles.priceRow }}>
					<Text style={styles.productCardPrice}>{props.Price}</Text>
					<TouchableHighlight
						onPress={() => {
							if (user.jwt) {
								props.onToggleFav(favState);
								setFavState(!favState);
								//register favorite
							} else {
								//redirect to favorite list
								//show locked favorite list
							}
						}}
						underlayColor='#ff000066'
						style={{ ...styles.productCardFav, backgroundColor: favState ? "#ec3e42" : "#000" }}>
						<Image style={styles.productCardFavIcon} source={require("./../assets/icons/heart.png")} />
					</TouchableHighlight>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: "#fff",
		borderRadius: 15,
		padding: 15,
		width: "100%",
	},
	cardImage: {
		width: "100%",
		height: 180,
		resizeMode: "contain",
	},
	productCardRow: {
		marginBottom: 5,
		width: "100%",
	},
	productCardTitle: {
		fontWeight: "700",
	},
	productCardDescription: {
		color: "#777",
		fontSize: 11,
	},
	productCardPrice: {
		fontWeight: "700",
	},
	productCardFav: {
		borderRadius: 100,
		width: 27,
		height: 27,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	productCardFavIcon: {
		width: 15,
		height: 15,
	},
	priceRow: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
	},
	touchWrapper: {
		borderRadius: 15,
		width: "47%",
		zIndex: 500,
	},
});

export default ProductCard;
