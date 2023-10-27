/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/style.css":
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/code/logic.js":
/*!***************************!*\
  !*** ./src/code/logic.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Logic)
/* harmony export */ });
class Logic {
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
			weather: [{ main: weather, description, icon }],
			wind: { speed: windSpeed },
			main: { temp, feels_like: feelsLike, pressure, humidity },
			coord: { lat, lon },
		} = data;
		const temperature = Math.round(temp) + this.addDegrees(system);
		const feelsLikeTemp = Math.round(feelsLike) + this.addDegrees(system);
		const windSpeedUnit = this.windSpeedConversion(system, windSpeed);
		const pressureUnit = `${pressure} hPa`;
		const humidityPercent = `${humidity}%`;

		return { city, country, icon, temperature, feelsLikeTemp, humidityPercent, windSpeedUnit, pressureUnit, description, weather, lat, lon };
	}

	static epochToDay(epoch) {
		const date = new Date(epoch * 1000);
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return days[date.getDay()];
	}

	static async grabDataByCity(system, city) {
		const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await new Promise((resolve, reject) => {
				setTimeout(async () => {
					try {
						const res = await fetch(api, { mode: 'cors' });
						resolve(res);
					} catch (error) {
						reject(error);
					}
				}, 1000);
			});

			if (!response.ok) throw new Error(`City '${city}' not found`);
			const data = this.extractData(await response.json(), system);

			const nextDays = await this.grabDataNextDays(system, data.lat, data.lon);
			data.nextDays = nextDays;

			return data;
		} catch (error) {
			alert(error);
			return null;
		}
	}

	static async grabDataByPosition(system, lat, lon) {
		const api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await fetch(api, { mode: 'cors' });

			if (!response.ok) throw new Error(`Localization not found`);
			let city = await response.json();
			city = city[0].name;
			const data = await this.grabDataByCity(system, city);
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

			const nextDays = [];
			const currentDate = new Date();
			currentDate.setDate(currentDate.getDate() + 1);

			for (let i = 0; i < 3; i += 1) {
				const dateStr = currentDate.toISOString().split('T')[0];
				const dateTimeStr = `${dateStr} 12:00:00`;
				const dayData = data.list.find((item) => item.dt_txt === dateTimeStr);
				if (dayData) {
					nextDays.push({
						day: this.epochToDay(dayData.dt),
						temp: Math.round(dayData.main.temp) + this.addDegrees(system),
						icon: dayData.weather[0].icon,
						description: dayData.weather[0].description,


						
					});
				}
				currentDate.setDate(currentDate.getDate() + 1);
			}

			return nextDays;
		} catch (error) {
			alert(error);
			return null;
		}
	}
}


/***/ }),

