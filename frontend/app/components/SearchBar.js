import { useState } from "react";
import React from "react";
import { View, StyleSheet, TouchableHighlight, Image, TextInput } from "react-native";

const SearchBar = (props) => {
	const [searchTerm, setSearchTerm] = useState("");
	return (
		<View style={{ ...styles.root, width: props.width }}>
			<TouchableHighlight underlayColor='#00000022' style={styles.SearchBarButtonWrap} onPress={() => props.onSearch(searchTerm)}>
				<Image style={styles.SearchBarButton} source={require("../assets/icons/search.png")} />
			</TouchableHighlight>
			<TextInput
				onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
				style={styles.SearchBarText}
				onSubmitEditing={() => props.onSearch(searchTerm)}
				defaultValue={searchTerm}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		left: 15,
		backgroundColor: "#ffffff",
		borderRadius: 10,
		display: "flex",
		height: 40,
		flexDirection: "row",
		paddingLeft: 7,
		paddingRight: 7,
	},
	SearchBarButton: {
		width: 15,
		height: 15,
		left: 7.5,
	},
	SearchBarButtonWrap: {
		width: 30,
		height: 30,
		opacity: 0.6,
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignSelf: "center",
	},
	SearchBarText: {
		alignSelf: "center",
		padding: 10,
		flex: 1,
	},
});

export default SearchBar;
