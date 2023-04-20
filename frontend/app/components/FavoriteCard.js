import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

const FavoriteCard = (props) => {
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
				<View style={styles.sameRow}>
					<Image style={styles.cardImage} source={props.Image} />
					<View style={styles.fillWidth}>
						<View style={styles.carouselCardRow}>
							<Text style={styles.carouselCardTitle}>{props.Title}</Text>
						</View>
						<View style={styles.carouselCardRow}>
							<Text style={styles.carouselCardDescription}>{props.Subtitle}</Text>
						</View>
						<View style={{ ...styles.carouselCardRow, ...styles.priceRow }}>
							<Text style={styles.carouselCardPrice}>{props.Price}</Text>
							<TouchableHighlight
								onPress={() => props.onToggleFav()}
								underlayColor='#ff000066'
								style={{ ...styles.carouselCardFav, backgroundColor: "#ec3e42" }}>
								<Image style={styles.carouselCardFavIcon} source={require("./../assets/icons/heart.png")} />
							</TouchableHighlight>
						</View>
					</View>
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
		width: 150,
		marginRight: 10,
		width: "100%",
		position: "relative",
	},
	cardImage: {
		height: 80,
		width: 80,
		marginBottom: 7,
		resizeMode: "contain",
		marginRight: 25,
		padding: 20,
	},
	carouselCardRow: {
		marginBottom: 5,
		width: "100%",
	},
	carouselCardTitle: {
		fontWeight: "700",
	},
	carouselCardDescription: {
		color: "#777",
		fontSize: 11,
	},
	carouselCardPrice: {
		fontWeight: "700",
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
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		width: "100%",
		justifyContent: "space-between",
		position: "absolute",
		bottom: 0,
	},
	sameRow: {
		display: "flex",
		flexDirection: "row",
	},
	fillWidth: {
		flex: 1,
	},
});

export default FavoriteCard;
