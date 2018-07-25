import React from 'react';
import { Header, Image, Label, Segment } from 'semantic-ui-react';
import { arrayOf, number, shape, string } from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

const WeatherList = ({ weatherData }) => {
	return (
		<StyledSegmentGroup>
			{weatherData.map(({ date, temp, clouds, weather, wind }, i) => (
				<div key={date}>
					{(!i || moment(date).day() !== moment(weatherData[i - 1].date).day()) && (
						<Header attached block>
							{!i ? 'Today' : moment(date).format('dddd')}
						</Header>
					)}
					<StyledSegment attached>
						<div>
							<span>{moment(date).format('HH:mm')} </span>
							<Image src={`http://openweathermap.org/img/w/${weather.icon}.png`} inline size="tiny"/>
						</div>
						<div>
							<Label color="red" size="large">
								{temp}
							</Label>
							<TextContainer>
								<i>{weather.description}</i>
								<p>{`wind: ${wind.speed} m/s`}</p>
								<p>{`clouds: ${clouds}%`}</p>
							</TextContainer>
						</div>
					</StyledSegment>
				</div>
			))}
		</StyledSegmentGroup>
	);
};

const StyledSegmentGroup = styled(Segment.Group)`
	height: calc(100vh - 100px);
	overflow-y: scroll;
	overflow-x: hidden;
`;

const StyledSegment = styled(Segment)`
	display: flex;
	justify-content: space-between;
`;

const TextContainer = styled.div`
	margin-top: 10px;

	p {
		margin: 0;
	}
`;

WeatherList.propTypes = {
	weatherData: arrayOf(
		shape({
			date: string.isRequired,
			temp: number.isRequired,
			clouds: number.isRequired,
			weather: shape({
				description: string.isRequired,
				icon: string.isRequired,
				id: number.isRequired,
				main: string.isRequired
			}),
			wind: shape({ deg: number.isRequired, speed: number.isRequired })
		})
	).isRequired
};

export default WeatherList;
