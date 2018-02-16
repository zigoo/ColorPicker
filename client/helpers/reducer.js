import {
	fetchingColorSuccess,
	fetchingColorError,
	setColorChosen,
	setColorActive
} from "./types";

const initialState = {
	loaded: false,
	colors: [],
	background: "",
	chosen: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case fetchingColorSuccess:
			return {
			  ...state,
				loaded: true,
				colors: action.data
			};
		case fetchingColorError:
			const { status, statusText } = action;
			return {
				loaded: false,
				status,
				statusText
			};
		case setColorChosen:
			return {
				...state,
				chosen: action.color
			}		
		case setColorActive:
			return {
				...state,
				background: action.color
			}
		default:
			return state;
	}
};
 
