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
				}, 1000);
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
		const cog = document.querySelector('i.fa-cog');

		if (toggle) {
			cog.classList.add('show');
		} else {
			cog.classList.remove('show');
		}
	}

	static pickCity(e) {
		this.loading(true);
		if (e.target.classList.contains('btn')) {
			_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabDataByCity(this.setUnit(), e.target.textContent).then((data) => {
				this.loading(false);
				this.clearWeather();
				this.displayWeather(data);
			});
		}
	}

	static searchCity() {
		const input = document.querySelector('#search-input');

		input.value = input.value.trim();
		if (input.value !== '') {
			this.loading(true);
			_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabDataByCity(this.setUnit(), input.value)
				.then((data) => {
					this.loading(false);
					input.value = '';
					this.clearWeather();
					this.displayWeather(data);
				})

				.catch(() => {
					this.loading(false);
					input.value = '';
					this.clearWeather();
				});
		}
	}

	static async findMe() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ051QjtBQUNJO0FBQ0E7O0FBRTNCLDhDQUE4QyxnREFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcz9mYjU3Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlL3N0eWxlLmNzcz8zMjBiIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvbG9naWMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29kZS91aS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2ljIHtcblx0c3RhdGljIGFkZERlZ3JlZXMoc3lzdGVtKSB7XG5cdFx0c3dpdGNoIChzeXN0ZW0pIHtcblx0XHRcdGNhc2UgJ21ldHJpYyc6XG5cdFx0XHRcdHJldHVybiAnwrBDJztcblx0XHRcdGNhc2UgJ2ltcGVyaWFsJzpcblx0XHRcdFx0cmV0dXJuICfCsEYnO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuICfCsEMnO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyB3aW5kU3BlZWRDb252ZXJzaW9uKHN5c3RlbSwgd2luZFNwZWVkKSB7XG5cdFx0Y29uc3QgbWV0cmljV2luZFNwZWVkID0gTWF0aC5yb3VuZCh3aW5kU3BlZWQgKiAzLjYpO1xuXG5cdFx0c3dpdGNoIChzeXN0ZW0pIHtcblx0XHRcdGNhc2UgJ21ldHJpYyc6XG5cdFx0XHRcdHJldHVybiBgJHttZXRyaWNXaW5kU3BlZWR9IGttL2hgO1xuXHRcdFx0Y2FzZSAnaW1wZXJpYWwnOlxuXHRcdFx0XHRyZXR1cm4gYCR7TWF0aC5yb3VuZCh3aW5kU3BlZWQpfSBtcGhgO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGAke21ldHJpY1dpbmRTcGVlZH0ga20vaGA7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGV4dHJhY3REYXRhKGRhdGEsIHN5c3RlbSkge1xuXHRcdGNvbnN0IHtcblx0XHRcdG5hbWU6IGNpdHksXG5cdFx0XHRzeXM6IHsgY291bnRyeSB9LFxuXHRcdFx0d2VhdGhlcjogW3sgbWFpbjogd2VhdGhlciwgZGVzY3JpcHRpb24sIGljb24gfV0sXG5cdFx0XHR3aW5kOiB7IHNwZWVkOiB3aW5kU3BlZWQgfSxcblx0XHRcdG1haW46IHsgdGVtcCwgZmVlbHNfbGlrZTogZmVlbHNMaWtlLCBwcmVzc3VyZSwgaHVtaWRpdHkgfSxcblx0XHR9ID0gZGF0YTtcblx0XHRjb25zdCB0ZW1wZXJhdHVyZSA9IE1hdGgucm91bmQodGVtcCkgKyB0aGlzLmFkZERlZ3JlZXMoc3lzdGVtKTtcblx0XHRjb25zdCBmZWVsc0xpa2VUZW1wID0gTWF0aC5yb3VuZChmZWVsc0xpa2UpICsgdGhpcy5hZGREZWdyZWVzKHN5c3RlbSk7XG5cdFx0Y29uc3Qgd2luZFNwZWVkVW5pdCA9IHRoaXMud2luZFNwZWVkQ29udmVyc2lvbihzeXN0ZW0sIHdpbmRTcGVlZCk7XG5cdFx0Y29uc3QgcHJlc3N1cmVVbml0ID0gYCR7cHJlc3N1cmV9IGhQYWA7XG5cdFx0Y29uc3QgaHVtaWRpdHlQZXJjZW50ID0gYCR7aHVtaWRpdHl9JWA7XG5cblx0XHRyZXR1cm4geyBjaXR5LCBjb3VudHJ5LCBpY29uLCB0ZW1wZXJhdHVyZSwgZmVlbHNMaWtlVGVtcCwgaHVtaWRpdHlQZXJjZW50LCB3aW5kU3BlZWRVbml0LCBwcmVzc3VyZVVuaXQsIGRlc2NyaXB0aW9uLCB3ZWF0aGVyIH07XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZ3JhYkRhdGFCeUNpdHkoc3lzdGVtLCBjaXR5KSB7XG5cdFx0Y29uc3QgYXBpID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZ1bml0cz0ke3N5c3RlbX0mYXBwaWQ9Mjg3MWM4ODk0NGI4MWZiYWI5MjJkNDcwMTI2OTViYTNgO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KTtcblx0XHRcdFx0XHRcdHJlc29sdmUocmVzKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIDEwMDApO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgQ2l0eSAnJHtjaXR5fScgbm90IGZvdW5kYCk7XG5cdFx0XHRjb25zdCBkYXRhID0gdGhpcy5leHRyYWN0RGF0YShhd2FpdCByZXNwb25zZS5qc29uKCksIHN5c3RlbSk7XG5cblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRhbGVydChlcnJvcik7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZ3JhYkRhdGFCeVBvc2l0aW9uKHN5c3RlbSwgbGF0LCBsb24pIHtcblx0XHRjb25zdCBhcGkgPSBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9yZXZlcnNlP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZsaW1pdD0xJmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzYDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0c2V0VGltZW91dChhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlcyk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCAxMDAwKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYExvY2FsaXphdGlvbiBub3QgZm91bmRgKTtcblx0XHRcdGxldCBjaXR5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0Y2l0eSA9IGNpdHlbMF0ubmFtZTtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmdyYWJEYXRhQnlDaXR5KHN5c3RlbSwgY2l0eSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcblx0c3RhdGljIHNldFVuaXQoc3lzdGVtKSB7XG5cdFx0Y29uc3QgdW5pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2UtdW5pdHMnKTtcblx0XHRjb25zdCBzeXN0ZW1Vbml0cyA9IHVuaXRCdG4udmFsdWUgfHwgc3lzdGVtIHx8ICdtZXRyaWMnO1xuXHRcdHRoaXMudXBkYXRlVW5pdEJ0bih1bml0QnRuLCBzeXN0ZW1Vbml0cyk7XG5cdFx0cmV0dXJuIHN5c3RlbVVuaXRzO1xuXHR9XG5cblx0c3RhdGljIHVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpIHtcblx0XHRjb25zdCBuZXd1bml0QnRuID0gdW5pdEJ0bjtcblx0XHRuZXd1bml0QnRuLnZhbHVlID0gc3lzdGVtVW5pdHM7XG5cdFx0bmV3dW5pdEJ0bi5pbm5lckhUTUwgPSBzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycgPyAnPGI+wrBDPC9iPiB8IMKwRicgOiAnwrBDIHwgPGI+wrBGPC9iPic7XG5cdH1cblxuXHRzdGF0aWMgdG9nZ2xlVW5pdCh1bml0QnRuKSB7XG5cdFx0Y29uc3Qgc3lzdGVtVW5pdHMgPSB1bml0QnRuLmlubmVySFRNTC5pbmNsdWRlcygnPGI+wrBDPC9iPicpID8gJ2ltcGVyaWFsJyA6ICdtZXRyaWMnO1xuXHRcdHRoaXMudXBkYXRlVW5pdEJ0bih1bml0QnRuLCBzeXN0ZW1Vbml0cyk7XG5cdH1cblxuXHRzdGF0aWMgbG9hZGluZyh0b2dnbGUpIHtcblx0XHRjb25zdCBjb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpLmZhLWNvZycpO1xuXG5cdFx0aWYgKHRvZ2dsZSkge1xuXHRcdFx0Y29nLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29nLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgcGlja0NpdHkoZSkge1xuXHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4nKSkge1xuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGUudGFyZ2V0LnRleHRDb250ZW50KS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdHRoaXMuZGlzcGxheVdlYXRoZXIoZGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgc2VhcmNoQ2l0eSgpIHtcblx0XHRjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcblxuXHRcdGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUudHJpbSgpO1xuXHRcdGlmIChpbnB1dC52YWx1ZSAhPT0gJycpIHtcblx0XHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHRcdExvZ2ljLmdyYWJEYXRhQnlDaXR5KHRoaXMuc2V0VW5pdCgpLCBpbnB1dC52YWx1ZSlcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cdFx0XHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXlXZWF0aGVyKGRhdGEpO1xuXHRcdFx0XHR9KVxuXG5cdFx0XHRcdC5jYXRjaCgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXHRcdFx0XHRcdHRoaXMuY2xlYXJXZWF0aGVyKCk7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBmaW5kTWUoKSB7XG5cdFx0dGhpcy5sb2FkaW5nKHRydWUpO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBwb3NpdGlvbiA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXNvbHZlLCByZWplY3QpO1xuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCB7IGxhdGl0dWRlIH0gPSBwb3NpdGlvbi5jb29yZHM7XG5cdFx0XHRjb25zdCB7IGxvbmdpdHVkZSB9ID0gcG9zaXRpb24uY29vcmRzO1xuXG5cdFx0XHRMb2dpYy5ncmFiRGF0YUJ5UG9zaXRpb24odGhpcy5zZXRVbml0KCksIGxhdGl0dWRlLCBsb25naXR1ZGUpLnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHRcdFx0dGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcG9zaXRpb247XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGNsZWFyV2VhdGhlcigpIHtcblx0XHRjb25zdCBpbWdDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltZy1jYXJkJyk7XG5cdFx0Y29uc3QgbWFpbkNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1jYXJkJyk7XG5cdFx0Y29uc3Qgc2Vjb25kYXJ5Q2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWNvbmRhcnktY2FyZCcpO1xuXG5cdFx0aW1nQ2FyZC50ZXh0Q29udGVudCA9ICcnO1xuXHRcdG1haW5DYXJkLnRleHRDb250ZW50ID0gJyc7XG5cdFx0c2Vjb25kYXJ5Q2FyZC50ZXh0Q29udGVudCA9ICcnO1xuXHR9XG5cblx0c3RhdGljIGRpc3BsYXlXZWF0aGVyKGRhdGEpIHtcblx0XHRjb25zdCB3ZWF0aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dlYXRoZXInKTtcblxuXHRcdGNvbnN0IGltZ0NhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW1nLWNhcmQnKTtcblx0XHRjb25zdCBtYWluQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQnKTtcblx0XHRjb25zdCBzZWNvbmRhcnlDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY29uZGFyeS1jYXJkJyk7XG5cblx0XHRjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRpbWcuc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGEuaWNvbn1ANHgucG5nYDtcblx0XHRpbWcuYWx0ID0gZGF0YS5kZXNjcmlwdGlvbjtcblxuXHRcdGNvbnN0IGgxQ2l0eUNvdW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGNvbnN0IGgxVGVtcGVyYXR1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXHRcdGNvbnN0IGgxRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuXG5cdFx0Y29uc3QgcEZlZWxzTGlrZVRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0Y29uc3QgcEh1bWlkaXR5UGVyY2VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRjb25zdCBwV2luZFNwZWVkVW5pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRjb25zdCBwUHJlc3N1cmVVbml0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG5cdFx0aWYgKGRhdGEuY291bnRyeSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRoMUNpdHlDb3VudHJ5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jaXR5fSwgJHtkYXRhLmNvdW50cnl9YDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aDFDaXR5Q291bnRyeS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eX1gO1xuXHRcdH1cblxuXHRcdGgxVGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBgJHtkYXRhLnRlbXBlcmF0dXJlfWA7XG5cdFx0aDFEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke2RhdGEuZGVzY3JpcHRpb259YDtcblx0XHRwRmVlbHNMaWtlVGVtcC50ZXh0Q29udGVudCA9IGBGZWVscyBsaWtlOiAke2RhdGEuZmVlbHNMaWtlVGVtcH1gO1xuXHRcdHBIdW1pZGl0eVBlcmNlbnQudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7ZGF0YS5odW1pZGl0eVBlcmNlbnR9YDtcblx0XHRwV2luZFNwZWVkVW5pdC50ZXh0Q29udGVudCA9IGBXaW5kIHNwZWVkOiAke2RhdGEud2luZFNwZWVkVW5pdH1gO1xuXHRcdHBQcmVzc3VyZVVuaXQudGV4dENvbnRlbnQgPSBgUHJlc3N1cmU6ICR7ZGF0YS5wcmVzc3VyZVVuaXR9YDtcblxuXHRcdGltZ0NhcmQuYXBwZW5kQ2hpbGQoaW1nKTtcblxuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGgxQ2l0eUNvdW50cnkpO1xuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGgxVGVtcGVyYXR1cmUpO1xuXHRcdG1haW5DYXJkLmFwcGVuZENoaWxkKGgxRGVzY3JpcHRpb24pO1xuXG5cdFx0c2Vjb25kYXJ5Q2FyZC5hcHBlbmRDaGlsZChwRmVlbHNMaWtlVGVtcCk7XG5cdFx0c2Vjb25kYXJ5Q2FyZC5hcHBlbmRDaGlsZChwSHVtaWRpdHlQZXJjZW50KTtcblx0XHRzZWNvbmRhcnlDYXJkLmFwcGVuZENoaWxkKHBXaW5kU3BlZWRVbml0KTtcblx0XHRzZWNvbmRhcnlDYXJkLmFwcGVuZENoaWxkKHBQcmVzc3VyZVVuaXQpO1xuXG5cdFx0d2VhdGhlci5hcHBlbmRDaGlsZChtYWluQ2FyZCk7XG5cdFx0d2VhdGhlci5hcHBlbmRDaGlsZChzZWNvbmRhcnlDYXJkKTtcblx0fVxuXG5cdHN0YXRpYyBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cdFx0Y29uc3Qgc2FtcGxlTG9jYXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhbXBsZS1sb2NhdGlvbnMnKTtcblx0XHRjb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZS11bml0cycpO1xuXHRcdGNvbnN0IHNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYm94Jyk7XG5cdFx0Y29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idG4nKTtcblx0XHRjb25zdCBmaW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbmQtYnRuJyk7XG5cblx0XHRzYW1wbGVMb2NhdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5waWNrQ2l0eShlKSk7XG5cdFx0c2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXHRcdHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VhcmNoQ2l0eSgpKTtcblx0XHRmaW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5maW5kTWUoKSk7XG5cdFx0dW5pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlVW5pdCh1bml0QnRuKSk7XG5cdH1cblxuXHRzdGF0aWMgcnVuQXBwKCkge1xuXHRcdHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdub3JtYWxpemUuY3NzJztcbmltcG9ydCAnLi9zdHlsZS9zdHlsZS5jc3MnO1xuaW1wb3J0IFVJIGZyb20gJy4vY29kZS91aSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5ydW5BcHAoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=