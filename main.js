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

	static extractNextDays(data, system) {
		const days = [9, 17, 25];
		return days.map((index) => ({
			day: this.epochToDay(data.list[index].dt),
			temp: Math.round(data.list[index].main.temp_max) + this.addDegrees(system),
			icon: data.list[index].weather[0].icon,
		}));
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
		const api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=2871c88944b81fbab922d47012695ba3`;

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
		const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${system}&appid=2871c88944b81fbab922d47012695ba3`;

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

	static displayTommorowCard(data) {
		const day = document.querySelector('#tommorow-card #day');
		const temp = document.querySelector('#tommorow-card #temp');
		const icon = document.querySelector('#tommorow-card #icon');

		console.log(data);

		day.append(` ${data.nextDays[0].day}`);
		temp.append(` ${data.nextDays[0].temp}`);
		icon.append(` ${data.nextDays[0].icon}`);
	}

	static displayAfterTommorowCard(data) {
		const day = document.querySelector('#after-tommorow-card #day');
		const temp = document.querySelector('#after-tommorow-card #temp');
		const icon = document.querySelector('#after-tommorow-card #icon');

		console.log(data);

		day.append(` ${data.nextDays[1].day}`);
		temp.append(` ${data.nextDays[1].temp}`);
		icon.append(` ${data.nextDays[1].icon}`);
	}

	static displayNextCard(data) {
		const day = document.querySelector('#next-card #day');
		const temp = document.querySelector('#next-card #temp');
		const icon = document.querySelector('#next-card #icon');

		console.log(data);

		day.append(` ${data.nextDays[2].day}`);
		temp.append(` ${data.nextDays[2].temp}`);
		icon.append(` ${data.nextDays[2].icon}`);
	}

	static displayWeather(data) {
		this.displayMainCard(data);
		this.displayImgCard(data);
		this.displaySecondaryCard(data);

		this.displayTommorowCard(data);
		this.displayAfterTommorowCard(data);
		this.displayNextCard(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnVCO0FBQ0k7QUFDQTs7QUFFM0IsOENBQThDLGdEQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb2RlL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvdWkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpYyB7XG5cdHN0YXRpYyBhZGREZWdyZWVzKHN5c3RlbSkge1xuXHRcdHN3aXRjaCAoc3lzdGVtKSB7XG5cdFx0XHRjYXNlICdtZXRyaWMnOlxuXHRcdFx0XHRyZXR1cm4gJ8KwQyc7XG5cdFx0XHRjYXNlICdpbXBlcmlhbCc6XG5cdFx0XHRcdHJldHVybiAnwrBGJztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAnwrBDJztcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgd2luZFNwZWVkQ29udmVyc2lvbihzeXN0ZW0sIHdpbmRTcGVlZCkge1xuXHRcdGNvbnN0IG1ldHJpY1dpbmRTcGVlZCA9IE1hdGgucm91bmQod2luZFNwZWVkICogMy42KTtcblxuXHRcdHN3aXRjaCAoc3lzdGVtKSB7XG5cdFx0XHRjYXNlICdtZXRyaWMnOlxuXHRcdFx0XHRyZXR1cm4gYCR7bWV0cmljV2luZFNwZWVkfSBrbS9oYDtcblx0XHRcdGNhc2UgJ2ltcGVyaWFsJzpcblx0XHRcdFx0cmV0dXJuIGAke01hdGgucm91bmQod2luZFNwZWVkKX0gbXBoYDtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBgJHttZXRyaWNXaW5kU3BlZWR9IGttL2hgO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBleHRyYWN0RGF0YShkYXRhLCBzeXN0ZW0pIHtcblx0XHRjb25zdCB7XG5cdFx0XHRuYW1lOiBjaXR5LFxuXHRcdFx0c3lzOiB7IGNvdW50cnkgfSxcblx0XHRcdHdlYXRoZXI6IFt7IG1haW46IHdlYXRoZXIsIGRlc2NyaXB0aW9uLCBpY29uIH1dLFxuXHRcdFx0d2luZDogeyBzcGVlZDogd2luZFNwZWVkIH0sXG5cdFx0XHRtYWluOiB7IHRlbXAsIGZlZWxzX2xpa2U6IGZlZWxzTGlrZSwgcHJlc3N1cmUsIGh1bWlkaXR5IH0sXG5cdFx0XHRjb29yZDogeyBsYXQsIGxvbiB9LFxuXHRcdH0gPSBkYXRhO1xuXHRcdGNvbnN0IHRlbXBlcmF0dXJlID0gTWF0aC5yb3VuZCh0ZW1wKSArIHRoaXMuYWRkRGVncmVlcyhzeXN0ZW0pO1xuXHRcdGNvbnN0IGZlZWxzTGlrZVRlbXAgPSBNYXRoLnJvdW5kKGZlZWxzTGlrZSkgKyB0aGlzLmFkZERlZ3JlZXMoc3lzdGVtKTtcblx0XHRjb25zdCB3aW5kU3BlZWRVbml0ID0gdGhpcy53aW5kU3BlZWRDb252ZXJzaW9uKHN5c3RlbSwgd2luZFNwZWVkKTtcblx0XHRjb25zdCBwcmVzc3VyZVVuaXQgPSBgJHtwcmVzc3VyZX0gaFBhYDtcblx0XHRjb25zdCBodW1pZGl0eVBlcmNlbnQgPSBgJHtodW1pZGl0eX0lYDtcblxuXHRcdHJldHVybiB7IGNpdHksIGNvdW50cnksIGljb24sIHRlbXBlcmF0dXJlLCBmZWVsc0xpa2VUZW1wLCBodW1pZGl0eVBlcmNlbnQsIHdpbmRTcGVlZFVuaXQsIHByZXNzdXJlVW5pdCwgZGVzY3JpcHRpb24sIHdlYXRoZXIsIGxhdCwgbG9uIH07XG5cdH1cblxuXHRzdGF0aWMgZXBvY2hUb0RheShlcG9jaCkge1xuXHRcdGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShlcG9jaCAqIDEwMDApO1xuXHRcdGNvbnN0IGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG5cdFx0cmV0dXJuIGRheXNbZGF0ZS5nZXREYXkoKV07XG5cdH1cblxuXHRzdGF0aWMgZXh0cmFjdE5leHREYXlzKGRhdGEsIHN5c3RlbSkge1xuXHRcdGNvbnN0IGRheXMgPSBbOSwgMTcsIDI1XTtcblx0XHRyZXR1cm4gZGF5cy5tYXAoKGluZGV4KSA9PiAoe1xuXHRcdFx0ZGF5OiB0aGlzLmVwb2NoVG9EYXkoZGF0YS5saXN0W2luZGV4XS5kdCksXG5cdFx0XHR0ZW1wOiBNYXRoLnJvdW5kKGRhdGEubGlzdFtpbmRleF0ubWFpbi50ZW1wX21heCkgKyB0aGlzLmFkZERlZ3JlZXMoc3lzdGVtKSxcblx0XHRcdGljb246IGRhdGEubGlzdFtpbmRleF0ud2VhdGhlclswXS5pY29uLFxuXHRcdH0pKTtcblx0fVxuXG5cdHN0YXRpYyBhc3luYyBncmFiRGF0YUJ5Q2l0eShzeXN0ZW0sIGNpdHkpIHtcblx0XHRjb25zdCBhcGkgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPSR7c3lzdGVtfSZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM2A7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXMpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBDaXR5ICcke2NpdHl9JyBub3QgZm91bmRgKTtcblx0XHRcdGNvbnN0IGRhdGEgPSB0aGlzLmV4dHJhY3REYXRhKGF3YWl0IHJlc3BvbnNlLmpzb24oKSwgc3lzdGVtKTtcblxuXHRcdFx0Y29uc3QgbmV4dERheXMgPSBhd2FpdCB0aGlzLmdyYWJEYXRhTmV4dERheXMoc3lzdGVtLCBkYXRhLmxhdCwgZGF0YS5sb24pO1xuXHRcdFx0ZGF0YS5uZXh0RGF5cyA9IG5leHREYXlzO1xuXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhQnlQb3NpdGlvbihzeXN0ZW0sIGxhdCwgbG9uKSB7XG5cdFx0Y29uc3QgYXBpID0gYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvcmV2ZXJzZT9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mbGltaXQ9MSZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM2A7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pO1xuXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYExvY2FsaXphdGlvbiBub3QgZm91bmRgKTtcblx0XHRcdGxldCBjaXR5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y2l0eSA9IGNpdHlbMF0ubmFtZTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmdyYWJEYXRhQnlDaXR5KHN5c3RlbSwgY2l0eSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhTmV4dERheXMoc3lzdGVtLCBsYXQsIGxvbikge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mdW5pdHM9JHtzeXN0ZW19JmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzYDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYExvY2FsaXphdGlvbiBub3QgZm91bmRgKTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjb25zdCBuZXh0RGF5cyA9IHRoaXMuZXh0cmFjdE5leHREYXlzKGRhdGEsIHN5c3RlbSk7XG5cdFx0XHRyZXR1cm4gbmV4dERheXM7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG5cdHN0YXRpYyBzZXRVbml0KHN5c3RlbSkge1xuXHRcdGNvbnN0IHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzJyk7XG5cdFx0Y29uc3Qgc3lzdGVtVW5pdHMgPSB1bml0QnRuLnZhbHVlIHx8IHN5c3RlbSB8fCAnbWV0cmljJztcblx0XHR0aGlzLnVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpO1xuXHRcdHJldHVybiBzeXN0ZW1Vbml0cztcblx0fVxuXG5cdHN0YXRpYyB1cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKSB7XG5cdFx0Y29uc3QgbmV3dW5pdEJ0biA9IHVuaXRCdG47XG5cdFx0bmV3dW5pdEJ0bi52YWx1ZSA9IHN5c3RlbVVuaXRzO1xuXHRcdG5ld3VuaXRCdG4uaW5uZXJIVE1MID0gc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnID8gJzxiPsKwQzwvYj4gfCDCsEYnIDogJ8KwQyB8IDxiPsKwRjwvYj4nO1xuXHR9XG5cblx0c3RhdGljIHRvZ2dsZVVuaXQodW5pdEJ0bikge1xuXHRcdGNvbnN0IHN5c3RlbVVuaXRzID0gdW5pdEJ0bi5pbm5lckhUTUwuaW5jbHVkZXMoJzxiPsKwQzwvYj4nKSA/ICdpbXBlcmlhbCcgOiAnbWV0cmljJztcblx0XHR0aGlzLnVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpO1xuXHRcdHRoaXMucmVwbGFjZVVuaXRzKHN5c3RlbVVuaXRzKTtcblx0fVxuXG5cdHN0YXRpYyBjb252ZXJ0VGVtcGVyYXR1cmUodGVtcCwgc3lzdGVtVW5pdHMpIHtcblx0XHRsZXQgdGVtcE51bWJlciA9IHBhcnNlRmxvYXQodGVtcCk7XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnICYmIHRlbXAuaW5jbHVkZXMoJ8KwQycpKSB7XG5cdFx0XHR0ZW1wTnVtYmVyID0gTWF0aC5yb3VuZCgodGVtcE51bWJlciAqIDkpIC8gNSArIDMyKTtcblx0XHRcdHJldHVybiBgJHt0ZW1wTnVtYmVyfcKwRmA7XG5cdFx0fVxuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycgJiYgdGVtcC5pbmNsdWRlcygnwrBGJykpIHtcblx0XHRcdHRlbXBOdW1iZXIgPSBNYXRoLnJvdW5kKCgodGVtcE51bWJlciAtIDMyKSAqIDUpIC8gOSk7XG5cdFx0XHRyZXR1cm4gYCR7dGVtcE51bWJlcn3CsENgO1xuXHRcdH1cblx0XHRyZXR1cm4gdGVtcDtcblx0fVxuXG5cdHN0YXRpYyBjb252ZXJ0V2luZFNwZWVkKHNwZWVkLCBzeXN0ZW1Vbml0cykge1xuXHRcdGxldCBzcGVlZE51bWJlciA9IHBhcnNlRmxvYXQoc3BlZWQpO1xuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ2ltcGVyaWFsJyAmJiBzcGVlZC5pbmNsdWRlcygna20vaCcpKSB7XG5cdFx0XHRzcGVlZE51bWJlciA9IE1hdGgucm91bmQoc3BlZWROdW1iZXIgLyAxLjYwOTMpO1xuXHRcdFx0cmV0dXJuIGAke3NwZWVkTnVtYmVyfSBtcGhgO1xuXHRcdH1cblx0XHRpZiAoc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnICYmIHNwZWVkLmluY2x1ZGVzKCdtcGgnKSkge1xuXHRcdFx0c3BlZWROdW1iZXIgPSBNYXRoLnJvdW5kKHNwZWVkTnVtYmVyICogMS42MDkzKTtcblx0XHRcdHJldHVybiBgJHtzcGVlZE51bWJlcn0ga20vaGA7XG5cdFx0fVxuXHRcdHJldHVybiBzcGVlZDtcblx0fVxuXG5cdHN0YXRpYyByZXBsYWNlVW5pdHMoc3lzdGVtVW5pdHMpIHtcblx0XHRjb25zdCB0ZW1wZXJhdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jYXJkICN0ZW1wZXJhdHVyZScpO1xuXHRcdGNvbnN0IGZlZWxzTGlrZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2Vjb25kYXJ5LWNhcmQgI2ZlZWxzLWxpa2UnKTtcblx0XHRjb25zdCB3aW5kU3BlZWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY29uZGFyeS1jYXJkICN3aW5kLXNwZWVkJyk7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSB0ZW1wZXJhdHVyZUVsZW1lbnQudGV4dENvbnRlbnQ7XG5cdFx0Y29uc3QgZmVlbHNMaWtlID0gZmVlbHNMaWtlRWxlbWVudC50ZXh0Q29udGVudDtcblx0XHRjb25zdCB3aW5kU3BlZWQgPSB3aW5kU3BlZWRFbGVtZW50LnRleHRDb250ZW50O1xuXHRcdHRlbXBlcmF0dXJlRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuY29udmVydFRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlLCBzeXN0ZW1Vbml0cyk7XG5cdFx0ZmVlbHNMaWtlRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuY29udmVydFRlbXBlcmF0dXJlKGZlZWxzTGlrZSwgc3lzdGVtVW5pdHMpO1xuXHRcdHdpbmRTcGVlZEVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLmNvbnZlcnRXaW5kU3BlZWQod2luZFNwZWVkLCBzeXN0ZW1Vbml0cyk7XG5cdH1cblxuXHRzdGF0aWMgbG9hZGluZyh0b2dnbGUpIHtcblx0XHRjb25zdCBzcGlubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRpbmctc3Bpbm5lcicpO1xuXHRcdGNvbnN0IHdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VhdGhlci1jb250YWluZXInKTtcblxuXHRcdGlmICh0b2dnbGUpIHtcblx0XHRcdHdlYXRoZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdFx0c3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdFx0d2VhdGhlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHBpY2tDaXR5KGUpIHtcblx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4nKSkge1xuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGUudGFyZ2V0LnRleHRDb250ZW50KS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdHRoaXMuZGlzcGxheVdlYXRoZXIoZGF0YSk7XG5cdFx0XHRcdHRoaXMuc2V0QmNnQ29sb3IoZGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgc2VhcmNoQ2l0eSgpIHtcblx0XHRjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcblxuXHRcdGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUudHJpbSgpO1xuXHRcdGlmIChpbnB1dC52YWx1ZSAhPT0gJycpIHtcblx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0XHRMb2dpYy5ncmFiRGF0YUJ5Q2l0eSh0aGlzLnNldFVuaXQoKSwgaW5wdXQudmFsdWUpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXHRcdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcblx0XHRcdFx0XHR0aGlzLnNldEJjZ0NvbG9yKGRhdGEpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdFx0aW5wdXQudmFsdWUgPSAnJztcblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGZpbmRNZSgpIHtcblx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcG9zaXRpb24gPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocmVzb2x2ZSwgcmVqZWN0KTtcblx0XHRcdH0pO1xuXHRcdFx0Y29uc3QgeyBsYXRpdHVkZSB9ID0gcG9zaXRpb24uY29vcmRzO1xuXHRcdFx0Y29uc3QgeyBsb25naXR1ZGUgfSA9IHBvc2l0aW9uLmNvb3JkcztcblxuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeVBvc2l0aW9uKHRoaXMuc2V0VW5pdCgpLCBsYXRpdHVkZSwgbG9uZ2l0dWRlKS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdHRoaXMuZGlzcGxheVdlYXRoZXIoZGF0YSk7XG5cdFx0XHRcdHRoaXMuc2V0QmNnQ29sb3IoZGF0YSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHBvc2l0aW9uO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBjbGVhcldlYXRoZXIoKSB7XG5cdFx0Y29uc3QgbWFpbkNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jYXJkJyk7XG5cdFx0Y29uc3QgaW1nQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWctY2FyZCcpO1xuXG5cdFx0bWFpbkNhcmQudGV4dENvbnRlbnQgPSAnJztcblx0XHRpbWdDYXJkLnRleHRDb250ZW50ID0gJyc7XG5cblx0XHRmdW5jdGlvbiBjbGVhclRleHRDb250ZW50KHNlbGVjdG9yKSB7XG5cdFx0XHRjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0ZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBlbGVtID0gZWxlbWVudDtcblx0XHRcdFx0ZWxlbS50ZXh0Q29udGVudCA9ICcnO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGNsZWFyVGV4dENvbnRlbnQoJyNzZWNvbmRhcnktY2FyZCBzcGFuJyk7XG5cdFx0Y2xlYXJUZXh0Q29udGVudCgnI3RvbW1vcm93LWNhcmQgcCcpO1xuXHRcdGNsZWFyVGV4dENvbnRlbnQoJyNhZnRlci10b21tb3Jvdy1jYXJkIHAnKTtcblx0XHRjbGVhclRleHRDb250ZW50KCcjbmV4dC1jYXJkIHAnKTtcblxuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlNYWluQ2FyZChkYXRhKSB7XG5cdFx0Y29uc3QgbWFpbkNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jYXJkJyk7XG5cblx0XHRjb25zdCBjaXR5Q291bnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblxuXHRcdGNpdHlDb3VudHJ5LnNldEF0dHJpYnV0ZSgnaWQnLCAnY2l0eS1jb3VudHJ5Jyk7XG5cdFx0dGVtcGVyYXR1cmUuc2V0QXR0cmlidXRlKCdpZCcsICd0ZW1wZXJhdHVyZScpO1xuXHRcdGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVzY3JpcHRpb24nKTtcblxuXHRcdGlmIChkYXRhLmNvdW50cnkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y2l0eUNvdW50cnkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNpdHl9LCAke2RhdGEuY291bnRyeX1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaXR5Q291bnRyeS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eX1gO1xuXHRcdH1cblx0XHR0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGAke2RhdGEudGVtcGVyYXR1cmV9YDtcblx0XHRkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke2RhdGEuZGVzY3JpcHRpb259YDtcblxuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGNpdHlDb3VudHJ5KTtcblx0XHRtYWluQ2FyZC5hcHBlbmRDaGlsZCh0ZW1wZXJhdHVyZSk7XG5cdFx0bWFpbkNhcmQuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlJbWdDYXJkKGRhdGEpIHtcblx0XHRjb25zdCBpbWdDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltZy1jYXJkJyk7XG5cdFx0Y29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0aW1nLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmljb259QDR4LnBuZ2A7XG5cdFx0aW1nLmFsdCA9IGRhdGEuZGVzY3JpcHRpb247XG5cdFx0aW1nQ2FyZC5hcHBlbmRDaGlsZChpbWcpO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlTZWNvbmRhcnlDYXJkKGRhdGEpIHtcblx0XHRjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVlbHMtbGlrZScpO1xuXHRcdGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2h1bWlkaXR5Jyk7XG5cdFx0Y29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpbmQtc3BlZWQnKTtcblx0XHRjb25zdCBwcmVzc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmVzc3VyZScpO1xuXG5cdFx0ZmVlbHNMaWtlLmFwcGVuZChgICR7ZGF0YS5mZWVsc0xpa2VUZW1wfWApO1xuXHRcdGh1bWlkaXR5LmFwcGVuZChgICR7ZGF0YS5odW1pZGl0eVBlcmNlbnR9YCk7XG5cdFx0d2luZFNwZWVkLmFwcGVuZChgICR7ZGF0YS53aW5kU3BlZWRVbml0fWApO1xuXHRcdHByZXNzdXJlLmFwcGVuZChgICR7ZGF0YS5wcmVzc3VyZVVuaXR9YCk7XG5cdH1cblxuXHRzdGF0aWMgZGlzcGxheVRvbW1vcm93Q2FyZChkYXRhKSB7XG5cdFx0Y29uc3QgZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvbW1vcm93LWNhcmQgI2RheScpO1xuXHRcdGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9tbW9yb3ctY2FyZCAjdGVtcCcpO1xuXHRcdGNvbnN0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9tbW9yb3ctY2FyZCAjaWNvbicpO1xuXG5cdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cblx0XHRkYXkuYXBwZW5kKGAgJHtkYXRhLm5leHREYXlzWzBdLmRheX1gKTtcblx0XHR0ZW1wLmFwcGVuZChgICR7ZGF0YS5uZXh0RGF5c1swXS50ZW1wfWApO1xuXHRcdGljb24uYXBwZW5kKGAgJHtkYXRhLm5leHREYXlzWzBdLmljb259YCk7XG5cdH1cblxuXHRzdGF0aWMgZGlzcGxheUFmdGVyVG9tbW9yb3dDYXJkKGRhdGEpIHtcblx0XHRjb25zdCBkYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWZ0ZXItdG9tbW9yb3ctY2FyZCAjZGF5Jyk7XG5cdFx0Y29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZnRlci10b21tb3Jvdy1jYXJkICN0ZW1wJyk7XG5cdFx0Y29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZnRlci10b21tb3Jvdy1jYXJkICNpY29uJyk7XG5cblx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblxuXHRcdGRheS5hcHBlbmQoYCAke2RhdGEubmV4dERheXNbMV0uZGF5fWApO1xuXHRcdHRlbXAuYXBwZW5kKGAgJHtkYXRhLm5leHREYXlzWzFdLnRlbXB9YCk7XG5cdFx0aWNvbi5hcHBlbmQoYCAke2RhdGEubmV4dERheXNbMV0uaWNvbn1gKTtcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5TmV4dENhcmQoZGF0YSkge1xuXHRcdGNvbnN0IGRheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0LWNhcmQgI2RheScpO1xuXHRcdGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dC1jYXJkICN0ZW1wJyk7XG5cdFx0Y29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0LWNhcmQgI2ljb24nKTtcblxuXHRcdGNvbnNvbGUubG9nKGRhdGEpO1xuXG5cdFx0ZGF5LmFwcGVuZChgICR7ZGF0YS5uZXh0RGF5c1syXS5kYXl9YCk7XG5cdFx0dGVtcC5hcHBlbmQoYCAke2RhdGEubmV4dERheXNbMl0udGVtcH1gKTtcblx0XHRpY29uLmFwcGVuZChgICR7ZGF0YS5uZXh0RGF5c1syXS5pY29ufWApO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlXZWF0aGVyKGRhdGEpIHtcblx0XHR0aGlzLmRpc3BsYXlNYWluQ2FyZChkYXRhKTtcblx0XHR0aGlzLmRpc3BsYXlJbWdDYXJkKGRhdGEpO1xuXHRcdHRoaXMuZGlzcGxheVNlY29uZGFyeUNhcmQoZGF0YSk7XG5cblx0XHR0aGlzLmRpc3BsYXlUb21tb3Jvd0NhcmQoZGF0YSk7XG5cdFx0dGhpcy5kaXNwbGF5QWZ0ZXJUb21tb3Jvd0NhcmQoZGF0YSk7XG5cdFx0dGhpcy5kaXNwbGF5TmV4dENhcmQoZGF0YSk7XG5cdH1cblxuXHRzdGF0aWMgc2V0QmNnQ29sb3IoZGF0YSkge1xuXHRcdGxldCB0ZW1wID0gZGF0YS50ZW1wZXJhdHVyZTtcblxuXHRcdGlmIChkYXRhLnRlbXBlcmF0dXJlLmluY2x1ZGVzKCfCsEYnKSkge1xuXHRcdFx0Y29uc3Qgc3lzdGVtID0gJ21ldHJpYyc7XG5cdFx0XHR0ZW1wID0gdGhpcy5jb252ZXJ0VGVtcGVyYXR1cmUoZGF0YS50ZW1wZXJhdHVyZSwgc3lzdGVtKTtcblx0XHR9XG5cblx0XHR0ZW1wID0gcGFyc2VJbnQodGVtcCwgMTApO1xuXG5cdFx0Y29uc3QgbWluVGVtcCA9IDA7XG5cdFx0Y29uc3QgbWF4VGVtcCA9IDMwO1xuXG5cdFx0Y29uc3QgbWluSHNsID0gMjIwO1xuXHRcdGNvbnN0IG1heEhzbCA9IDA7XG5cblx0XHR0ZW1wID0gdGVtcCA+IG1heFRlbXAgPyBtYXhUZW1wIDogdGVtcDtcblx0XHR0ZW1wID0gdGVtcCA8IG1pblRlbXAgPyBtaW5UZW1wIDogdGVtcDtcblxuXHRcdGNvbnN0IHJhbmdlVGVtcCA9IG1heFRlbXAgLSBtaW5UZW1wO1xuXHRcdGNvbnN0IHJhbmdlSHNsID0gbWF4SHNsIC0gbWluSHNsO1xuXHRcdGNvbnN0IGRlZ0NvdW50ID0gbWF4VGVtcCAtIHRlbXA7XG5cdFx0Y29uc3QgaHNsc0RlZyA9IHJhbmdlSHNsIC8gcmFuZ2VUZW1wO1xuXHRcdGNvbnN0IHJldHVybkh1ZSA9IDM2MCAtIChkZWdDb3VudCAqIGhzbHNEZWcgLSAobWF4SHNsIC0gMzYwKSk7XG5cblx0XHRjb25zdCBjb2xvciA9IGBoc2woJHtyZXR1cm5IdWV9LCAxMDAlLCA3NSUpYDtcblx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuXHR9XG5cblx0c3RhdGljIGF0dGFjaExpc3RlbmVycygpIHtcblx0XHRjb25zdCBzYW1wbGVMb2NhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FtcGxlLWxvY2F0aW9ucycpO1xuXHRcdGNvbnN0IHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzJyk7XG5cdFx0Y29uc3Qgc2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1ib3gnKTtcblx0XHRjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ0bicpO1xuXHRcdGNvbnN0IGZpbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmluZC1idG4nKTtcblxuXHRcdHNhbXBsZUxvY2F0aW9ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnBpY2tDaXR5KGUpKTtcblx0XHRzZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cdFx0c2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZWFyY2hDaXR5KCkpO1xuXHRcdGZpbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmZpbmRNZSgpKTtcblx0XHR1bml0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVVbml0KHVuaXRCdG4pKTtcblx0fVxuXG5cdHN0YXRpYyBydW5BcHAoKSB7XG5cdFx0dGhpcy5hdHRhY2hMaXN0ZW5lcnMoKTtcblxuXHRcdHRoaXMuZmluZE1lKCk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdub3JtYWxpemUuY3NzJztcbmltcG9ydCAnLi9zdHlsZS9zdHlsZS5jc3MnO1xuaW1wb3J0IFVJIGZyb20gJy4vY29kZS91aSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5ydW5BcHAoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=