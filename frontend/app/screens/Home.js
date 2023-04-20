import React, { useState } from "react";
import { View, StyleSheet, Button, Text, StatusBar, SafeAreaView, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../contexts/AuthContext";
import { useQuery, gql } from "@apollo/client";

import Colors from "../config/colors";
import constants from "../config/constants";
import NavBar from "../components/NavBar";
import Spinner from "../components/Spinner";
import SideDrawer from "../components/SideDrawer";

const Home = (props) => {
	const [visible, setVisible] = React.useState(false);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const CATEGORIES = gql`
		query getCategories {
			categories(where: { category_null: true }) {
				name
				id
			}
		}
	`;
	const { loading, error, data } = useQuery(CATEGORIES);

	const { getCurrentUser, signOut } = React.useContext(AuthContext);
	const user = getCurrentUser();

	if (loading) return <Spinner />;
	return (
		<SafeAreaView style={styles.root}>
			<SideDrawer navigation={props.navigation} elements={data.categories} onCancel={closeMenu} modalVisible={visible} onRequestClose={closeMenu} />
			<ScrollView>
				<LinearGradient
					style={styles.heightFix}
					// Background Linear Gradient
					colors={[Colors.background_gradient_1, Colors.background_gradient_2]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}>
					<NavBar
						navigation={props.navigation}
						title={""}
						context={{
							type: "home",
						}}
						onMenuClick={openMenu}
					/>
				</LinearGradient>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10 },
	heightFix: {
		minHeight: 720,
	},
});

export default Home;
