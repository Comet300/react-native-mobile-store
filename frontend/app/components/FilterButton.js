import React, { Component } from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";

class FilterButton extends Component {
	render() {
		return (
			<TouchableHighlight onPress={this.props.onPress} underlayColor='#00000012' style={styles.root}>
				<Image style={styles.FilterButtonIcon} source={require("./../assets/icons/equalizer.png")} />
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		borderRadius: 10,
		backgroundColor: "#ffffff",
		height: 40,
		width: 40,
		display: "flex",
		alignContent: "center",
		justifyContent: "center",
	},
	FilterButtonIcon: {
		width: "60%",
		height: "60%",
		left: "20%",
	},
});

export default FilterButton;
