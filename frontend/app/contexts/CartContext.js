import * as React from "react";

const defaultCartState = { content: [] };
const cartContext = React.createContext(defaultCartState);
const dispatchCartContext = React.createContext(undefined);

export const CartStateProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer((state, newValue) => ({ ...state, ...newValue }), defaultCartState);
	return (
		<cartContext.Provider value={state}>
			<dispatchCartContext.Provider value={dispatch}>{children}</dispatchCartContext.Provider>
		</cartContext.Provider>
	);
};

export const useCartState = () => [React.useContext(cartContext), React.useContext(dispatchCartContext)];
