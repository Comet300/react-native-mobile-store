import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Switch, StatusBar, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import { RadioButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { gql, makeVar, useQuery, useMutation } from "@apollo/client";
import { TextInput } from "react-native-paper";
import { useCartState } from "../contexts/CartContext";
import { Divider } from "react-native-paper";

import NavBar from "../components/NavBar";
import { AuthContext } from "../contexts/AuthContext";
import SummaryRow from "../components/SummaryRow";

import constants from "../config/constants";
import Colors from "../config/colors";
import Spinner from "../components/Spinner";

let globalDifferentBilling = false;
const mapProductsToRows = (data) => {
	return data?.products.map((product) => {
		return (
			<>
				<SummaryRow
					style={styles.cardSpacer}
					key={product.id}
					Title={product.title}
					Price={product.price + " " + product.currency.Name}
					id={product.id}
					image={constants.serverUrl + product.image[0].url}
					onOpenMenuRequest={() => {}}
					showMenuDots={false}
				/>
				<Divider style={styles.dividerSpacing} />
			</>
		);
	});
};

const Checkout = (props) => {
	const [showSpinner, setShowSpinner] = useState(false);
	const [cartState, dispatchCartState] = useCartState();
	const GET_CART_PRODUCTS = gql`
		query GetCartProducts($productIds: [Int]) {
			products(where: { id: $productIds }) {
				id
				title
				price
				currency {
					Name
				}
				image {
					url
				}
			}
		}
	`;

	const REGISTER_ORDER = gql`
		mutation registerOrder($givenName: String, $familyName: String, $phone: String, $country: String, $address: String, $items: [ComponentCustomOrderItemInput]) {
			createOrder(input: { data: { GivenName: $givenName, FamilyName: $familyName, Phone: $phone, Country: $country, Address: $address, OrderItem: $items } }) {
				order {
					id
				}
			}
		}
	`;
	const [registerOrder] = useMutation(REGISTER_ORDER);

	let ids;
	if (cartState?.content && cartState?.content?.length > 0) ids = makeVar([...cartState?.content.map((a) => parseInt(a.product))]);
	else ids = makeVar([]);
	const { loading, error, data } = useQuery(GET_CART_PRODUCTS, {
		variables: {
			productIds: [...ids()],
		},
	});

	const { getCurrentUser } = React.useContext(AuthContext);
	let user = getCurrentUser();

	const [page, setPage] = React.useState(1);

	const [familyName, setFamilyName] = React.useState("");
	const [givenName, setGivenName] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [country, setCountry] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [differentBilling, setDifferentBilling] = React.useState(false);

	const [familyNameB, setFamilyNameB] = React.useState("");
	const [givenNameB, setGivenNameB] = React.useState("");
	const [countryB, setCountryB] = React.useState("");
	const [phoneb, setPhoneB] = React.useState("");
	const [addressB, setAddressB] = React.useState("");

	if (loading || showSpinner) return <Spinner />;
	return (
		<SafeAreaView style={styles.root}>
			<LinearGradient style={styles.heightFix} colors={[Colors.background_gradient_1, Colors.background_gradient_2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
				<NavBar navigation={props.navigation} title={"Checkout"} />

				{page == 1 ? (
					<View style={styles.formPage}>
						<View>
							<Text style={styles.header}>Shipping address</Text>
							<View style={styles.formRow}>
								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input50 }}
									label='Family name'
									value={familyName}
									onChangeText={setFamilyName}
								/>
								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input50 }}
									label='Given name'
									value={givenName}
									onChangeText={setGivenName}
								/>
							</View>

							<View style={styles.formRow}>
								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input50 }}
									label='Phone'
									value={phone}
									onChangeText={setPhone}
								/>

								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input50 }}
									label='Country'
									value={country}
									onChangeText={setCountry}
								/>
							</View>

							<View style={styles.formRow}>
								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input100 }}
									label='Address'
									value={address}
									onChangeText={setAddress}
								/>
							</View>

							<View style={styles.switch}>
								<Text>Different billing address</Text>
								<Switch
									trackColor={{ false: "#767577", true: "#81b0ff" }}
									thumbColor={"#f4f3f4"}
									ios_backgroundColor='#3e3e3e'
									onValueChange={setDifferentBilling}
									value={differentBilling}
									style={{ marginLeft: 10 }}
								/>
							</View>
						</View>
						<View style={{ ...styles.formRow, ...styles.actionsRow }}>
							<TouchableOpacity
								activeOpacity={1}
								style={styles.secondaryActionButton}
								onPress={() => {
									if (page == 1) {
										props.navigation.goBack();
									} else {
										setPage(page - 1);
									}
								}}>
								<Text style={styles.secondaryActionButtonText}>Back</Text>
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={1}
								style={styles.primaryActionButton}
								onPress={() => {
									if (page == 1 && differentBilling == false) {
										setPage(page + 2);
									}
									if (page == 1 && differentBilling == true) {
										setPage(page + 1);
									}
								}}>
								<Text style={styles.primaryActionButtonText}>Continue</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : page == 2 ? (
					<View style={styles.formPage}>
						<View>
							<Text style={styles.header}>Billing address</Text>
							<View style={styles.formRow}>
								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input50 }}
									label='Family name'
									value={familyNameB}
									onChangeText={setFamilyNameB}
								/>
								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input50 }}
									label='Given name'
									value={givenNameB}
									onChangeText={setGivenNameB}
								/>
							</View>

							<View style={styles.formRow}>
								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input50 }}
									label='Phone'
									value={phoneb}
									onChangeText={setPhoneB}
								/>

								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input50 }}
									label='Country'
									value={countryB}
									onChangeText={setCountryB}
								/>
							</View>

							<View style={styles.formRow}>
								<TextInput
									activeOutlineColor='#000'
									activeUnderlineColor='#000'
									selectionColor='#000'
									underlineColor='#000'
									style={{ ...styles.input, ...styles.input100 }}
									label='Address'
									value={addressB}
									onChangeText={setAddressB}
								/>
							</View>
						</View>
						<View style={{ ...styles.formRow, ...styles.actionsRow }}>
							<TouchableOpacity
								activeOpacity={1}
								style={styles.secondaryActionButton}
								onPress={() => {
									if (page == 1) {
										props.navigation.goBack();
									} else {
										setPage(page - 1);
									}
								}}>
								<Text style={styles.secondaryActionButtonText}>Back</Text>
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={1}
								style={styles.primaryActionButton}
								onPress={() => {
									setPage(page + 1);
								}}>
								<Text style={styles.primaryActionButtonText}>Continue</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<View style={styles.aligner}>
						<View style={{ width: "100%" }}>
							<View style={{ ...styles.cartContentsContainer, height: differentBilling ? 225 : 375 }}>
								<ScrollView overScrollMode='never'>{mapProductsToRows(data)}</ScrollView>
							</View>
							<View style={styles.summary}>
								<View>
									<Text style={{ ...styles.header, marginBottom: 10 }}>Shipping address</Text>
									<View>
										<View>
											<Text>
												<Text style={styles.inlineLabel}>Family name: </Text> {familyName}
											</Text>
										</View>
										<View>
											<Text>
												<Text style={styles.inlineLabel}>Given name: </Text> {givenName}
											</Text>
										</View>
										<View>
											<Text>
												<Text style={styles.inlineLabel}>Phone name: </Text> {phone}
											</Text>
										</View>
										<View>
											<Text>
												<Text style={styles.inlineLabel}>Country: </Text> {country}
											</Text>
										</View>
										<View>
											<Text>
												<Text style={styles.inlineLabel}>Address: </Text> {address}
											</Text>
										</View>
									</View>
								</View>

								{differentBilling ? (
									<View>
										<Text style={{ ...styles.header, marginBottom: 10, marginTop: 15 }}>Billing address</Text>
										<View>
											<View>
												<Text>
													<Text style={styles.inlineLabel}>Family name: </Text> {familyName}
												</Text>
											</View>
											<View>
												<Text>
													<Text style={styles.inlineLabel}>Given name: </Text> {givenName}
												</Text>
											</View>
											<View>
												<Text>
													<Text style={styles.inlineLabel}>Phone name: </Text> {phone}
												</Text>
											</View>
											<View>
												<Text>
													<Text style={styles.inlineLabel}>Country: </Text> {country}
												</Text>
											</View>
											<View>
												<Text>
													<Text style={styles.inlineLabel}>Address: </Text> {address}
												</Text>
											</View>
										</View>
									</View>
								) : (
									<></>
								)}

								<View style={styles.radioButton}>
									<Text style={styles.disabledRadioButtonText}>Cash on delivery</Text>
									<Image style={styles.paymentIcon} source={require("./../assets/icons/money.png")} />
									<RadioButton status={"checked"} color={"#000"} uncheckedColor={"#000"} disabled={true} />
								</View>
							</View>
						</View>
						<TouchableHighlight
							style={styles.checkoutButton}
							onPress={() => {
								setShowSpinner(true);
								registerOrder({
									variables: {
										givenName: givenName,
										familyName: familyName,
										phone: phone,
										country: country,
										address: address,
										items: [...cartState?.content],
									},
									onCompleted: () => {
										props.navigation.navigate("OrderConfirmation");
									},
								});
							}}>
							<Text style={styles.checkoutButtonText}>Place Order</Text>
						</TouchableHighlight>
					</View>
				)}
			</LinearGradient>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: { marginTop: StatusBar.currentHeight + 10, flex: 1 },
	formRow: { display: "flex", flexDirection: "row", justifyContent: "space-evenly" },
	input: {
		alignSelf: "center",
		backgroundColor: "rgba(0,0,0,0)",
		borderBottomColor: "#000",
		fontSize: 13,
	},
	input50: {
		width: "45%",
	},
	input100: {
		width: "95%",
	},
	switch: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 35,
	},
	formPage: {
		display: "flex",
		padding: 20,
		marginTop: 15,
		justifyContent: "space-between",
		flex: 1,
	},
	header: {
		fontWeight: "700",
		fontSize: 16,
	},
	checkoutButton: {
		backgroundColor: "#000",
		padding: 12,
		width: 270,
		borderRadius: 15,
		marginBottom: 15,
	},
	checkoutButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	primaryActionButton: {
		backgroundColor: "#000",
		padding: 12,
		width: "40%",
		borderRadius: 15,
		marginTop: 30,
		alignSelf: "center",
	},
	primaryActionButtonText: {
		color: "#fff",
		textAlign: "center",
	},
	secondaryActionButton: {
		padding: 12,
		width: "40%",
		borderRadius: 15,
		marginTop: 30,
		alignSelf: "center",
	},
	secondaryActionButtonText: {
		color: "#000",
		textAlign: "center",
	},
	heightFix: {
		flex: 1,
	},
	radioButton: {
		marginTop: 15,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	disabledRadioButtonText: {
		fontWeight: "700",
		color: "#A2A1A3",
	},
	paymentIcon: {
		width: 30,
		height: 30,
		marginLeft: 7,
		opacity: 0.4,
		position: "relative",
		bottom: 3,
	},
	cartContentsContainer: { backgroundColor: "#fff", padding: 10, borderRadius: 30, marginTop: 15 },
	summary: {
		padding: 20,
	},
	inlineLabel: {
		fontWeight: "700",
	},
	aligner: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},
	dividerSpacing: {
		marginTop: 7,
	},
});

export default Checkout;