/***/ "./src/code/ui.js":
/*!************************!*\
  !*** ./src/code/ui.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ "./src/code/logic.js");


class UI {
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
		const temperatureElement = document.querySelector('#main-card #temperature');
		const feelsLikeElement = document.querySelector('#secondary-card #feels-like');
		const windSpeedElement = document.querySelector('#secondary-card #wind-speed');
		const temperature = temperatureElement.textContent;
		const feelsLike = feelsLikeElement.textContent;
		const windSpeed = windSpeedElement.textContent;
		temperatureElement.textContent = this.convertTemperature(temperature, systemUnits);
		feelsLikeElement.textContent = this.convertTemperature(feelsLike, systemUnits);
		windSpeedElement.textContent = this.convertWindSpeed(windSpeed, systemUnits);
	}

	static loading(toggle) {
		const spinner = document.querySelector('#loading-spinner');
		const weather = document.querySelector('#weather-container');

		if (toggle) {
			weather.classList.add('hide');
			spinner.classList.remove('hide');
		} else {
			spinner.classList.add('hide');
			weather.classList.remove('hide');
		}
	}

	static pickCity(e) {
		this.clearWeather();
		this.loading(true);
		if (e.target.classList.contains('btn')) {
			_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabDataByCity(this.setUnit(), e.target.textContent).then((data) => {
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
			_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabDataByCity(this.setUnit(), input.value)
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

			_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabDataByPosition(this.setUnit(), latitude, longitude).then((data) => {
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
		const mainCard = document.querySelector('#main-card');
		const imgCard = document.querySelector('#img-card');

		mainCard.textContent = '';
		imgCard.textContent = '';

		function clearTextContent(selector) {
			const elements = document.querySelectorAll(selector);
			elements.forEach((element) => {
				const elem = element;
				elem.textContent = '';
			});
		}
		clearTextContent('#secondary-card span');
		clearTextContent('#tommorow-card p');
		clearTextContent('#after-tommorow-card p');
		clearTextContent('#next-card p');
	}

	static displayMainCard(data) {
		const mainCard = document.querySelector('#main-card');

		const cityCountry = document.createElement('h1');
		const temperature = document.createElement('h1');
		const description = document.createElement('h1');

		cityCountry.setAttribute('id', 'city-country');
		temperature.setAttribute('id', 'temperature');
		description.setAttribute('id', 'description');

		if (data.country !== undefined) {
			cityCountry.textContent = `${data.city}, ${data.country}`;
		} else {
			cityCountry.textContent = `${data.city}`;
		}
		temperature.textContent = `${data.temperature}`;
		description.textContent = `${data.description}`;

		mainCard.appendChild(cityCountry);
		mainCard.appendChild(temperature);
		mainCard.appendChild(description);
	}

	static displayImgCard(data) {
		const imgCard = document.querySelector('#img-card');
		const img = document.createElement('img');
		img.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
		img.alt = data.description;
		imgCard.appendChild(img);
	}

	static displaySecondaryCard(data) {
		const feelsLike = document.querySelector('#feels-like');
		const humidity = document.querySelector('#humidity');
		const windSpeed = document.querySelector('#wind-speed');
		const pressure = document.querySelector('#pressure');

		feelsLike.append(` ${data.feelsLikeTemp}`);
		humidity.append(` ${data.humidityPercent}`);
		windSpeed.append(` ${data.windSpeedUnit}`);
		pressure.append(` ${data.pressureUnit}`);
	}

	static displayCard(data, dayIndex, cardId) {
		const day = document.querySelector(`#${cardId} .day`);
		const temp = document.querySelector(`#${cardId} .temp`);
		const icon = document.querySelector(`#${cardId} .icon`);

		day.append(` ${data.nextDays[dayIndex].day}`);
		temp.append(` ${data.nextDays[dayIndex].temp}`);

		icon.src = `https://openweathermap.org/img/wn/${data.nextDays[dayIndex].icon}@4x.png`;
		icon.alt = data.nextDays[dayIndex].description;
	}

	static displayWeather(data) {
		this.displayMainCard(data);
		this.displayImgCard(data);
		this.displaySecondaryCard(data);

		this.displayCard(data, 0, 'tommorow-card');
		this.displayCard(data, 1, 'after-tommorow-card');
		this.displayCard(data, 2, 'next-card');
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/style.css */ "./src/style/style.css");
/* harmony import */ var _code_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code/ui */ "./src/code/ui.js");




