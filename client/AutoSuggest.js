import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AutoSuggest extends PureComponent {
	state = {inputValue: "", filtered: "" }

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.chosenColor !== this.props.chosenColor) {
			this.handleChange(this.props.chosenColor)
		}
	}

	setFilteredDebounced = input => {
		const filtered = input.length > 1 ? input.replace(/\\/g, '') : "";

		return this.setState({filtered})
	}

	handleChange = inputValue => 
		this.setState({ inputValue }, () => 
			this.setFilteredDebounced(inputValue)
		);
		
	render() {
		const { inputValue, filtered } = this.state;
		const { colors } = this.props;

		const filteredList = colors.filter(
			color => color.name.toLowerCase().search(filtered.toLowerCase()) !== -1
		)  
		return (
			<div>
				<input
					value={inputValue}
					ref={ (el => { this.input = el })}
					onChange={e => this.handleChange(e.target.value)}
				/>
				{this.props.children(filteredList)}
			</div>
		);
	}
}

AutoSuggest.propTypes = {
	children: PropTypes.func.isRequired,
	colors: PropTypes.array.isRequired
}

const mapStateToProps = (state, props) => ({
	colors: state.colors,
	chosenColor: state.chosen
});

export default connect(mapStateToProps)(AutoSuggest);
