import React, { useContext, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, ScrollView, Dimensions } from "react-native";
import { Badge } from "react-native-paper";

import { useCartState } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import constants from "../config/constants";

const Navbar = (props) => {
	const { getCurrentUser } = React.useContext(AuthContext);
	const [cartState, dispatchCartState] = useCartState();

	const user = getCurrentUser();
	if (props.context?.type == "home") {
		return (
			<View style={styles.root}>
				<TouchableHighlight
					underlayColor='#ffffff66'
					onPress={() => props.onMenuClick()}
					style={{ ...styles.contextItem, ...styles.menuContext, ...styles.menuScreenContext }}>
					<Image style={styles.menu} source={require("./../assets/icons/menu.png")} />
				</TouchableHighlight>

				<View style={styles.NavbarTitle}>
					<Text style={styles.NavbarTitleText}>{props.title}</Text>
				</View>

				<View style={{ ...styles.contextItem, ...styles.profilePicMenuScreen }}>
					<TouchableWithoutFeedback onPress={() => props.navigation.navigate("Profile")}>
						<Image
							style={styles.profile}
							source={
								user && user.user.profile_pic
									? {
											uri: constants.serverUrl + user.user.profile_pic?.formats.thumbnail.url,
									  }
									: require(`../assets/images/generic-user.jpg`)
							}
						/>
					</TouchableWithoutFeedback>
				</View>
			</View>
		);
	} else {
		const { navigate } = props.navigation;
		return (
			<View style={styles.root}>
				<TouchableHighlight
					underlayColor='#ffffff66'
					onPress={() => {
						props.navigation.goBack();
					}}
					style={styles.backButtonWrapper}>
					<Image style={styles.backButton} source={require("../assets/icons/left-arrow.png")} />
				</TouchableHighlight>
				<View style={styles.NavbarTitle}>
					<Text style={styles.NavbarTitleText}>{props.title}</Text>
				</View>
				<ContextItem user={user} context={props.context} navigate={navigate} cartState={cartState} navigation={props.navigation} />
			</View>
		);
	}
};

const ContextItem = (props) => {
	if (props.context?.type === "profile")
		return (
			<View style={{ ...styles.contextItem }}>
				<TouchableWithoutFeedback onPress={() => props.navigate("Profile")}>
					<Image
						style={styles.profile}
						source={
							props.user && props.user.user.profile_pic
								? {
										uri: constants.serverUrl + props.user.user.profile_pic?.formats.thumbnail.url,
								  }
								: require(`../assets/images/generic-user.jpg`)
						}
					/>
				</TouchableWithoutFeedback>
			</View>
		);
	else if (props.context?.type === "menu") {
		return (
			<TouchableHighlight underlayColor='#ffffff66' onPress={() => alert("hi")} style={{ ...styles.contextItem, ...styles.menuContext }}>
				<Image style={styles.menu} source={require("./../assets/icons/menu.png")} />
			</TouchableHighlight>
		);
	} else if (props.context?.type === "cart") {
		return (
			<View>
				<TouchableHighlight
					underlayColor='#ffffff66'
					onPress={() => {
						props.navigation.navigate("Cart");
					}}
					style={{ ...styles.contextItem, ...styles.menuContext, ...styles.shoppingBagFix }}>
					<>
						{props.cartState?.content.length > 0 ? (
							<Badge style={styles.cartBadge} size={17}>
								{props.cartState.content.reduce((total, curr) => total + curr.qty, 0)}
							</Badge>
						) : (
							<></>
						)}
						<Image style={styles.menu} source={require("./../assets/icons/bag.png")} />
					</>
				</TouchableHighlight>

				{props.showCartPreview ? <ProductCartPreview navigation={props.navigation} products={props.products} /> : <></>}
			</View>
		);
	} else return <View style={styles.nothing}></View>;
};

const styles = StyleSheet.create({
	root: {
		zIndex: 500,
		height: 60,
		display: "flex",
		alignContent: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	backButtonWrapper: {
		display: "flex",
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		left: 7.5,
		alignSelf: "center",
	},
	menuContext: {
		display: "flex",
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 100,
		alignSelf: "center",
	},
	menuScreenContext: {
		left: 15,
	},
	backButton: {
		height: 18,
		width: 18,
	},
	NavbarTitle: { alignSelf: "center" },
	NavbarTitleText: {
		fontWeight: "700",
		fontSize: 17,
	},
	contextItem: {
		height: 40,
		width: 40,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		right: 20,
		borderRadius: 5,
		alignSelf: "center",
	},
	profile: {
		height: 40,
		width: 40,
		borderRadius: 5,
	},
	menu: {
		height: 25,
		width: 25,
	},
	nothing: {
		height: 25,
		width: 40,
	},
	cartBadge: {
		position: "absolute",
		zIndex: 50,
		right: 0,
		bottom: 0,
	},
	shoppingBagFix: {
		top: 10,
	},
});

export default Navbar;
