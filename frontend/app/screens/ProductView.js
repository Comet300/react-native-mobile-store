import React, { useState } from "react";
import { View, Button, StyleSheet, Text, Image, StatusBar, SafeAreaView, Dimensions, ScrollView, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery, gql } from "@apollo/client";
import { MarkdownView } from "react-native-markdown-view";
import InputSpinner from "react-native-input-spinner";

import { AuthContext } from "../contexts/AuthContext";

import Colors from "../config/colors";
import NavBar from "../components/NavBar";
import Spinner from "../components/Spinner";
import Carousel from "../components/Carousel";
import Highlightcell from "../components/HighlightCell";
import constants from "../config/constants";

const win = Dimensions.get("window");
const bgImageRatio = win.width / 5304;

function mapHighlightsToElements(highlights) {
	let n = 1;
	return highlights.map((highlight) => <Highlightcell key={n++} icon={highlight.icon} label={highlight.title} />);
}

const Productview = (props) => {
	const { count, setCount } = useState(1);

	const PRODUCT = gql`
	query getProduct{
		products(where:{id:${props.route.params.id}}){
		  id
		  highlights{
			title
			icon
		  }
		  description
			title
			subtitle
			image {
			url
			 id
			}
			price
			currency {
				Name
			}
		}
	  }
`;
	const { loading, error, data } = useQuery(PRODUCT);

	if (loading) return <Spinner />;
	const product = data?.products[0];

	const { getCurrentUser, signOut } = React.useContext(AuthContext);
	return (
		<SafeAreaView style={styles.root}>
			<ScrollView>
				<LinearGradient style={styles.heightFix} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
					<NavBar context={{ type: "cart" }} navigation={props.navigation} title={""} />

					<Image style={styles.background_image} source={require("../assets/images/product_bg1.png")}></Image>

					<Carousel data={product.image} />

					<View style={styles.highlights}>{mapHighlightsToElements(product.highlights)}</View>

					<View style={styles.content}>
						<View>
							<View style={styles.primaryContent}>
								<Text style={styles.titlu}>{product.title}</Text>
								<Text style={styles.subtitlu}>{product.subtitle}</Text>
							</View>
						</View>
						<View>
							<View style={styles.reviews}>
								<View>
									<Text>Reviews go here</Text>
								</View>
							</View>

							<View style={styles.spaceBetweenRow}>
								<View>
									<Text style={styles.price}>
										{product.price} {product.currency.Name}
									</Text>
								</View>
								<View style={styles.controls}>
									<InputSpinner
										style={styles.qty}
										height={30}
										width={100}
										buttonTextColor={"#000"}
										textColor={"#000"}
										colorRight={"#fff"}
										colorLeft={"#fff"}
										colorPress={"#eee"}
										colorMax={"#fff"}
										colorMin={"#fff"}
										max={99}
										min={1}
										step={1}
										value={count}
										onChange={setCount}
									/>

									<TouchableHighlight
										style={styles.cartButton}
										onPress={() => {
											alert("cart");
										}}>
										<Text>
											<Text style={styles.cartButtonText}>Cart</Text>
										</Text>
									</TouchableHighlight>
								</View>
							</View>
						</View>
						<View style={styles.markdownContainer}>
							<MarkdownView children={product.description.replace("/uploads", constants.serverUrl + "/uploads")} />
						</View>
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
		backgroundColor: "#fff",
		marginTop: 460,
		marginBottom: 10,
	},
	primaryContent: {
		padding: 25,
		paddingBottom: 0,
	},
	titlu: { fontSize: 25, fontWeight: "700", marginBottom: 15 },
	subtitlu: { color: "#777" },
	price: {
		fontSize: 20,
		fontWeight: "700",
		padding: 25,
		paddingTop: 10,
	},
	reviews: { paddingTop: 30, display: "flex", flexDirection: "row", justifyContent: "flex-end", paddingRight: 20, paddingLeft: 20 },
	cartButton: {
		backgroundColor: "#000",
		borderRadius: 20,
		padding: 20,
		paddingTop: 17,
		paddingBottom: 17,
		width: 70,
		left: 60,
		position: "relative",
	},
	cartButtonText: { color: "#fff" },
	controls: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		top: 0,
		right: 80,
		position: "relative",
	},
	qty: {
		position: "absolute",
		right: 30,
		borderColor: "#000",
		borderRadius: 1,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 100,
	},
	gallery: {
		position: "absolute",
		top: 0,
	},
	highlights: {
		position: "absolute",
		top: 400,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "100%",
	},
	markdownContainer: {
		paddingLeft: 25,
		paddingRight: 25,
		paddingBottom: 25,
	},
	spaceBetweenRow: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
});

export default Productview;
