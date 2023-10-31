import Logic from './logic';
import type { WeatherData } from './logic';

export default class UI {
	static setUnit(system?: string) {
		const unitBtn = document.querySelector('#change-units') as HTMLButtonElement;
		const systemUnits = unitBtn.dataset.unit || system || 'metric';
		this.updateUnitBtn(unitBtn, systemUnits);
		return systemUnits;
	}

	static updateUnitBtn(unitBtn: HTMLButtonElement, systemUnits: string) {
		const spanC = document.querySelector('#change-units span#C');
		const spanF = document.querySelector('#change-units span#F');
		unitBtn.dataset.unit = systemUnits;
		spanC.classList.toggle('bold', systemUnits === 'metric');
		spanF.classList.toggle('bold', systemUnits === 'imperial');
	}

	static toggleUnit(unitBtn: HTMLButtonElement) {
		const systemUnits = unitBtn.dataset.unit === 'metric' ? 'imperial' : 'metric';
		this.updateUnitBtn(unitBtn, systemUnits);
		this.replaceUnits(systemUnits);
	}

	static convertTemperature(temp: string, systemUnits: string) {
		let tempNumber = parseFloat(temp);
		if (systemUnits === 'imperial' && temp.includes('°C')) {
			tempNumber = Math.round((tempNumber * 9) / 5 + 32);
			return `${tempNumber}°F`;
		}
		if (systemUnits === 'metric' && temp.includes('°F')) {
			tempNumber = Math.round(((tempNumber - 32) * 5) / 9);
			return `${tempNumber}°C`;
		}
		return temp;
	}

	static convertWindSpeed(speed: string, systemUnits: string) {
		let speedNumber = parseFloat(speed);
		if (systemUnits === 'imperial' && speed.includes('km/h')) {
			speedNumber = Math.round(speedNumber / 1.6093);
			return `${speedNumber} mph`;
		}
		if (systemUnits === 'metric' && speed.includes('mph')) {
			speedNumber = Math.round(speedNumber * 1.6093);
			return `${speedNumber} km/h`;
		}
		return speed;
	}

	static replaceUnits(systemUnits: string) {
		const elements = ['#temperature', '#feels-like', '#wind-speed', '#tommorow-card .temp', '#after-tommorow-card .temp', '#next-card .temp'];

		elements.forEach((selector) => {
			const element = document.querySelector(selector);
			const value = element.textContent;
			const isWindSpeed = selector === '#wind-speed';
			element.textContent = isWindSpeed ? this.convertWindSpeed(value, systemUnits) : this.convertTemperature(value, systemUnits);
		});
	}

	static loading(toggle: boolean) {
		const spinner = document.querySelector('#loading-spinner');
		const weather = document.querySelector('#weather-container');
		weather.classList.toggle('hide', toggle);
		spinner.classList.toggle('hide', !toggle);
	}

	static updateUI(data: WeatherData) {
		this.loading(false);
		this.clearWeather();
		this.displayWeather(data);
		this.setBcgColor(data);
	}

	static pickCity(e: Event) {
		this.loading(true);
		if ((e.target as Element).classList.contains('btn')) {
			Logic.grabDataByCity(this.setUnit(), (e.target as Element).textContent).then((data) => {
				this.updateUI(data);
			});
		}
	}

	static searchCity() {
		const input = document.querySelector('#search-input') as HTMLInputElement;
		input.value = input.value.trim();
		if (input.value !== '') {
			this.loading(true);
			Logic.grabDataByCity(this.setUnit(), input.value)
				.then((data) => {
					input.value = '';
					this.updateUI(data);
				})
				.catch(() => {
					this.setGreyColor();
				});
		}
	}

	static async findMe() {
		this.loading(true);
		const data = await Logic.getCurrentPosition(this.setUnit());
		if (data) {
			this.updateUI(data);
		}
	}

	static clearWeather() {
		const cardIds = ['main-card', 'img-card', 'secondary-card', 'tommorow-card', 'after-tommorow-card', 'next-card'];
		cardIds.forEach((id) => {
			const card = document.querySelector(`#${id}`);
			card.textContent = '';
		});
	}

