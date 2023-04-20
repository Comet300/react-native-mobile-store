import React, { useState, useRef, useCallback, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import Slide from "./Slide";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const Carousel = ({ data }) => {
	const [index, setIndex] = useState(0);
	const indexRef = useRef(index);
	indexRef.current = index;

	const onScroll = useCallback((event) => {
		const slideSize = event.nativeEvent.layoutMeasurement.width;
		const index = event.nativeEvent.contentOffset.x / slideSize;
		const roundIndex = Math.round(index);

		const distance = Math.abs(roundIndex - index);
		const isNoMansLand = 0.4 < distance;
		if (roundIndex !== indexRef.current && !isNoMansLand) {
			setIndex(roundIndex);
		}
	}, []);

	const flatListOptimizationProps = {
		initialNumToRender: 0,
		maxToRenderPerBatch: 1,
		removeClippedSubviews: true,
		scrollEventThrottle: 16,
		windowSize: 2,
		keyExtractor: useCallback((e) => e.id, []),
		getItemLayout: useCallback(
			(_, index) => ({
				index,
				length: windowWidth,
				offset: index * windowWidth,
			}),
			[]
		),
	};

	return (
		<FlatList
			data={data}
			style={{ flex: 1, position: "absolute", top: 45 }}
			renderItem={({ item }) => {
				return <Slide data={item} />;
			}}
			pagingEnabled
			horizontal
			showsHorizontalScrollIndicator={false}
			onScroll={onScroll}
			{...flatListOptimizationProps}
		/>
	);
};

const styles = StyleSheet.create({});

export default Carousel;
