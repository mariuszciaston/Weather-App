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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O1VDaE1BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ051QjtBQUNJO0FBQ0E7O0FBRTNCLDhDQUE4QyxnREFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29kZS9sb2dpYy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb2RlL3VpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naWMge1xuXHRzdGF0aWMgYWRkRGVncmVlcyhzeXN0ZW0pIHtcblx0XHRzd2l0Y2ggKHN5c3RlbSkge1xuXHRcdFx0Y2FzZSAnbWV0cmljJzpcblx0XHRcdFx0cmV0dXJuICfCsEMnO1xuXHRcdFx0Y2FzZSAnaW1wZXJpYWwnOlxuXHRcdFx0XHRyZXR1cm4gJ8KwRic7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gJ8KwQyc7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHdpbmRTcGVlZENvbnZlcnNpb24oc3lzdGVtLCB3aW5kU3BlZWQpIHtcblx0XHRjb25zdCBtZXRyaWNXaW5kU3BlZWQgPSBNYXRoLnJvdW5kKHdpbmRTcGVlZCAqIDMuNik7XG5cblx0XHRzd2l0Y2ggKHN5c3RlbSkge1xuXHRcdFx0Y2FzZSAnbWV0cmljJzpcblx0XHRcdFx0cmV0dXJuIGAke21ldHJpY1dpbmRTcGVlZH0ga20vaGA7XG5cdFx0XHRjYXNlICdpbXBlcmlhbCc6XG5cdFx0XHRcdHJldHVybiBgJHtNYXRoLnJvdW5kKHdpbmRTcGVlZCl9IG1waGA7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gYCR7bWV0cmljV2luZFNwZWVkfSBrbS9oYDtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZXh0cmFjdERhdGEoZGF0YSwgc3lzdGVtKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0bmFtZTogY2l0eSxcblx0XHRcdHN5czogeyBjb3VudHJ5IH0sXG5cdFx0XHR3ZWF0aGVyOiBbeyBtYWluOiB3ZWF0aGVyLCBkZXNjcmlwdGlvbiwgaWNvbiB9XSxcblx0XHRcdHdpbmQ6IHsgc3BlZWQ6IHdpbmRTcGVlZCB9LFxuXHRcdFx0bWFpbjogeyB0ZW1wLCBmZWVsc19saWtlOiBmZWVsc0xpa2UsIHByZXNzdXJlLCBodW1pZGl0eSB9LFxuXHRcdH0gPSBkYXRhO1xuXHRcdGNvbnN0IHRlbXBlcmF0dXJlID0gTWF0aC5yb3VuZCh0ZW1wKSArIHRoaXMuYWRkRGVncmVlcyhzeXN0ZW0pO1xuXHRcdGNvbnN0IGZlZWxzTGlrZVRlbXAgPSBNYXRoLnJvdW5kKGZlZWxzTGlrZSkgKyB0aGlzLmFkZERlZ3JlZXMoc3lzdGVtKTtcblx0XHRjb25zdCB3aW5kU3BlZWRVbml0ID0gdGhpcy53aW5kU3BlZWRDb252ZXJzaW9uKHN5c3RlbSwgd2luZFNwZWVkKTtcblx0XHRjb25zdCBwcmVzc3VyZVVuaXQgPSBgJHtwcmVzc3VyZX0gaFBhYDtcblx0XHRjb25zdCBodW1pZGl0eVBlcmNlbnQgPSBgJHtodW1pZGl0eX0lYDtcblxuXHRcdHJldHVybiB7IGNpdHksIGNvdW50cnksIGljb24sIHRlbXBlcmF0dXJlLCBmZWVsc0xpa2VUZW1wLCBodW1pZGl0eVBlcmNlbnQsIHdpbmRTcGVlZFVuaXQsIHByZXNzdXJlVW5pdCwgZGVzY3JpcHRpb24sIHdlYXRoZXIgfTtcblx0fVxuXG5cdHN0YXRpYyBhc3luYyBncmFiRGF0YUJ5Q2l0eShzeXN0ZW0sIGNpdHkpIHtcblx0XHRjb25zdCBhcGkgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPSR7c3lzdGVtfSZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM2A7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXMpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBDaXR5ICcke2NpdHl9JyBub3QgZm91bmRgKTtcblx0XHRcdGNvbnN0IGRhdGEgPSB0aGlzLmV4dHJhY3REYXRhKGF3YWl0IHJlc3BvbnNlLmpzb24oKSwgc3lzdGVtKTtcblxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBncmFiRGF0YUJ5UG9zaXRpb24oc3lzdGVtLCBsYXQsIGxvbikge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL3JldmVyc2U/bGF0PSR7bGF0fSZsb249JHtsb259JmxpbWl0PTEmYXBwaWQ9Mjg3MWM4ODk0NGI4MWZiYWI5MjJkNDcwMTI2OTViYTNgO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KTtcblx0XHRcdFx0XHRcdHJlc29sdmUocmVzKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIDApO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgTG9jYWxpemF0aW9uIG5vdCBmb3VuZGApO1xuXHRcdFx0bGV0IGNpdHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRjaXR5ID0gY2l0eVswXS5uYW1lO1xuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZ3JhYkRhdGFCeUNpdHkoc3lzdGVtLCBjaXR5KTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRhbGVydChlcnJvcik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuXHRzdGF0aWMgc2V0VW5pdChzeXN0ZW0pIHtcblx0XHRjb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZS11bml0cycpO1xuXHRcdGNvbnN0IHN5c3RlbVVuaXRzID0gdW5pdEJ0bi52YWx1ZSB8fCBzeXN0ZW0gfHwgJ21ldHJpYyc7XG5cdFx0dGhpcy51cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKTtcblx0XHRyZXR1cm4gc3lzdGVtVW5pdHM7XG5cdH1cblxuXHRzdGF0aWMgdXBkYXRlVW5pdEJ0bih1bml0QnRuLCBzeXN0ZW1Vbml0cykge1xuXHRcdGNvbnN0IG5ld3VuaXRCdG4gPSB1bml0QnRuO1xuXHRcdG5ld3VuaXRCdG4udmFsdWUgPSBzeXN0ZW1Vbml0cztcblx0XHRuZXd1bml0QnRuLmlubmVySFRNTCA9IHN5c3RlbVVuaXRzID09PSAnbWV0cmljJyA/ICc8Yj7CsEM8L2I+IHwgwrBGJyA6ICfCsEMgfCA8Yj7CsEY8L2I+Jztcblx0fVxuXG5cdHN0YXRpYyB0b2dnbGVVbml0KHVuaXRCdG4pIHtcblx0XHRjb25zdCBzeXN0ZW1Vbml0cyA9IHVuaXRCdG4uaW5uZXJIVE1MLmluY2x1ZGVzKCc8Yj7CsEM8L2I+JykgPyAnaW1wZXJpYWwnIDogJ21ldHJpYyc7XG5cdFx0dGhpcy51cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKTtcblx0fVxuXG5cdHN0YXRpYyBsb2FkaW5nKHRvZ2dsZSkge1xuXHRcdGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGluZy1zcGlubmVyJyk7XG5cdFx0Y29uc3Qgd2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWF0aGVyJyk7XG5cblx0XHRpZiAodG9nZ2xlKSB7XG5cdFx0XHR3ZWF0aGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcblx0XHRcdHNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcblx0XHRcdHdlYXRoZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBwaWNrQ2l0eShlKSB7XG5cdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnRuJykpIHtcblx0XHRcdExvZ2ljLmdyYWJEYXRhQnlDaXR5KHRoaXMuc2V0VW5pdCgpLCBlLnRhcmdldC50ZXh0Q29udGVudCkudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdFx0XHR0aGlzLmRpc3BsYXlXZWF0aGVyKGRhdGEpO1xuXHRcdFx0XHR0aGlzLnNldEJjZ0NvbG9yKGRhdGEpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHNlYXJjaENpdHkoKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWlucHV0Jyk7XG5cblx0XHRpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlLnRyaW0oKTtcblx0XHRpZiAoaW5wdXQudmFsdWUgIT09ICcnKSB7XG5cdFx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdFx0dGhpcy5sb2FkaW5nKHRydWUpO1xuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGlucHV0LnZhbHVlKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdFx0aW5wdXQudmFsdWUgPSAnJztcblx0XHRcdFx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGxheVdlYXRoZXIoZGF0YSk7XG5cdFx0XHRcdFx0dGhpcy5zZXRCY2dDb2xvcihkYXRhKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBmaW5kTWUoKSB7XG5cdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHBvc2l0aW9uID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHJlc29sdmUsIHJlamVjdCk7XG5cdFx0XHR9KTtcblx0XHRcdGNvbnN0IHsgbGF0aXR1ZGUgfSA9IHBvc2l0aW9uLmNvb3Jkcztcblx0XHRcdGNvbnN0IHsgbG9uZ2l0dWRlIH0gPSBwb3NpdGlvbi5jb29yZHM7XG5cblx0XHRcdExvZ2ljLmdyYWJEYXRhQnlQb3NpdGlvbih0aGlzLnNldFVuaXQoKSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSkudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdFx0XHR0aGlzLmRpc3BsYXlXZWF0aGVyKGRhdGEpO1xuXHRcdFx0XHR0aGlzLnNldEJjZ0NvbG9yKGRhdGEpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBwb3NpdGlvbjtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgY2xlYXJXZWF0aGVyKCkge1xuXHRcdGNvbnN0IGltZ0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW1nLWNhcmQnKTtcblx0XHRjb25zdCBtYWluQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQnKTtcblx0XHRjb25zdCBzZWNvbmRhcnlDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY29uZGFyeS1jYXJkJyk7XG5cblx0XHRpbWdDYXJkLnRleHRDb250ZW50ID0gJyc7XG5cdFx0bWFpbkNhcmQudGV4dENvbnRlbnQgPSAnJztcblx0XHRzZWNvbmRhcnlDYXJkLnRleHRDb250ZW50ID0gJyc7XG5cdH1cblxuXHRzdGF0aWMgZGlzcGxheVdlYXRoZXIoZGF0YSkge1xuXHRcdGNvbnN0IHdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VhdGhlcicpO1xuXG5cdFx0Y29uc3QgaW1nQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWctY2FyZCcpO1xuXHRcdGNvbnN0IG1haW5DYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tY2FyZCcpO1xuXHRcdGNvbnN0IHNlY29uZGFyeUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2Vjb25kYXJ5LWNhcmQnKTtcblxuXHRcdGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdGltZy5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS5pY29ufUA0eC5wbmdgO1xuXHRcdGltZy5hbHQgPSBkYXRhLmRlc2NyaXB0aW9uO1xuXG5cdFx0Y29uc3QgaDFDaXR5Q291bnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG5cdFx0Y29uc3QgaDFUZW1wZXJhdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG5cdFx0Y29uc3QgaDFEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG5cblx0XHRjb25zdCBwRmVlbHNMaWtlVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRjb25zdCBwSHVtaWRpdHlQZXJjZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdGNvbnN0IHBXaW5kU3BlZWRVbml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdGNvbnN0IHBQcmVzc3VyZVVuaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cblx0XHRpZiAoZGF0YS5jb3VudHJ5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGgxQ2l0eUNvdW50cnkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNpdHl9LCAke2RhdGEuY291bnRyeX1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRoMUNpdHlDb3VudHJ5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jaXR5fWA7XG5cdFx0fVxuXG5cdFx0aDFUZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGAke2RhdGEudGVtcGVyYXR1cmV9YDtcblx0XHRoMURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7ZGF0YS5kZXNjcmlwdGlvbn1gO1xuXHRcdHBGZWVsc0xpa2VUZW1wLnRleHRDb250ZW50ID0gYEZlZWxzIGxpa2U6ICR7ZGF0YS5mZWVsc0xpa2VUZW1wfWA7XG5cdFx0cEh1bWlkaXR5UGVyY2VudC50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtkYXRhLmh1bWlkaXR5UGVyY2VudH1gO1xuXHRcdHBXaW5kU3BlZWRVbml0LnRleHRDb250ZW50ID0gYFdpbmQgc3BlZWQ6ICR7ZGF0YS53aW5kU3BlZWRVbml0fWA7XG5cdFx0cFByZXNzdXJlVW5pdC50ZXh0Q29udGVudCA9IGBQcmVzc3VyZTogJHtkYXRhLnByZXNzdXJlVW5pdH1gO1xuXG5cdFx0aW1nQ2FyZC5hcHBlbmRDaGlsZChpbWcpO1xuXG5cdFx0bWFpbkNhcmQuYXBwZW5kQ2hpbGQoaDFDaXR5Q291bnRyeSk7XG5cdFx0bWFpbkNhcmQuYXBwZW5kQ2hpbGQoaDFUZW1wZXJhdHVyZSk7XG5cdFx0bWFpbkNhcmQuYXBwZW5kQ2hpbGQoaDFEZXNjcmlwdGlvbik7XG5cblx0XHRzZWNvbmRhcnlDYXJkLmFwcGVuZENoaWxkKHBGZWVsc0xpa2VUZW1wKTtcblx0XHRzZWNvbmRhcnlDYXJkLmFwcGVuZENoaWxkKHBIdW1pZGl0eVBlcmNlbnQpO1xuXHRcdHNlY29uZGFyeUNhcmQuYXBwZW5kQ2hpbGQocFdpbmRTcGVlZFVuaXQpO1xuXHRcdHNlY29uZGFyeUNhcmQuYXBwZW5kQ2hpbGQocFByZXNzdXJlVW5pdCk7XG5cblx0XHR3ZWF0aGVyLmFwcGVuZENoaWxkKG1haW5DYXJkKTtcblx0XHR3ZWF0aGVyLmFwcGVuZENoaWxkKHNlY29uZGFyeUNhcmQpO1xuXHR9XG5cblx0c3RhdGljIHNldEJjZ0NvbG9yKGRhdGEpIHtcblx0XHRsZXQgdGVtcCA9IHBhcnNlSW50KGRhdGEudGVtcGVyYXR1cmUsIDEwKTtcblx0XHRjb25zdCBtaW5UZW1wID0gMDtcblx0XHRjb25zdCBtYXhUZW1wID0gMzA7XG5cblx0XHRjb25zdCBtaW5Ic2wgPSAyMjA7XG5cdFx0Y29uc3QgbWF4SHNsID0gMDtcblxuXHRcdHRlbXAgPSB0ZW1wID4gbWF4VGVtcCA/IG1heFRlbXAgOiB0ZW1wO1xuXHRcdHRlbXAgPSB0ZW1wIDwgbWluVGVtcCA/IG1pblRlbXAgOiB0ZW1wO1xuXG5cdFx0Y29uc3QgcmFuZ2VUZW1wID0gbWF4VGVtcCAtIG1pblRlbXA7XG5cdFx0Y29uc3QgcmFuZ2VIc2wgPSBtYXhIc2wgLSBtaW5Ic2w7XG5cdFx0Y29uc3QgZGVnQ291bnQgPSBtYXhUZW1wIC0gdGVtcDtcblx0XHRjb25zdCBoc2xzRGVnID0gcmFuZ2VIc2wgLyByYW5nZVRlbXA7XG5cdFx0Y29uc3QgcmV0dXJuSHVlID0gMzYwIC0gKGRlZ0NvdW50ICogaHNsc0RlZyAtIChtYXhIc2wgLSAzNjApKTtcblxuXHRcdGNvbnN0IGNvbG9yID0gYGhzbCgke3JldHVybkh1ZX0sIDEwMCUsIDc1JSlgO1xuXG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcblx0fVxuXG5cdHN0YXRpYyBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cdFx0Y29uc3Qgc2FtcGxlTG9jYXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhbXBsZS1sb2NhdGlvbnMnKTtcblx0XHRjb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZS11bml0cycpO1xuXHRcdGNvbnN0IHNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYm94Jyk7XG5cdFx0Y29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idG4nKTtcblx0XHRjb25zdCBmaW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbmQtYnRuJyk7XG5cblx0XHRzYW1wbGVMb2NhdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5waWNrQ2l0eShlKSk7XG5cdFx0c2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXHRcdHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VhcmNoQ2l0eSgpKTtcblx0XHRmaW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5maW5kTWUoKSk7XG5cdFx0dW5pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlVW5pdCh1bml0QnRuKSk7XG5cdH1cblxuXHRzdGF0aWMgcnVuQXBwKCkge1xuXHRcdHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG5cblx0XHR0aGlzLmZpbmRNZSgpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnbm9ybWFsaXplLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuY3NzJztcbmltcG9ydCBVSSBmcm9tICcuL2NvZGUvdWknO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVUkucnVuQXBwKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9