document.addEventListener('DOMContentLoaded', _code_ui__WEBPACK_IMPORTED_MODULE_2__["default"].runApp());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOdUI7QUFDSTtBQUNBOztBQUUzQiw4Q0FBOEMsZ0RBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvbG9naWMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29kZS91aS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2ljIHtcblx0c3RhdGljIGFkZERlZ3JlZXMoc3lzdGVtKSB7XG5cdFx0c3dpdGNoIChzeXN0ZW0pIHtcblx0XHRcdGNhc2UgJ21ldHJpYyc6XG5cdFx0XHRcdHJldHVybiAnwrBDJztcblx0XHRcdGNhc2UgJ2ltcGVyaWFsJzpcblx0XHRcdFx0cmV0dXJuICfCsEYnO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuICfCsEMnO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyB3aW5kU3BlZWRDb252ZXJzaW9uKHN5c3RlbSwgd2luZFNwZWVkKSB7XG5cdFx0Y29uc3QgbWV0cmljV2luZFNwZWVkID0gTWF0aC5yb3VuZCh3aW5kU3BlZWQgKiAzLjYpO1xuXG5cdFx0c3dpdGNoIChzeXN0ZW0pIHtcblx0XHRcdGNhc2UgJ21ldHJpYyc6XG5cdFx0XHRcdHJldHVybiBgJHttZXRyaWNXaW5kU3BlZWR9IGttL2hgO1xuXHRcdFx0Y2FzZSAnaW1wZXJpYWwnOlxuXHRcdFx0XHRyZXR1cm4gYCR7TWF0aC5yb3VuZCh3aW5kU3BlZWQpfSBtcGhgO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGAke21ldHJpY1dpbmRTcGVlZH0ga20vaGA7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGV4dHJhY3REYXRhKGRhdGEsIHN5c3RlbSkge1xuXHRcdGNvbnN0IHtcblx0XHRcdG5hbWU6IGNpdHksXG5cdFx0XHRzeXM6IHsgY291bnRyeSB9LFxuXHRcdFx0d2VhdGhlcjogW3sgbWFpbjogd2VhdGhlciwgZGVzY3JpcHRpb24sIGljb24gfV0sXG5cdFx0XHR3aW5kOiB7IHNwZWVkOiB3aW5kU3BlZWQgfSxcblx0XHRcdG1haW46IHsgdGVtcCwgZmVlbHNfbGlrZTogZmVlbHNMaWtlLCBwcmVzc3VyZSwgaHVtaWRpdHkgfSxcblx0XHRcdGNvb3JkOiB7IGxhdCwgbG9uIH0sXG5cdFx0fSA9IGRhdGE7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKHRlbXApICsgdGhpcy5hZGREZWdyZWVzKHN5c3RlbSk7XG5cdFx0Y29uc3QgZmVlbHNMaWtlVGVtcCA9IE1hdGgucm91bmQoZmVlbHNMaWtlKSArIHRoaXMuYWRkRGVncmVlcyhzeXN0ZW0pO1xuXHRcdGNvbnN0IHdpbmRTcGVlZFVuaXQgPSB0aGlzLndpbmRTcGVlZENvbnZlcnNpb24oc3lzdGVtLCB3aW5kU3BlZWQpO1xuXHRcdGNvbnN0IHByZXNzdXJlVW5pdCA9IGAke3ByZXNzdXJlfSBoUGFgO1xuXHRcdGNvbnN0IGh1bWlkaXR5UGVyY2VudCA9IGAke2h1bWlkaXR5fSVgO1xuXG5cdFx0cmV0dXJuIHsgY2l0eSwgY291bnRyeSwgaWNvbiwgdGVtcGVyYXR1cmUsIGZlZWxzTGlrZVRlbXAsIGh1bWlkaXR5UGVyY2VudCwgd2luZFNwZWVkVW5pdCwgcHJlc3N1cmVVbml0LCBkZXNjcmlwdGlvbiwgd2VhdGhlciwgbGF0LCBsb24gfTtcblx0fVxuXG5cdHN0YXRpYyBlcG9jaFRvRGF5KGVwb2NoKSB7XG5cdFx0Y29uc3QgZGF0ZSA9IG5ldyBEYXRlKGVwb2NoICogMTAwMCk7XG5cdFx0Y29uc3QgZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcblx0XHRyZXR1cm4gZGF5c1tkYXRlLmdldERheSgpXTtcblx0fVxuXG5cdHN0YXRpYyBhc3luYyBncmFiRGF0YUJ5Q2l0eShzeXN0ZW0sIGNpdHkpIHtcblx0XHRjb25zdCBhcGkgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPSR7c3lzdGVtfSZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM2A7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXMpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBDaXR5ICcke2NpdHl9JyBub3QgZm91bmRgKTtcblx0XHRcdGNvbnN0IGRhdGEgPSB0aGlzLmV4dHJhY3REYXRhKGF3YWl0IHJlc3BvbnNlLmpzb24oKSwgc3lzdGVtKTtcblxuXHRcdFx0Y29uc3QgbmV4dERheXMgPSBhd2FpdCB0aGlzLmdyYWJEYXRhTmV4dERheXMoc3lzdGVtLCBkYXRhLmxhdCwgZGF0YS5sb24pO1xuXHRcdFx0ZGF0YS5uZXh0RGF5cyA9IG5leHREYXlzO1xuXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhQnlQb3NpdGlvbihzeXN0ZW0sIGxhdCwgbG9uKSB7XG5cdFx0Y29uc3QgYXBpID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL3JldmVyc2U/bGF0PSR7bGF0fSZsb249JHtsb259JmxpbWl0PTEmYXBwaWQ9Mjg3MWM4ODk0NGI4MWZiYWI5MjJkNDcwMTI2OTViYTNgO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KTtcblxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGl6YXRpb24gbm90IGZvdW5kYCk7XG5cdFx0XHRsZXQgY2l0eSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNpdHkgPSBjaXR5WzBdLm5hbWU7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5ncmFiRGF0YUJ5Q2l0eShzeXN0ZW0sIGNpdHkpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBncmFiRGF0YU5leHREYXlzKHN5c3RlbSwgbGF0LCBsb24pIHtcblx0XHRjb25zdCBhcGkgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZ1bml0cz0ke3N5c3RlbX0mYXBwaWQ9Mjg3MWM4ODk0NGI4MWZiYWI5MjJkNDcwMTI2OTViYTNgO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgTG9jYWxpemF0aW9uIG5vdCBmb3VuZGApO1xuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuXHRcdFx0Y29uc3QgbmV4dERheXMgPSBbXTtcblx0XHRcdGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcblx0XHRcdGN1cnJlbnREYXRlLnNldERhdGUoY3VycmVudERhdGUuZ2V0RGF0ZSgpICsgMSk7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSArPSAxKSB7XG5cdFx0XHRcdGNvbnN0IGRhdGVTdHIgPSBjdXJyZW50RGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG5cdFx0XHRcdGNvbnN0IGRhdGVUaW1lU3RyID0gYCR7ZGF0ZVN0cn0gMTI6MDA6MDBgO1xuXHRcdFx0XHRjb25zdCBkYXlEYXRhID0gZGF0YS5saXN0LmZpbmQoKGl0ZW0pID0+IGl0ZW0uZHRfdHh0ID09PSBkYXRlVGltZVN0cik7XG5cdFx0XHRcdGlmIChkYXlEYXRhKSB7XG5cdFx0XHRcdFx0bmV4dERheXMucHVzaCh7XG5cdFx0XHRcdFx0XHRkYXk6IHRoaXMuZXBvY2hUb0RheShkYXlEYXRhLmR0KSxcblx0XHRcdFx0XHRcdHRlbXA6IE1hdGgucm91bmQoZGF5RGF0YS5tYWluLnRlbXApICsgdGhpcy5hZGREZWdyZWVzKHN5c3RlbSksXG5cdFx0XHRcdFx0XHRpY29uOiBkYXlEYXRhLndlYXRoZXJbMF0uaWNvbixcblx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uOiBkYXlEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG5cblxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y3VycmVudERhdGUuc2V0RGF0ZShjdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAxKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG5leHREYXlzO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRhbGVydChlcnJvcik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuXHRzdGF0aWMgc2V0VW5pdChzeXN0ZW0pIHtcblx0XHRjb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZS11bml0cycpO1xuXHRcdGNvbnN0IHN5c3RlbVVuaXRzID0gdW5pdEJ0bi52YWx1ZSB8fCBzeXN0ZW0gfHwgJ21ldHJpYyc7XG5cdFx0dGhpcy51cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKTtcblx0XHRyZXR1cm4gc3lzdGVtVW5pdHM7XG5cdH1cblxuXHRzdGF0aWMgdXBkYXRlVW5pdEJ0bih1bml0QnRuLCBzeXN0ZW1Vbml0cykge1xuXHRcdGNvbnN0IG5ld3VuaXRCdG4gPSB1bml0QnRuO1xuXHRcdG5ld3VuaXRCdG4udmFsdWUgPSBzeXN0ZW1Vbml0cztcblx0XHRuZXd1bml0QnRuLmlubmVySFRNTCA9IHN5c3RlbVVuaXRzID09PSAnbWV0cmljJyA/ICc8Yj7CsEM8L2I+IHwgwrBGJyA6ICfCsEMgfCA8Yj7CsEY8L2I+Jztcblx0fVxuXG5cdHN0YXRpYyB0b2dnbGVVbml0KHVuaXRCdG4pIHtcblx0XHRjb25zdCBzeXN0ZW1Vbml0cyA9IHVuaXRCdG4uaW5uZXJIVE1MLmluY2x1ZGVzKCc8Yj7CsEM8L2I+JykgPyAnaW1wZXJpYWwnIDogJ21ldHJpYyc7XG5cdFx0dGhpcy51cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKTtcblx0XHR0aGlzLnJlcGxhY2VVbml0cyhzeXN0ZW1Vbml0cyk7XG5cdH1cblxuXHRzdGF0aWMgY29udmVydFRlbXBlcmF0dXJlKHRlbXAsIHN5c3RlbVVuaXRzKSB7XG5cdFx0bGV0IHRlbXBOdW1iZXIgPSBwYXJzZUZsb2F0KHRlbXApO1xuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ2ltcGVyaWFsJyAmJiB0ZW1wLmluY2x1ZGVzKCfCsEMnKSkge1xuXHRcdFx0dGVtcE51bWJlciA9IE1hdGgucm91bmQoKHRlbXBOdW1iZXIgKiA5KSAvIDUgKyAzMik7XG5cdFx0XHRyZXR1cm4gYCR7dGVtcE51bWJlcn3CsEZgO1xuXHRcdH1cblx0XHRpZiAoc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnICYmIHRlbXAuaW5jbHVkZXMoJ8KwRicpKSB7XG5cdFx0XHR0ZW1wTnVtYmVyID0gTWF0aC5yb3VuZCgoKHRlbXBOdW1iZXIgLSAzMikgKiA1KSAvIDkpO1xuXHRcdFx0cmV0dXJuIGAke3RlbXBOdW1iZXJ9wrBDYDtcblx0XHR9XG5cdFx0cmV0dXJuIHRlbXA7XG5cdH1cblxuXHRzdGF0aWMgY29udmVydFdpbmRTcGVlZChzcGVlZCwgc3lzdGVtVW5pdHMpIHtcblx0XHRsZXQgc3BlZWROdW1iZXIgPSBwYXJzZUZsb2F0KHNwZWVkKTtcblx0XHRpZiAoc3lzdGVtVW5pdHMgPT09ICdpbXBlcmlhbCcgJiYgc3BlZWQuaW5jbHVkZXMoJ2ttL2gnKSkge1xuXHRcdFx0c3BlZWROdW1iZXIgPSBNYXRoLnJvdW5kKHNwZWVkTnVtYmVyIC8gMS42MDkzKTtcblx0XHRcdHJldHVybiBgJHtzcGVlZE51bWJlcn0gbXBoYDtcblx0XHR9XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnbWV0cmljJyAmJiBzcGVlZC5pbmNsdWRlcygnbXBoJykpIHtcblx0XHRcdHNwZWVkTnVtYmVyID0gTWF0aC5yb3VuZChzcGVlZE51bWJlciAqIDEuNjA5Myk7XG5cdFx0XHRyZXR1cm4gYCR7c3BlZWROdW1iZXJ9IGttL2hgO1xuXHRcdH1cblx0XHRyZXR1cm4gc3BlZWQ7XG5cdH1cblxuXHRzdGF0aWMgcmVwbGFjZVVuaXRzKHN5c3RlbVVuaXRzKSB7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tY2FyZCAjdGVtcGVyYXR1cmUnKTtcblx0XHRjb25zdCBmZWVsc0xpa2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY29uZGFyeS1jYXJkICNmZWVscy1saWtlJyk7XG5cdFx0Y29uc3Qgd2luZFNwZWVkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWNvbmRhcnktY2FyZCAjd2luZC1zcGVlZCcpO1xuXHRcdGNvbnN0IHRlbXBlcmF0dXJlID0gdGVtcGVyYXR1cmVFbGVtZW50LnRleHRDb250ZW50O1xuXHRcdGNvbnN0IGZlZWxzTGlrZSA9IGZlZWxzTGlrZUVsZW1lbnQudGV4dENvbnRlbnQ7XG5cdFx0Y29uc3Qgd2luZFNwZWVkID0gd2luZFNwZWVkRWxlbWVudC50ZXh0Q29udGVudDtcblx0XHR0ZW1wZXJhdHVyZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLmNvbnZlcnRUZW1wZXJhdHVyZSh0ZW1wZXJhdHVyZSwgc3lzdGVtVW5pdHMpO1xuXHRcdGZlZWxzTGlrZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLmNvbnZlcnRUZW1wZXJhdHVyZShmZWVsc0xpa2UsIHN5c3RlbVVuaXRzKTtcblx0XHR3aW5kU3BlZWRFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5jb252ZXJ0V2luZFNwZWVkKHdpbmRTcGVlZCwgc3lzdGVtVW5pdHMpO1xuXHR9XG5cblx0c3RhdGljIGxvYWRpbmcodG9nZ2xlKSB7XG5cdFx0Y29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkaW5nLXNwaW5uZXInKTtcblx0XHRjb25zdCB3ZWF0aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dlYXRoZXItY29udGFpbmVyJyk7XG5cblx0XHRpZiAodG9nZ2xlKSB7XG5cdFx0XHR3ZWF0aGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblx0XHRcdHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzcGlubmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblx0XHRcdHdlYXRoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBwaWNrQ2l0eShlKSB7XG5cdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnRuJykpIHtcblx0XHRcdExvZ2ljLmdyYWJEYXRhQnlDaXR5KHRoaXMuc2V0VW5pdCgpLCBlLnRhcmdldC50ZXh0Q29udGVudCkudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdFx0XHR0aGlzLmRpc3BsYXlXZWF0aGVyKGRhdGEpO1xuXHRcdFx0XHR0aGlzLnNldEJjZ0NvbG9yKGRhdGEpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHNlYXJjaENpdHkoKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWlucHV0Jyk7XG5cblx0XHRpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlLnRyaW0oKTtcblx0XHRpZiAoaW5wdXQudmFsdWUgIT09ICcnKSB7XG5cdFx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdFx0dGhpcy5sb2FkaW5nKHRydWUpO1xuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGlucHV0LnZhbHVlKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdFx0aW5wdXQudmFsdWUgPSAnJztcblx0XHRcdFx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGxheVdlYXRoZXIoZGF0YSk7XG5cdFx0XHRcdFx0dGhpcy5zZXRCY2dDb2xvcihkYXRhKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBmaW5kTWUoKSB7XG5cdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHBvc2l0aW9uID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHJlc29sdmUsIHJlamVjdCk7XG5cdFx0XHR9KTtcblx0XHRcdGNvbnN0IHsgbGF0aXR1ZGUgfSA9IHBvc2l0aW9uLmNvb3Jkcztcblx0XHRcdGNvbnN0IHsgbG9uZ2l0dWRlIH0gPSBwb3NpdGlvbi5jb29yZHM7XG5cblx0XHRcdExvZ2ljLmdyYWJEYXRhQnlQb3NpdGlvbih0aGlzLnNldFVuaXQoKSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSkudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdFx0XHR0aGlzLmRpc3BsYXlXZWF0aGVyKGRhdGEpO1xuXHRcdFx0XHR0aGlzLnNldEJjZ0NvbG9yKGRhdGEpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBwb3NpdGlvbjtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgY2xlYXJXZWF0aGVyKCkge1xuXHRcdGNvbnN0IG1haW5DYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tY2FyZCcpO1xuXHRcdGNvbnN0IGltZ0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW1nLWNhcmQnKTtcblxuXHRcdG1haW5DYXJkLnRleHRDb250ZW50ID0gJyc7XG5cdFx0aW1nQ2FyZC50ZXh0Q29udGVudCA9ICcnO1xuXG5cdFx0ZnVuY3Rpb24gY2xlYXJUZXh0Q29udGVudChzZWxlY3Rvcikge1xuXHRcdFx0Y29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcblx0XHRcdFx0Y29uc3QgZWxlbSA9IGVsZW1lbnQ7XG5cdFx0XHRcdGVsZW0udGV4dENvbnRlbnQgPSAnJztcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRjbGVhclRleHRDb250ZW50KCcjc2Vjb25kYXJ5LWNhcmQgc3BhbicpO1xuXHRcdGNsZWFyVGV4dENvbnRlbnQoJyN0b21tb3Jvdy1jYXJkIHAnKTtcblx0XHRjbGVhclRleHRDb250ZW50KCcjYWZ0ZXItdG9tbW9yb3ctY2FyZCBwJyk7XG5cdFx0Y2xlYXJUZXh0Q29udGVudCgnI25leHQtY2FyZCBwJyk7XG5cdH1cblxuXHRzdGF0aWMgZGlzcGxheU1haW5DYXJkKGRhdGEpIHtcblx0XHRjb25zdCBtYWluQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQnKTtcblxuXHRcdGNvbnN0IGNpdHlDb3VudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblx0XHRjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXG5cdFx0Y2l0eUNvdW50cnkuc2V0QXR0cmlidXRlKCdpZCcsICdjaXR5LWNvdW50cnknKTtcblx0XHR0ZW1wZXJhdHVyZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RlbXBlcmF0dXJlJyk7XG5cdFx0ZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdpZCcsICdkZXNjcmlwdGlvbicpO1xuXG5cdFx0aWYgKGRhdGEuY291bnRyeSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRjaXR5Q291bnRyeS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eX0sICR7ZGF0YS5jb3VudHJ5fWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNpdHlDb3VudHJ5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jaXR5fWA7XG5cdFx0fVxuXHRcdHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7ZGF0YS50ZW1wZXJhdHVyZX1gO1xuXHRcdGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7ZGF0YS5kZXNjcmlwdGlvbn1gO1xuXG5cdFx0bWFpbkNhcmQuYXBwZW5kQ2hpbGQoY2l0eUNvdW50cnkpO1xuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKHRlbXBlcmF0dXJlKTtcblx0XHRtYWluQ2FyZC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cdH1cblxuXHRzdGF0aWMgZGlzcGxheUltZ0NhcmQoZGF0YSkge1xuXHRcdGNvbnN0IGltZ0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW1nLWNhcmQnKTtcblx0XHRjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRpbWcuc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGEuaWNvbn1ANHgucG5nYDtcblx0XHRpbWcuYWx0ID0gZGF0YS5kZXNjcmlwdGlvbjtcblx0XHRpbWdDYXJkLmFwcGVuZENoaWxkKGltZyk7XG5cdH1cblxuXHRzdGF0aWMgZGlzcGxheVNlY29uZGFyeUNhcmQoZGF0YSkge1xuXHRcdGNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmZWVscy1saWtlJyk7XG5cdFx0Y29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaHVtaWRpdHknKTtcblx0XHRjb25zdCB3aW5kU3BlZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2luZC1zcGVlZCcpO1xuXHRcdGNvbnN0IHByZXNzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXNzdXJlJyk7XG5cblx0XHRmZWVsc0xpa2UuYXBwZW5kKGAgJHtkYXRhLmZlZWxzTGlrZVRlbXB9YCk7XG5cdFx0aHVtaWRpdHkuYXBwZW5kKGAgJHtkYXRhLmh1bWlkaXR5UGVyY2VudH1gKTtcblx0XHR3aW5kU3BlZWQuYXBwZW5kKGAgJHtkYXRhLndpbmRTcGVlZFVuaXR9YCk7XG5cdFx0cHJlc3N1cmUuYXBwZW5kKGAgJHtkYXRhLnByZXNzdXJlVW5pdH1gKTtcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5Q2FyZChkYXRhLCBkYXlJbmRleCwgY2FyZElkKSB7XG5cdFx0Y29uc3QgZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y2FyZElkfSAuZGF5YCk7XG5cdFx0Y29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NhcmRJZH0gLnRlbXBgKTtcblx0XHRjb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y2FyZElkfSAuaWNvbmApO1xuXG5cdFx0ZGF5LmFwcGVuZChgICR7ZGF0YS5uZXh0RGF5c1tkYXlJbmRleF0uZGF5fWApO1xuXHRcdHRlbXAuYXBwZW5kKGAgJHtkYXRhLm5leHREYXlzW2RheUluZGV4XS50ZW1wfWApO1xuXG5cdFx0aWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS5uZXh0RGF5c1tkYXlJbmRleF0uaWNvbn1ANHgucG5nYDtcblx0XHRpY29uLmFsdCA9IGRhdGEubmV4dERheXNbZGF5SW5kZXhdLmRlc2NyaXB0aW9uO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlXZWF0aGVyKGRhdGEpIHtcblx0XHR0aGlzLmRpc3BsYXlNYWluQ2FyZChkYXRhKTtcblx0XHR0aGlzLmRpc3BsYXlJbWdDYXJkKGRhdGEpO1xuXHRcdHRoaXMuZGlzcGxheVNlY29uZGFyeUNhcmQoZGF0YSk7XG5cblx0XHR0aGlzLmRpc3BsYXlDYXJkKGRhdGEsIDAsICd0b21tb3Jvdy1jYXJkJyk7XG5cdFx0dGhpcy5kaXNwbGF5Q2FyZChkYXRhLCAxLCAnYWZ0ZXItdG9tbW9yb3ctY2FyZCcpO1xuXHRcdHRoaXMuZGlzcGxheUNhcmQoZGF0YSwgMiwgJ25leHQtY2FyZCcpO1xuXHR9XG5cblx0c3RhdGljIHNldEJjZ0NvbG9yKGRhdGEpIHtcblx0XHRsZXQgdGVtcCA9IGRhdGEudGVtcGVyYXR1cmU7XG5cblx0XHRpZiAoZGF0YS50ZW1wZXJhdHVyZS5pbmNsdWRlcygnwrBGJykpIHtcblx0XHRcdGNvbnN0IHN5c3RlbSA9ICdtZXRyaWMnO1xuXHRcdFx0dGVtcCA9IHRoaXMuY29udmVydFRlbXBlcmF0dXJlKGRhdGEudGVtcGVyYXR1cmUsIHN5c3RlbSk7XG5cdFx0fVxuXG5cdFx0dGVtcCA9IHBhcnNlSW50KHRlbXAsIDEwKTtcblxuXHRcdGNvbnN0IG1pblRlbXAgPSAwO1xuXHRcdGNvbnN0IG1heFRlbXAgPSAzMDtcblxuXHRcdGNvbnN0IG1pbkhzbCA9IDIyMDtcblx0XHRjb25zdCBtYXhIc2wgPSAwO1xuXG5cdFx0dGVtcCA9IHRlbXAgPiBtYXhUZW1wID8gbWF4VGVtcCA6IHRlbXA7XG5cdFx0dGVtcCA9IHRlbXAgPCBtaW5UZW1wID8gbWluVGVtcCA6IHRlbXA7XG5cblx0XHRjb25zdCByYW5nZVRlbXAgPSBtYXhUZW1wIC0gbWluVGVtcDtcblx0XHRjb25zdCByYW5nZUhzbCA9IG1heEhzbCAtIG1pbkhzbDtcblx0XHRjb25zdCBkZWdDb3VudCA9IG1heFRlbXAgLSB0ZW1wO1xuXHRcdGNvbnN0IGhzbHNEZWcgPSByYW5nZUhzbCAvIHJhbmdlVGVtcDtcblx0XHRjb25zdCByZXR1cm5IdWUgPSAzNjAgLSAoZGVnQ291bnQgKiBoc2xzRGVnIC0gKG1heEhzbCAtIDM2MCkpO1xuXG5cdFx0Y29uc3QgY29sb3IgPSBgaHNsKCR7cmV0dXJuSHVlfSwgMTAwJSwgNzUlKWA7XG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcblx0fVxuXG5cdHN0YXRpYyBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cdFx0Y29uc3Qgc2FtcGxlTG9jYXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhbXBsZS1sb2NhdGlvbnMnKTtcblx0XHRjb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZS11bml0cycpO1xuXHRcdGNvbnN0IHNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYm94Jyk7XG5cdFx0Y29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idG4nKTtcblx0XHRjb25zdCBmaW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbmQtYnRuJyk7XG5cblx0XHRzYW1wbGVMb2NhdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5waWNrQ2l0eShlKSk7XG5cdFx0c2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXHRcdHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VhcmNoQ2l0eSgpKTtcblx0XHRmaW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5maW5kTWUoKSk7XG5cdFx0dW5pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlVW5pdCh1bml0QnRuKSk7XG5cdH1cblxuXHRzdGF0aWMgcnVuQXBwKCkge1xuXHRcdHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG5cblx0XHR0aGlzLmZpbmRNZSgpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnbm9ybWFsaXplLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuY3NzJztcbmltcG9ydCBVSSBmcm9tICcuL2NvZGUvdWknO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVUkucnVuQXBwKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9