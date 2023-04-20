import React, { Component } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Products from "./app/screens/Products";

const Stack = createNativeStackNavigator();

class App extends Component {
	componentDidMount() {
		StatusBar.setBackgroundColor("#ffffff");
		StatusBar.setBarStyle("dark-content");
	}

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='Details' component={Products} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export default App;
