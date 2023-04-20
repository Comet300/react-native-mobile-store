import React from "react";
import { View, Button, StyleSheet, Text, Image, StatusBar, SafeAreaView, Dimensions, ScrollView, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, gql } from "@apollo/client";

import { AuthContext } from "../contexts/AuthContext";

import Colors from "../config/colors";
import NavBar from "../components/NavBar";
import Spinner from "../components/Spinner";
import Carousel from "../components/Carousel";

const win = Dimensions.get("window");
const bgImageRatio = win.width / 5304;

const Productview = (props) => {
	// const slideList = Array.from({ length: 5 }).map((_, i) => {
	// 	return {
	// 		id: i,
	// 		image: `https://picsum.photos/1440/2842?random=${i}`,
	// 	};
	// });

	const PRODUCT = gql`
	query getProduct{
		product(id:${props.route.params.id}){
		  id
						  title
						  description
						  image {
							  id
							  url
						  }
						  price
		}
	  }
`;
	const { loading, error, data } = useQuery(PRODUCT);

	if (loading) return <Spinner />;
	const { getCurrentUser, signOut } = React.useContext(AuthContext);
	return (
		<SafeAreaView style={styles.root}>
			{/* <ScrollView> */}
			<LinearGradient
				style={styles.heightFix}
				// Background Linear Gradient
				colors={[Colors.background_gradient_1, Colors.background_gradient_2]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}>
				<NavBar context={{ type: "cart" }} navigation={props.navigation} title={""} />

				<Image style={styles.background_image} source={require("../assets/images/product_bg1.png")}></Image>

				<Carousel data={data.product.image} />

				<View style={styles.content}>
					<View>
						<View style={styles.primaryContent}>
							<Text style={styles.titlu}>Baby thanos dragut</Text>
							<Text style={styles.subtitlu}>Editie limitata infinity war</Text>
						</View>
						<Text style={styles.price}>125.00 RON</Text>
					</View>
					<View>
						<View style={styles.reviews}>
							<Text>reviews go here</Text>
						</View>
						<View style={styles.controls}>
							<View style={styles.qty}>
								<Text>+-</Text>
							</View>
							<TouchableHighlight>
								<Text style={styles.cartButton}>
									<Text style={styles.cartButtonText}>Cart</Text>
								</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</LinearGradient>
			{/* </ScrollView> */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10 },
	heightFix: {
		minHeight: 720,
	},
	background_image: {
		width: win.width * 1.2,
		height: 7952 * bgImageRatio * 1.2,
		right: -50,
		position: "absolute",
		top: -60,
	},
	content: {
		borderRadius: 35,
		width: "100%",
		height: 240,
		backgroundColor: "#fff",
		marginTop: 450,
		display: "flex",
		flexDirection: "row",
	},
	primaryContent: {
		padding: 25,
	},
	titlu: { fontSize: 25, fontWeight: "700", marginBottom: 15 },
	subtitlu: { color: "#777" },
	price: {
		fontSize: 20,
		fontWeight: "700",
		padding: 25,
		paddingTop: 10,
	},
	reviews: { paddingTop: 30 },
	cartButton: {
		backgroundColor: "#000",
		borderRadius: 20,
		padding: 20,
		paddingTop: 10,
		paddingBottom: 10,
		width: 70,
	},
	cartButtonText: { color: "#fff" },
	controls: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		top: 75,
	},
	qty: { marginRight: 20 },
	gallery: {
		position: "absolute",
		top: 0,
	},
});

export default Productview;
