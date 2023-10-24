import Logic from './logic';

export default class UI {
	static setUnit(system) {
		const unitBtn = document.querySelector('#change-units');
		const systemUnits = unitBtn.value || system || 'metric';
		this.updateUnitBtn(unitBtn, systemUnits);
		return systemUnits;
	}

	static updateUnitBtn(unitBtn, systemUnits) {
		const newunitBtn = unitBtn;
		newunitBtn.value = systemUnits;
		newunitBtn.innerHTML = systemUnits === 'metric' ? '<b>°C</b> | °F' : '°C | <b>°F</b>';
	}

	static toggleUnit(unitBtn) {
		const systemUnits = unitBtn.innerHTML.includes('<b>°C</b>') ? 'imperial' : 'metric';
		this.updateUnitBtn(unitBtn, systemUnits);
	}

	static loading(toggle) {
		const spinner = document.querySelector('#loading-spinner');
		const weather = document.querySelector('#weather');

		if (toggle) {
			weather.classList.add('hide');
			spinner.classList.add('show');
		} else {
			spinner.classList.remove('show');
			weather.classList.remove('hide');
		}
	}

	static pickCity(e) {
		this.clearWeather();
		this.loading(true);
		if (e.target.classList.contains('btn')) {
			Logic.grabDataByCity(this.setUnit(), e.target.textContent).then((data) => {
				this.loading(false);
				this.clearWeather();
				this.displayWeather(data);
				this.setBcgColor(data);
			});
		}
	}

	static searchCity() {
		const input = document.querySelector('#search-input');

		input.value = input.value.trim();
		if (input.value !== '') {
			this.clearWeather();
			this.loading(true);
			Logic.grabDataByCity(this.setUnit(), input.value)
				.then((data) => {
					this.loading(false);
					input.value = '';
					this.clearWeather();
					this.displayWeather(data);
					this.setBcgColor(data);
				})
				.catch(() => {
					this.loading(false);
					input.value = '';
				});
		}
	}

	static async findMe() {
		this.clearWeather();
		this.loading(true);
		try {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			const { latitude } = position.coords;
			const { longitude } = position.coords;

			Logic.grabDataByPosition(this.setUnit(), latitude, longitude).then((data) => {
				this.loading(false);
				this.clearWeather();
				this.displayWeather(data);
				this.setBcgColor(data);
			});

			return position;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static clearWeather() {
		const imgCard = document.querySelector('#img-card');
		const mainCard = document.querySelector('#main-card');
		const secondaryCard = document.querySelector('#secondary-card');

		imgCard.textContent = '';
		mainCard.textContent = '';
		secondaryCard.textContent = '';
	}

	static displayWeather(data) {
		const weather = document.querySelector('#weather');

		const imgCard = document.querySelector('#img-card');
		const mainCard = document.querySelector('#main-card');
		const secondaryCard = document.querySelector('#secondary-card');

		const img = document.createElement('img');
		img.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
		img.alt = data.description;

		const h1CityCountry = document.createElement('h1');
		const h1Temperature = document.createElement('h1');
		const h1Description = document.createElement('h1');

		const pFeelsLikeTemp = document.createElement('p');
		const pHumidityPercent = document.createElement('p');
		const pWindSpeedUnit = document.createElement('p');
		const pPressureUnit = document.createElement('p');

		if (data.country !== undefined) {
			h1CityCountry.textContent = `${data.city}, ${data.country}`;
		} else {
			h1CityCountry.textContent = `${data.city}`;
		}

		h1Temperature.textContent = `${data.temperature}`;
		h1Description.textContent = `${data.description}`;
		pFeelsLikeTemp.textContent = `Feels like: ${data.feelsLikeTemp}`;
		pHumidityPercent.textContent = `Humidity: ${data.humidityPercent}`;
		pWindSpeedUnit.textContent = `Wind speed: ${data.windSpeedUnit}`;
		pPressureUnit.textContent = `Pressure: ${data.pressureUnit}`;

		imgCard.appendChild(img);

		mainCard.appendChild(h1CityCountry);
		mainCard.appendChild(h1Temperature);
		mainCard.appendChild(h1Description);

		secondaryCard.appendChild(pFeelsLikeTemp);
		secondaryCard.appendChild(pHumidityPercent);
		secondaryCard.appendChild(pWindSpeedUnit);
		secondaryCard.appendChild(pPressureUnit);

		weather.appendChild(mainCard);
		weather.appendChild(secondaryCard);
	}

	static setBcgColor(data) {
		let temp = parseInt(data.temperature, 10);
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
		this.attachListeners();

		this.findMe();
	}
}
