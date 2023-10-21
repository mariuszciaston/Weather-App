/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
			weather: [{ main: weather, description }],
			wind: { speed: windSpeed },
			main: { temp, feels_like: feelsLike, pressure, humidity },
		} = data;
		const temperature = Math.round(temp) + this.addDegrees(system);
		const feelsLikeTemp = Math.round(feelsLike) + this.addDegrees(system);
		const windSpeedUnit = this.windSpeedConversion(system, windSpeed);
		const pressureUnit = `${pressure} hPa`;
		const humidityPercent = `${humidity}%`;

		return { city, country, weather, description, windSpeedUnit, temperature, feelsLikeTemp, pressureUnit, humidityPercent };
	}

	static async grabData(city, system) {
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

			console.log(data);
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
	static selectUnits(system) {
		const unitsBtn = document.querySelector('#change-units');
		let systemUnits = unitsBtn.value || system || 'metric';

		const updateButton = () => {
			unitsBtn.value = systemUnits;
			unitsBtn.innerHTML = systemUnits === 'metric' ? '<b>°C</b> | °F' : '°C | <b>°F</b>';
		};
		updateButton();

		unitsBtn.addEventListener('click', () => {
			systemUnits = systemUnits === 'metric' ? 'imperial' : 'metric';
			updateButton();
		});

		return systemUnits;
	}

	static loading(toggle) {
		const cog = document.querySelector('i.fa-cog');

		if (toggle) {
			cog.classList.add('visible');
		} else {
			cog.classList.remove('visible');
		}
	}

	static pickCity() {
		const sampleLocations = document.querySelector('#sample-locations');
		sampleLocations.addEventListener('click', (e) => {
			this.loading(true);
			if (e.target.classList.contains('btn')) {
				_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabData(e.target.textContent, this.selectUnits()).then(() => {
					this.loading(false);
				});
			}
		});
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
				_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabData(input.value, this.selectUnits())
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

	static async findMe() {
		try {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			return position;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	static eventListeners() {
		const findBtn = document.querySelector('#find-btn');
		findBtn.addEventListener('click', () => this.findMe());
	}

	static startApp() {
		this.pickCity();
		this.selectUnits();
		this.searchCity();

		this.eventListeners();
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
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/style.css */ "./src/style/style.css");
/* harmony import */ var _code_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./code/ui */ "./src/code/ui.js");



document.addEventListener('DOMContentLoaded', _code_ui__WEBPACK_IMPORTED_MODULE_1__["default"].startApp());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0EsY0FBYyx1QkFBdUI7QUFDckM7QUFDQSxjQUFjLGlCQUFpQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsU0FBUztBQUNuQixlQUFlLDRCQUE0QjtBQUMzQyxXQUFXLGtCQUFrQjtBQUM3QixXQUFXLGlEQUFpRDtBQUM1RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7QUFDcEMsNkJBQTZCLFNBQVM7O0FBRXRDLFdBQVc7QUFDWDs7QUFFQTtBQUNBLG1FQUFtRSxLQUFLLFNBQVMsT0FBTzs7QUFFeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7O0FBRUosOENBQThDLEtBQUs7QUFDbkQ7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkU0Qjs7QUFFYjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhDQUFLO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhDQUFLO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM3RkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMkI7QUFDQTs7QUFFM0IsOENBQThDLGdEQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvbG9naWMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29kZS91aS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2ljIHtcblx0c3RhdGljIGFkZERlZ3JlZXMoc3lzdGVtKSB7XG5cdFx0c3dpdGNoIChzeXN0ZW0pIHtcblx0XHRcdGNhc2UgJ21ldHJpYyc6XG5cdFx0XHRcdHJldHVybiAnwrBDJztcblx0XHRcdGNhc2UgJ2ltcGVyaWFsJzpcblx0XHRcdFx0cmV0dXJuICfCsEYnO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuICfCsEMnO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyB3aW5kU3BlZWRDb252ZXJzaW9uKHN5c3RlbSwgd2luZFNwZWVkKSB7XG5cdFx0Y29uc3QgbWV0cmljV2luZFNwZWVkID0gTWF0aC5yb3VuZCh3aW5kU3BlZWQgKiAzLjYpO1xuXG5cdFx0c3dpdGNoIChzeXN0ZW0pIHtcblx0XHRcdGNhc2UgJ21ldHJpYyc6XG5cdFx0XHRcdHJldHVybiBgJHttZXRyaWNXaW5kU3BlZWR9IGttL2hgO1xuXHRcdFx0Y2FzZSAnaW1wZXJpYWwnOlxuXHRcdFx0XHRyZXR1cm4gYCR7TWF0aC5yb3VuZCh3aW5kU3BlZWQpfSBtcGhgO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGAke21ldHJpY1dpbmRTcGVlZH0ga20vaGA7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGV4dHJhY3REYXRhKGRhdGEsIHN5c3RlbSkge1xuXHRcdGNvbnN0IHtcblx0XHRcdG5hbWU6IGNpdHksXG5cdFx0XHRzeXM6IHsgY291bnRyeSB9LFxuXHRcdFx0d2VhdGhlcjogW3sgbWFpbjogd2VhdGhlciwgZGVzY3JpcHRpb24gfV0sXG5cdFx0XHR3aW5kOiB7IHNwZWVkOiB3aW5kU3BlZWQgfSxcblx0XHRcdG1haW46IHsgdGVtcCwgZmVlbHNfbGlrZTogZmVlbHNMaWtlLCBwcmVzc3VyZSwgaHVtaWRpdHkgfSxcblx0XHR9ID0gZGF0YTtcblx0XHRjb25zdCB0ZW1wZXJhdHVyZSA9IE1hdGgucm91bmQodGVtcCkgKyB0aGlzLmFkZERlZ3JlZXMoc3lzdGVtKTtcblx0XHRjb25zdCBmZWVsc0xpa2VUZW1wID0gTWF0aC5yb3VuZChmZWVsc0xpa2UpICsgdGhpcy5hZGREZWdyZWVzKHN5c3RlbSk7XG5cdFx0Y29uc3Qgd2luZFNwZWVkVW5pdCA9IHRoaXMud2luZFNwZWVkQ29udmVyc2lvbihzeXN0ZW0sIHdpbmRTcGVlZCk7XG5cdFx0Y29uc3QgcHJlc3N1cmVVbml0ID0gYCR7cHJlc3N1cmV9IGhQYWA7XG5cdFx0Y29uc3QgaHVtaWRpdHlQZXJjZW50ID0gYCR7aHVtaWRpdHl9JWA7XG5cblx0XHRyZXR1cm4geyBjaXR5LCBjb3VudHJ5LCB3ZWF0aGVyLCBkZXNjcmlwdGlvbiwgd2luZFNwZWVkVW5pdCwgdGVtcGVyYXR1cmUsIGZlZWxzTGlrZVRlbXAsIHByZXNzdXJlVW5pdCwgaHVtaWRpdHlQZXJjZW50IH07XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZ3JhYkRhdGEoY2l0eSwgc3lzdGVtKSB7XG5cdFx0Y29uc3QgYXBpID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZ1bml0cz0ke3N5c3RlbX0mYXBwaWQ9Mjg3MWM4ODk0NGI4MWZiYWI5MjJkNDcwMTI2OTViYTNgO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KTtcblx0XHRcdFx0XHRcdHJlc29sdmUocmVzKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIDEwMDApO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgQ2l0eSAnJHtjaXR5fScgbm90IGZvdW5kYCk7XG5cdFx0XHRjb25zdCBkYXRhID0gdGhpcy5leHRyYWN0RGF0YShhd2FpdCByZXNwb25zZS5qc29uKCksIHN5c3RlbSk7XG5cblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG5cdHN0YXRpYyBzZWxlY3RVbml0cyhzeXN0ZW0pIHtcblx0XHRjb25zdCB1bml0c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2UtdW5pdHMnKTtcblx0XHRsZXQgc3lzdGVtVW5pdHMgPSB1bml0c0J0bi52YWx1ZSB8fCBzeXN0ZW0gfHwgJ21ldHJpYyc7XG5cblx0XHRjb25zdCB1cGRhdGVCdXR0b24gPSAoKSA9PiB7XG5cdFx0XHR1bml0c0J0bi52YWx1ZSA9IHN5c3RlbVVuaXRzO1xuXHRcdFx0dW5pdHNCdG4uaW5uZXJIVE1MID0gc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnID8gJzxiPsKwQzwvYj4gfCDCsEYnIDogJ8KwQyB8IDxiPsKwRjwvYj4nO1xuXHRcdH07XG5cdFx0dXBkYXRlQnV0dG9uKCk7XG5cblx0XHR1bml0c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdHN5c3RlbVVuaXRzID0gc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnID8gJ2ltcGVyaWFsJyA6ICdtZXRyaWMnO1xuXHRcdFx0dXBkYXRlQnV0dG9uKCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc3lzdGVtVW5pdHM7XG5cdH1cblxuXHRzdGF0aWMgbG9hZGluZyh0b2dnbGUpIHtcblx0XHRjb25zdCBjb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpLmZhLWNvZycpO1xuXG5cdFx0aWYgKHRvZ2dsZSkge1xuXHRcdFx0Y29nLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29nLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgcGlja0NpdHkoKSB7XG5cdFx0Y29uc3Qgc2FtcGxlTG9jYXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhbXBsZS1sb2NhdGlvbnMnKTtcblx0XHRzYW1wbGVMb2NhdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0dGhpcy5sb2FkaW5nKHRydWUpO1xuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnRuJykpIHtcblx0XHRcdFx0TG9naWMuZ3JhYkRhdGEoZS50YXJnZXQudGV4dENvbnRlbnQsIHRoaXMuc2VsZWN0VW5pdHMoKSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgc2VhcmNoQ2l0eSgpIHtcblx0XHRjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcblx0XHRjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ0bicpO1xuXHRcdGNvbnN0IHNlYXJjaEJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYm94Jyk7XG5cblx0XHRzZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUudHJpbSgpO1xuXHRcdFx0aWYgKGlucHV0LnZhbHVlICE9PSAnJykge1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0XHRcdExvZ2ljLmdyYWJEYXRhKGlucHV0LnZhbHVlLCB0aGlzLnNlbGVjdFVuaXRzKCkpXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5sb2FkaW5nKGZhbHNlKTtcblx0XHRcdFx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZmluZE1lKCkge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBwb3NpdGlvbiA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXNvbHZlLCByZWplY3QpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcG9zaXRpb247XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblx0XHRcdHJldHVybiBlcnJvcjtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZXZlbnRMaXN0ZW5lcnMoKSB7XG5cdFx0Y29uc3QgZmluZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaW5kLWJ0bicpO1xuXHRcdGZpbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmZpbmRNZSgpKTtcblx0fVxuXG5cdHN0YXRpYyBzdGFydEFwcCgpIHtcblx0XHR0aGlzLnBpY2tDaXR5KCk7XG5cdFx0dGhpcy5zZWxlY3RVbml0cygpO1xuXHRcdHRoaXMuc2VhcmNoQ2l0eSgpO1xuXG5cdFx0dGhpcy5ldmVudExpc3RlbmVycygpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS9zdHlsZS5jc3MnO1xuaW1wb3J0IFVJIGZyb20gJy4vY29kZS91aSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5zdGFydEFwcCgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==