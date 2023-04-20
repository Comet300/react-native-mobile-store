import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, TouchableHighlight } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

import { gql, useMutation } from "@apollo/client";

const CarouselCard = (props) => {
	const { getCurrentUser } = React.useContext(AuthContext);
	const user = getCurrentUser();
	const { style } = props;
	const [favState, setFavState] = useState(false);

	React.useEffect(() => {
		setFavState(props.IsOnFavorites);
	}, [props.IsOnFavorites]);

	const ADD_FAVORITE = gql`
		mutation addFavorite($user: ID!, $product: ID!) {
			createFavorite(input: { data: { user: $user, product: $product } }) {
				favorite {
					id
				}
			}
		}
	`;

	const REMOVE_FAVORITE = gql`
		mutation removeFavorite($id: ID!) {
			deleteFavorite(input: { where: { id: $id } }) {
				favorite {
					id
				}
			}
		}
	`;

	const [addFavorite] = useMutation(ADD_FAVORITE);
	const [removeFavorite] = useMutation(REMOVE_FAVORITE);

	return (
		<TouchableWithoutFeedback
			style={styles.touchWrapper}
			onPress={() => {
				props.navigation.navigate("ProductView", { id: props.id });
			}}>
			<View style={{ ...style, ...styles.root }}>
				<View>
					<Image style={styles.cardImage} source={props.Image} />
					<View style={styles.carouselCardRow}>
						<Text style={styles.carouselCardTitle}>{props.Title}</Text>
					</View>
					<View style={styles.carouselCardRow}>
						<Text style={styles.carouselCardDescription}>{props.Subtitle}</Text>
					</View>
				</View>
				<View style={{ ...styles.carouselCardRow, ...styles.priceRow }}>
					<Text style={styles.carouselCardPrice}>{props.Price}</Text>
					<TouchableHighlight
						onPress={() => {
							if (user?.jwt) {
								if (favState) {
									removeFavorite({ variables: { id: props.FavoriteId }, onCompleted: props.onToggleFav() });
								} else {
									addFavorite({ variables: { user: user.user.id, product: props.id }, onCompleted: props.onToggleFav() });
								}
								setFavState(!favState);
							} else {
								props.navigation.navigate("Favorites");
							}
						}}
						underlayColor='#ff000066'
						style={{ ...styles.carouselCardFav, backgroundColor: favState ? "#ec3e42" : "#000" }}>
						<Image style={styles.carouselCardFavIcon} source={require("./../assets/icons/heart.png")} />
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
		width: 150,
		marginRight: 10,
		display: "flex",
		justifyContent: "space-between",
	},
	cardImage: {
		width: "100%",
		height: 120,
		marginBottom: 7,
		resizeMode: "contain",
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
	},
	carouselCardFavIcon: {
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
		// borderRadius: 15,
		// width: "47%",
		// zIndex: 500,
	},
});

export default CarouselCard;
