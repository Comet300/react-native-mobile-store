import { ApolloClient, InMemoryCache } from "@apollo/client";

import Constants from "../config/constants";

//local IP required due to apollo client known bug
export default apolloClient = new ApolloClient({
	uri: Constants.serverUrl + "/graphql",
	cache: new InMemoryCache(),
});
