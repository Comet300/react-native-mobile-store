import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions, StatusBar, TouchableHighlight, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { gql, makeVar, useQuery } from "@apollo/client";
import { useCartState } from "../contexts/CartContext";
import { Divider } from "react-native-paper";

import CartRow from "../components/CartRow";
import NavBar from "../components/NavBar";
import CartMenu from "../components/CartMenu";

import constants from "../config/constants";
import Colors from "../config/colors";
import Spinner from "../components/Spinner";

const mapProductsToRows = (data, navigation, openMenuForProduct) => {
	return data?.products.map((product) => {
		return (
			<CartRow
				style={styles.cardSpacer}
				navigation={navigation}
				key={product.id}
				Title={product.title}
				Subtitle={product.subtitle}
				Image={{ uri: constants.serverUrl + product.image[0].url }}
				Price={product.price + " " + product.currency.Name}
				id={product.id}
				onOpenMenuRequest={openMenuForProduct}
				showMenuDots={true}
			/>
		);
	});
};

const calculateTotal = (productsObj, cartState) => {
	let total = 0;
	let { products } = productsObj;
	// console.log(products.filter((a) => a.id == 32)[0].price);
	cartState?.content.forEach((item) => {
		let price = products.filter((a) => a.id == item.product)[0]?.price;
		if (price) total += price * item.qty;
	});
	return total;
};

const Cart = (props) => {
	const [cartState, dispatchCartState] = useCartState();
	const [menuContext, setMenuContext] = useState({ showMenu: false, productId: 0 });

	const openMenuForProduct = (productId) => {
		setMenuContext({ showMenu: true, productId });
	};

	const GET_CART_PRODUCTS = gql`
		query GetCartProducts($productIds: [Int]) {
			products(where: { id: $productIds }) {
				id
				title
				subtitle
				image {
					url
				}
				price
				currency {
					Name
				}
			}
		}
	`;

	let ids;
	if (cartState?.content && cartState?.content?.length > 0) ids = makeVar([...cartState?.content.map((a) => parseInt(a.product))]);
	else ids = makeVar([]);
	const { loading, error, data } = useQuery(GET_CART_PRODUCTS, {
		variables: {
			productIds: [...ids()],
		},
	});
	if (loading) return <Spinner />;
	if (ids().length > 0)
		return (
			<SafeAreaView style={styles.root}>
				<CartMenu
					navigation={props.navigation}
					onCancel={() => setMenuContext({ productId: 0, showMenu: false })}
					modalVisible={menuContext.showMenu}
					ProductContext={menuContext.productId}
					onRequestClose={() => setMenuContext({ productId: 0, showMenu: false })}
				/>
				<ScrollView>
					<LinearGradient style={styles.heightFix} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
						<NavBar navigation={props.navigation} title={"Cart"} />

						<View style={styles.cartContentsContainer}>
							<ScrollView overScrollMode='never'>{mapProductsToRows(data, props.navigation, openMenuForProduct)}</ScrollView>
							<View style={styles.totalWrapper}>
								<Divider style={styles.dividerSpacing} />
								<View style={styles.totalText}>
									<Text style={styles.totalTextItem}>Total:</Text>
									<Text style={styles.totalTextItem}>{calculateTotal(data, cartState)} EUR</Text>
								</View>
							</View>
						</View>
						<View style={styles.actionsContainer}>
							<TouchableWithoutFeedback
								onPress={() => {
									props.navigation.goBack();
								}}>
								<Text>Continue shopping</Text>
							</TouchableWithoutFeedback>
							<TouchableHighlight
								style={styles.checkoutButton}
								onPress={() => {
									props.navigation.navigate("Checkout");
								}}>
								<Text style={styles.checkoutButtonText}>Checkout</Text>
							</TouchableHighlight>
						</View>
					</LinearGradient>
				</ScrollView>
			</SafeAreaView>
		);
	else
		return (
			<SafeAreaView style={styles.root}>
				<CartMenu
					navigation={props.navigation}
					onCancel={() => setMenuContext({ productId: 0, showMenu: false })}
					modalVisible={menuContext.showMenu}
					ProductContext={menuContext.productId}
					onRequestClose={() => setMenuContext({ productId: 0, showMenu: false })}
				/>
				<ScrollView>
					<LinearGradient style={styles.heightFix} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
						<NavBar navigation={props.navigation} title={"Cart"} />

						<View style={styles.cartContentsContainer}>
							<ScrollView overScrollMode='never'>
								<Text style={{ padding: 15 }}>Your cart is empty</Text>
							</ScrollView>
						</View>
						<View style={{ ...styles.actionsContainer, padding: 25 }}>
							<TouchableWithoutFeedback
								onPress={() => {
									props.navigation.goBack();
								}}>
								<Text>Continue shopping</Text>
							</TouchableWithoutFeedback>
							{/* <TouchableHighlight
								style={styles.checkoutButton}
								onPress={() => {
									props.navigation.navigate("Checkout");
								}}>
								<Text style={styles.checkoutButtonText}>Checkout</Text>
							</TouchableHighlight> */}
						</View>
					</LinearGradient>
				</ScrollView>
			</SafeAreaView>
		);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10, flex: 1 },
	heightFix: {
		flex: 1,
	},
	cartContentsContainer: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 30,
		marginTop: 15,
		height: 570,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	totalWrapper: {
		padding: 20,
	},
	totalText: {
		display: "flex",
		justifyContent: "flex-end",
		flexDirection: "row",
		marginTop: 23,
	},
	totalTextItem: {
		fontWeight: "700",
		fontSize: 16,
		marginRight: 10,
	},
	checkoutButton: {
		backgroundColor: "#000",
		padding: 12,
		width: 170,
		borderRadius: 15,
	},
	checkoutButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	actionsContainer: {
		marginTop: 15,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingBottom: 18,
	},
});

export default Cart;
