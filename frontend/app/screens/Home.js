import React, { useState } from "react";
import { View, StyleSheet, Button, Text, StatusBar, SafeAreaView, ScrollView, Image, SectionList, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

import { AuthContext } from "../contexts/AuthContext";
import { useQuery, gql } from "@apollo/client";

import Colors from "../config/colors";
import constants from "../config/constants";
import NavBar from "../components/NavBar";
import Spinner from "../components/Spinner";
import SideDrawer from "../components/SideDrawer";
import CarouselOfCards from "../components/CarouselOfCards";
import CarouselCard from "../components/CarouselCard";

import Carousel from "react-native-snap-carousel";

const Home = (props) => {
	const { getCurrentUser, signOut } = React.useContext(AuthContext);
	const user = getCurrentUser();

	const CATEGORIES = gql`
		query getCategories {
			categories(where: { category_null: true }) {
				name
				id
			}
		}
	`;

	const HOMEPAGE = gql`
		query getHomepage($user: ID!) {
			homepage {
				jumbotron {
					url
					id
				}
				trendingProducts {
					id
					title
					subtitle
					price
					image {
						url
					}
					currency {
						Name
					}
					favorites(where: { user: $user }) {
						id
					}
				}
				ourRecommendation {
					id
					title
					subtitle
					price
					image {
						url
					}
					currency {
						Name
					}
					favorites(where: { user: $user }) {
						id
					}
				}
			}
		}
	`;

	const categoriesData = useQuery(CATEGORIES);

	const homepage = useQuery(HOMEPAGE, {
		variables: {
			user: user?.user ? user.user.id : 0,
		},
		fetchPolicy: "network-only",
	});
	const [visible, setVisible] = React.useState(false);

	if (categoriesData.loading || homepage.loading) return <Spinner />;

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	let preFetchTasks = [];
	homepage.data.homepage.jumbotron.forEach((p) => {
		preFetchTasks.push(Image.prefetch(p.url));
	});

	Promise.all(preFetchTasks);

	const renderJumbotronItem = ({ item, index }) => {
		return (
			<View style={styles.jumbotronImageWrap}>
				<Image style={styles.jumbotronImage} source={{ uri: constants.serverUrl + item.url }} resizeMode={"cover"} />
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.root}>
			<SideDrawer navigation={props.navigation} elements={categoriesData.data.categories} onCancel={closeMenu} modalVisible={visible} onRequestClose={closeMenu} />
			<ScrollView>
				<LinearGradient style={styles.heightFix} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
					<NavBar
						navigation={props.navigation}
						title={""}
						context={{
							type: "home",
						}}
						onMenuClick={openMenu}
					/>
					<View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
						<Carousel
							swipeThreshold={5}
							layout={"default"}
							data={homepage.data.homepage.jumbotron}
							sliderWidth={Dimensions.get("window").width + 6}
							itemWidth={Dimensions.get("window").width + 6}
							renderItem={renderJumbotronItem}
							autoplay={true}
							autoplayInterval={6000}
							loop={true}
							enableSnap={true}
						/>

						<Text style={styles.carouselHeader}>Trending Products</Text>
						<CarouselOfCards
							navigation={props.navigation}
							refetch={() => {
								homepage.refetch();
							}}
							elements={homepage.data.homepage.trendingProducts}></CarouselOfCards>

						<Text style={styles.carouselHeader}>Our Recommendations</Text>
						<CarouselOfCards
							navigation={props.navigation}
							refetch={() => {
								homepage.refetch();
							}}
							elements={homepage.data.homepage.ourRecommendation}></CarouselOfCards>
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
		paddingBottom: 20,
	},
	content: { height: 500 },
	jumbotronImage: {
		height: 250,
		width: Dimensions.get("window").width - 45,
		position: "absolute",
		left: 0,
		top: 0,
	},
	jumbotronImageWrap: {
		borderRadius: 5,
		height: 250,
		padding: 50,
		marginLeft: 25,
		marginRight: 25,
		position: "relative",
	},
	carouselHeader: {
		marginTop: 30,
		marginBottom: 15,
		paddingLeft: 25,
		fontWeight: "bold",
		fontSize: 17,
	},

	container: {
		flex: 1,
		backgroundColor: "#121212",
	},
	sectionHeader: {
		fontWeight: "800",
		fontSize: 18,
		color: "#f4f4f4",
		marginTop: 20,
		marginBottom: 5,
	},
});

export default Home;
