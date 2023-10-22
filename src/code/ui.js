import Logic from './logic';

export default class UI {
	static setUnit(system) {
		const unitsBtn = document.querySelector('#change-units');
		const systemUnits = unitsBtn.value || system || 'metric';
		this.updateUnitBtn(unitsBtn, systemUnits);
		return systemUnits;
	}

	static updateUnitBtn(unitsBtn, systemUnits) {
		unitsBtn.value = systemUnits;
		unitsBtn.innerHTML = systemUnits === 'metric' ? '<b>°C</b> | °F' : '°C | <b>°F</b>';
	}

	static toggleUnit(unitsBtn) {
		const systemUnits = unitsBtn.innerHTML.includes('<b>°C</b>') ? 'imperial' : 'metric';
		this.updateUnitBtn(unitsBtn, systemUnits);
	}

	static loading(toggle) {
		const cog = document.querySelector('i.fa-cog');

		if (toggle) {
			cog.classList.add('visible');
		} else {
			cog.classList.remove('visible');
		}
	}

	static pickCity(e) {
		this.loading(true);
		if (e.target.classList.contains('btn')) {
			Logic.grabDataByCity(this.setUnit(), e.target.textContent).then(() => {
				this.loading(false);
			});
		}
	}

	static searchCity() {
		const input = document.querySelector('#search-input');

		input.value = input.value.trim();
		if (input.value !== '') {
			this.loading(true);
			Logic.grabDataByCity(this.setUnit(), input.value)
				.then(() => {
					this.loading(false);
					input.value = '';
				})
				.catch(() => {
					this.loading(false);
					input.value = '';
				});
		}
	}

	static async findMe() {
		try {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			const { latitude } = position.coords;
			const { longitude } = position.coords;

			Logic.grabDataByPosition(this.setUnit(), latitude, longitude);
			return position;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static attachListeners() {
		const sampleLocations = document.querySelector('#sample-locations');
		const unitsBtn = document.querySelector('#change-units');
		const searchBox = document.querySelector('#search-box');
		const searchBtn = document.querySelector('#search-btn');
		const findBtn = document.querySelector('#find-btn');

		sampleLocations.addEventListener('click', (e) => this.pickCity(e));
		searchBox.addEventListener('submit', (e) => e.preventDefault());
		searchBtn.addEventListener('click', () => this.searchCity());
		findBtn.addEventListener('click', () => this.findMe());
		unitsBtn.addEventListener('click', () => this.toggleUnit(unitsBtn));
	}

	static startApp() {
		this.attachListeners();
	}
}
