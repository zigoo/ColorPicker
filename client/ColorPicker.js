import React, { Component } from "react";
import AutoSuggest from "./AutoSuggest.js";
import PropTypes from "prop-types";
import shortid from "shortid";
import {
	fetchColorList,
	setActiveColor,
	setChosenColor
} from "./helpers/actions";
import { connect } from "react-redux";

const styles = {
	wrapper: {
		textAlign: "center",
		minHeight: "95vh",
		paddingTop: "20px",
		color: "black",
	},
	ul: {
		listStyle: "none",
		margin: 0
	}
};

class ColorPicker extends Component {
	componentDidMount() {
		this.props.fetchColorList();
	}

	handleColorClick = color =>
		 this.props.setChosenColor(color);

	handleColorChange = () =>
		this.props.setActiveColor(this.props.chosenColor);

	render() {
		const { backgroundColor, chosenColor, loaded } = this.props;

		if (!loaded) return (
			<div style={styles.wrapper}>
					...loading...
			</div>)

		return (
			<div style={{ ...styles.wrapper, backgroundColor }}>
				<ul style={styles.ul}>
					<button onClick={() => this.handleColorChange()}>
							Accept
					</button>
					<AutoSuggest>
						{filteredList =>
							filteredList.map(color => (
								<li
									key={shortid.generate()}
									style={{
										cursor: "pointer",
										color: chosenColor === color.name ? color.name : "black"
									}}
									onClick={() => this.handleColorClick(color.name)}
								>
										{color.name}
								</li>
							))
						}
					</AutoSuggest>
				</ul>
			</div>
		);
	}
}

ColorPicker.propTypes = {
	fetchColorList: PropTypes.func.isRequired,
	setChosenColor: PropTypes.func.isRequired,
	setActiveColor: PropTypes.func.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	chosenColor: PropTypes.string.isRequired
};

export default connect(
	state => ({
		backgroundColor: state.background,
		chosenColor: state.chosen,
		loaded: state.loaded
	}),
	{
		fetchColorList,
		setActiveColor,
		setChosenColor
	}
)(ColorPicker);
