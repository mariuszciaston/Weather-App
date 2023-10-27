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

			this.grabDataNextDays(system, data.lat, data.lon);
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

			console.log(nextDays);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtBQUMzRCxJQUFJO0FBQ0osZ0NBQWdDLFVBQVU7QUFDMUM7QUFDQSwrQkFBK0IsaUJBQWlCO0FBQ2hELCtCQUErQixpQkFBaUI7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxVQUFVO0FBQzNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixtQkFBbUI7QUFDMUMsc0JBQXNCLHFCQUFxQjtBQUMzQyx1QkFBdUIsbUJBQW1CO0FBQzFDLHNCQUFzQixrQkFBa0I7QUFDeEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixVQUFVO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQ3RQQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOdUI7QUFDSTtBQUNBOztBQUUzQiw4Q0FBOEMsZ0RBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvbG9naWMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29kZS91aS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2ljIHtcblx0c3RhdGljIGFkZERlZ3JlZXMoc3lzdGVtKSB7XG5cdFx0c3dpdGNoIChzeXN0ZW0pIHtcblx0XHRcdGNhc2UgJ21ldHJpYyc6XG5cdFx0XHRcdHJldHVybiAnwrBDJztcblx0XHRcdGNhc2UgJ2ltcGVyaWFsJzpcblx0XHRcdFx0cmV0dXJuICfCsEYnO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuICfCsEMnO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyB3aW5kU3BlZWRDb252ZXJzaW9uKHN5c3RlbSwgd2luZFNwZWVkKSB7XG5cdFx0Y29uc3QgbWV0cmljV2luZFNwZWVkID0gTWF0aC5yb3VuZCh3aW5kU3BlZWQgKiAzLjYpO1xuXG5cdFx0c3dpdGNoIChzeXN0ZW0pIHtcblx0XHRcdGNhc2UgJ21ldHJpYyc6XG5cdFx0XHRcdHJldHVybiBgJHttZXRyaWNXaW5kU3BlZWR9IGttL2hgO1xuXHRcdFx0Y2FzZSAnaW1wZXJpYWwnOlxuXHRcdFx0XHRyZXR1cm4gYCR7TWF0aC5yb3VuZCh3aW5kU3BlZWQpfSBtcGhgO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGAke21ldHJpY1dpbmRTcGVlZH0ga20vaGA7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGV4dHJhY3REYXRhKGRhdGEsIHN5c3RlbSkge1xuXHRcdGNvbnN0IHtcblx0XHRcdG5hbWU6IGNpdHksXG5cdFx0XHRzeXM6IHsgY291bnRyeSB9LFxuXHRcdFx0d2VhdGhlcjogW3sgbWFpbjogd2VhdGhlciwgZGVzY3JpcHRpb24sIGljb24gfV0sXG5cdFx0XHR3aW5kOiB7IHNwZWVkOiB3aW5kU3BlZWQgfSxcblx0XHRcdG1haW46IHsgdGVtcCwgZmVlbHNfbGlrZTogZmVlbHNMaWtlLCBwcmVzc3VyZSwgaHVtaWRpdHkgfSxcblx0XHRcdGNvb3JkOiB7IGxhdCwgbG9uIH0sXG5cdFx0fSA9IGRhdGE7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKHRlbXApICsgdGhpcy5hZGREZWdyZWVzKHN5c3RlbSk7XG5cdFx0Y29uc3QgZmVlbHNMaWtlVGVtcCA9IE1hdGgucm91bmQoZmVlbHNMaWtlKSArIHRoaXMuYWRkRGVncmVlcyhzeXN0ZW0pO1xuXHRcdGNvbnN0IHdpbmRTcGVlZFVuaXQgPSB0aGlzLndpbmRTcGVlZENvbnZlcnNpb24oc3lzdGVtLCB3aW5kU3BlZWQpO1xuXHRcdGNvbnN0IHByZXNzdXJlVW5pdCA9IGAke3ByZXNzdXJlfSBoUGFgO1xuXHRcdGNvbnN0IGh1bWlkaXR5UGVyY2VudCA9IGAke2h1bWlkaXR5fSVgO1xuXG5cdFx0cmV0dXJuIHsgY2l0eSwgY291bnRyeSwgaWNvbiwgdGVtcGVyYXR1cmUsIGZlZWxzTGlrZVRlbXAsIGh1bWlkaXR5UGVyY2VudCwgd2luZFNwZWVkVW5pdCwgcHJlc3N1cmVVbml0LCBkZXNjcmlwdGlvbiwgd2VhdGhlciwgbGF0LCBsb24gfTtcblx0fVxuXG5cdHN0YXRpYyBlcG9jaFRvRGF5KGVwb2NoKSB7XG5cdFx0Y29uc3QgZGF0ZSA9IG5ldyBEYXRlKGVwb2NoICogMTAwMCk7XG5cdFx0Y29uc3QgZGF5cyA9IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXTtcblx0XHRyZXR1cm4gZGF5c1tkYXRlLmdldERheSgpXTtcblx0fVxuXG5cdHN0YXRpYyBleHRyYWN0TmV4dERheXMoZGF0YSwgc3lzdGVtKSB7XG5cdFx0Y29uc3QgZGF5cyA9IFs5LCAxNywgMjVdO1xuXHRcdHJldHVybiBkYXlzLm1hcCgoaW5kZXgpID0+ICh7XG5cdFx0XHRkYXk6IHRoaXMuZXBvY2hUb0RheShkYXRhLmxpc3RbaW5kZXhdLmR0KSxcblx0XHRcdHRlbXA6IE1hdGgucm91bmQoZGF0YS5saXN0W2luZGV4XS5tYWluLnRlbXBfbWF4KSArIHRoaXMuYWRkRGVncmVlcyhzeXN0ZW0pLFxuXHRcdFx0aWNvbjogZGF0YS5saXN0W2luZGV4XS53ZWF0aGVyWzBdLmljb24sXG5cdFx0fSkpO1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhQnlDaXR5KHN5c3RlbSwgY2l0eSkge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9JHtzeXN0ZW19JmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzYDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlcyk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCAxMDAwKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYENpdHkgJyR7Y2l0eX0nIG5vdCBmb3VuZGApO1xuXHRcdFx0Y29uc3QgZGF0YSA9IHRoaXMuZXh0cmFjdERhdGEoYXdhaXQgcmVzcG9uc2UuanNvbigpLCBzeXN0ZW0pO1xuXG5cdFx0XHR0aGlzLmdyYWJEYXRhTmV4dERheXMoc3lzdGVtLCBkYXRhLmxhdCwgZGF0YS5sb24pO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBncmFiRGF0YUJ5UG9zaXRpb24oc3lzdGVtLCBsYXQsIGxvbikge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL3JldmVyc2U/bGF0PSR7bGF0fSZsb249JHtsb259JmxpbWl0PTEmYXBwaWQ9Mjg3MWM4ODk0NGI4MWZiYWI5MjJkNDcwMTI2OTViYTNgO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KTtcblxuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGl6YXRpb24gbm90IGZvdW5kYCk7XG5cdFx0XHRsZXQgY2l0eSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNpdHkgPSBjaXR5WzBdLm5hbWU7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5ncmFiRGF0YUJ5Q2l0eShzeXN0ZW0sIGNpdHkpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBncmFiRGF0YU5leHREYXlzKHN5c3RlbSwgbGF0LCBsb24pIHtcblx0XHRjb25zdCBhcGkgPSBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PSR7bGF0fSZsb249JHtsb259JnVuaXRzPSR7c3lzdGVtfSZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM2A7XG5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pO1xuXHRcdFx0aWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGl6YXRpb24gbm90IGZvdW5kYCk7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y29uc3QgbmV4dERheXMgPSB0aGlzLmV4dHJhY3ROZXh0RGF5cyhkYXRhLCBzeXN0ZW0pO1xuXG5cdFx0XHRjb25zb2xlLmxvZyhuZXh0RGF5cyk7XG5cblx0XHRcdHJldHVybiBuZXh0RGF5cztcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcblx0c3RhdGljIHNldFVuaXQoc3lzdGVtKSB7XG5cdFx0Y29uc3QgdW5pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2UtdW5pdHMnKTtcblx0XHRjb25zdCBzeXN0ZW1Vbml0cyA9IHVuaXRCdG4udmFsdWUgfHwgc3lzdGVtIHx8ICdtZXRyaWMnO1xuXHRcdHRoaXMudXBkYXRlVW5pdEJ0bih1bml0QnRuLCBzeXN0ZW1Vbml0cyk7XG5cdFx0cmV0dXJuIHN5c3RlbVVuaXRzO1xuXHR9XG5cblx0c3RhdGljIHVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpIHtcblx0XHRjb25zdCBuZXd1bml0QnRuID0gdW5pdEJ0bjtcblx0XHRuZXd1bml0QnRuLnZhbHVlID0gc3lzdGVtVW5pdHM7XG5cdFx0bmV3dW5pdEJ0bi5pbm5lckhUTUwgPSBzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycgPyAnPGI+wrBDPC9iPiB8IMKwRicgOiAnwrBDIHwgPGI+wrBGPC9iPic7XG5cdH1cblxuXHRzdGF0aWMgdG9nZ2xlVW5pdCh1bml0QnRuKSB7XG5cdFx0Y29uc3Qgc3lzdGVtVW5pdHMgPSB1bml0QnRuLmlubmVySFRNTC5pbmNsdWRlcygnPGI+wrBDPC9iPicpID8gJ2ltcGVyaWFsJyA6ICdtZXRyaWMnO1xuXHRcdHRoaXMudXBkYXRlVW5pdEJ0bih1bml0QnRuLCBzeXN0ZW1Vbml0cyk7XG5cdFx0dGhpcy5yZXBsYWNlVW5pdHMoc3lzdGVtVW5pdHMpO1xuXHR9XG5cblx0c3RhdGljIGNvbnZlcnRUZW1wZXJhdHVyZSh0ZW1wLCBzeXN0ZW1Vbml0cykge1xuXHRcdGxldCB0ZW1wTnVtYmVyID0gcGFyc2VGbG9hdCh0ZW1wKTtcblx0XHRpZiAoc3lzdGVtVW5pdHMgPT09ICdpbXBlcmlhbCcgJiYgdGVtcC5pbmNsdWRlcygnwrBDJykpIHtcblx0XHRcdHRlbXBOdW1iZXIgPSBNYXRoLnJvdW5kKCh0ZW1wTnVtYmVyICogOSkgLyA1ICsgMzIpO1xuXHRcdFx0cmV0dXJuIGAke3RlbXBOdW1iZXJ9wrBGYDtcblx0XHR9XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnbWV0cmljJyAmJiB0ZW1wLmluY2x1ZGVzKCfCsEYnKSkge1xuXHRcdFx0dGVtcE51bWJlciA9IE1hdGgucm91bmQoKCh0ZW1wTnVtYmVyIC0gMzIpICogNSkgLyA5KTtcblx0XHRcdHJldHVybiBgJHt0ZW1wTnVtYmVyfcKwQ2A7XG5cdFx0fVxuXHRcdHJldHVybiB0ZW1wO1xuXHR9XG5cblx0c3RhdGljIGNvbnZlcnRXaW5kU3BlZWQoc3BlZWQsIHN5c3RlbVVuaXRzKSB7XG5cdFx0bGV0IHNwZWVkTnVtYmVyID0gcGFyc2VGbG9hdChzcGVlZCk7XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnICYmIHNwZWVkLmluY2x1ZGVzKCdrbS9oJykpIHtcblx0XHRcdHNwZWVkTnVtYmVyID0gTWF0aC5yb3VuZChzcGVlZE51bWJlciAvIDEuNjA5Myk7XG5cdFx0XHRyZXR1cm4gYCR7c3BlZWROdW1iZXJ9IG1waGA7XG5cdFx0fVxuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycgJiYgc3BlZWQuaW5jbHVkZXMoJ21waCcpKSB7XG5cdFx0XHRzcGVlZE51bWJlciA9IE1hdGgucm91bmQoc3BlZWROdW1iZXIgKiAxLjYwOTMpO1xuXHRcdFx0cmV0dXJuIGAke3NwZWVkTnVtYmVyfSBrbS9oYDtcblx0XHR9XG5cdFx0cmV0dXJuIHNwZWVkO1xuXHR9XG5cblx0c3RhdGljIHJlcGxhY2VVbml0cyhzeXN0ZW1Vbml0cykge1xuXHRcdGNvbnN0IHRlbXBlcmF0dXJlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQgI3RlbXBlcmF0dXJlJyk7XG5cdFx0Y29uc3QgZmVlbHNMaWtlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWNvbmRhcnktY2FyZCAjZmVlbHMtbGlrZScpO1xuXHRcdGNvbnN0IHdpbmRTcGVlZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2Vjb25kYXJ5LWNhcmQgI3dpbmQtc3BlZWQnKTtcblx0XHRjb25zdCB0ZW1wZXJhdHVyZSA9IHRlbXBlcmF0dXJlRWxlbWVudC50ZXh0Q29udGVudDtcblx0XHRjb25zdCBmZWVsc0xpa2UgPSBmZWVsc0xpa2VFbGVtZW50LnRleHRDb250ZW50O1xuXHRcdGNvbnN0IHdpbmRTcGVlZCA9IHdpbmRTcGVlZEVsZW1lbnQudGV4dENvbnRlbnQ7XG5cdFx0dGVtcGVyYXR1cmVFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5jb252ZXJ0VGVtcGVyYXR1cmUodGVtcGVyYXR1cmUsIHN5c3RlbVVuaXRzKTtcblx0XHRmZWVsc0xpa2VFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5jb252ZXJ0VGVtcGVyYXR1cmUoZmVlbHNMaWtlLCBzeXN0ZW1Vbml0cyk7XG5cdFx0d2luZFNwZWVkRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuY29udmVydFdpbmRTcGVlZCh3aW5kU3BlZWQsIHN5c3RlbVVuaXRzKTtcblx0fVxuXG5cdHN0YXRpYyBsb2FkaW5nKHRvZ2dsZSkge1xuXHRcdGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGluZy1zcGlubmVyJyk7XG5cdFx0Y29uc3Qgd2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWF0aGVyLWNvbnRhaW5lcicpO1xuXG5cdFx0aWYgKHRvZ2dsZSkge1xuXHRcdFx0d2VhdGhlci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0XHRzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cdFx0XHR3ZWF0aGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgcGlja0NpdHkoZSkge1xuXHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0dGhpcy5sb2FkaW5nKHRydWUpO1xuXHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J0bicpKSB7XG5cdFx0XHRMb2dpYy5ncmFiRGF0YUJ5Q2l0eSh0aGlzLnNldFVuaXQoKSwgZS50YXJnZXQudGV4dENvbnRlbnQpLnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdFx0dGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcblx0XHRcdFx0dGhpcy5zZXRCY2dDb2xvcihkYXRhKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBzZWFyY2hDaXR5KCkge1xuXHRcdGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dCcpO1xuXG5cdFx0aW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZS50cmltKCk7XG5cdFx0aWYgKGlucHV0LnZhbHVlICE9PSAnJykge1xuXHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHRcdExvZ2ljLmdyYWJEYXRhQnlDaXR5KHRoaXMuc2V0VW5pdCgpLCBpbnB1dC52YWx1ZSlcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cdFx0XHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXlXZWF0aGVyKGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuc2V0QmNnQ29sb3IoZGF0YSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXHRcdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZmluZE1lKCkge1xuXHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0dGhpcy5sb2FkaW5nKHRydWUpO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBwb3NpdGlvbiA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXNvbHZlLCByZWplY3QpO1xuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCB7IGxhdGl0dWRlIH0gPSBwb3NpdGlvbi5jb29yZHM7XG5cdFx0XHRjb25zdCB7IGxvbmdpdHVkZSB9ID0gcG9zaXRpb24uY29vcmRzO1xuXG5cdFx0XHRMb2dpYy5ncmFiRGF0YUJ5UG9zaXRpb24odGhpcy5zZXRVbml0KCksIGxhdGl0dWRlLCBsb25naXR1ZGUpLnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdFx0dGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcblx0XHRcdFx0dGhpcy5zZXRCY2dDb2xvcihkYXRhKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcG9zaXRpb247XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGNsZWFyV2VhdGhlcigpIHtcblx0XHRjb25zdCBtYWluQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQnKTtcblx0XHRjb25zdCBpbWdDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltZy1jYXJkJyk7XG5cdFx0Y29uc3Qgc2Vjb25kYXJ5Q2FyZFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3NlY29uZGFyeS1jYXJkIHNwYW4nKTtcblxuXHRcdG1haW5DYXJkLnRleHRDb250ZW50ID0gJyc7XG5cdFx0aW1nQ2FyZC50ZXh0Q29udGVudCA9ICcnO1xuXHRcdHNlY29uZGFyeUNhcmRTcGFucy5mb3JFYWNoKChwYXJhbSkgPT4ge1xuXHRcdFx0Y29uc3Qgc3BhbiA9IHBhcmFtO1xuXHRcdFx0c3Bhbi50ZXh0Q29udGVudCA9ICcnO1xuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlNYWluQ2FyZChkYXRhKSB7XG5cdFx0Y29uc3QgbWFpbkNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jYXJkJyk7XG5cblx0XHRjb25zdCBjaXR5Q291bnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcblxuXHRcdGNpdHlDb3VudHJ5LnNldEF0dHJpYnV0ZSgnaWQnLCAnY2l0eS1jb3VudHJ5Jyk7XG5cdFx0dGVtcGVyYXR1cmUuc2V0QXR0cmlidXRlKCdpZCcsICd0ZW1wZXJhdHVyZScpO1xuXHRcdGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVzY3JpcHRpb24nKTtcblxuXHRcdGlmIChkYXRhLmNvdW50cnkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y2l0eUNvdW50cnkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmNpdHl9LCAke2RhdGEuY291bnRyeX1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaXR5Q291bnRyeS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eX1gO1xuXHRcdH1cblx0XHR0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGAke2RhdGEudGVtcGVyYXR1cmV9YDtcblx0XHRkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke2RhdGEuZGVzY3JpcHRpb259YDtcblxuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGNpdHlDb3VudHJ5KTtcblx0XHRtYWluQ2FyZC5hcHBlbmRDaGlsZCh0ZW1wZXJhdHVyZSk7XG5cdFx0bWFpbkNhcmQuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlJbWdDYXJkKGRhdGEpIHtcblx0XHRjb25zdCBpbWdDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltZy1jYXJkJyk7XG5cdFx0Y29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0aW1nLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmljb259QDR4LnBuZ2A7XG5cdFx0aW1nLmFsdCA9IGRhdGEuZGVzY3JpcHRpb247XG5cdFx0aW1nQ2FyZC5hcHBlbmRDaGlsZChpbWcpO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlTZWNvbmRhcnlDYXJkKGRhdGEpIHtcblx0XHRjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVlbHMtbGlrZScpO1xuXHRcdGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2h1bWlkaXR5Jyk7XG5cdFx0Y29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpbmQtc3BlZWQnKTtcblx0XHRjb25zdCBwcmVzc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmVzc3VyZScpO1xuXG5cdFx0ZmVlbHNMaWtlLmFwcGVuZChgICR7ZGF0YS5mZWVsc0xpa2VUZW1wfWApO1xuXHRcdGh1bWlkaXR5LmFwcGVuZChgICR7ZGF0YS5odW1pZGl0eVBlcmNlbnR9YCk7XG5cdFx0d2luZFNwZWVkLmFwcGVuZChgICR7ZGF0YS53aW5kU3BlZWRVbml0fWApO1xuXHRcdHByZXNzdXJlLmFwcGVuZChgICR7ZGF0YS5wcmVzc3VyZVVuaXR9YCk7XG5cdH1cblxuXHQvLyBzdGF0aWMgZGlzcGxheVRvbW1vcm93Q2FyZChkYXRhKSB7XG5cdC8vIGNvbnN0IHRvbW1vcm93Q2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b21tb3Jvdy1jYXJkJyk7XG5cdC8vIGNvbnN0IGFmdGVyVG9tbW9yb3dDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FmdGVyLXRvbW1vcm93LWNhcmQnKTtcblx0Ly8gY29uc3QgbmV4dEFmdGVyVG9tbW9yb3dDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHQtYWZ0ZXItdG9tbW9yb3ctY2FyZCcpO1xuXG5cdC8vIHdlYXRoZXIuYXBwZW5kQ2hpbGQodG9tbW9yb3dDYXJkKTtcblx0Ly8gd2VhdGhlci5hcHBlbmRDaGlsZChhZnRlclRvbW1vcm93Q2FyZCk7XG5cdC8vIHdlYXRoZXIuYXBwZW5kQ2hpbGQobmV4dEFmdGVyVG9tbW9yb3dDYXJkKTtcblx0Ly8gfVxuXG5cdHN0YXRpYyBkaXNwbGF5V2VhdGhlcihkYXRhKSB7XG5cdFx0dGhpcy5kaXNwbGF5TWFpbkNhcmQoZGF0YSk7XG5cdFx0dGhpcy5kaXNwbGF5SW1nQ2FyZChkYXRhKTtcblx0XHR0aGlzLmRpc3BsYXlTZWNvbmRhcnlDYXJkKGRhdGEpO1xuXHRcdC8vIHRoaXMuZGlzcGxheVRvbW1vcm93Q2FyZChkYXRhKTtcblx0fVxuXG5cdHN0YXRpYyBzZXRCY2dDb2xvcihkYXRhKSB7XG5cdFx0bGV0IHRlbXAgPSBwYXJzZUludChkYXRhLnRlbXBlcmF0dXJlLCAxMCk7XG5cdFx0Y29uc3QgbWluVGVtcCA9IDA7XG5cdFx0Y29uc3QgbWF4VGVtcCA9IDMwO1xuXG5cdFx0Y29uc3QgbWluSHNsID0gMjIwO1xuXHRcdGNvbnN0IG1heEhzbCA9IDA7XG5cblx0XHR0ZW1wID0gdGVtcCA+IG1heFRlbXAgPyBtYXhUZW1wIDogdGVtcDtcblx0XHR0ZW1wID0gdGVtcCA8IG1pblRlbXAgPyBtaW5UZW1wIDogdGVtcDtcblxuXHRcdGNvbnN0IHJhbmdlVGVtcCA9IG1heFRlbXAgLSBtaW5UZW1wO1xuXHRcdGNvbnN0IHJhbmdlSHNsID0gbWF4SHNsIC0gbWluSHNsO1xuXHRcdGNvbnN0IGRlZ0NvdW50ID0gbWF4VGVtcCAtIHRlbXA7XG5cdFx0Y29uc3QgaHNsc0RlZyA9IHJhbmdlSHNsIC8gcmFuZ2VUZW1wO1xuXHRcdGNvbnN0IHJldHVybkh1ZSA9IDM2MCAtIChkZWdDb3VudCAqIGhzbHNEZWcgLSAobWF4SHNsIC0gMzYwKSk7XG5cblx0XHRjb25zdCBjb2xvciA9IGBoc2woJHtyZXR1cm5IdWV9LCAxMDAlLCA3NSUpYDtcblx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuXHR9XG5cblx0c3RhdGljIGF0dGFjaExpc3RlbmVycygpIHtcblx0XHRjb25zdCBzYW1wbGVMb2NhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FtcGxlLWxvY2F0aW9ucycpO1xuXHRcdGNvbnN0IHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzJyk7XG5cdFx0Y29uc3Qgc2VhcmNoQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1ib3gnKTtcblx0XHRjb25zdCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ0bicpO1xuXHRcdGNvbnN0IGZpbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmluZC1idG4nKTtcblxuXHRcdHNhbXBsZUxvY2F0aW9ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnBpY2tDaXR5KGUpKTtcblx0XHRzZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cdFx0c2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZWFyY2hDaXR5KCkpO1xuXHRcdGZpbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmZpbmRNZSgpKTtcblx0XHR1bml0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVVbml0KHVuaXRCdG4pKTtcblx0fVxuXG5cdHN0YXRpYyBydW5BcHAoKSB7XG5cdFx0dGhpcy5hdHRhY2hMaXN0ZW5lcnMoKTtcblxuXHRcdHRoaXMuZmluZE1lKCk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdub3JtYWxpemUuY3NzJztcbmltcG9ydCAnLi9zdHlsZS9zdHlsZS5jc3MnO1xuaW1wb3J0IFVJIGZyb20gJy4vY29kZS91aSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5ydW5BcHAoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=