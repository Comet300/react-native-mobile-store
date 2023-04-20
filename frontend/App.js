import React, { Component } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Products from "./app/screens/Products";

import { ApolloProvider } from "@apollo/client";

import Apollo from "./app/config/apollo";

const Stack = createNativeStackNavigator();

class App extends Component {
	componentDidMount() {
		StatusBar.setBackgroundColor("#ffffff");
		StatusBar.setBarStyle("dark-content");
	}

	render() {
		return (
			<ApolloProvider client={Apollo}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
						<Stack.Screen name='Home' component={Home} />
						<Stack.Screen name='Details' component={Products} />
					</Stack.Navigator>
				</NavigationContainer>
			</ApolloProvider>
		);
	}
}

export default App;
