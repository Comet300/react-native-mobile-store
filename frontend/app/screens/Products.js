import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MasonryList from "@react-native-seoul/masonry-list";

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import FilterButton from "../components/FilterButton";
import ProductCard from "../components/ProductCard";

import Colors from "../config/colors";

class Products extends Component {
	currentCardIndex = 1;

	doIt = (arg) => {
		console.log(arg);
		if (arg) alert(arg);
		else alert("helloz");
	};

	isEven(n) {
		return n % 2 === 0;
	}

	render() {
		return (
			<SafeAreaView style={styles.root}>
				<ScrollView>
					<LinearGradient
						// Background Linear Gradient
						colors={[Colors.background_gradient_1, Colors.background_gradient_2]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}>
						<NavBar
							navigation={this.props.navigation}
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
								<SearchBar onSearch={this.doIt} width='82%' />
								<FilterButton style={styles.filterButton} onPress={this.doIt} />
							</View>

							<View style={styles.products}>
								<View style={styles.productsColumn}>
									<Text style={styles.resultText}>Found{"\n"}10 products</Text>
									<ProductCard
										style={{ ...styles.productCard }}
										onToggleFav={this.doIt}
										Title={"Mascara NOEBA"}
										Description={"Evidentiaza serios genele"}
										Image={require("./../samples/2/1.jpg")}
										Price={"39.00 RON"}
									/>
									<ProductCard
										style={styles.productCard}
										onToggleFav={this.doIt}
										Title={"Mascara NOEBA"}
										Description={"Evidentiaza serios genele"}
										Image={require("./../samples/2/1.jpg")}
										Price={"39.00 RON"}
									/>
									<ProductCard
										style={styles.productCard}
										onToggleFav={this.doIt}
										Title={"Mascara NOEBA"}
										Description={"Evidentiaza serios genele"}
										Image={require("./../samples/2/1.jpg")}
										Price={"39.00 RON"}
									/>
								</View>
								<View style={styles.productsColumn}>
									<ProductCard
										style={styles.productCard}
										onToggleFav={this.doIt}
										Title={"Mascara NOEBA"}
										Description={"Evidentiaza serios genele"}
										Image={require("./../samples/2/1.jpg")}
										Price={"39.00 RON"}
									/>
									<ProductCard
										style={styles.productCard}
										onToggleFav={this.doIt}
										Title={"Mascara NOEBA"}
										Description={"Evidentiaza serios genele"}
										Image={require("./../samples/2/1.jpg")}
										Price={"39.00 RON"}
									/>
									<ProductCard
										style={styles.productCard}
										onToggleFav={this.doIt}
										Title={"Mascara NOEBA"}
										Description={"Evidentiaza serios genele"}
										Image={require("./../samples/2/1.jpg")}
										Price={"39.00 RON"}
									/>
								</View>
							</View>
						</View>
					</LinearGradient>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight },
	content: { paddingLeft: 7.5, paddingRight: 20 },
	filters: { display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
	products: { paddingLeft: 15, marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "space-between" },
	productsColumn: { width: "47.5%" },
	productCard: { marginBottom: 20 },
	resultText: { fontWeight: "700", width: 200, fontSize: 28, marginBottom: 15 },
});

export default Products;
