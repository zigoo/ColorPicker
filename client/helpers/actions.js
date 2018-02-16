import axios from "axios";
import {
	fetchingColorSuccess,
	fetchingColorError,
	setColorActive,
	setColorChosen
} from "./types";

const endPoint = "http://www.mocky.io/v2/5a37a7403200000f10eb6a2d";

const fetchColorSuccess = data => ({
	type: fetchingColorSuccess,
	data
});

const fetchColorError = ({response}) => ({
	type: fetchingColorError,
	status: response.status,
	statusText: response.statusText
});

export const fetchColorList = () => dispatch =>
	axios.get(endPoint)
		.then(response => dispatch(fetchColorSuccess(response.data)))
		.catch(error =>  dispatch(fetchColorError(error)))


export const setActiveColor = (color) => ({
	type: setColorActive,
	color
});

export const setChosenColor = (color) => ({
	type: setColorChosen,
	color
});
