export default class Logic {
	static getDegreeUnit(system) {
		return system === 'imperial' ? '°F' : '°C';
	}

	static convertWindSpeed(system, windSpeed) {
		const windSpeedInKmH = Math.round(windSpeed * 3.6);
		return system === 'imperial' ? `${Math.round(windSpeed)} mph` : `${windSpeedInKmH} km/h`;
	}

	static getDayOfWeek(epoch) {
		const date = new Date(epoch * 1000);
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return days[date.getDay()];
	}

	static extractWeatherData(data, system) {
		const {
			name: city,
			sys: { country },
			weather: [{ main: weather, description, icon }],
			wind: { speed: windSpeed },
			main: { temp, feels_like: feelsLike, pressure, humidity },
			coord: { lat, lon },
		} = data;
		const degreeUnit = this.getDegreeUnit(system);
		const temperature = `${Math.round(temp)}${degreeUnit}`;
		const feelsLikeTemp = `${Math.round(feelsLike)}${degreeUnit}`;
		const windSpeedUnit = this.convertWindSpeed(system, windSpeed);
		const pressureUnit = `${pressure} hPa`;
		const humidityPercent = `${humidity}%`;

		return { city, country, icon, temperature, feelsLikeTemp, humidityPercent, windSpeedUnit, pressureUnit, description, weather, lat, lon };
	}

	static extractNextDays(data, system) {
		const nextDays = [];
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 1);

		for (let i = 0; i < 3; i += 1) {
			const dateStr = currentDate.toISOString().split('T')[0];
			const dateTimeStr = `${dateStr} 12:00:00`;
			const dayData = data.list.find((item) => item.dt_txt === dateTimeStr);
			if (dayData) {
				nextDays.push({
					day: this.getDayOfWeek(dayData.dt),
					temp: Math.round(dayData.main.temp) + this.getDegreeUnit(system),
					icon: dayData.weather[0].icon,
					description: dayData.weather[0].description,
				});
			}
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return nextDays;
	}

	static async grabDataByPosition(system, lat, lon) {
		const api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await fetch(api, { mode: 'cors' });
			if (!response.ok) throw new Error(`Localization not found`);
			const city = (await response.json())[0].name;
			return this.grabDataByCity(system, city);
		} catch (error) {
			alert(error);
			return null;
		}
	}

	static async grabDataByCity(system, city) {
		const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await new Promise((resolve, reject) => {
				setTimeout(() => {
					try {
						const res = fetch(api, { mode: 'cors' });
						resolve(res);
					} catch (error) {
						reject(error);
					}
				}, 1000);
			});

			if (!response.ok) throw new Error(`City '${city}' not found`);
			const data = this.extractWeatherData(await response.json(), system);
			const nextDays = await this.grabDataNextDays(system, data.lat, data.lon);
			data.nextDays = nextDays;
			return data;
		} catch (error) {
			alert(error);
			return null;
		}
	}

	static async grabDataNextDays(system, lat, lon) {
		const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${system}&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await fetch(api, { mode: 'cors' });
			if (!response.ok) throw new Error(`Localization not found`);
			const data = await response.json();
			const nextDays = this.extractNextDays(data, system);
			return nextDays;
		} catch (error) {
			alert(error);
			return null;
		}
	}
}
