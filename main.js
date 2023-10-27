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
		const temperatureElement = document.querySelector('#temperature');
		const feelsLikeElement = document.querySelector('#feels-like');
		const windSpeedElement = document.querySelector('#wind-speed');
		const tommorowTempElement = document.querySelector('#tommorow-card .temp');
		const afterTempElement = document.querySelector('#after-tommorow-card .temp');
		const nextTempElement = document.querySelector('#next-card .temp');

		const mainTemp = temperatureElement.textContent;
		const feelsLike = feelsLikeElement.textContent;
		const windSpeed = windSpeedElement.textContent;
		const tommorowTemp = tommorowTempElement.textContent;
		const afterTemp = afterTempElement.textContent;
		const nextTemp = nextTempElement.textContent;

		temperatureElement.textContent = this.convertTemperature(mainTemp, systemUnits);
		feelsLikeElement.textContent = this.convertTemperature(feelsLike, systemUnits);
		windSpeedElement.textContent = this.convertWindSpeed(windSpeed, systemUnits);

		tommorowTempElement.textContent = this.convertTemperature(tommorowTemp, systemUnits);
		afterTempElement.textContent = this.convertTemperature(afterTemp, systemUnits);
		nextTempElement.textContent = this.convertTemperature(nextTemp, systemUnits);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ051QjtBQUNJO0FBQ0E7O0FBRTNCLDhDQUE4QyxnREFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29kZS9sb2dpYy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb2RlL3VpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naWMge1xuXHRzdGF0aWMgYWRkRGVncmVlcyhzeXN0ZW0pIHtcblx0XHRzd2l0Y2ggKHN5c3RlbSkge1xuXHRcdFx0Y2FzZSAnbWV0cmljJzpcblx0XHRcdFx0cmV0dXJuICfCsEMnO1xuXHRcdFx0Y2FzZSAnaW1wZXJpYWwnOlxuXHRcdFx0XHRyZXR1cm4gJ8KwRic7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gJ8KwQyc7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHdpbmRTcGVlZENvbnZlcnNpb24oc3lzdGVtLCB3aW5kU3BlZWQpIHtcblx0XHRjb25zdCBtZXRyaWNXaW5kU3BlZWQgPSBNYXRoLnJvdW5kKHdpbmRTcGVlZCAqIDMuNik7XG5cblx0XHRzd2l0Y2ggKHN5c3RlbSkge1xuXHRcdFx0Y2FzZSAnbWV0cmljJzpcblx0XHRcdFx0cmV0dXJuIGAke21ldHJpY1dpbmRTcGVlZH0ga20vaGA7XG5cdFx0XHRjYXNlICdpbXBlcmlhbCc6XG5cdFx0XHRcdHJldHVybiBgJHtNYXRoLnJvdW5kKHdpbmRTcGVlZCl9IG1waGA7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gYCR7bWV0cmljV2luZFNwZWVkfSBrbS9oYDtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZXh0cmFjdERhdGEoZGF0YSwgc3lzdGVtKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0bmFtZTogY2l0eSxcblx0XHRcdHN5czogeyBjb3VudHJ5IH0sXG5cdFx0XHR3ZWF0aGVyOiBbeyBtYWluOiB3ZWF0aGVyLCBkZXNjcmlwdGlvbiwgaWNvbiB9XSxcblx0XHRcdHdpbmQ6IHsgc3BlZWQ6IHdpbmRTcGVlZCB9LFxuXHRcdFx0bWFpbjogeyB0ZW1wLCBmZWVsc19saWtlOiBmZWVsc0xpa2UsIHByZXNzdXJlLCBodW1pZGl0eSB9LFxuXHRcdFx0Y29vcmQ6IHsgbGF0LCBsb24gfSxcblx0XHR9ID0gZGF0YTtcblx0XHRjb25zdCB0ZW1wZXJhdHVyZSA9IE1hdGgucm91bmQodGVtcCkgKyB0aGlzLmFkZERlZ3JlZXMoc3lzdGVtKTtcblx0XHRjb25zdCBmZWVsc0xpa2VUZW1wID0gTWF0aC5yb3VuZChmZWVsc0xpa2UpICsgdGhpcy5hZGREZWdyZWVzKHN5c3RlbSk7XG5cdFx0Y29uc3Qgd2luZFNwZWVkVW5pdCA9IHRoaXMud2luZFNwZWVkQ29udmVyc2lvbihzeXN0ZW0sIHdpbmRTcGVlZCk7XG5cdFx0Y29uc3QgcHJlc3N1cmVVbml0ID0gYCR7cHJlc3N1cmV9IGhQYWA7XG5cdFx0Y29uc3QgaHVtaWRpdHlQZXJjZW50ID0gYCR7aHVtaWRpdHl9JWA7XG5cblx0XHRyZXR1cm4geyBjaXR5LCBjb3VudHJ5LCBpY29uLCB0ZW1wZXJhdHVyZSwgZmVlbHNMaWtlVGVtcCwgaHVtaWRpdHlQZXJjZW50LCB3aW5kU3BlZWRVbml0LCBwcmVzc3VyZVVuaXQsIGRlc2NyaXB0aW9uLCB3ZWF0aGVyLCBsYXQsIGxvbiB9O1xuXHR9XG5cblx0c3RhdGljIGVwb2NoVG9EYXkoZXBvY2gpIHtcblx0XHRjb25zdCBkYXRlID0gbmV3IERhdGUoZXBvY2ggKiAxMDAwKTtcblx0XHRjb25zdCBkYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuXHRcdHJldHVybiBkYXlzW2RhdGUuZ2V0RGF5KCldO1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhQnlDaXR5KHN5c3RlbSwgY2l0eSkge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9JHtzeXN0ZW19JmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzYDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlcyk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCAxMDAwKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYENpdHkgJyR7Y2l0eX0nIG5vdCBmb3VuZGApO1xuXHRcdFx0Y29uc3QgZGF0YSA9IHRoaXMuZXh0cmFjdERhdGEoYXdhaXQgcmVzcG9uc2UuanNvbigpLCBzeXN0ZW0pO1xuXG5cdFx0XHRjb25zdCBuZXh0RGF5cyA9IGF3YWl0IHRoaXMuZ3JhYkRhdGFOZXh0RGF5cyhzeXN0ZW0sIGRhdGEubGF0LCBkYXRhLmxvbik7XG5cdFx0XHRkYXRhLm5leHREYXlzID0gbmV4dERheXM7XG5cblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRhbGVydChlcnJvcik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZ3JhYkRhdGFCeVBvc2l0aW9uKHN5c3RlbSwgbGF0LCBsb24pIHtcblx0XHRjb25zdCBhcGkgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvcmV2ZXJzZT9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mbGltaXQ9MSZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM2A7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pO1xuXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYExvY2FsaXphdGlvbiBub3QgZm91bmRgKTtcblx0XHRcdGxldCBjaXR5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y2l0eSA9IGNpdHlbMF0ubmFtZTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmdyYWJEYXRhQnlDaXR5KHN5c3RlbSwgY2l0eSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhTmV4dERheXMoc3lzdGVtLCBsYXQsIGxvbikge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PSR7bGF0fSZsb249JHtsb259JnVuaXRzPSR7c3lzdGVtfSZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM2A7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGl6YXRpb24gbm90IGZvdW5kYCk7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG5cdFx0XHRjb25zdCBuZXh0RGF5cyA9IFtdO1xuXHRcdFx0Y29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0Y3VycmVudERhdGUuc2V0RGF0ZShjdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAxKTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpICs9IDEpIHtcblx0XHRcdFx0Y29uc3QgZGF0ZVN0ciA9IGN1cnJlbnREYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcblx0XHRcdFx0Y29uc3QgZGF0ZVRpbWVTdHIgPSBgJHtkYXRlU3RyfSAxMjowMDowMGA7XG5cdFx0XHRcdGNvbnN0IGRheURhdGEgPSBkYXRhLmxpc3QuZmluZCgoaXRlbSkgPT4gaXRlbS5kdF90eHQgPT09IGRhdGVUaW1lU3RyKTtcblx0XHRcdFx0aWYgKGRheURhdGEpIHtcblx0XHRcdFx0XHRuZXh0RGF5cy5wdXNoKHtcblx0XHRcdFx0XHRcdGRheTogdGhpcy5lcG9jaFRvRGF5KGRheURhdGEuZHQpLFxuXHRcdFx0XHRcdFx0dGVtcDogTWF0aC5yb3VuZChkYXlEYXRhLm1haW4udGVtcCkgKyB0aGlzLmFkZERlZ3JlZXMoc3lzdGVtKSxcblx0XHRcdFx0XHRcdGljb246IGRheURhdGEud2VhdGhlclswXS5pY29uLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246IGRheURhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbixcblxuXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjdXJyZW50RGF0ZS5zZXREYXRlKGN1cnJlbnREYXRlLmdldERhdGUoKSArIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbmV4dERheXM7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG5cdHN0YXRpYyBzZXRVbml0KHN5c3RlbSkge1xuXHRcdGNvbnN0IHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzJyk7XG5cdFx0Y29uc3Qgc3lzdGVtVW5pdHMgPSB1bml0QnRuLnZhbHVlIHx8IHN5c3RlbSB8fCAnbWV0cmljJztcblx0XHR0aGlzLnVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpO1xuXHRcdHJldHVybiBzeXN0ZW1Vbml0cztcblx0fVxuXG5cdHN0YXRpYyB1cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKSB7XG5cdFx0Y29uc3Qgc3BhbkMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzIHNwYW4jQycpO1xuXHRcdGNvbnN0IHNwYW5GID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZS11bml0cyBzcGFuI0YnKTtcblxuXHRcdGNvbnN0IG5ld1VuaXRCdG4gPSB1bml0QnRuO1xuXHRcdG5ld1VuaXRCdG4udmFsdWUgPSBzeXN0ZW1Vbml0cztcblxuXHRcdHNwYW5DLmNsYXNzTGlzdC50b2dnbGUoJ2JvbGQnLCBzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycpO1xuXHRcdHNwYW5GLmNsYXNzTGlzdC50b2dnbGUoJ2JvbGQnLCBzeXN0ZW1Vbml0cyA9PT0gJ2ltcGVyaWFsJyk7XG5cdH1cblxuXHRzdGF0aWMgdG9nZ2xlVW5pdCh1bml0QnRuKSB7XG5cdFx0Y29uc3Qgc3lzdGVtVW5pdHMgPSB1bml0QnRuLnZhbHVlID09PSAnbWV0cmljJyA/ICdpbXBlcmlhbCcgOiAnbWV0cmljJztcblx0XHR0aGlzLnVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpO1xuXHRcdHRoaXMucmVwbGFjZVVuaXRzKHN5c3RlbVVuaXRzKTtcblx0fVxuXG5cdHN0YXRpYyBjb252ZXJ0VGVtcGVyYXR1cmUodGVtcCwgc3lzdGVtVW5pdHMpIHtcblx0XHRsZXQgdGVtcE51bWJlciA9IHBhcnNlRmxvYXQodGVtcCk7XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnICYmIHRlbXAuaW5jbHVkZXMoJ8KwQycpKSB7XG5cdFx0XHR0ZW1wTnVtYmVyID0gTWF0aC5yb3VuZCgodGVtcE51bWJlciAqIDkpIC8gNSArIDMyKTtcblx0XHRcdHJldHVybiBgJHt0ZW1wTnVtYmVyfcKwRmA7XG5cdFx0fVxuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycgJiYgdGVtcC5pbmNsdWRlcygnwrBGJykpIHtcblx0XHRcdHRlbXBOdW1iZXIgPSBNYXRoLnJvdW5kKCgodGVtcE51bWJlciAtIDMyKSAqIDUpIC8gOSk7XG5cdFx0XHRyZXR1cm4gYCR7dGVtcE51bWJlcn3CsENgO1xuXHRcdH1cblx0XHRyZXR1cm4gdGVtcDtcblx0fVxuXG5cdHN0YXRpYyBjb252ZXJ0V2luZFNwZWVkKHNwZWVkLCBzeXN0ZW1Vbml0cykge1xuXHRcdGxldCBzcGVlZE51bWJlciA9IHBhcnNlRmxvYXQoc3BlZWQpO1xuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ2ltcGVyaWFsJyAmJiBzcGVlZC5pbmNsdWRlcygna20vaCcpKSB7XG5cdFx0XHRzcGVlZE51bWJlciA9IE1hdGgucm91bmQoc3BlZWROdW1iZXIgLyAxLjYwOTMpO1xuXHRcdFx0cmV0dXJuIGAke3NwZWVkTnVtYmVyfSBtcGhgO1xuXHRcdH1cblx0XHRpZiAoc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnICYmIHNwZWVkLmluY2x1ZGVzKCdtcGgnKSkge1xuXHRcdFx0c3BlZWROdW1iZXIgPSBNYXRoLnJvdW5kKHNwZWVkTnVtYmVyICogMS42MDkzKTtcblx0XHRcdHJldHVybiBgJHtzcGVlZE51bWJlcn0ga20vaGA7XG5cdFx0fVxuXHRcdHJldHVybiBzcGVlZDtcblx0fVxuXG5cdHN0YXRpYyByZXBsYWNlVW5pdHMoc3lzdGVtVW5pdHMpIHtcblx0XHRjb25zdCB0ZW1wZXJhdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVtcGVyYXR1cmUnKTtcblx0XHRjb25zdCBmZWVsc0xpa2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZlZWxzLWxpa2UnKTtcblx0XHRjb25zdCB3aW5kU3BlZWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpbmQtc3BlZWQnKTtcblx0XHRjb25zdCB0b21tb3Jvd1RlbXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvbW1vcm93LWNhcmQgLnRlbXAnKTtcblx0XHRjb25zdCBhZnRlclRlbXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FmdGVyLXRvbW1vcm93LWNhcmQgLnRlbXAnKTtcblx0XHRjb25zdCBuZXh0VGVtcEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dC1jYXJkIC50ZW1wJyk7XG5cblx0XHRjb25zdCBtYWluVGVtcCA9IHRlbXBlcmF0dXJlRWxlbWVudC50ZXh0Q29udGVudDtcblx0XHRjb25zdCBmZWVsc0xpa2UgPSBmZWVsc0xpa2VFbGVtZW50LnRleHRDb250ZW50O1xuXHRcdGNvbnN0IHdpbmRTcGVlZCA9IHdpbmRTcGVlZEVsZW1lbnQudGV4dENvbnRlbnQ7XG5cdFx0Y29uc3QgdG9tbW9yb3dUZW1wID0gdG9tbW9yb3dUZW1wRWxlbWVudC50ZXh0Q29udGVudDtcblx0XHRjb25zdCBhZnRlclRlbXAgPSBhZnRlclRlbXBFbGVtZW50LnRleHRDb250ZW50O1xuXHRcdGNvbnN0IG5leHRUZW1wID0gbmV4dFRlbXBFbGVtZW50LnRleHRDb250ZW50O1xuXG5cdFx0dGVtcGVyYXR1cmVFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5jb252ZXJ0VGVtcGVyYXR1cmUobWFpblRlbXAsIHN5c3RlbVVuaXRzKTtcblx0XHRmZWVsc0xpa2VFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5jb252ZXJ0VGVtcGVyYXR1cmUoZmVlbHNMaWtlLCBzeXN0ZW1Vbml0cyk7XG5cdFx0d2luZFNwZWVkRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuY29udmVydFdpbmRTcGVlZCh3aW5kU3BlZWQsIHN5c3RlbVVuaXRzKTtcblxuXHRcdHRvbW1vcm93VGVtcEVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLmNvbnZlcnRUZW1wZXJhdHVyZSh0b21tb3Jvd1RlbXAsIHN5c3RlbVVuaXRzKTtcblx0XHRhZnRlclRlbXBFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5jb252ZXJ0VGVtcGVyYXR1cmUoYWZ0ZXJUZW1wLCBzeXN0ZW1Vbml0cyk7XG5cdFx0bmV4dFRlbXBFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5jb252ZXJ0VGVtcGVyYXR1cmUobmV4dFRlbXAsIHN5c3RlbVVuaXRzKTtcblx0fVxuXG5cdHN0YXRpYyBsb2FkaW5nKHRvZ2dsZSkge1xuXHRcdGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGluZy1zcGlubmVyJyk7XG5cdFx0Y29uc3Qgd2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWF0aGVyLWNvbnRhaW5lcicpO1xuXG5cdFx0aWYgKHRvZ2dsZSkge1xuXHRcdFx0d2VhdGhlci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0XHRzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0XHR3ZWF0aGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgcGlja0NpdHkoZSkge1xuXHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0dGhpcy5sb2FkaW5nKHRydWUpO1xuXHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J0bicpKSB7XG5cdFx0XHRMb2dpYy5ncmFiRGF0YUJ5Q2l0eSh0aGlzLnNldFVuaXQoKSwgZS50YXJnZXQudGV4dENvbnRlbnQpLnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdFx0dGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcblx0XHRcdFx0dGhpcy5zZXRCY2dDb2xvcihkYXRhKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBzZWFyY2hDaXR5KCkge1xuXHRcdGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dCcpO1xuXG5cdFx0aW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZS50cmltKCk7XG5cdFx0aWYgKGlucHV0LnZhbHVlICE9PSAnJykge1xuXHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHRcdExvZ2ljLmdyYWJEYXRhQnlDaXR5KHRoaXMuc2V0VW5pdCgpLCBpbnB1dC52YWx1ZSlcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cdFx0XHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXlXZWF0aGVyKGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuc2V0QmNnQ29sb3IoZGF0YSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZmluZE1lKCkge1xuXHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0dGhpcy5sb2FkaW5nKHRydWUpO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBwb3NpdGlvbiA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXNvbHZlLCByZWplY3QpO1xuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCB7IGxhdGl0dWRlIH0gPSBwb3NpdGlvbi5jb29yZHM7XG5cdFx0XHRjb25zdCB7IGxvbmdpdHVkZSB9ID0gcG9zaXRpb24uY29vcmRzO1xuXG5cdFx0XHRMb2dpYy5ncmFiRGF0YUJ5UG9zaXRpb24odGhpcy5zZXRVbml0KCksIGxhdGl0dWRlLCBsb25naXR1ZGUpLnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdFx0dGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcblx0XHRcdFx0dGhpcy5zZXRCY2dDb2xvcihkYXRhKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcG9zaXRpb247XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGNsZWFyV2VhdGhlcigpIHtcblx0XHRjb25zdCBtYWluQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQnKTtcblx0XHRjb25zdCBpbWdDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltZy1jYXJkJyk7XG5cblx0XHRtYWluQ2FyZC50ZXh0Q29udGVudCA9ICcnO1xuXHRcdGltZ0NhcmQudGV4dENvbnRlbnQgPSAnJztcblxuXHRcdGZ1bmN0aW9uIGNsZWFyVGV4dENvbnRlbnQoc2VsZWN0b3IpIHtcblx0XHRcdGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGVsZW0gPSBlbGVtZW50O1xuXHRcdFx0XHRlbGVtLnRleHRDb250ZW50ID0gJyc7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y2xlYXJUZXh0Q29udGVudCgnI3NlY29uZGFyeS1jYXJkIHNwYW4nKTtcblx0XHRjbGVhclRleHRDb250ZW50KCcjdG9tbW9yb3ctY2FyZCBwJyk7XG5cdFx0Y2xlYXJUZXh0Q29udGVudCgnI2FmdGVyLXRvbW1vcm93LWNhcmQgcCcpO1xuXHRcdGNsZWFyVGV4dENvbnRlbnQoJyNuZXh0LWNhcmQgcCcpO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlNYWluQ2FyZChkYXRhKSB7XG5cdFx0Y29uc3QgbWFpbkNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jYXJkJyk7XG5cblx0XHRjb25zdCBjaXR5Q291bnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblxuXHRcdGNpdHlDb3VudHJ5LnNldEF0dHJpYnV0ZSgnaWQnLCAnY2l0eS1jb3VudHJ5Jyk7XG5cdFx0dGVtcGVyYXR1cmUuc2V0QXR0cmlidXRlKCdpZCcsICd0ZW1wZXJhdHVyZScpO1xuXHRcdGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVzY3JpcHRpb24nKTtcblxuXHRcdGlmIChkYXRhLmNvdW50cnkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y2l0eUNvdW50cnkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNpdHl9LCAke2RhdGEuY291bnRyeX1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaXR5Q291bnRyeS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eX1gO1xuXHRcdH1cblx0XHR0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGAke2RhdGEudGVtcGVyYXR1cmV9YDtcblx0XHRkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke2RhdGEuZGVzY3JpcHRpb259YDtcblxuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGNpdHlDb3VudHJ5KTtcblx0XHRtYWluQ2FyZC5hcHBlbmRDaGlsZCh0ZW1wZXJhdHVyZSk7XG5cdFx0bWFpbkNhcmQuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlJbWdDYXJkKGRhdGEpIHtcblx0XHRjb25zdCBpbWdDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltZy1jYXJkJyk7XG5cdFx0Y29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0aW1nLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmljb259QDR4LnBuZ2A7XG5cdFx0aW1nLmFsdCA9IGRhdGEuZGVzY3JpcHRpb247XG5cdFx0aW1nQ2FyZC5hcHBlbmRDaGlsZChpbWcpO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlTZWNvbmRhcnlDYXJkKGRhdGEpIHtcblx0XHRjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVlbHMtbGlrZScpO1xuXHRcdGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2h1bWlkaXR5Jyk7XG5cdFx0Y29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpbmQtc3BlZWQnKTtcblx0XHRjb25zdCBwcmVzc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmVzc3VyZScpO1xuXG5cdFx0ZmVlbHNMaWtlLmFwcGVuZChgICR7ZGF0YS5mZWVsc0xpa2VUZW1wfWApO1xuXHRcdGh1bWlkaXR5LmFwcGVuZChgICR7ZGF0YS5odW1pZGl0eVBlcmNlbnR9YCk7XG5cdFx0d2luZFNwZWVkLmFwcGVuZChgICR7ZGF0YS53aW5kU3BlZWRVbml0fWApO1xuXHRcdHByZXNzdXJlLmFwcGVuZChgICR7ZGF0YS5wcmVzc3VyZVVuaXR9YCk7XG5cdH1cblxuXHRzdGF0aWMgZGlzcGxheUNhcmQoZGF0YSwgZGF5SW5kZXgsIGNhcmRJZCkge1xuXHRcdGNvbnN0IGRheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NhcmRJZH0gLmRheWApO1xuXHRcdGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjYXJkSWR9IC50ZW1wYCk7XG5cdFx0Y29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NhcmRJZH0gLmljb25gKTtcblxuXHRcdGRheS5hcHBlbmQoYCAke2RhdGEubmV4dERheXNbZGF5SW5kZXhdLmRheX1gKTtcblx0XHR0ZW1wLmFwcGVuZChgICR7ZGF0YS5uZXh0RGF5c1tkYXlJbmRleF0udGVtcH1gKTtcblxuXHRcdGljb24uc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGEubmV4dERheXNbZGF5SW5kZXhdLmljb259QDR4LnBuZ2A7XG5cdFx0aWNvbi5hbHQgPSBkYXRhLm5leHREYXlzW2RheUluZGV4XS5kZXNjcmlwdGlvbjtcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5V2VhdGhlcihkYXRhKSB7XG5cdFx0dGhpcy5kaXNwbGF5TWFpbkNhcmQoZGF0YSk7XG5cdFx0dGhpcy5kaXNwbGF5SW1nQ2FyZChkYXRhKTtcblx0XHR0aGlzLmRpc3BsYXlTZWNvbmRhcnlDYXJkKGRhdGEpO1xuXG5cdFx0dGhpcy5kaXNwbGF5Q2FyZChkYXRhLCAwLCAndG9tbW9yb3ctY2FyZCcpO1xuXHRcdHRoaXMuZGlzcGxheUNhcmQoZGF0YSwgMSwgJ2FmdGVyLXRvbW1vcm93LWNhcmQnKTtcblx0XHR0aGlzLmRpc3BsYXlDYXJkKGRhdGEsIDIsICduZXh0LWNhcmQnKTtcblx0fVxuXG5cdHN0YXRpYyBzZXRCY2dDb2xvcihkYXRhKSB7XG5cdFx0bGV0IHRlbXAgPSBkYXRhLnRlbXBlcmF0dXJlO1xuXG5cdFx0aWYgKGRhdGEudGVtcGVyYXR1cmUuaW5jbHVkZXMoJ8KwRicpKSB7XG5cdFx0XHRjb25zdCBzeXN0ZW0gPSAnbWV0cmljJztcblx0XHRcdHRlbXAgPSB0aGlzLmNvbnZlcnRUZW1wZXJhdHVyZShkYXRhLnRlbXBlcmF0dXJlLCBzeXN0ZW0pO1xuXHRcdH1cblxuXHRcdHRlbXAgPSBwYXJzZUludCh0ZW1wLCAxMCk7XG5cblx0XHRjb25zdCBtaW5UZW1wID0gMDtcblx0XHRjb25zdCBtYXhUZW1wID0gMzA7XG5cblx0XHRjb25zdCBtaW5Ic2wgPSAyMjA7XG5cdFx0Y29uc3QgbWF4SHNsID0gMDtcblxuXHRcdHRlbXAgPSB0ZW1wID4gbWF4VGVtcCA/IG1heFRlbXAgOiB0ZW1wO1xuXHRcdHRlbXAgPSB0ZW1wIDwgbWluVGVtcCA/IG1pblRlbXAgOiB0ZW1wO1xuXG5cdFx0Y29uc3QgcmFuZ2VUZW1wID0gbWF4VGVtcCAtIG1pblRlbXA7XG5cdFx0Y29uc3QgcmFuZ2VIc2wgPSBtYXhIc2wgLSBtaW5Ic2w7XG5cdFx0Y29uc3QgZGVnQ291bnQgPSBtYXhUZW1wIC0gdGVtcDtcblx0XHRjb25zdCBoc2xzRGVnID0gcmFuZ2VIc2wgLyByYW5nZVRlbXA7XG5cdFx0Y29uc3QgcmV0dXJuSHVlID0gMzYwIC0gKGRlZ0NvdW50ICogaHNsc0RlZyAtIChtYXhIc2wgLSAzNjApKTtcblxuXHRcdGNvbnN0IGNvbG9yID0gYGhzbCgke3JldHVybkh1ZX0sIDEwMCUsIDc1JSlgO1xuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG5cdH1cblxuXHRzdGF0aWMgYXR0YWNoTGlzdGVuZXJzKCkge1xuXHRcdGNvbnN0IHNhbXBsZUxvY2F0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzYW1wbGUtbG9jYXRpb25zJyk7XG5cdFx0Y29uc3QgdW5pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2UtdW5pdHMnKTtcblx0XHRjb25zdCBzZWFyY2hCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJveCcpO1xuXHRcdGNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYnRuJyk7XG5cdFx0Y29uc3QgZmluZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaW5kLWJ0bicpO1xuXG5cdFx0c2FtcGxlTG9jYXRpb25zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMucGlja0NpdHkoZSkpO1xuXHRcdHNlYXJjaEJveC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcblx0XHRzZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNlYXJjaENpdHkoKSk7XG5cdFx0ZmluZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuZmluZE1lKCkpO1xuXHRcdHVuaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZVVuaXQodW5pdEJ0bikpO1xuXHR9XG5cblx0c3RhdGljIHJ1bkFwcCgpIHtcblx0XHR0aGlzLmF0dGFjaExpc3RlbmVycygpO1xuXG5cdFx0dGhpcy5maW5kTWUoKTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJ25vcm1hbGl6ZS5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlL3N0eWxlLmNzcyc7XG5pbXBvcnQgVUkgZnJvbSAnLi9jb2RlL3VpJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFVJLnJ1bkFwcCgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==