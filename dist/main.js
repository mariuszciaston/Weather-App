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
			const response = await fetch(api, { mode: 'cors' });
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
	static pickCity() {
		const sampleLocations = document.querySelector('#sample-locations');
		sampleLocations.addEventListener('click', (e) => {
			this.loading(true);
			if (e.target.classList.contains('btn')) {
				_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabData(e.target.textContent, 'metric').then(() => {
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
				_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabData(input.value, 'metric')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0EsY0FBYyx1QkFBdUI7QUFDckM7QUFDQSxjQUFjLGlCQUFpQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsU0FBUztBQUNuQixlQUFlLDRCQUE0QjtBQUMzQyxXQUFXLGtCQUFrQjtBQUM3QixXQUFXLGlEQUFpRDtBQUM1RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7QUFDcEMsNkJBQTZCLFNBQVM7O0FBRXRDLFdBQVc7QUFDWDs7QUFFQTtBQUNBLG1FQUFtRSxLQUFLLFNBQVMsT0FBTzs7QUFFeEY7QUFDQSx1Q0FBdUMsY0FBYztBQUNyRCw4Q0FBOEMsS0FBSztBQUNuRDs7QUFFQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUQ0Qjs7QUFFYjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhDQUFLO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksOENBQUs7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDdkVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjJCO0FBQ0E7O0FBRTNCLDhDQUE4QyxnREFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb2RlL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvdWkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpYyB7XG5cdHN0YXRpYyBhZGREZWdyZWVzKHN5c3RlbSkge1xuXHRcdHN3aXRjaCAoc3lzdGVtKSB7XG5cdFx0XHRjYXNlICdtZXRyaWMnOlxuXHRcdFx0XHRyZXR1cm4gJ8KwQyc7XG5cdFx0XHRjYXNlICdpbXBlcmlhbCc6XG5cdFx0XHRcdHJldHVybiAnwrBGJztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAnwrBDJztcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgd2luZFNwZWVkQ29udmVyc2lvbihzeXN0ZW0sIHdpbmRTcGVlZCkge1xuXHRcdGNvbnN0IG1ldHJpY1dpbmRTcGVlZCA9IE1hdGgucm91bmQod2luZFNwZWVkICogMy42KTtcblxuXHRcdHN3aXRjaCAoc3lzdGVtKSB7XG5cdFx0XHRjYXNlICdtZXRyaWMnOlxuXHRcdFx0XHRyZXR1cm4gYCR7bWV0cmljV2luZFNwZWVkfSBrbS9oYDtcblx0XHRcdGNhc2UgJ2ltcGVyaWFsJzpcblx0XHRcdFx0cmV0dXJuIGAke01hdGgucm91bmQod2luZFNwZWVkKX0gbXBoYDtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBgJHttZXRyaWNXaW5kU3BlZWR9IGttL2hgO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBleHRyYWN0RGF0YShkYXRhLCBzeXN0ZW0pIHtcblx0XHRjb25zdCB7XG5cdFx0XHRuYW1lOiBjaXR5LFxuXHRcdFx0c3lzOiB7IGNvdW50cnkgfSxcblx0XHRcdHdlYXRoZXI6IFt7IG1haW46IHdlYXRoZXIsIGRlc2NyaXB0aW9uIH1dLFxuXHRcdFx0d2luZDogeyBzcGVlZDogd2luZFNwZWVkIH0sXG5cdFx0XHRtYWluOiB7IHRlbXAsIGZlZWxzX2xpa2U6IGZlZWxzTGlrZSwgcHJlc3N1cmUsIGh1bWlkaXR5IH0sXG5cdFx0fSA9IGRhdGE7XG5cdFx0Y29uc3QgdGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKHRlbXApICsgdGhpcy5hZGREZWdyZWVzKHN5c3RlbSk7XG5cdFx0Y29uc3QgZmVlbHNMaWtlVGVtcCA9IE1hdGgucm91bmQoZmVlbHNMaWtlKSArIHRoaXMuYWRkRGVncmVlcyhzeXN0ZW0pO1xuXHRcdGNvbnN0IHdpbmRTcGVlZFVuaXQgPSB0aGlzLndpbmRTcGVlZENvbnZlcnNpb24oc3lzdGVtLCB3aW5kU3BlZWQpO1xuXHRcdGNvbnN0IHByZXNzdXJlVW5pdCA9IGAke3ByZXNzdXJlfSBoUGFgO1xuXHRcdGNvbnN0IGh1bWlkaXR5UGVyY2VudCA9IGAke2h1bWlkaXR5fSVgO1xuXG5cdFx0cmV0dXJuIHsgY2l0eSwgY291bnRyeSwgd2VhdGhlciwgZGVzY3JpcHRpb24sIHdpbmRTcGVlZFVuaXQsIHRlbXBlcmF0dXJlLCBmZWVsc0xpa2VUZW1wLCBwcmVzc3VyZVVuaXQsIGh1bWlkaXR5UGVyY2VudCB9O1xuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhKGNpdHksIHN5c3RlbSkge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9JHtzeXN0ZW19JmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzYDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYENpdHkgJyR7Y2l0eX0nIG5vdCBmb3VuZGApO1xuXHRcdFx0Y29uc3QgZGF0YSA9IHRoaXMuZXh0cmFjdERhdGEoYXdhaXQgcmVzcG9uc2UuanNvbigpLCBzeXN0ZW0pO1xuXG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblxuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IExvZ2ljIGZyb20gJy4vbG9naWMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG5cdHN0YXRpYyBwaWNrQ2l0eSgpIHtcblx0XHRjb25zdCBzYW1wbGVMb2NhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FtcGxlLWxvY2F0aW9ucycpO1xuXHRcdHNhbXBsZUxvY2F0aW9ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4nKSkge1xuXHRcdFx0XHRMb2dpYy5ncmFiRGF0YShlLnRhcmdldC50ZXh0Q29udGVudCwgJ21ldHJpYycpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIHNlbGVjdFVuaXRzKHN5c3RlbSA9ICdtZXRyaWMnKSB7XG5cdFx0Y29uc3QgdW5pdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzJyk7XG5cdFx0bGV0IHN5c3RlbVVuaXRzID0gc3lzdGVtO1xuXHRcdHVuaXRzQnRuLnZhbHVlID0gc3lzdGVtVW5pdHM7XG5cdFx0dW5pdHNCdG4uaW5uZXJIVE1MID0gc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnID8gJzxiPsKwQzwvYj4gfCDCsEYnIDogJ8KwQyB8IDxiPsKwRjwvYj4nO1xuXG5cdFx0dW5pdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRzeXN0ZW1Vbml0cyA9IHN5c3RlbVVuaXRzID09PSAnbWV0cmljJyA/ICdpbXBlcmlhbCcgOiAnbWV0cmljJztcblx0XHRcdHVuaXRzQnRuLnZhbHVlID0gc3lzdGVtVW5pdHM7XG5cdFx0XHR1bml0c0J0bi5pbm5lckhUTUwgPSBzeXN0ZW1Vbml0cyA9PT0gJ21ldHJpYycgPyAnPGI+wrBDPC9iPiB8IMKwRicgOiAnwrBDIHwgPGI+wrBGPC9iPic7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gc3lzdGVtVW5pdHM7XG5cdH1cblxuXHRzdGF0aWMgc2VhcmNoQ2l0eSgpIHtcblx0XHRjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcblx0XHRjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ0bicpO1xuXHRcdGNvbnN0IHNlYXJjaEJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYm94Jyk7XG5cblx0XHRzZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUudHJpbSgpO1xuXHRcdFx0aWYgKGlucHV0LnZhbHVlICE9PSAnJykge1xuXHRcdFx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0XHRcdExvZ2ljLmdyYWJEYXRhKGlucHV0LnZhbHVlLCAnbWV0cmljJylcblx0XHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHRcdFx0aW5wdXQudmFsdWUgPSAnJztcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaCgoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmxvYWRpbmcoZmFsc2UpO1xuXHRcdFx0XHRcdFx0aW5wdXQudmFsdWUgPSAnJztcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBsb2FkaW5nKHRvZ2dsZSkge1xuXHRcdGNvbnN0IGNvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2kuZmEtY29nJyk7XG5cblx0XHRpZiAodG9nZ2xlKSB7XG5cdFx0XHRjb2cuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb2cuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBzdGFydEFwcCgpIHtcblx0XHR0aGlzLnBpY2tDaXR5KCk7XG5cdFx0dGhpcy5zZWxlY3RVbml0cygpO1xuXHRcdHRoaXMuc2VhcmNoQ2l0eSgpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS9zdHlsZS5jc3MnO1xuaW1wb3J0IFVJIGZyb20gJy4vY29kZS91aSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5zdGFydEFwcCgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==