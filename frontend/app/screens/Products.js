import React, { Component, useState } from "react";
import { View, Modal, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Chip } from "react-native-paper";
import { useQuery, gql } from "@apollo/client";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import FilterButton from "../components/FilterButton";
import ProductsFoundGrid from "../components/ProductsFoundGrid";
import ModalCard from "../components/ModalCard";

import Colors from "../config/colors";

const Products = (props) => {
	const PRODUCTS = gql`
	query GetProducts {
		products(where:{title_contains:"${props.searchTerm}"}) {
			slug
			title
			description
			image {
				url
			}
			price
		}
	}
	`;

	const [screenState, setScreenState] = useState({
		contentComponent: 0,
		searchTerm: "",
		modalVisible: true,
	});
	const { loading, error, data } = useQuery(PRODUCTS);

	function showModal(arg) {
		setScreenState({ ...screenState, modalVisible: true });
	}

	function search(arg) {
		console.log(arg);
		if (arg === "") setScreenState({ ...screenState, contentComponent: 0, searchTerm: "" });
		else setScreenState({ ...screenState, contentComponent: 1, searchTerm: arg });
	}

	function contentSwitch() {
		if (screenState.contentComponent === 0 || screenState.searchTerm === "") {
			return <Text>Display content</Text>;
		}
		if (screenState.contentComponent === 1 && screenState.searchTerm !== "") {
			return <ProductsFoundGrid searchTerm={screenState.searchTerm} />;
		}
	}

	const closeModal = () => {
		setScreenState({ ...screenState, modalVisible: false });
	};

	const dummyOnAction = () => console.log("Pressed!");

	return (
		<SafeAreaView style={styles.root}>
			<ModalCard onConfirm={dummyOnAction} onCancel={closeModal} modalVisible={screenState.modalVisible} onRequestClose={closeModal}>
				<Text>Hello there</Text>
			</ModalCard>
			<ScrollView>
				<LinearGradient
					// Background Linear Gradient
					colors={[Colors.background_gradient_1, Colors.background_gradient_2]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}>
					<NavBar
						navigation={props.navigation}
						title={"Search Product"}
						context={{
							type: "profile",
							profileImage:
								"https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
						}}
						backLocation={"Home"}
					/>
					<View style={styles.content}>
						<View style={styles.filters}>
							<SearchBar onSearch={search} width='82%' />
							<FilterButton style={styles.filterButton} onPress={showModal} />
						</View>
						<View style={styles.chipContainer}>
							<Text style={styles.chipWrapper}>
								<Chip style={styles.chip} onClose={() => console.log("Pressed")}>
									Example
								</Chip>
							</Text>
						</View>
					</View>

					{contentSwitch()}
				</LinearGradient>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight },
	content: { paddingLeft: 7.5, paddingRight: 20 },
	filters: { display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20 },

	chip: {
		justifyContent: "center",
	},
	chipWrapper: { marginBottom: 4, marginRight: 4 },
	chipContainer: {
		marginTop: 10,
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		paddingLeft: 15,
		paddingRight: 15,
	},
});

export default Products;
