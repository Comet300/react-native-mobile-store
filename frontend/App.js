import React, { Component, useContext, useState, useCallback, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as RootNavigation from "./app/utils/navigationRef";
import { ToastProvider } from "react-native-toast-notifications";

import Home from "./app/screens/Home";
import Products from "./app/screens/Products";
import Spinner from "./app/components/Spinner";
import { AuthContext } from "./app/contexts/AuthContext";
import { ApolloProvider } from "@apollo/client";

import Apollo from "./app/config/apollo";
import axios from "axios";
import SignIn from "./app/screens/SignIn";
import Profile from "./app/screens/Profile";
import Productview from "./app/screens/ProductView";

const Stack = createNativeStackNavigator();

const App = () => {
	StatusBar.setBackgroundColor("#ffffff");
	StatusBar.setBarStyle("dark-content");

	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "RESTORE_TOKEN":
					return {
						...prevState,
						user: action.user,
						isLoading: false,
					};
				case "SIGN_IN":
					return {
						...prevState,
						isSignout: false,
						user: action.user,
					};
				case "SIGN_OUT":
					return {
						...prevState,
						isSignout: true,
						user: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			user: null,
		}
	);

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let user;
			try {
				user = await SecureStore.getItemAsync("user");
				// console.log("restoring");
			} catch (e) {
				// Restoring token failed
			}
			dispatch({ type: "RESTORE_TOKEN", user: JSON.parse(user) });
		};
		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(() => ({
		signIn: async (data) => {
			axios({
				method: "post",
				url: "http:/192.168.1.107:1337/auth/local",
				headers: {
					"Content-Type": "application/json",
				},
				data: JSON.stringify(data),
			})
				.then(async (response) => {
					await SecureStore.setItemAsync("user", JSON.stringify(response.data));
					dispatch({ type: "SIGN_IN", user: response.data });
				})

				.catch(function (error) {
					console.log(error);
					return false;
				});
			return true;
		},
		signOut: async () => {
			await SecureStore.deleteItemAsync("user");
			dispatch({ type: "SIGN_OUT" });
			return true;
		},
		signUp: async (data) => {
			dispatch({ type: "SIGN_IN", user: "dummy-auth-token" });
		},
		getCurrentUser: () => {
			return state.user;
		},
	}));

	if (state.isLoading) {
		return <Spinner />;
	}

	return (
		<ApolloProvider client={Apollo}>
			<NavigationContainer>
				<AuthContext.Provider value={authContext}>
					<ToastProvider>
						<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
							<Stack.Screen name='Home' component={Home} />
							<Stack.Screen name='Details' component={Products} />
							<Stack.Screen name='ProductView' component={Productview} />
							<Stack.Screen name='Profile' component={Profile} />
							<Stack.Screen name='SignIn' component={SignIn} />
						</Stack.Navigator>
					</ToastProvider>
				</AuthContext.Provider>
			</NavigationContainer>
		</ApolloProvider>
	);
};

export default App;
