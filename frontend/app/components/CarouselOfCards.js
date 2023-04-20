import React from "react";
import { View, StyleSheet, SectionList, FlatList, Dimensions } from "react-native";

import CarouselCard from "../components/CarouselCard";
import ProductCard from "./ProductCard";

import constants from "../config/constants";

const CarouselOfCards = (props) => {
	return (
		<FlatList
			style={styles.root}
			horizontal
			data={props.elements}
			renderItem={({ item }) => {
				return (
					<CarouselCard
						navigation={props.navigation}
						key={item.id}
						onToggleFav={() => {
							props.refetch();
						}}
						Title={item.title}
						Subtitle={item.subtitle}
						Image={{ uri: constants.serverUrl + item.image[0].url }}
						Price={item.price + " " + item.currency.Name}
						id={item.id}
						IsOnFavorites={item?.favorites.length > 0}
						FavoriteId={item.favorites[0]?.id}
					/>
				);
			}}
			showsHorizontalScrollIndicator={false}
		/>
	);
};

const styles = StyleSheet.create({
	root: { paddingLeft: 15, width: Dimensions.get("window").width - 20 },
});

export default CarouselOfCards;
