import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";

import constants from "../config/constants";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Slide = ({ data }) => {
	return (
		<View
			key={data.id}
			style={{
				height: windowHeight * 0.49,
				width: windowWidth,
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Image resizeMode='contain' source={{ uri: constants.serverUrl + data.url }} style={{ width: windowWidth, height: windowHeight * 0.45 }} />
		</View>
	);
};

const styles = StyleSheet.create({});

export default Slide;
