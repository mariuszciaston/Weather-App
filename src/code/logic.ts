type Sys = {
	country: string;
};

type Weather = {
	main: string;
	description: string;
	icon: string;
};

type Wind = {
	speed: number;
};

type Main = {
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
};

type Coord = {
	lat: number;
	lon: number;
};

type Data = {
	name: string;
	sys: Sys;
	weather: Weather[];
	wind: Wind;
	main: Main;
	coord: Coord;
};

type ListItem = {
	dt_txt: string;
	dt: number;
	item: string;
	main: Main;
	weather: Weather[];
};

type NextData = {
	list: Array<ListItem>;
};

type WeatherForecast = {
	day: string;
	temp: string;
	icon: string;
	description: string;
};

type WeatherData = {
	city: string;
	country: string;
	icon: string;
	temperature: string;
	feelsLikeTemp: string;
	humidityPercent: string;
	windSpeedUnit: string;
	pressureUnit: string;
	description: string;
	weather: string;
	lat: number;
	lon: number;
	nextDays?: WeatherForecast[];
};

type ResponseData = {
	ok: boolean;
	json: Function;
};

export default class Logic {
	static getDegreeUnit(system: string): string {
		return system === 'imperial' ? '°F' : '°C';
	}

	static convertWindSpeed(system: string, windSpeed: number): string {
		const windSpeedInKmH = Math.round(windSpeed * 3.6);
		return system === 'imperial' ? `${Math.round(windSpeed)} mph` : `${windSpeedInKmH} km/h`;
	}

	static getDayOfWeek(epoch: number): string {
		const date = new Date(epoch * 1000);
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return days[date.getDay()];
	}

	static extractWeatherData(data: Data, system: string): WeatherData {
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

	static extractNextDays(nextData: NextData, system: string): WeatherForecast[] {
		const nextDays = [];
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 1);

		for (let i = 0; i < 3; i += 1) {
			const dateStr = currentDate.toISOString().split('T')[0];
			const dateTimeStr = `${dateStr} 12:00:00`;
			const dayData = nextData.list.find((item) => item.dt_txt === dateTimeStr);
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

	static async getCurrentPosition(system: string): Promise<WeatherData | null> {
		try {
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			const { latitude, longitude } = position.coords;
			const data = await Logic.grabDataByPosition(system, latitude, longitude);
			return data;
		} catch (error) {
			alert(error);
			return null;
		}
	}

	static async grabDataByPosition(system: string, lat: number, lon: number): Promise<WeatherData | null> {
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

	static async grabDataByCity(system: string, city: string): Promise<WeatherData | null> {
		const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await new Promise<ResponseData>(async (resolve, reject) => {
				setTimeout(async () => {
					try {
						const res = await fetch(api, { mode: 'cors' });
						resolve(res);
					} catch (error) {
						reject(error);
					}
				}, 750);
			});

			if (!response.ok) throw new Error(`City '${city}' not found`);
			const data: WeatherData = this.extractWeatherData(await response.json(), system);
			const nextDays = await this.grabDataNextDays(system, data.lat, data.lon);
			data.nextDays = nextDays;
			return data;
		} catch (error) {
			alert(error);
			return null;
		}
	}

	static async grabDataNextDays(system: string, lat: number, lon: number): Promise<WeatherForecast[] | null> {
		const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${system}&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await fetch(api, { mode: 'cors' });
			if (!response.ok) throw new Error(`Localization not found`);
			const nextData = await response.json();
			const nextDays = this.extractNextDays(nextData, system);
			return nextDays;
		} catch (error) {
			alert(error);
			return null;
		}
	}
}