	static displayMainCard(data: WeatherData) {
		const mainCard = document.querySelector('#main-card');
		const elements = ['city', 'temperature', 'description'] as const;

		elements.forEach((element) => {
			if (element in data) {
				const el = document.createElement('h1');
				el.setAttribute('id', element === 'city' ? 'city-country' : element);
				el.textContent = data[element];
				mainCard.appendChild(el);
			}
		});

		if (data.country) {
			document.querySelector('#city-country').textContent += `, ${data.country}`;
		}
	}

	static displayImgCard(data: WeatherData) {
		const imgCard = document.querySelector('#img-card');
		const img = document.createElement('img');
		img.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
		img.alt = data.description;
		imgCard.appendChild(img);
	}

	static displaySecondaryCard(data: WeatherData) {
		const secondaryCard = document.querySelector('#secondary-card');
		const elements = ['feels-like', 'humidity', 'wind-speed', 'pressure'];
		const descriptions = ['Feels like: ', 'Humidity: ', 'Wind speed: ', 'Pressure: '];
		const dataValues = [data.feelsLikeTemp, data.humidityPercent, data.windSpeedUnit, data.pressureUnit];

		elements.forEach((element, index) => {
			const p = document.createElement('p');
			p.textContent = descriptions[index];
			const span = document.createElement('span');
			span.id = element;
			span.append(` ${dataValues[index]}`);
			p.appendChild(span);
			secondaryCard.appendChild(p);
		});
	}

	static createElementWithClass(elementType: string, className: string) {
		const element = document.createElement(elementType);
		element.className = className;
		return element;
	}

	static displayCard(data: WeatherData, dayIndex: number, cardId: string) {
		const card = document.querySelector(`#${cardId}`);

		const dayElement = this.createElementWithClass('p', 'day');
		const tempElement = this.createElementWithClass('p', 'temp');
		const iconElement = this.createElementWithClass('img', 'icon') as HTMLImageElement;

		dayElement.textContent = ` ${data.nextDays[dayIndex].day}`;
		tempElement.textContent = ` ${data.nextDays[dayIndex].temp}`;
		iconElement.src = `https://openweathermap.org/img/wn/${data.nextDays[dayIndex].icon}@4x.png`;
		iconElement.alt = data.nextDays[dayIndex].description;

		card.append(dayElement, tempElement, iconElement);
	}

	static displayWeather(data: WeatherData) {
		this.displayMainCard(data);
		this.displayImgCard(data);
		this.displaySecondaryCard(data);

		['tommorow-card', 'after-tommorow-card', 'next-card'].forEach((cardId, index) => {
			this.displayCard(data, index, cardId);
		});
	}

	static setBcgColor(data: WeatherData) {
		let tempStr = data.temperature;
		let temp: number;

		if (tempStr.includes('°F')) {
			const system = 'metric';
			tempStr = this.convertTemperature(tempStr, system);
		}

		temp = parseInt(tempStr, 10);

		const minTemp = 0;
		const maxTemp = 30;

		const minHsl = 220;
		const maxHsl = 0;

		temp = temp > maxTemp ? maxTemp : temp;
		temp = temp < minTemp ? minTemp : temp;

		const rangeTemp = maxTemp - minTemp;
		const rangeHsl = maxHsl - minHsl;
		const degCount = maxTemp - temp;
		const hslsDeg = rangeHsl / rangeTemp;
		const returnHue = 360 - (degCount * hslsDeg - (maxHsl - 360));

		const color = `hsl(${returnHue}, 100%, 75%)`;
		document.documentElement.style.backgroundColor = color;
	}

	static setGreyColor() {
		const color = `hsl(0, 0%, 75%)`;
		document.documentElement.style.backgroundColor = color;
	}

	static attachListeners() {
		const sampleLocations = document.querySelector('#sample-locations');
		const unitBtn = document.querySelector('#change-units') as HTMLButtonElement;
		const searchBox = document.querySelector('#search-box');
		const searchBtn = document.querySelector('#search-btn');
		const findBtn = document.querySelector('#find-btn');

		sampleLocations.addEventListener('click', (e) => this.pickCity(e));
		searchBox.addEventListener('submit', (e) => e.preventDefault());
		searchBtn.addEventListener('click', () => this.searchCity());
		findBtn.addEventListener('click', () => this.findMe());
		unitBtn.addEventListener('click', () => this.toggleUnit(unitBtn));
	}

	static runApp() {
		this.setUnit();
		this.attachListeners();
	}
}
