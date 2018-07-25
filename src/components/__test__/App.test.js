import React from 'react';
import App from '../App';
import { mappedWeatherData, response } from './fixtures';
import { Loader } from 'semantic-ui-react';
import WeatherList from '../WeatherList';

describe('<App />', () => {
	const cdmSpy = sandbox.spy(App.prototype, 'componentDidMount');
	axiosGetStub.resolves({ data: { list: response } });
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<App/>);
	});

	describe('componentDidMount', () => {
		it('should call getData', () => {
			expect(cdmSpy).to.have.been.called;
		});
	});

	describe('getData', () => {
		it('should map the required data from the response to state', () => {
			expect(wrapper.state('weatherData')).to.eql(mappedWeatherData);
		});
	});

	describe('render', () => {
		it(`should render WeatherList component when there's data`, () => {
			expect(wrapper.find(WeatherList)).to.exist;
		});

		it(`should render Loader component when there's no data`, () => {
			wrapper.setState({ weatherData: [] });
			expect(wrapper.find(Loader)).to.exist;
		});
	});
});
