import React from "react";
import { View, Image, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import constants from "../config/constants";

const Navbar = (props) => {
	const { getCurrentUser } = React.useContext(AuthContext);
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
								user
									? {
											uri: constants.serverUrl + user.user.profile_pic.formats.thumbnail.url,
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
				<ContextItem user={user} context={props.context} navigate={navigate} />
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
							props.user
								? {
										uri: constants.serverUrl + props.user.user.profile_pic.formats.thumbnail.url,
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
			<TouchableHighlight underlayColor='#ffffff66' onPress={() => alert("hi")} style={{ ...styles.contextItem, ...styles.menuContext }}>
				<Image style={styles.menu} source={require("./../assets/icons/bag.png")} />
			</TouchableHighlight>
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
		overflow: "hidden",
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
	},
	menu: {
		height: 25,
		width: 25,
	},
	nothing: {
		height: 25,
		width: 40,
	},
});

export default Navbar;
