import Logic from './logic';

export default class UI {
	static setUnit(system) {
		const unitBtn = document.querySelector('#change-units');
		const systemUnits = unitBtn.value || system || 'metric';
		this.updateUnitBtn(unitBtn, systemUnits);
		return systemUnits;
	}

	static updateUnitBtn(unitBtn, systemUnits) {
		const spanC = document.querySelector('#change-units span#C');
		const spanF = document.querySelector('#change-units span#F');
		const newUnitBtn = unitBtn;
		newUnitBtn.value = systemUnits;
		spanC.classList.toggle('bold', systemUnits === 'metric');
		spanF.classList.toggle('bold', systemUnits === 'imperial');
	}

	static toggleUnit(unitBtn) {
		const systemUnits = unitBtn.value === 'metric' ? 'imperial' : 'metric';
		this.updateUnitBtn(unitBtn, systemUnits);
		this.replaceUnits(systemUnits);
	}

	static convertTemperature(temp, systemUnits) {
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

	static convertWindSpeed(speed, systemUnits) {
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

	static replaceUnits(systemUnits) {
		const elements = ['#temperature', '#feels-like', '#wind-speed', '#tommorow-card .temp', '#after-tommorow-card .temp', '#next-card .temp'];

		elements.forEach((selector) => {
			const element = document.querySelector(selector);
			const value = element.textContent;
			const isWindSpeed = selector === '#wind-speed';
			element.textContent = isWindSpeed ? this.convertWindSpeed(value, systemUnits) : this.convertTemperature(value, systemUnits);
		});
	}

	static loading(toggle) {
		const spinner = document.querySelector('#loading-spinner');
		const weather = document.querySelector('#weather-container');
		weather.classList.toggle('hide', toggle);
		spinner.classList.toggle('hide', !toggle);
	}

	static updateUI(data) {
		this.loading(false);
		this.clearWeather();
		this.displayWeather(data);
		this.setBcgColor(data);
	}

	static pickCity(e) {
		this.loading(true);
		if (e.target.classList.contains('btn')) {
			Logic.grabDataByCity(this.setUnit(), e.target.textContent).then((data) => {
				this.updateUI(data);
			});
		}
	}

	static searchCity() {
		const input = document.querySelector('#search-input');
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

	static displayMainCard(data) {
		const mainCard = document.querySelector('#main-card');
		const elements = ['city-country', 'temperature', 'description'];

		elements.forEach((element) => {
			const el = document.createElement('h1');
			el.setAttribute('id', element);
			el.textContent = data[element];
			mainCard.appendChild(el);
		});

		if (data.country !== undefined) {
			document.querySelector('#city-country').textContent = `${data.city}, ${data.country}`;
		} else {
			document.querySelector('#city-country').textContent = `${data.city}`;
		}
	}

	static displayImgCard(data) {
		const imgCard = document.querySelector('#img-card');
		const img = document.createElement('img');
		img.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
		img.alt = data.description;
		imgCard.appendChild(img);
	}

	static displaySecondaryCard(data) {
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

	static createElementWithClass(elementType, className) {
		const element = document.createElement(elementType);
		element.className = className;
		return element;
	}

	static displayCard(data, dayIndex, cardId) {
		const card = document.querySelector(`#${cardId}`);

		const dayElement = this.createElementWithClass('p', 'day');
		const tempElement = this.createElementWithClass('p', 'temp');
		const iconElement = this.createElementWithClass('img', 'icon');

		dayElement.textContent = ` ${data.nextDays[dayIndex].day}`;
		tempElement.textContent = ` ${data.nextDays[dayIndex].temp}`;
		iconElement.src = `https://openweathermap.org/img/wn/${data.nextDays[dayIndex].icon}@4x.png`;
		iconElement.alt = data.nextDays[dayIndex].description;

		card.append(dayElement, tempElement, iconElement);
	}

	static displayWeather(data) {
		this.displayMainCard(data);
		this.displayImgCard(data);
		this.displaySecondaryCard(data);

		['tommorow-card', 'after-tommorow-card', 'next-card'].forEach((cardId, index) => {
			this.displayCard(data, index, cardId);
		});
	}

	static setBcgColor(data) {
		let temp = data.temperature;

		if (data.temperature.includes('°F')) {
			const system = 'metric';
			temp = this.convertTemperature(data.temperature, system);
		}

		temp = parseInt(temp, 10);

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
		document.body.style.backgroundColor = color;
	}

	static setGreyColor() {
		const color = `hsl(0, 0%, 75%)`;
		document.body.style.backgroundColor = color;
	}

	static attachListeners() {
		const sampleLocations = document.querySelector('#sample-locations');
		const unitBtn = document.querySelector('#change-units');
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
