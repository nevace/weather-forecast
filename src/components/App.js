import React, { Component } from 'react';
import { Container, Dimmer, Grid, Loader } from 'semantic-ui-react';
import axios from 'axios';
import WeatherList from './WeatherList';
import styled from 'styled-components';

export default class App extends Component {
	state = {
		weatherData: []
	};

	componentDidMount() {
		this.getData();
	}

	async getData() {
		try {
			const { data } = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
				params: { APPID: 'b14ddf93ed2af66754b81b1c57581e92', id: '2643743', units: 'metric' }
			});
			// map relevant data
			const weatherData = data.list.map(({ dt_txt, main: { temp }, clouds: { all }, weather, wind }) => ({
				date: dt_txt,
				temp: Math.round(temp),
				clouds: all,
				weather: weather[0],
				wind
			}));

			this.setState({ weatherData });
		} catch (e) {
			console.error(e);
		}
	}

	render() {
		const { weatherData } = this.state;

		return !weatherData.length ? (
			<Dimmer active inverted>
				<Loader />
			</Dimmer>
		) : (
			<Container>
				<Grid columns={16} centered>
					<Grid.Row>
						<Grid.Column mobile={16} tablet={10} computer={8}>
							<Heading>London 5 Day Weather Forecast</Heading>
							<WeatherList weatherData={weatherData} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

const Heading = styled.h1`
	padding-top: 20px;
`;
