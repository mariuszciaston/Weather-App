export default class Logic {
	static addDegrees(system) {
		switch (system) {
			case 'metric':
				return '°C';
			case 'imperial':
				return '°F';
			default:
				return '°C';
		}
	}

	static extractData(data, system) {
		const {
			name: city,
			sys: { country },
			weather: [{ main: weather, description }],
			wind: { speed: windSpeed },
			main: { temp, feels_like: feelsLike, pressure, humidity },
		} = data;

		const temperature = Math.round(temp) + this.addDegrees(system);
		const feelsLikeTemp = Math.round(feelsLike) + this.addDegrees(system);

		return { city, country, weather, description, windSpeed, temperature, feelsLikeTemp, pressure, humidity };
	}

	static async grabData(city, system) {
		const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await fetch(api, { mode: 'cors' });
			const data = this.extractData(await response.json(), system);

			if (!response.ok) {
				throw new Error(`City ${city} not found`);
			}

			console.log(data);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}
}
