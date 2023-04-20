import React, { Component, useState, useContext } from "react";
import { View, Button, Modal, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, TouchableHighlight, Dimensions, TouchableWithoutFeedback } from "react-native";
import { BlurView } from "expo-blur";

import { LinearGradient } from "expo-linear-gradient";
import { useQuery, gql, useMutation } from "@apollo/client";

import NavBar from "../components/NavBar";
import FavoriteCard from "../components/FavoriteCard";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import getNDummyProducts from "../config/dummyProducts";

import Colors from "../config/colors";
import constants from "../config/constants";

const Favorites = (props) => {
	const { getCurrentUser } = React.useContext(AuthContext);
	const user = getCurrentUser();

	if (user?.jwt) {
		const FAVORITES = gql`
		query GetUsers{
			user(id:${user?.user?.id}){
				favorites{
					id
					product{
					  title
					  subtitle
					  id
					  price
					  currency{
						Name
					  }
					  image{
						url
					  }
					}
				  }
			}
		  }`;
		const { loading, error, data, refetch } = useQuery(FAVORITES, {
			fetchPolicy: "no-cache",
		});

		const REMOVE_FAVORITE = gql`
			mutation deleteFav($id: ID!) {
				deleteFavorite(input: { where: { id: $id } }) {
					favorite {
						id
					}
				}
			}
		`;

		const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
			onCompleted: refetch,
		});

		const mapProductsToCards = (productsData, refetch = () => {}) => {
			return productsData.map((a) => {
				return (
					<FavoriteCard
						style={styles.cardSpacer}
						navigation={props.navigation}
						key={a.product.id}
						onToggleFav={() => {
							removeFavorite({ variables: { id: a.id } });
						}}
						Title={a.product.title}
						Subtitle={a.product.subtitle}
						Image={{ uri: constants.serverUrl + a.product.image[0].url }}
						Price={a.product.price + " " + a.product.currency.Name}
						id={a.product.id}
					/>
				);
			});
		};

		if (loading) return <Spinner />;
		return (
			<SafeAreaView style={styles.root}>
				<ScrollView>
					<LinearGradient style={styles.heightFix} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
						<NavBar
							navigation={props.navigation}
							title={"Favorites"}
							context={{
								type: "cart",
							}}
						/>
						<View style={styles.favoritesList}>{mapProductsToCards(data.user.favorites, refetch)}</View>
					</LinearGradient>
				</ScrollView>
			</SafeAreaView>
		);
	} else {
		const mapProductsToCards = (productsData, refetch = () => {}) => {
			return productsData.map((a) => {
				return (
					<FavoriteCard
						style={styles.cardSpacer}
						navigation={props.navigation}
						key={a.id}
						onToggleFav={() => {}}
						Title={a.title}
						Subtitle={a.subtitle}
						Image={a.image}
						Price={a.price + " " + a.currency?.Name}
						id={a.id}
					/>
				);
			});
		};

		const loadDummyProducts = () => {
			let dummyProductsData = getNDummyProducts(6);
			return mapProductsToCards(dummyProductsData);
		};

		return (
			<SafeAreaView style={styles.root}>
				<LinearGradient style={styles.heightFix} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
					<NavBar
						navigation={props.navigation}
						title={"Favorites"}
						context={{
							type: "cart",
						}}
					/>

					<View style={styles.content}>
						<View style={styles.favoritesList}>{loadDummyProducts()}</View>
					</View>
					<BlurView intensity={100} tint='dark' style={styles.overlay}>
						<View style={styles.blurMessageBox}>
							<Text style={styles.blurMessage}>In order to save products you must be authenticated</Text>

							<View style={styles.blurMessageActions}>
								<TouchableHighlight
									style={styles.button}
									onPress={() => {
										props.navigation.navigate("SignIn");
									}}>
									<Text>
										<Text style={styles.buttonText}>Log In</Text>
									</Text>
								</TouchableHighlight>
								<TouchableWithoutFeedback
									onPress={() => {
										props.navigation.goBack();
									}}>
									<Text style={styles.messageButtonText}>
										<Text style={styles.emphasizeText}>Or</Text> continue browsing
									</Text>
								</TouchableWithoutFeedback>
							</View>
						</View>
					</BlurView>
				</LinearGradient>
			</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10, flex: 1 },
	content: { paddingLeft: 7.5, paddingRight: 20, position: "relative" },
	heightFix: {
		minHeight: 720,
	},
	favoritesList: {},
	cardSpacer: {
		marginBottom: 7,
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		height: "100%",
		width: Dimensions.get("window").width,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 500,
	},
	blurMessageBox: { position: "relative", bottom: 50, backgroundColor: "white", borderRadius: 25, padding: 20 },
	blurMessage: {
		maxWidth: "80%",
		textAlign: "center",
	},
	blurMessageActions: {
		display: "flex",
		alignItems: "center",
		marginTop: 30,
		paddingBottom: 15,
	},
	button: {
		backgroundColor: "#000",
		borderRadius: 20,
		padding: 20,
		paddingTop: 15,
		paddingBottom: 15,
		display: "flex",
		alignItems: "center",
		width: "75%",
		marginBottom: 15,
	},
	buttonText: { color: "#fff", fontWeight: "700" },
	messageButtonText: {
		color: "#6c6c6c",
		fontSize: 13,
	},
	emphasizeText: { fontWeight: "700" },
});

export default Favorites;
