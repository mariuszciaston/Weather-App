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

	static windSpeedConversion(system, windSpeed) {
		const metricWindSpeed = Math.round(windSpeed * 3.6);

		switch (system) {
			case 'metric':
				return `${metricWindSpeed} km/h`;
			case 'imperial':
				return `${Math.round(windSpeed)} mph`;
			default:
				return `${metricWindSpeed} km/h`;
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
		const windSpeedUnit = this.windSpeedConversion(system, windSpeed);
		const pressureUnit = `${pressure} hPa`;
		const humidityPercent = `${humidity}%`;

		return { city, country, weather, description, windSpeedUnit, temperature, feelsLikeTemp, pressureUnit, humidityPercent };
	}

	static async grabData(city, system) {
		const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await fetch(api, { mode: 'cors' });
			if (!response.ok) throw new Error(`City '${city}' not found`);
			const data = this.extractData(await response.json(), system);

			console.log(data);

			return data;
		} catch (error) {
			alert(error);
			return null;
		}
	}
}
