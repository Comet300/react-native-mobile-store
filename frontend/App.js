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
import Register from "./app/screens/Register";
import ConfirmRegister from "./app/screens/ConfirmRegister";
import RegisterSuccess from "./app/screens/RegisterSuccess";
import EmailSentRegister from "./app/screens/EmailSentRegister";
import Favorites from "./app/screens/Favorites";

import constants from "./app/config/constants";
import * as Linking from "expo-linking";

const prefix = Linking.makeUrl("/");

const Stack = createNativeStackNavigator();

const App = () => {
	const [data, setData] = useState(null);
	Linking.addEventListener("url", (e) => {
		// console.log(e);
	});
	const linking = {
		prefixes: [prefix],
		config: {
			screens: {
				Home: "home",
				ConfirmRegister: "confirmregister",
			},
		},
	};

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

	// setInterval(() => {
	// 	console.log(state);
	// }, 500);

	React.useEffect(() => {
		const bootstrapAsync = async () => {
			let user;
			try {
				user = await SecureStore.getItemAsync("user");
			} catch (e) {}
			dispatch({ type: "RESTORE_TOKEN", user: JSON.parse(user) });
		};
		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(() => ({
		signIn: async (data, successCallback, failureCallback) => {
			await axios({
				method: "post",
				url: `${constants.serverUrl}/auth/local`,
				headers: {
					"Content-Type": "application/json",
				},
				data: JSON.stringify(data),
			})
				.then(async (response) => {
					await SecureStore.setItemAsync("user", JSON.stringify(response.data));
					dispatch({ type: "SIGN_IN", user: response.data });
					successCallback();
					return true;
				})
				.catch(function (error) {
					console.error(error);
					failureCallback();
					return false;
				});
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

	if (state?.isLoading) {
		return <Spinner />;
	}

	return (
		<ApolloProvider client={Apollo}>
			<NavigationContainer linking={linking}>
				<AuthContext.Provider value={authContext}>
					<ToastProvider>
						<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
							<Stack.Screen name='Home' component={Home} />
							<Stack.Screen name='Details' component={Products} />
							<Stack.Screen name='ProductView' component={Productview} />
							<Stack.Screen name='Profile' component={Profile} />
							<Stack.Screen name='SignIn' component={SignIn} />
							<Stack.Screen name='Register' component={Register} />
							<Stack.Screen name='ConfirmRegister' component={ConfirmRegister} />
							<Stack.Screen name='RegisterSuccess' component={RegisterSuccess} />
							<Stack.Screen name='Favorites' component={Favorites} />
						</Stack.Navigator>
					</ToastProvider>
				</AuthContext.Provider>
			</NavigationContainer>
		</ApolloProvider>
	);
};

export default App;
