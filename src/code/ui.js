import Logic from './logic';

export default class UI {
	static pickCity() {
		const sampleLocations = document.querySelector('#sample-locations');
		sampleLocations.addEventListener('click', (e) => {
			this.loading(true);
			if (e.target.classList.contains('btn')) {
				Logic.grabData(e.target.textContent, 'metric').then(() => {
					this.loading(false);
				});
			}
		});
	}

	static selectUnits(system = 'metric') {
		const unitsBtn = document.querySelector('#change-units');
		let systemUnits = system;
		unitsBtn.value = systemUnits;
		unitsBtn.innerHTML = systemUnits === 'metric' ? '<b>°C</b> | °F' : '°C | <b>°F</b>';

		unitsBtn.addEventListener('click', () => {
			systemUnits = systemUnits === 'metric' ? 'imperial' : 'metric';
			unitsBtn.value = systemUnits;
			unitsBtn.innerHTML = systemUnits === 'metric' ? '<b>°C</b> | °F' : '°C | <b>°F</b>';
		});

		return systemUnits;
	}

	static searchCity() {
		const input = document.querySelector('#search-input');
		const btn = document.querySelector('#search-btn');
		const searchBox = document.getElementById('search-box');

		searchBox.addEventListener('submit', (e) => {
			e.preventDefault();
		});

		btn.addEventListener('click', () => {
			input.value = input.value.trim();
			if (input.value !== '') {
				this.loading(true);
				Logic.grabData(input.value, 'metric')
					.then(() => {
						this.loading(false);
						input.value = '';
					})
					.catch(() => {
						this.loading(false);
						input.value = '';
					});
			}
		});
	}

	static loading(toggle) {
		const cog = document.querySelector('i.fa-cog');

		if (toggle) {
			cog.classList.add('visible');
		} else {
			cog.classList.remove('visible');
		}
	}

	static startApp() {
		this.pickCity();
		this.selectUnits();
		this.searchCity();
	}
}
