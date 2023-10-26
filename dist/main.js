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
		} = data;
		const temperature = Math.round(temp) + this.addDegrees(system);
		const feelsLikeTemp = Math.round(feelsLike) + this.addDegrees(system);
		const windSpeedUnit = this.windSpeedConversion(system, windSpeed);
		const pressureUnit = `${pressure} hPa`;
		const humidityPercent = `${humidity}%`;

		return { city, country, icon, temperature, feelsLikeTemp, humidityPercent, windSpeedUnit, pressureUnit, description, weather };
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

			return data;
		} catch (error) {
			alert(error);
			return null;
		}
	}

	static async grabDataByPosition(system, lat, lon) {
		const api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await new Promise((resolve, reject) => {
				setTimeout(async () => {
					try {
						const res = await fetch(api, { mode: 'cors' });
						resolve(res);
					} catch (error) {
						reject(error);
					}
				}, 0);
			});

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
		const secondaryCardSpans = document.querySelectorAll('#secondary-card span');

		mainCard.textContent = '';
		imgCard.textContent = '';
		secondaryCardSpans.forEach((param) => {
			const span = param;
			span.textContent = '';
		});
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

	// static displayTommorowCard(data) {
	// const tommorowCard = document.querySelector('#tommorow-card');
	// const afterTommorowCard = document.querySelector('#after-tommorow-card');
	// const nextAfterTommorowCard = document.querySelector('#next-after-tommorow-card');

	// weather.appendChild(tommorowCard);
	// weather.appendChild(afterTommorowCard);
	// weather.appendChild(nextAfterTommorowCard);
	// }

	static displayWeather(data) {
		this.displayMainCard(data);
		this.displayImgCard(data);
		this.displaySecondaryCard(data);
		// this.displayTommorowCard(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsbUJBQW1CO0FBQzFDLHNCQUFzQixxQkFBcUI7QUFDM0MsdUJBQXVCLG1CQUFtQjtBQUMxQyxzQkFBc0Isa0JBQWtCO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsVUFBVTtBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN0UEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnVCO0FBQ0k7QUFDQTs7QUFFM0IsOENBQThDLGdEQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb2RlL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvdWkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpYyB7XG5cdHN0YXRpYyBhZGREZWdyZWVzKHN5c3RlbSkge1xuXHRcdHN3aXRjaCAoc3lzdGVtKSB7XG5cdFx0XHRjYXNlICdtZXRyaWMnOlxuXHRcdFx0XHRyZXR1cm4gJ8KwQyc7XG5cdFx0XHRjYXNlICdpbXBlcmlhbCc6XG5cdFx0XHRcdHJldHVybiAnwrBGJztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAnwrBDJztcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgd2luZFNwZWVkQ29udmVyc2lvbihzeXN0ZW0sIHdpbmRTcGVlZCkge1xuXHRcdGNvbnN0IG1ldHJpY1dpbmRTcGVlZCA9IE1hdGgucm91bmQod2luZFNwZWVkICogMy42KTtcblxuXHRcdHN3aXRjaCAoc3lzdGVtKSB7XG5cdFx0XHRjYXNlICdtZXRyaWMnOlxuXHRcdFx0XHRyZXR1cm4gYCR7bWV0cmljV2luZFNwZWVkfSBrbS9oYDtcblx0XHRcdGNhc2UgJ2ltcGVyaWFsJzpcblx0XHRcdFx0cmV0dXJuIGAke01hdGgucm91bmQod2luZFNwZWVkKX0gbXBoYDtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBgJHttZXRyaWNXaW5kU3BlZWR9IGttL2hgO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBleHRyYWN0RGF0YShkYXRhLCBzeXN0ZW0pIHtcblx0XHRjb25zdCB7XG5cdFx0XHRuYW1lOiBjaXR5LFxuXHRcdFx0c3lzOiB7IGNvdW50cnkgfSxcblx0XHRcdHdlYXRoZXI6IFt7IG1haW46IHdlYXRoZXIsIGRlc2NyaXB0aW9uLCBpY29uIH1dLFxuXHRcdFx0d2luZDogeyBzcGVlZDogd2luZFNwZWVkIH0sXG5cdFx0XHRtYWluOiB7IHRlbXAsIGZlZWxzX2xpa2U6IGZlZWxzTGlrZSwgcHJlc3N1cmUsIGh1bWlkaXR5IH0sXG5cdFx0fSA9IGRhdGE7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKHRlbXApICsgdGhpcy5hZGREZWdyZWVzKHN5c3RlbSk7XG5cdFx0Y29uc3QgZmVlbHNMaWtlVGVtcCA9IE1hdGgucm91bmQoZmVlbHNMaWtlKSArIHRoaXMuYWRkRGVncmVlcyhzeXN0ZW0pO1xuXHRcdGNvbnN0IHdpbmRTcGVlZFVuaXQgPSB0aGlzLndpbmRTcGVlZENvbnZlcnNpb24oc3lzdGVtLCB3aW5kU3BlZWQpO1xuXHRcdGNvbnN0IHByZXNzdXJlVW5pdCA9IGAke3ByZXNzdXJlfSBoUGFgO1xuXHRcdGNvbnN0IGh1bWlkaXR5UGVyY2VudCA9IGAke2h1bWlkaXR5fSVgO1xuXG5cdFx0cmV0dXJuIHsgY2l0eSwgY291bnRyeSwgaWNvbiwgdGVtcGVyYXR1cmUsIGZlZWxzTGlrZVRlbXAsIGh1bWlkaXR5UGVyY2VudCwgd2luZFNwZWVkVW5pdCwgcHJlc3N1cmVVbml0LCBkZXNjcmlwdGlvbiwgd2VhdGhlciB9O1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhQnlDaXR5KHN5c3RlbSwgY2l0eSkge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9JHtzeXN0ZW19JmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzYDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlcyk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCAxMDAwKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYENpdHkgJyR7Y2l0eX0nIG5vdCBmb3VuZGApO1xuXHRcdFx0Y29uc3QgZGF0YSA9IHRoaXMuZXh0cmFjdERhdGEoYXdhaXQgcmVzcG9uc2UuanNvbigpLCBzeXN0ZW0pO1xuXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhQnlQb3NpdGlvbihzeXN0ZW0sIGxhdCwgbG9uKSB7XG5cdFx0Y29uc3QgYXBpID0gYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvcmV2ZXJzZT9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mbGltaXQ9MSZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM2A7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXMpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgMCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGl6YXRpb24gbm90IGZvdW5kYCk7XG5cdFx0XHRsZXQgY2l0eSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNpdHkgPSBjaXR5WzBdLm5hbWU7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5ncmFiRGF0YUJ5Q2l0eShzeXN0ZW0sIGNpdHkpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG5cdHN0YXRpYyBzZXRVbml0KHN5c3RlbSkge1xuXHRcdGNvbnN0IHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzJyk7XG5cdFx0Y29uc3Qgc3lzdGVtVW5pdHMgPSB1bml0QnRuLnZhbHVlIHx8IHN5c3RlbSB8fCAnbWV0cmljJztcblx0XHR0aGlzLnVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpO1xuXHRcdHJldHVybiBzeXN0ZW1Vbml0cztcblx0fVxuXG5cdHN0YXRpYyB1cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKSB7XG5cdFx0Y29uc3QgbmV3dW5pdEJ0biA9IHVuaXRCdG47XG5cdFx0bmV3dW5pdEJ0bi52YWx1ZSA9IHN5c3RlbVVuaXRzO1xuXHRcdG5ld3VuaXRCdG4uaW5uZXJIVE1MID0gc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnID8gJzxiPsKwQzwvYj4gfCDCsEYnIDogJ8KwQyB8IDxiPsKwRjwvYj4nO1xuXHR9XG5cblx0c3RhdGljIHRvZ2dsZVVuaXQodW5pdEJ0bikge1xuXHRcdGNvbnN0IHN5c3RlbVVuaXRzID0gdW5pdEJ0bi5pbm5lckhUTUwuaW5jbHVkZXMoJzxiPsKwQzwvYj4nKSA/ICdpbXBlcmlhbCcgOiAnbWV0cmljJztcblx0XHR0aGlzLnVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpO1xuXHRcdHRoaXMucmVwbGFjZVVuaXRzKHN5c3RlbVVuaXRzKTtcblx0fVxuXG5cdHN0YXRpYyBjb252ZXJ0VGVtcGVyYXR1cmUodGVtcCwgc3lzdGVtVW5pdHMpIHtcblx0XHRsZXQgdGVtcE51bWJlciA9IHBhcnNlRmxvYXQodGVtcCk7XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnICYmIHRlbXAuaW5jbHVkZXMoJ8KwQycpKSB7XG5cdFx0XHR0ZW1wTnVtYmVyID0gTWF0aC5yb3VuZCgodGVtcE51bWJlciAqIDkpIC8gNSArIDMyKTtcblx0XHRcdHJldHVybiBgJHt0ZW1wTnVtYmVyfcKwRmA7XG5cdFx0fVxuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycgJiYgdGVtcC5pbmNsdWRlcygnwrBGJykpIHtcblx0XHRcdHRlbXBOdW1iZXIgPSBNYXRoLnJvdW5kKCgodGVtcE51bWJlciAtIDMyKSAqIDUpIC8gOSk7XG5cdFx0XHRyZXR1cm4gYCR7dGVtcE51bWJlcn3CsENgO1xuXHRcdH1cblx0XHRyZXR1cm4gdGVtcDtcblx0fVxuXG5cdHN0YXRpYyBjb252ZXJ0V2luZFNwZWVkKHNwZWVkLCBzeXN0ZW1Vbml0cykge1xuXHRcdGxldCBzcGVlZE51bWJlciA9IHBhcnNlRmxvYXQoc3BlZWQpO1xuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ2ltcGVyaWFsJyAmJiBzcGVlZC5pbmNsdWRlcygna20vaCcpKSB7XG5cdFx0XHRzcGVlZE51bWJlciA9IE1hdGgucm91bmQoc3BlZWROdW1iZXIgLyAxLjYwOTMpO1xuXHRcdFx0cmV0dXJuIGAke3NwZWVkTnVtYmVyfSBtcGhgO1xuXHRcdH1cblx0XHRpZiAoc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnICYmIHNwZWVkLmluY2x1ZGVzKCdtcGgnKSkge1xuXHRcdFx0c3BlZWROdW1iZXIgPSBNYXRoLnJvdW5kKHNwZWVkTnVtYmVyICogMS42MDkzKTtcblx0XHRcdHJldHVybiBgJHtzcGVlZE51bWJlcn0ga20vaGA7XG5cdFx0fVxuXHRcdHJldHVybiBzcGVlZDtcblx0fVxuXG5cdHN0YXRpYyByZXBsYWNlVW5pdHMoc3lzdGVtVW5pdHMpIHtcblx0XHRjb25zdCB0ZW1wZXJhdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jYXJkICN0ZW1wZXJhdHVyZScpO1xuXHRcdGNvbnN0IGZlZWxzTGlrZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2Vjb25kYXJ5LWNhcmQgI2ZlZWxzLWxpa2UnKTtcblx0XHRjb25zdCB3aW5kU3BlZWRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY29uZGFyeS1jYXJkICN3aW5kLXNwZWVkJyk7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSB0ZW1wZXJhdHVyZUVsZW1lbnQudGV4dENvbnRlbnQ7XG5cdFx0Y29uc3QgZmVlbHNMaWtlID0gZmVlbHNMaWtlRWxlbWVudC50ZXh0Q29udGVudDtcblx0XHRjb25zdCB3aW5kU3BlZWQgPSB3aW5kU3BlZWRFbGVtZW50LnRleHRDb250ZW50O1xuXHRcdHRlbXBlcmF0dXJlRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuY29udmVydFRlbXBlcmF0dXJlKHRlbXBlcmF0dXJlLCBzeXN0ZW1Vbml0cyk7XG5cdFx0ZmVlbHNMaWtlRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuY29udmVydFRlbXBlcmF0dXJlKGZlZWxzTGlrZSwgc3lzdGVtVW5pdHMpO1xuXHRcdHdpbmRTcGVlZEVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLmNvbnZlcnRXaW5kU3BlZWQod2luZFNwZWVkLCBzeXN0ZW1Vbml0cyk7XG5cdH1cblxuXHRzdGF0aWMgbG9hZGluZyh0b2dnbGUpIHtcblx0XHRjb25zdCBzcGlubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRpbmctc3Bpbm5lcicpO1xuXHRcdGNvbnN0IHdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VhdGhlci1jb250YWluZXInKTtcblxuXHRcdGlmICh0b2dnbGUpIHtcblx0XHRcdHdlYXRoZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdFx0c3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdFx0d2VhdGhlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHBpY2tDaXR5KGUpIHtcblx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4nKSkge1xuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGUudGFyZ2V0LnRleHRDb250ZW50KS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdHRoaXMuZGlzcGxheVdlYXRoZXIoZGF0YSk7XG5cdFx0XHRcdHRoaXMuc2V0QmNnQ29sb3IoZGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgc2VhcmNoQ2l0eSgpIHtcblx0XHRjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcblxuXHRcdGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUudHJpbSgpO1xuXHRcdGlmIChpbnB1dC52YWx1ZSAhPT0gJycpIHtcblx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0XHRMb2dpYy5ncmFiRGF0YUJ5Q2l0eSh0aGlzLnNldFVuaXQoKSwgaW5wdXQudmFsdWUpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXHRcdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcblx0XHRcdFx0XHR0aGlzLnNldEJjZ0NvbG9yKGRhdGEpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdFx0aW5wdXQudmFsdWUgPSAnJztcblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGZpbmRNZSgpIHtcblx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcG9zaXRpb24gPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocmVzb2x2ZSwgcmVqZWN0KTtcblx0XHRcdH0pO1xuXHRcdFx0Y29uc3QgeyBsYXRpdHVkZSB9ID0gcG9zaXRpb24uY29vcmRzO1xuXHRcdFx0Y29uc3QgeyBsb25naXR1ZGUgfSA9IHBvc2l0aW9uLmNvb3JkcztcblxuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeVBvc2l0aW9uKHRoaXMuc2V0VW5pdCgpLCBsYXRpdHVkZSwgbG9uZ2l0dWRlKS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdHRoaXMuZGlzcGxheVdlYXRoZXIoZGF0YSk7XG5cdFx0XHRcdHRoaXMuc2V0QmNnQ29sb3IoZGF0YSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHBvc2l0aW9uO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBjbGVhcldlYXRoZXIoKSB7XG5cdFx0Y29uc3QgbWFpbkNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jYXJkJyk7XG5cdFx0Y29uc3QgaW1nQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWctY2FyZCcpO1xuXHRcdGNvbnN0IHNlY29uZGFyeUNhcmRTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzZWNvbmRhcnktY2FyZCBzcGFuJyk7XG5cblx0XHRtYWluQ2FyZC50ZXh0Q29udGVudCA9ICcnO1xuXHRcdGltZ0NhcmQudGV4dENvbnRlbnQgPSAnJztcblx0XHRzZWNvbmRhcnlDYXJkU3BhbnMuZm9yRWFjaCgocGFyYW0pID0+IHtcblx0XHRcdGNvbnN0IHNwYW4gPSBwYXJhbTtcblx0XHRcdHNwYW4udGV4dENvbnRlbnQgPSAnJztcblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5TWFpbkNhcmQoZGF0YSkge1xuXHRcdGNvbnN0IG1haW5DYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tY2FyZCcpO1xuXG5cdFx0Y29uc3QgY2l0eUNvdW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblx0XHRjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG5cblx0XHRjaXR5Q291bnRyeS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NpdHktY291bnRyeScpO1xuXHRcdHRlbXBlcmF0dXJlLnNldEF0dHJpYnV0ZSgnaWQnLCAndGVtcGVyYXR1cmUnKTtcblx0XHRkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rlc2NyaXB0aW9uJyk7XG5cblx0XHRpZiAoZGF0YS5jb3VudHJ5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGNpdHlDb3VudHJ5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jaXR5fSwgJHtkYXRhLmNvdW50cnl9YDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2l0eUNvdW50cnkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNpdHl9YDtcblx0XHR9XG5cdFx0dGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBgJHtkYXRhLnRlbXBlcmF0dXJlfWA7XG5cdFx0ZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHtkYXRhLmRlc2NyaXB0aW9ufWA7XG5cblx0XHRtYWluQ2FyZC5hcHBlbmRDaGlsZChjaXR5Q291bnRyeSk7XG5cdFx0bWFpbkNhcmQuYXBwZW5kQ2hpbGQodGVtcGVyYXR1cmUpO1xuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5SW1nQ2FyZChkYXRhKSB7XG5cdFx0Y29uc3QgaW1nQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWctY2FyZCcpO1xuXHRcdGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdGltZy5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS5pY29ufUA0eC5wbmdgO1xuXHRcdGltZy5hbHQgPSBkYXRhLmRlc2NyaXB0aW9uO1xuXHRcdGltZ0NhcmQuYXBwZW5kQ2hpbGQoaW1nKTtcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5U2Vjb25kYXJ5Q2FyZChkYXRhKSB7XG5cdFx0Y29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZlZWxzLWxpa2UnKTtcblx0XHRjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNodW1pZGl0eScpO1xuXHRcdGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3aW5kLXNwZWVkJyk7XG5cdFx0Y29uc3QgcHJlc3N1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJlc3N1cmUnKTtcblxuXHRcdGZlZWxzTGlrZS5hcHBlbmQoYCAke2RhdGEuZmVlbHNMaWtlVGVtcH1gKTtcblx0XHRodW1pZGl0eS5hcHBlbmQoYCAke2RhdGEuaHVtaWRpdHlQZXJjZW50fWApO1xuXHRcdHdpbmRTcGVlZC5hcHBlbmQoYCAke2RhdGEud2luZFNwZWVkVW5pdH1gKTtcblx0XHRwcmVzc3VyZS5hcHBlbmQoYCAke2RhdGEucHJlc3N1cmVVbml0fWApO1xuXHR9XG5cblx0Ly8gc3RhdGljIGRpc3BsYXlUb21tb3Jvd0NhcmQoZGF0YSkge1xuXHQvLyBjb25zdCB0b21tb3Jvd0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9tbW9yb3ctY2FyZCcpO1xuXHQvLyBjb25zdCBhZnRlclRvbW1vcm93Q2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZnRlci10b21tb3Jvdy1jYXJkJyk7XG5cdC8vIGNvbnN0IG5leHRBZnRlclRvbW1vcm93Q2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0LWFmdGVyLXRvbW1vcm93LWNhcmQnKTtcblxuXHQvLyB3ZWF0aGVyLmFwcGVuZENoaWxkKHRvbW1vcm93Q2FyZCk7XG5cdC8vIHdlYXRoZXIuYXBwZW5kQ2hpbGQoYWZ0ZXJUb21tb3Jvd0NhcmQpO1xuXHQvLyB3ZWF0aGVyLmFwcGVuZENoaWxkKG5leHRBZnRlclRvbW1vcm93Q2FyZCk7XG5cdC8vIH1cblxuXHRzdGF0aWMgZGlzcGxheVdlYXRoZXIoZGF0YSkge1xuXHRcdHRoaXMuZGlzcGxheU1haW5DYXJkKGRhdGEpO1xuXHRcdHRoaXMuZGlzcGxheUltZ0NhcmQoZGF0YSk7XG5cdFx0dGhpcy5kaXNwbGF5U2Vjb25kYXJ5Q2FyZChkYXRhKTtcblx0XHQvLyB0aGlzLmRpc3BsYXlUb21tb3Jvd0NhcmQoZGF0YSk7XG5cdH1cblxuXHRzdGF0aWMgc2V0QmNnQ29sb3IoZGF0YSkge1xuXHRcdGxldCB0ZW1wID0gcGFyc2VJbnQoZGF0YS50ZW1wZXJhdHVyZSwgMTApO1xuXHRcdGNvbnN0IG1pblRlbXAgPSAwO1xuXHRcdGNvbnN0IG1heFRlbXAgPSAzMDtcblxuXHRcdGNvbnN0IG1pbkhzbCA9IDIyMDtcblx0XHRjb25zdCBtYXhIc2wgPSAwO1xuXG5cdFx0dGVtcCA9IHRlbXAgPiBtYXhUZW1wID8gbWF4VGVtcCA6IHRlbXA7XG5cdFx0dGVtcCA9IHRlbXAgPCBtaW5UZW1wID8gbWluVGVtcCA6IHRlbXA7XG5cblx0XHRjb25zdCByYW5nZVRlbXAgPSBtYXhUZW1wIC0gbWluVGVtcDtcblx0XHRjb25zdCByYW5nZUhzbCA9IG1heEhzbCAtIG1pbkhzbDtcblx0XHRjb25zdCBkZWdDb3VudCA9IG1heFRlbXAgLSB0ZW1wO1xuXHRcdGNvbnN0IGhzbHNEZWcgPSByYW5nZUhzbCAvIHJhbmdlVGVtcDtcblx0XHRjb25zdCByZXR1cm5IdWUgPSAzNjAgLSAoZGVnQ291bnQgKiBoc2xzRGVnIC0gKG1heEhzbCAtIDM2MCkpO1xuXG5cdFx0Y29uc3QgY29sb3IgPSBgaHNsKCR7cmV0dXJuSHVlfSwgMTAwJSwgNzUlKWA7XG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcblx0fVxuXG5cdHN0YXRpYyBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cdFx0Y29uc3Qgc2FtcGxlTG9jYXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhbXBsZS1sb2NhdGlvbnMnKTtcblx0XHRjb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZS11bml0cycpO1xuXHRcdGNvbnN0IHNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYm94Jyk7XG5cdFx0Y29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idG4nKTtcblx0XHRjb25zdCBmaW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbmQtYnRuJyk7XG5cblx0XHRzYW1wbGVMb2NhdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5waWNrQ2l0eShlKSk7XG5cdFx0c2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXHRcdHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VhcmNoQ2l0eSgpKTtcblx0XHRmaW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5maW5kTWUoKSk7XG5cdFx0dW5pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlVW5pdCh1bml0QnRuKSk7XG5cdH1cblxuXHRzdGF0aWMgcnVuQXBwKCkge1xuXHRcdHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG5cblx0XHR0aGlzLmZpbmRNZSgpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnbm9ybWFsaXplLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuY3NzJztcbmltcG9ydCBVSSBmcm9tICcuL2NvZGUvdWknO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVUkucnVuQXBwKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9