import React from "react";
import ReactDOM from "react-dom";
import ColorPicker from "./ColorPicker";

import mainReducer from "./helpers/reducer.js";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
	mainReducer,
	composeWithDevTools(),
	applyMiddleware(thunk)
);

ReactDOM.render(
	<Provider store={store}>
		<ColorPicker />
	</Provider>,
	document.getElementById("root")
);
