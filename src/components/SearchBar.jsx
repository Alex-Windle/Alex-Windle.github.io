import React, { Component } from 'react'; 
import PopularSearches from '../data_popular_searches.js';
import Results from './Results'; 

class SearchBar extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			term: 'Vermeer',
			results: [],
		};
	} 

	componentWillMount() {
		this.getResults(this.state.term);
	}

	renderButtons () {
		return PopularSearches.map(item => {
			return(<li key={item} onClick={this.buttonHandler.bind(this)}><div className="text-wrapper">{item}</div></li>);
		}); 
	}

	render(){
		return (
			<div>
				<p>
					<strong>Search</strong> over 500,000 works archived in the Dutch national museum.<br/>
					<span className="small-text">Enter an artist, subject or medium.</span><br/>
					<input
						className="search-input"
						type="text"
						value={this.state.term}
						onChange={event => this.onInputChange(event.target.value)}
					/>
				</p>
				<div className="popular-searches-wrapper">
					<p id="popular-searches-title">Popular searches</p>
					<ul className="popular-searches">
						{this.renderButtons()}
					</ul>
				</div>	
				<br /><br /> 
				<Results results={this.state.results} /> 
			</div>
		);
	}

	onInputChange(keyword) {
		// set state
		this.setState({term: keyword}); 

		// fire API call
		this.getResults(keyword);
	}

	buttonHandler(event) {
		this.setState({term: event.target.innerHTML});
		this.getResults(event.target.innerHTML);
	} 

	getResults(keyword) {
		fetch(`https://www.rijksmuseum.nl/api/en/collection/?key=cbUNdwH5&p=0&ps=5&imgonly=True&q=${keyword}`)
			.then(resp => resp.json())
			.then(resp => resp.artObjects)
			.then(results => this.setState({results: results}));
	}
}

export default SearchBar;
