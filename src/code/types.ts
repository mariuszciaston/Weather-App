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

export type Data = {
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

export type NextData = {
	list: ListItem[];
};

export type WeatherForecast = {
	day: string;
	temp: string;
	icon: string;
	description: string;
};

export type WeatherData = {
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

export type ResponseData = {
	ok: boolean;
	json: Function;
};
