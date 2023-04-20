import React, { Component, useState, useContext } from "react";
import { View, Button, Modal, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Chip } from "react-native-paper";
import { useQuery, gql } from "@apollo/client";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import FilterButton from "../components/FilterButton";
import ProductsFoundGrid from "../components/ProductsFoundGrid";
import ModalCard from "../components/ModalCard";
import { AuthContext } from "../contexts/AuthContext";
import { useCartState } from "../contexts/CartContext";
import Spinner from "../components/Spinner";
import AllProductsGrid from "../components/AllProductsGrid";

import Colors from "../config/colors";
import constants from "../config/constants";

function resolveOperator(operator) {
	if (operator === "_lte") return "<";
	if (operator === "_gte") return ">";
}

const Products = (props) => {
	const { getCurrentUser } = React.useContext(AuthContext);
	const [state, dispatch] = useCartState();

	// console.log("sate:", state);

	const user = getCurrentUser();

	const ALL_PRODUCTS = gql`
		query getProductsOfCategory{
			categories(where: { id: ${props.route.params.category} }) {
				name
				products {
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
					favorites(where: { user: ${user?.user ? user.user.id : 0} }) {
							id
						
					}
				}
			}
		}
	`;

	const mapFiltersToChips = (f) => {
		let n = 1;
		return f.map((a) => (
			<Text key={n++} style={styles.chipWrapper}>
				<Chip
					style={styles.chip}
					onClose={() => {
						setScreenState({ ...screenState, filters: screenState.filters.filter((b) => JSON.stringify(b) != JSON.stringify(a)) });
					}}>
					{a.field + " " + resolveOperator(a.operator) + " " + a.val}
				</Chip>
			</Text>
		));
	};

	const [screenState, setScreenState] = useState({
		contentComponent: 0,
		searchTerm: "",
		modalVisible: false,
		filters: [
			{ field: "price", val: "10", operator: "_gte" },
			{ field: "price", val: "150", operator: "_lte" },
		],
	});
	const category = useQuery(ALL_PRODUCTS, {
		fetchPolicy: "no-cache",
	});
	if (category.loading) return <Spinner />;
	let productsData = category.data;
	function showModal(arg) {
		setScreenState({ ...screenState, modalVisible: true });
	}

	function search(arg) {
		if (arg === "") setScreenState({ ...screenState, contentComponent: 0, searchTerm: "" });
		else setScreenState({ ...screenState, contentComponent: 1, searchTerm: arg });
	}

	function contentSwitch() {
		if (screenState.contentComponent === 0 || screenState.searchTerm === "") {
			return (
				<React.Fragment>
					<View style={styles.chipContainer}>{mapFiltersToChips(screenState.filters)}</View>
					<AllProductsGrid refetch={category.refetch} navigation={props.navigation} title={productsData.name} elements={productsData.categories[0].products} />
				</React.Fragment>
			);
		}
		if (screenState.contentComponent === 1 && screenState.searchTerm !== "") {
			return <ProductsFoundGrid refetch={category.refetch} navigation={props.navigation} searchTerm={screenState.searchTerm} />;
		}
	}

	const closeModal = () => {
		setScreenState({ ...screenState, modalVisible: false });
	};

	const onConfirm = (data) => {
		// console.log("Pressed!");
		closeModal();
	};

	return (
		<SafeAreaView style={styles.root}>
			<ModalCard onConfirm={onConfirm} onCancel={closeModal} modalVisible={screenState.modalVisible} onRequestClose={closeModal}>
				<Text>Hello there</Text>
			</ModalCard>
			<ScrollView>
				<LinearGradient style={styles.heightFix} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
					<NavBar
						navigation={props.navigation}
						title={"Products"}
						context={{
							type: "cart",
						}}
					/>
					<View style={styles.content}>
						<View style={styles.filters}>
							<SearchBar onSearch={search} width='82%' />
							<FilterButton style={styles.filterButton} onPress={showModal} />
						</View>
					</View>

					{contentSwitch()}
				</LinearGradient>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10, flex: 1 },
	content: { paddingLeft: 7.5, paddingRight: 20 },
	filters: { display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
	heightFix: {
		minHeight: 720,
	},
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
