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

	static convertFeelsLike(feelsLike, systemUnits) {
		let feelsLikeNumber = parseFloat(feelsLike.split(':')[1]);
		if (systemUnits === 'imperial' && feelsLike.includes('°C')) {
			feelsLikeNumber = Math.round((feelsLikeNumber * 9) / 5 + 32);
			return `Feels like: ${feelsLikeNumber}°F`;
		}
		if (systemUnits === 'metric' && feelsLike.includes('°F')) {
			feelsLikeNumber = Math.round(((feelsLikeNumber - 32) * 5) / 9);
			return `Feels like: ${feelsLikeNumber}°C`;
		}
		return feelsLike;
	}

	static convertWindSpeed(speed, systemUnits) {
		let speedNumber = parseFloat(speed.split(':')[1]);
		if (systemUnits === 'imperial' && speed.includes('km/h')) {
			speedNumber = Math.round(speedNumber / 1.6093);
			return `Wind speed: ${speedNumber} mph`;
		}
		if (systemUnits === 'metric' && speed.includes('mph')) {
			speedNumber = Math.round(speedNumber * 1.6093);
			return `Wind speed: ${speedNumber} km/h`;
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
		feelsLikeElement.textContent = this.convertFeelsLike(feelsLike, systemUnits);
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
		const imgCard = document.querySelector('#img-card');
		const mainCard = document.querySelector('#main-card');
		const secondaryCard = document.querySelector('#secondary-card');

		imgCard.textContent = '';
		mainCard.textContent = '';
		secondaryCard.textContent = '';
	}

	static displayWeather(data) {
		const weather = document.querySelector('#weather-container');
		const imgCard = document.querySelector('#img-card');
		const mainCard = document.querySelector('#main-card');
		const secondaryCard = document.querySelector('#secondary-card');

		const tommorowCard = document.querySelector('#tommorow-card');
		const afterTommorowCard = document.querySelector('#after-tommorow-card');
		const nextAfterTommorowCard = document.querySelector('#next-after-tommorow-card');

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

		let spanElement = document.createElement('span');
		spanElement.textContent = 'Feels like:';
		pFeelsLikeTemp.appendChild(spanElement);
		pFeelsLikeTemp.append(` ${data.feelsLikeTemp}`);

		spanElement = document.createElement('span');
		spanElement.textContent = 'Humidity:';
		pHumidityPercent.appendChild(spanElement);
		pHumidityPercent.append(` ${data.humidityPercent}`);

		spanElement = document.createElement('span');
		spanElement.textContent = 'Wind speed:';
		pWindSpeedUnit.appendChild(spanElement);
		pWindSpeedUnit.append(` ${data.windSpeedUnit}`);

		spanElement = document.createElement('span');
		spanElement.textContent = 'Pressure:';
		pPressureUnit.appendChild(spanElement);
		pPressureUnit.append(` ${data.pressureUnit}`);

		h1CityCountry.setAttribute('id', 'city-country');
		h1Temperature.setAttribute('id', 'temperature');
		h1Description.setAttribute('id', 'description');

		pFeelsLikeTemp.setAttribute('id', 'feels-like');
		pHumidityPercent.setAttribute('id', 'humidity');
		pWindSpeedUnit.setAttribute('id', 'wind-speed');
		pPressureUnit.setAttribute('id', 'pressure');

		imgCard.appendChild(img);

		mainCard.appendChild(h1CityCountry);
		mainCard.appendChild(h1Temperature);
		mainCard.appendChild(h1Description);

		secondaryCard.appendChild(pFeelsLikeTemp);
		secondaryCard.appendChild(pHumidityPercent);
		secondaryCard.appendChild(pWindSpeedUnit);
		secondaryCard.appendChild(pPressureUnit);

		weather.appendChild(mainCard);
		weather.appendChild(imgCard);
		weather.appendChild(secondaryCard);

		weather.appendChild(tommorowCard);
		weather.appendChild(afterTommorowCard);
		weather.appendChild(nextAfterTommorowCard);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0osa0NBQWtDLFVBQVU7QUFDNUM7O0FBRUEsaUNBQWlDLGlCQUFpQjtBQUNsRCxpQ0FBaUMsaUJBQWlCOztBQUVsRDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsbUJBQW1COztBQUUvQztBQUNBO0FBQ0E7QUFDQSw4QkFBOEIscUJBQXFCOztBQUVuRDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsbUJBQW1COztBQUUvQztBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsa0JBQWtCOztBQUU3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsVUFBVTtBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNwUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnVCO0FBQ0k7QUFDQTs7QUFFM0IsOENBQThDLGdEQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb2RlL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvdWkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpYyB7XG5cdHN0YXRpYyBhZGREZWdyZWVzKHN5c3RlbSkge1xuXHRcdHN3aXRjaCAoc3lzdGVtKSB7XG5cdFx0XHRjYXNlICdtZXRyaWMnOlxuXHRcdFx0XHRyZXR1cm4gJ8KwQyc7XG5cdFx0XHRjYXNlICdpbXBlcmlhbCc6XG5cdFx0XHRcdHJldHVybiAnwrBGJztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAnwrBDJztcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgd2luZFNwZWVkQ29udmVyc2lvbihzeXN0ZW0sIHdpbmRTcGVlZCkge1xuXHRcdGNvbnN0IG1ldHJpY1dpbmRTcGVlZCA9IE1hdGgucm91bmQod2luZFNwZWVkICogMy42KTtcblxuXHRcdHN3aXRjaCAoc3lzdGVtKSB7XG5cdFx0XHRjYXNlICdtZXRyaWMnOlxuXHRcdFx0XHRyZXR1cm4gYCR7bWV0cmljV2luZFNwZWVkfSBrbS9oYDtcblx0XHRcdGNhc2UgJ2ltcGVyaWFsJzpcblx0XHRcdFx0cmV0dXJuIGAke01hdGgucm91bmQod2luZFNwZWVkKX0gbXBoYDtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBgJHttZXRyaWNXaW5kU3BlZWR9IGttL2hgO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBleHRyYWN0RGF0YShkYXRhLCBzeXN0ZW0pIHtcblx0XHRjb25zdCB7XG5cdFx0XHRuYW1lOiBjaXR5LFxuXHRcdFx0c3lzOiB7IGNvdW50cnkgfSxcblx0XHRcdHdlYXRoZXI6IFt7IG1haW46IHdlYXRoZXIsIGRlc2NyaXB0aW9uLCBpY29uIH1dLFxuXHRcdFx0d2luZDogeyBzcGVlZDogd2luZFNwZWVkIH0sXG5cdFx0XHRtYWluOiB7IHRlbXAsIGZlZWxzX2xpa2U6IGZlZWxzTGlrZSwgcHJlc3N1cmUsIGh1bWlkaXR5IH0sXG5cdFx0fSA9IGRhdGE7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKHRlbXApICsgdGhpcy5hZGREZWdyZWVzKHN5c3RlbSk7XG5cdFx0Y29uc3QgZmVlbHNMaWtlVGVtcCA9IE1hdGgucm91bmQoZmVlbHNMaWtlKSArIHRoaXMuYWRkRGVncmVlcyhzeXN0ZW0pO1xuXHRcdGNvbnN0IHdpbmRTcGVlZFVuaXQgPSB0aGlzLndpbmRTcGVlZENvbnZlcnNpb24oc3lzdGVtLCB3aW5kU3BlZWQpO1xuXHRcdGNvbnN0IHByZXNzdXJlVW5pdCA9IGAke3ByZXNzdXJlfSBoUGFgO1xuXHRcdGNvbnN0IGh1bWlkaXR5UGVyY2VudCA9IGAke2h1bWlkaXR5fSVgO1xuXG5cdFx0cmV0dXJuIHsgY2l0eSwgY291bnRyeSwgaWNvbiwgdGVtcGVyYXR1cmUsIGZlZWxzTGlrZVRlbXAsIGh1bWlkaXR5UGVyY2VudCwgd2luZFNwZWVkVW5pdCwgcHJlc3N1cmVVbml0LCBkZXNjcmlwdGlvbiwgd2VhdGhlciB9O1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhQnlDaXR5KHN5c3RlbSwgY2l0eSkge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9JHtzeXN0ZW19JmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzYDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlcyk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCAxMDAwKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYENpdHkgJyR7Y2l0eX0nIG5vdCBmb3VuZGApO1xuXHRcdFx0Y29uc3QgZGF0YSA9IHRoaXMuZXh0cmFjdERhdGEoYXdhaXQgcmVzcG9uc2UuanNvbigpLCBzeXN0ZW0pO1xuXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhQnlQb3NpdGlvbihzeXN0ZW0sIGxhdCwgbG9uKSB7XG5cdFx0Y29uc3QgYXBpID0gYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvcmV2ZXJzZT9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mbGltaXQ9MSZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM2A7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXMpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgMCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGl6YXRpb24gbm90IGZvdW5kYCk7XG5cdFx0XHRsZXQgY2l0eSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNpdHkgPSBjaXR5WzBdLm5hbWU7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5ncmFiRGF0YUJ5Q2l0eShzeXN0ZW0sIGNpdHkpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG5cdHN0YXRpYyBzZXRVbml0KHN5c3RlbSkge1xuXHRcdGNvbnN0IHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzJyk7XG5cdFx0Y29uc3Qgc3lzdGVtVW5pdHMgPSB1bml0QnRuLnZhbHVlIHx8IHN5c3RlbSB8fCAnbWV0cmljJztcblx0XHR0aGlzLnVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpO1xuXHRcdHJldHVybiBzeXN0ZW1Vbml0cztcblx0fVxuXG5cdHN0YXRpYyB1cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKSB7XG5cdFx0Y29uc3QgbmV3dW5pdEJ0biA9IHVuaXRCdG47XG5cdFx0bmV3dW5pdEJ0bi52YWx1ZSA9IHN5c3RlbVVuaXRzO1xuXHRcdG5ld3VuaXRCdG4uaW5uZXJIVE1MID0gc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnID8gJzxiPsKwQzwvYj4gfCDCsEYnIDogJ8KwQyB8IDxiPsKwRjwvYj4nO1xuXHR9XG5cblx0c3RhdGljIHRvZ2dsZVVuaXQodW5pdEJ0bikge1xuXHRcdGNvbnN0IHN5c3RlbVVuaXRzID0gdW5pdEJ0bi5pbm5lckhUTUwuaW5jbHVkZXMoJzxiPsKwQzwvYj4nKSA/ICdpbXBlcmlhbCcgOiAnbWV0cmljJztcblx0XHR0aGlzLnVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpO1xuXHRcdHRoaXMucmVwbGFjZVVuaXRzKHN5c3RlbVVuaXRzKTtcblx0fVxuXG5cdHN0YXRpYyBjb252ZXJ0VGVtcGVyYXR1cmUodGVtcCwgc3lzdGVtVW5pdHMpIHtcblx0XHRsZXQgdGVtcE51bWJlciA9IHBhcnNlRmxvYXQodGVtcCk7XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnICYmIHRlbXAuaW5jbHVkZXMoJ8KwQycpKSB7XG5cdFx0XHR0ZW1wTnVtYmVyID0gTWF0aC5yb3VuZCgodGVtcE51bWJlciAqIDkpIC8gNSArIDMyKTtcblx0XHRcdHJldHVybiBgJHt0ZW1wTnVtYmVyfcKwRmA7XG5cdFx0fVxuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycgJiYgdGVtcC5pbmNsdWRlcygnwrBGJykpIHtcblx0XHRcdHRlbXBOdW1iZXIgPSBNYXRoLnJvdW5kKCgodGVtcE51bWJlciAtIDMyKSAqIDUpIC8gOSk7XG5cdFx0XHRyZXR1cm4gYCR7dGVtcE51bWJlcn3CsENgO1xuXHRcdH1cblx0XHRyZXR1cm4gdGVtcDtcblx0fVxuXG5cdHN0YXRpYyBjb252ZXJ0RmVlbHNMaWtlKGZlZWxzTGlrZSwgc3lzdGVtVW5pdHMpIHtcblx0XHRsZXQgZmVlbHNMaWtlTnVtYmVyID0gcGFyc2VGbG9hdChmZWVsc0xpa2Uuc3BsaXQoJzonKVsxXSk7XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnICYmIGZlZWxzTGlrZS5pbmNsdWRlcygnwrBDJykpIHtcblx0XHRcdGZlZWxzTGlrZU51bWJlciA9IE1hdGgucm91bmQoKGZlZWxzTGlrZU51bWJlciAqIDkpIC8gNSArIDMyKTtcblx0XHRcdHJldHVybiBgRmVlbHMgbGlrZTogJHtmZWVsc0xpa2VOdW1iZXJ9wrBGYDtcblx0XHR9XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnbWV0cmljJyAmJiBmZWVsc0xpa2UuaW5jbHVkZXMoJ8KwRicpKSB7XG5cdFx0XHRmZWVsc0xpa2VOdW1iZXIgPSBNYXRoLnJvdW5kKCgoZmVlbHNMaWtlTnVtYmVyIC0gMzIpICogNSkgLyA5KTtcblx0XHRcdHJldHVybiBgRmVlbHMgbGlrZTogJHtmZWVsc0xpa2VOdW1iZXJ9wrBDYDtcblx0XHR9XG5cdFx0cmV0dXJuIGZlZWxzTGlrZTtcblx0fVxuXG5cdHN0YXRpYyBjb252ZXJ0V2luZFNwZWVkKHNwZWVkLCBzeXN0ZW1Vbml0cykge1xuXHRcdGxldCBzcGVlZE51bWJlciA9IHBhcnNlRmxvYXQoc3BlZWQuc3BsaXQoJzonKVsxXSk7XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnICYmIHNwZWVkLmluY2x1ZGVzKCdrbS9oJykpIHtcblx0XHRcdHNwZWVkTnVtYmVyID0gTWF0aC5yb3VuZChzcGVlZE51bWJlciAvIDEuNjA5Myk7XG5cdFx0XHRyZXR1cm4gYFdpbmQgc3BlZWQ6ICR7c3BlZWROdW1iZXJ9IG1waGA7XG5cdFx0fVxuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycgJiYgc3BlZWQuaW5jbHVkZXMoJ21waCcpKSB7XG5cdFx0XHRzcGVlZE51bWJlciA9IE1hdGgucm91bmQoc3BlZWROdW1iZXIgKiAxLjYwOTMpO1xuXHRcdFx0cmV0dXJuIGBXaW5kIHNwZWVkOiAke3NwZWVkTnVtYmVyfSBrbS9oYDtcblx0XHR9XG5cdFx0cmV0dXJuIHNwZWVkO1xuXHR9XG5cblx0c3RhdGljIHJlcGxhY2VVbml0cyhzeXN0ZW1Vbml0cykge1xuXHRcdGNvbnN0IHRlbXBlcmF0dXJlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQgI3RlbXBlcmF0dXJlJyk7XG5cdFx0Y29uc3QgZmVlbHNMaWtlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWNvbmRhcnktY2FyZCAjZmVlbHMtbGlrZScpO1xuXHRcdGNvbnN0IHdpbmRTcGVlZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2Vjb25kYXJ5LWNhcmQgI3dpbmQtc3BlZWQnKTtcblx0XHRjb25zdCB0ZW1wZXJhdHVyZSA9IHRlbXBlcmF0dXJlRWxlbWVudC50ZXh0Q29udGVudDtcblx0XHRjb25zdCBmZWVsc0xpa2UgPSBmZWVsc0xpa2VFbGVtZW50LnRleHRDb250ZW50O1xuXHRcdGNvbnN0IHdpbmRTcGVlZCA9IHdpbmRTcGVlZEVsZW1lbnQudGV4dENvbnRlbnQ7XG5cdFx0dGVtcGVyYXR1cmVFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5jb252ZXJ0VGVtcGVyYXR1cmUodGVtcGVyYXR1cmUsIHN5c3RlbVVuaXRzKTtcblx0XHRmZWVsc0xpa2VFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5jb252ZXJ0RmVlbHNMaWtlKGZlZWxzTGlrZSwgc3lzdGVtVW5pdHMpO1xuXHRcdHdpbmRTcGVlZEVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLmNvbnZlcnRXaW5kU3BlZWQod2luZFNwZWVkLCBzeXN0ZW1Vbml0cyk7XG5cdH1cblxuXHRzdGF0aWMgbG9hZGluZyh0b2dnbGUpIHtcblx0XHRjb25zdCBzcGlubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRpbmctc3Bpbm5lcicpO1xuXHRcdGNvbnN0IHdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VhdGhlci1jb250YWluZXInKTtcblxuXHRcdGlmICh0b2dnbGUpIHtcblx0XHRcdHdlYXRoZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdFx0c3Bpbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuXHRcdFx0d2VhdGhlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHBpY2tDaXR5KGUpIHtcblx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4nKSkge1xuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGUudGFyZ2V0LnRleHRDb250ZW50KS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdHRoaXMuZGlzcGxheVdlYXRoZXIoZGF0YSk7XG5cdFx0XHRcdHRoaXMuc2V0QmNnQ29sb3IoZGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgc2VhcmNoQ2l0eSgpIHtcblx0XHRjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcblxuXHRcdGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUudHJpbSgpO1xuXHRcdGlmIChpbnB1dC52YWx1ZSAhPT0gJycpIHtcblx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0XHRMb2dpYy5ncmFiRGF0YUJ5Q2l0eSh0aGlzLnNldFVuaXQoKSwgaW5wdXQudmFsdWUpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXHRcdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcblx0XHRcdFx0XHR0aGlzLnNldEJjZ0NvbG9yKGRhdGEpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdFx0aW5wdXQudmFsdWUgPSAnJztcblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGZpbmRNZSgpIHtcblx0XHR0aGlzLmNsZWFyV2VhdGhlcigpO1xuXHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcG9zaXRpb24gPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocmVzb2x2ZSwgcmVqZWN0KTtcblx0XHRcdH0pO1xuXHRcdFx0Y29uc3QgeyBsYXRpdHVkZSB9ID0gcG9zaXRpb24uY29vcmRzO1xuXHRcdFx0Y29uc3QgeyBsb25naXR1ZGUgfSA9IHBvc2l0aW9uLmNvb3JkcztcblxuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeVBvc2l0aW9uKHRoaXMuc2V0VW5pdCgpLCBsYXRpdHVkZSwgbG9uZ2l0dWRlKS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdHRoaXMuZGlzcGxheVdlYXRoZXIoZGF0YSk7XG5cdFx0XHRcdHRoaXMuc2V0QmNnQ29sb3IoZGF0YSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHBvc2l0aW9uO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBjbGVhcldlYXRoZXIoKSB7XG5cdFx0Y29uc3QgaW1nQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWctY2FyZCcpO1xuXHRcdGNvbnN0IG1haW5DYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tY2FyZCcpO1xuXHRcdGNvbnN0IHNlY29uZGFyeUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2Vjb25kYXJ5LWNhcmQnKTtcblxuXHRcdGltZ0NhcmQudGV4dENvbnRlbnQgPSAnJztcblx0XHRtYWluQ2FyZC50ZXh0Q29udGVudCA9ICcnO1xuXHRcdHNlY29uZGFyeUNhcmQudGV4dENvbnRlbnQgPSAnJztcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5V2VhdGhlcihkYXRhKSB7XG5cdFx0Y29uc3Qgd2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWF0aGVyLWNvbnRhaW5lcicpO1xuXHRcdGNvbnN0IGltZ0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW1nLWNhcmQnKTtcblx0XHRjb25zdCBtYWluQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQnKTtcblx0XHRjb25zdCBzZWNvbmRhcnlDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY29uZGFyeS1jYXJkJyk7XG5cblx0XHRjb25zdCB0b21tb3Jvd0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9tbW9yb3ctY2FyZCcpO1xuXHRcdGNvbnN0IGFmdGVyVG9tbW9yb3dDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FmdGVyLXRvbW1vcm93LWNhcmQnKTtcblx0XHRjb25zdCBuZXh0QWZ0ZXJUb21tb3Jvd0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dC1hZnRlci10b21tb3Jvdy1jYXJkJyk7XG5cblx0XHRjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRpbWcuc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGEuaWNvbn1ANHgucG5nYDtcblx0XHRpbWcuYWx0ID0gZGF0YS5kZXNjcmlwdGlvbjtcblxuXHRcdGNvbnN0IGgxQ2l0eUNvdW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGNvbnN0IGgxVGVtcGVyYXR1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGNvbnN0IGgxRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXG5cdFx0Y29uc3QgcEZlZWxzTGlrZVRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0Y29uc3QgcEh1bWlkaXR5UGVyY2VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRjb25zdCBwV2luZFNwZWVkVW5pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRjb25zdCBwUHJlc3N1cmVVbml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG5cdFx0aWYgKGRhdGEuY291bnRyeSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRoMUNpdHlDb3VudHJ5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jaXR5fSwgJHtkYXRhLmNvdW50cnl9YDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aDFDaXR5Q291bnRyeS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eX1gO1xuXHRcdH1cblxuXHRcdGgxVGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBgJHtkYXRhLnRlbXBlcmF0dXJlfWA7XG5cdFx0aDFEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke2RhdGEuZGVzY3JpcHRpb259YDtcblxuXHRcdGxldCBzcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRzcGFuRWxlbWVudC50ZXh0Q29udGVudCA9ICdGZWVscyBsaWtlOic7XG5cdFx0cEZlZWxzTGlrZVRlbXAuYXBwZW5kQ2hpbGQoc3BhbkVsZW1lbnQpO1xuXHRcdHBGZWVsc0xpa2VUZW1wLmFwcGVuZChgICR7ZGF0YS5mZWVsc0xpa2VUZW1wfWApO1xuXG5cdFx0c3BhbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0c3BhbkVsZW1lbnQudGV4dENvbnRlbnQgPSAnSHVtaWRpdHk6Jztcblx0XHRwSHVtaWRpdHlQZXJjZW50LmFwcGVuZENoaWxkKHNwYW5FbGVtZW50KTtcblx0XHRwSHVtaWRpdHlQZXJjZW50LmFwcGVuZChgICR7ZGF0YS5odW1pZGl0eVBlcmNlbnR9YCk7XG5cblx0XHRzcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRzcGFuRWxlbWVudC50ZXh0Q29udGVudCA9ICdXaW5kIHNwZWVkOic7XG5cdFx0cFdpbmRTcGVlZFVuaXQuYXBwZW5kQ2hpbGQoc3BhbkVsZW1lbnQpO1xuXHRcdHBXaW5kU3BlZWRVbml0LmFwcGVuZChgICR7ZGF0YS53aW5kU3BlZWRVbml0fWApO1xuXG5cdFx0c3BhbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0c3BhbkVsZW1lbnQudGV4dENvbnRlbnQgPSAnUHJlc3N1cmU6Jztcblx0XHRwUHJlc3N1cmVVbml0LmFwcGVuZENoaWxkKHNwYW5FbGVtZW50KTtcblx0XHRwUHJlc3N1cmVVbml0LmFwcGVuZChgICR7ZGF0YS5wcmVzc3VyZVVuaXR9YCk7XG5cblx0XHRoMUNpdHlDb3VudHJ5LnNldEF0dHJpYnV0ZSgnaWQnLCAnY2l0eS1jb3VudHJ5Jyk7XG5cdFx0aDFUZW1wZXJhdHVyZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RlbXBlcmF0dXJlJyk7XG5cdFx0aDFEZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rlc2NyaXB0aW9uJyk7XG5cblx0XHRwRmVlbHNMaWtlVGVtcC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2ZlZWxzLWxpa2UnKTtcblx0XHRwSHVtaWRpdHlQZXJjZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnaHVtaWRpdHknKTtcblx0XHRwV2luZFNwZWVkVW5pdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dpbmQtc3BlZWQnKTtcblx0XHRwUHJlc3N1cmVVbml0LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJlc3N1cmUnKTtcblxuXHRcdGltZ0NhcmQuYXBwZW5kQ2hpbGQoaW1nKTtcblxuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGgxQ2l0eUNvdW50cnkpO1xuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGgxVGVtcGVyYXR1cmUpO1xuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGgxRGVzY3JpcHRpb24pO1xuXG5cdFx0c2Vjb25kYXJ5Q2FyZC5hcHBlbmRDaGlsZChwRmVlbHNMaWtlVGVtcCk7XG5cdFx0c2Vjb25kYXJ5Q2FyZC5hcHBlbmRDaGlsZChwSHVtaWRpdHlQZXJjZW50KTtcblx0XHRzZWNvbmRhcnlDYXJkLmFwcGVuZENoaWxkKHBXaW5kU3BlZWRVbml0KTtcblx0XHRzZWNvbmRhcnlDYXJkLmFwcGVuZENoaWxkKHBQcmVzc3VyZVVuaXQpO1xuXG5cdFx0d2VhdGhlci5hcHBlbmRDaGlsZChtYWluQ2FyZCk7XG5cdFx0d2VhdGhlci5hcHBlbmRDaGlsZChpbWdDYXJkKTtcblx0XHR3ZWF0aGVyLmFwcGVuZENoaWxkKHNlY29uZGFyeUNhcmQpO1xuXG5cdFx0d2VhdGhlci5hcHBlbmRDaGlsZCh0b21tb3Jvd0NhcmQpO1xuXHRcdHdlYXRoZXIuYXBwZW5kQ2hpbGQoYWZ0ZXJUb21tb3Jvd0NhcmQpO1xuXHRcdHdlYXRoZXIuYXBwZW5kQ2hpbGQobmV4dEFmdGVyVG9tbW9yb3dDYXJkKTtcblx0fVxuXG5cdHN0YXRpYyBzZXRCY2dDb2xvcihkYXRhKSB7XG5cdFx0bGV0IHRlbXAgPSBwYXJzZUludChkYXRhLnRlbXBlcmF0dXJlLCAxMCk7XG5cdFx0Y29uc3QgbWluVGVtcCA9IDA7XG5cdFx0Y29uc3QgbWF4VGVtcCA9IDMwO1xuXG5cdFx0Y29uc3QgbWluSHNsID0gMjIwO1xuXHRcdGNvbnN0IG1heEhzbCA9IDA7XG5cblx0XHR0ZW1wID0gdGVtcCA+IG1heFRlbXAgPyBtYXhUZW1wIDogdGVtcDtcblx0XHR0ZW1wID0gdGVtcCA8IG1pblRlbXAgPyBtaW5UZW1wIDogdGVtcDtcblxuXHRcdGNvbnN0IHJhbmdlVGVtcCA9IG1heFRlbXAgLSBtaW5UZW1wO1xuXHRcdGNvbnN0IHJhbmdlSHNsID0gbWF4SHNsIC0gbWluSHNsO1xuXHRcdGNvbnN0IGRlZ0NvdW50ID0gbWF4VGVtcCAtIHRlbXA7XG5cdFx0Y29uc3QgaHNsc0RlZyA9IHJhbmdlSHNsIC8gcmFuZ2VUZW1wO1xuXHRcdGNvbnN0IHJldHVybkh1ZSA9IDM2MCAtIChkZWdDb3VudCAqIGhzbHNEZWcgLSAobWF4SHNsIC0gMzYwKSk7XG5cblx0XHRjb25zdCBjb2xvciA9IGBoc2woJHtyZXR1cm5IdWV9LCAxMDAlLCA3NSUpYDtcblx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuXHR9XG5cblx0c3RhdGljIGF0dGFjaExpc3RlbmVycygpIHtcblx0XHRjb25zdCBzYW1wbGVMb2NhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FtcGxlLWxvY2F0aW9ucycpO1xuXHRcdGNvbnN0IHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzJyk7XG5cdFx0Y29uc3Qgc2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1ib3gnKTtcblx0XHRjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ0bicpO1xuXHRcdGNvbnN0IGZpbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmluZC1idG4nKTtcblxuXHRcdHNhbXBsZUxvY2F0aW9ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnBpY2tDaXR5KGUpKTtcblx0XHRzZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cdFx0c2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZWFyY2hDaXR5KCkpO1xuXHRcdGZpbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmZpbmRNZSgpKTtcblx0XHR1bml0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVVbml0KHVuaXRCdG4pKTtcblx0fVxuXG5cdHN0YXRpYyBydW5BcHAoKSB7XG5cdFx0dGhpcy5hdHRhY2hMaXN0ZW5lcnMoKTtcblxuXHRcdHRoaXMuZmluZE1lKCk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdub3JtYWxpemUuY3NzJztcbmltcG9ydCAnLi9zdHlsZS9zdHlsZS5jc3MnO1xuaW1wb3J0IFVJIGZyb20gJy4vY29kZS91aSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5ydW5BcHAoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=