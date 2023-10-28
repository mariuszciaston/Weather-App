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
	static getDegreeUnit(system) {
		return system === 'imperial' ? '°F' : '°C';
	}

	static convertWindSpeed(system, windSpeed) {
		const windSpeedInKmH = Math.round(windSpeed * 3.6);
		return system === 'imperial' ? `${Math.round(windSpeed)} mph` : `${windSpeedInKmH} km/h`;
	}

	static getDayOfWeek(epoch) {
		const date = new Date(epoch * 1000);
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return days[date.getDay()];
	}

	static extractWeatherData(data, system) {
		const {
			name: city,
			sys: { country },
			weather: [{ main: weather, description, icon }],
			wind: { speed: windSpeed },
			main: { temp, feels_like: feelsLike, pressure, humidity },
			coord: { lat, lon },
		} = data;
		const degreeUnit = this.getDegreeUnit(system);
		const temperature = `${Math.round(temp)}${degreeUnit}`;
		const feelsLikeTemp = `${Math.round(feelsLike)}${degreeUnit}`;
		const windSpeedUnit = this.convertWindSpeed(system, windSpeed);
		const pressureUnit = `${pressure} hPa`;
		const humidityPercent = `${humidity}%`;

		return { city, country, icon, temperature, feelsLikeTemp, humidityPercent, windSpeedUnit, pressureUnit, description, weather, lat, lon };
	}

	static extractNextDays(data, system) {
		const nextDays = [];
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 1);

		for (let i = 0; i < 3; i += 1) {
			const dateStr = currentDate.toISOString().split('T')[0];
			const dateTimeStr = `${dateStr} 12:00:00`;
			const dayData = data.list.find((item) => item.dt_txt === dateTimeStr);
			if (dayData) {
				nextDays.push({
					day: this.getDayOfWeek(dayData.dt),
					temp: Math.round(dayData.main.temp) + this.getDegreeUnit(system),
					icon: dayData.weather[0].icon,
					description: dayData.weather[0].description,
				});
			}
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return nextDays;
	}

	static async getCurrentPosition(system) {
		try {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
			const { latitude, longitude } = position.coords;
			const data = await Logic.grabDataByPosition(system, latitude, longitude);
			return data;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async grabDataByPosition(system, lat, lon) {
		const api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await fetch(api, { mode: 'cors' });
			if (!response.ok) throw new Error(`Localization not found`);
			const city = (await response.json())[0].name;
			return this.grabDataByCity(system, city);
		} catch (error) {
			alert(error);
			return null;
		}
	}

	static async grabDataByCity(system, city) {
		const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=2871c88944b81fbab922d47012695ba3`;

		try {
			const response = await new Promise((resolve, reject) => {
				setTimeout(() => {
					try {
						const res = fetch(api, { mode: 'cors' });
						resolve(res);
					} catch (error) {
						reject(error);
					}
				}, 750);
			});

			if (!response.ok) throw new Error(`City '${city}' not found`);
			const data = this.extractWeatherData(await response.json(), system);
			const nextDays = await this.grabDataNextDays(system, data.lat, data.lon);
			data.nextDays = nextDays;
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
		const elements = ['#temperature', '#feels-like', '#wind-speed', '#tommorow-card .temp', '#after-tommorow-card .temp', '#next-card .temp'];

		elements.forEach((selector) => {
			const element = document.querySelector(selector);
			const value = element.textContent;
			const isWindSpeed = selector === '#wind-speed';
			element.textContent = isWindSpeed ? this.convertWindSpeed(value, systemUnits) : this.convertTemperature(value, systemUnits);
		});
	}

	static loading(toggle) {
		const spinner = document.querySelector('#loading-spinner');
		const weather = document.querySelector('#weather-container');
		weather.classList.toggle('hide', toggle);
		spinner.classList.toggle('hide', !toggle);
	}

	static updateUI(data) {
		this.loading(false);
		this.clearWeather();
		this.displayWeather(data);
		this.setBcgColor(data);
	}

	static pickCity(e) {
		this.loading(true);
		if (e.target.classList.contains('btn')) {
			_logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabDataByCity(this.setUnit(), e.target.textContent).then((data) => {
				this.updateUI(data);
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
					input.value = '';
					this.updateUI(data);
				})
				.catch(() => {
					this.setGreyColor();
				});
		}
	}

	static async findMe() {
		this.loading(true);
		const data = await _logic__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentPosition(this.setUnit());
		if (data) {
			this.updateUI(data);
		}
	}

	static clearWeather() {
		const cardIds = ['main-card', 'img-card', 'secondary-card', 'tommorow-card', 'after-tommorow-card', 'next-card'];
		cardIds.forEach((id) => {
			const card = document.querySelector(`#${id}`);
			card.textContent = '';
		});
	}

	static displayMainCard(data) {
		const mainCard = document.querySelector('#main-card');
		const elements = ['city-country', 'temperature', 'description'];

		elements.forEach((element) => {
			const el = document.createElement('h1');
			el.setAttribute('id', element);
			el.textContent = data[element];
			mainCard.appendChild(el);
		});

		if (data.country !== undefined) {
			document.querySelector('#city-country').textContent = `${data.city}, ${data.country}`;
		} else {
			document.querySelector('#city-country').textContent = `${data.city}`;
		}
	}

	static displayImgCard(data) {
		const imgCard = document.querySelector('#img-card');
		const img = document.createElement('img');
		img.src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
		img.alt = data.description;
		imgCard.appendChild(img);
	}

	static displaySecondaryCard(data) {
		const secondaryCard = document.querySelector('#secondary-card');
		const elements = ['feels-like', 'humidity', 'wind-speed', 'pressure'];
		const descriptions = ['Feels like: ', 'Humidity: ', 'Wind speed: ', 'Pressure: '];
		const dataValues = [data.feelsLikeTemp, data.humidityPercent, data.windSpeedUnit, data.pressureUnit];

		elements.forEach((element, index) => {
			const p = document.createElement('p');
			p.textContent = descriptions[index];
			const span = document.createElement('span');
			span.id = element;
			span.append(` ${dataValues[index]}`);
			p.appendChild(span);
			secondaryCard.appendChild(p);
		});
	}

	static createElementWithClass(elementType, className) {
		const element = document.createElement(elementType);
		element.className = className;
		return element;
	}

	static displayCard(data, dayIndex, cardId) {
		const card = document.querySelector(`#${cardId}`);

		const dayElement = this.createElementWithClass('p', 'day');
		const tempElement = this.createElementWithClass('p', 'temp');
		const iconElement = this.createElementWithClass('img', 'icon');

		dayElement.textContent = ` ${data.nextDays[dayIndex].day}`;
		tempElement.textContent = ` ${data.nextDays[dayIndex].temp}`;
		iconElement.src = `https://openweathermap.org/img/wn/${data.nextDays[dayIndex].icon}@4x.png`;
		iconElement.alt = data.nextDays[dayIndex].description;

		card.append(dayElement, tempElement, iconElement);
	}

	static displayWeather(data) {
		this.displayMainCard(data);
		this.displayImgCard(data);
		this.displaySecondaryCard(data);

		['tommorow-card', 'after-tommorow-card', 'next-card'].forEach((cardId, index) => {
			this.displayCard(data, index, cardId);
		});
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

	static setGreyColor() {
		const color = `hsl(0, 0%, 75%)`;
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
		this.setUnit();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb2RlL2xvZ2ljLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvdWkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpYyB7XG5cdHN0YXRpYyBnZXREZWdyZWVVbml0KHN5c3RlbSkge1xuXHRcdHJldHVybiBzeXN0ZW0gPT09ICdpbXBlcmlhbCcgPyAnwrBGJyA6ICfCsEMnO1xuXHR9XG5cblx0c3RhdGljIGNvbnZlcnRXaW5kU3BlZWQoc3lzdGVtLCB3aW5kU3BlZWQpIHtcblx0XHRjb25zdCB3aW5kU3BlZWRJbkttSCA9IE1hdGgucm91bmQod2luZFNwZWVkICogMy42KTtcblx0XHRyZXR1cm4gc3lzdGVtID09PSAnaW1wZXJpYWwnID8gYCR7TWF0aC5yb3VuZCh3aW5kU3BlZWQpfSBtcGhgIDogYCR7d2luZFNwZWVkSW5LbUh9IGttL2hgO1xuXHR9XG5cblx0c3RhdGljIGdldERheU9mV2VlayhlcG9jaCkge1xuXHRcdGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShlcG9jaCAqIDEwMDApO1xuXHRcdGNvbnN0IGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG5cdFx0cmV0dXJuIGRheXNbZGF0ZS5nZXREYXkoKV07XG5cdH1cblxuXHRzdGF0aWMgZXh0cmFjdFdlYXRoZXJEYXRhKGRhdGEsIHN5c3RlbSkge1xuXHRcdGNvbnN0IHtcblx0XHRcdG5hbWU6IGNpdHksXG5cdFx0XHRzeXM6IHsgY291bnRyeSB9LFxuXHRcdFx0d2VhdGhlcjogW3sgbWFpbjogd2VhdGhlciwgZGVzY3JpcHRpb24sIGljb24gfV0sXG5cdFx0XHR3aW5kOiB7IHNwZWVkOiB3aW5kU3BlZWQgfSxcblx0XHRcdG1haW46IHsgdGVtcCwgZmVlbHNfbGlrZTogZmVlbHNMaWtlLCBwcmVzc3VyZSwgaHVtaWRpdHkgfSxcblx0XHRcdGNvb3JkOiB7IGxhdCwgbG9uIH0sXG5cdFx0fSA9IGRhdGE7XG5cdFx0Y29uc3QgZGVncmVlVW5pdCA9IHRoaXMuZ2V0RGVncmVlVW5pdChzeXN0ZW0pO1xuXHRcdGNvbnN0IHRlbXBlcmF0dXJlID0gYCR7TWF0aC5yb3VuZCh0ZW1wKX0ke2RlZ3JlZVVuaXR9YDtcblx0XHRjb25zdCBmZWVsc0xpa2VUZW1wID0gYCR7TWF0aC5yb3VuZChmZWVsc0xpa2UpfSR7ZGVncmVlVW5pdH1gO1xuXHRcdGNvbnN0IHdpbmRTcGVlZFVuaXQgPSB0aGlzLmNvbnZlcnRXaW5kU3BlZWQoc3lzdGVtLCB3aW5kU3BlZWQpO1xuXHRcdGNvbnN0IHByZXNzdXJlVW5pdCA9IGAke3ByZXNzdXJlfSBoUGFgO1xuXHRcdGNvbnN0IGh1bWlkaXR5UGVyY2VudCA9IGAke2h1bWlkaXR5fSVgO1xuXG5cdFx0cmV0dXJuIHsgY2l0eSwgY291bnRyeSwgaWNvbiwgdGVtcGVyYXR1cmUsIGZlZWxzTGlrZVRlbXAsIGh1bWlkaXR5UGVyY2VudCwgd2luZFNwZWVkVW5pdCwgcHJlc3N1cmVVbml0LCBkZXNjcmlwdGlvbiwgd2VhdGhlciwgbGF0LCBsb24gfTtcblx0fVxuXG5cdHN0YXRpYyBleHRyYWN0TmV4dERheXMoZGF0YSwgc3lzdGVtKSB7XG5cdFx0Y29uc3QgbmV4dERheXMgPSBbXTtcblx0XHRjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0Y3VycmVudERhdGUuc2V0RGF0ZShjdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAxKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSArPSAxKSB7XG5cdFx0XHRjb25zdCBkYXRlU3RyID0gY3VycmVudERhdGUudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xuXHRcdFx0Y29uc3QgZGF0ZVRpbWVTdHIgPSBgJHtkYXRlU3RyfSAxMjowMDowMGA7XG5cdFx0XHRjb25zdCBkYXlEYXRhID0gZGF0YS5saXN0LmZpbmQoKGl0ZW0pID0+IGl0ZW0uZHRfdHh0ID09PSBkYXRlVGltZVN0cik7XG5cdFx0XHRpZiAoZGF5RGF0YSkge1xuXHRcdFx0XHRuZXh0RGF5cy5wdXNoKHtcblx0XHRcdFx0XHRkYXk6IHRoaXMuZ2V0RGF5T2ZXZWVrKGRheURhdGEuZHQpLFxuXHRcdFx0XHRcdHRlbXA6IE1hdGgucm91bmQoZGF5RGF0YS5tYWluLnRlbXApICsgdGhpcy5nZXREZWdyZWVVbml0KHN5c3RlbSksXG5cdFx0XHRcdFx0aWNvbjogZGF5RGF0YS53ZWF0aGVyWzBdLmljb24sXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246IGRheURhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbixcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRjdXJyZW50RGF0ZS5zZXREYXRlKGN1cnJlbnREYXRlLmdldERhdGUoKSArIDEpO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV4dERheXM7XG5cdH1cblxuXHRzdGF0aWMgYXN5bmMgZ2V0Q3VycmVudFBvc2l0aW9uKHN5c3RlbSkge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBwb3NpdGlvbiA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXNvbHZlLCByZWplY3QpO1xuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCB7IGxhdGl0dWRlLCBsb25naXR1ZGUgfSA9IHBvc2l0aW9uLmNvb3Jkcztcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBMb2dpYy5ncmFiRGF0YUJ5UG9zaXRpb24oc3lzdGVtLCBsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBncmFiRGF0YUJ5UG9zaXRpb24oc3lzdGVtLCBsYXQsIGxvbikge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9yZXZlcnNlP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZsaW1pdD0xJmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzYDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSk7XG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYExvY2FsaXphdGlvbiBub3QgZm91bmRgKTtcblx0XHRcdGNvbnN0IGNpdHkgPSAoYXdhaXQgcmVzcG9uc2UuanNvbigpKVswXS5uYW1lO1xuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhYkRhdGFCeUNpdHkoc3lzdGVtLCBjaXR5KTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGFzeW5jIGdyYWJEYXRhQnlDaXR5KHN5c3RlbSwgY2l0eSkge1xuXHRcdGNvbnN0IGFwaSA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9JHtzeXN0ZW19JmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzYDtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlcyA9IGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlcyk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCA3NTApO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgQ2l0eSAnJHtjaXR5fScgbm90IGZvdW5kYCk7XG5cdFx0XHRjb25zdCBkYXRhID0gdGhpcy5leHRyYWN0V2VhdGhlckRhdGEoYXdhaXQgcmVzcG9uc2UuanNvbigpLCBzeXN0ZW0pO1xuXHRcdFx0Y29uc3QgbmV4dERheXMgPSBhd2FpdCB0aGlzLmdyYWJEYXRhTmV4dERheXMoc3lzdGVtLCBkYXRhLmxhdCwgZGF0YS5sb24pO1xuXHRcdFx0ZGF0YS5uZXh0RGF5cyA9IG5leHREYXlzO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGFsZXJ0KGVycm9yKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBncmFiRGF0YU5leHREYXlzKHN5c3RlbSwgbGF0LCBsb24pIHtcblx0XHRjb25zdCBhcGkgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZ1bml0cz0ke3N5c3RlbX0mYXBwaWQ9Mjg3MWM4ODk0NGI4MWZiYWI5MjJkNDcwMTI2OTViYTNgO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KTtcblx0XHRcdGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgTG9jYWxpemF0aW9uIG5vdCBmb3VuZGApO1xuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdGNvbnN0IG5leHREYXlzID0gdGhpcy5leHRyYWN0TmV4dERheXMoZGF0YSwgc3lzdGVtKTtcblx0XHRcdHJldHVybiBuZXh0RGF5cztcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0YWxlcnQoZXJyb3IpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcblx0c3RhdGljIHNldFVuaXQoc3lzdGVtKSB7XG5cdFx0Y29uc3QgdW5pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2UtdW5pdHMnKTtcblx0XHRjb25zdCBzeXN0ZW1Vbml0cyA9IHVuaXRCdG4udmFsdWUgfHwgc3lzdGVtIHx8ICdtZXRyaWMnO1xuXHRcdHRoaXMudXBkYXRlVW5pdEJ0bih1bml0QnRuLCBzeXN0ZW1Vbml0cyk7XG5cdFx0cmV0dXJuIHN5c3RlbVVuaXRzO1xuXHR9XG5cblx0c3RhdGljIHVwZGF0ZVVuaXRCdG4odW5pdEJ0biwgc3lzdGVtVW5pdHMpIHtcblx0XHRjb25zdCBzcGFuQyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2UtdW5pdHMgc3BhbiNDJyk7XG5cdFx0Y29uc3Qgc3BhbkYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzIHNwYW4jRicpO1xuXHRcdGNvbnN0IG5ld1VuaXRCdG4gPSB1bml0QnRuO1xuXHRcdG5ld1VuaXRCdG4udmFsdWUgPSBzeXN0ZW1Vbml0cztcblx0XHRzcGFuQy5jbGFzc0xpc3QudG9nZ2xlKCdib2xkJywgc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnKTtcblx0XHRzcGFuRi5jbGFzc0xpc3QudG9nZ2xlKCdib2xkJywgc3lzdGVtVW5pdHMgPT09ICdpbXBlcmlhbCcpO1xuXHR9XG5cblx0c3RhdGljIHRvZ2dsZVVuaXQodW5pdEJ0bikge1xuXHRcdGNvbnN0IHN5c3RlbVVuaXRzID0gdW5pdEJ0bi52YWx1ZSA9PT0gJ21ldHJpYycgPyAnaW1wZXJpYWwnIDogJ21ldHJpYyc7XG5cdFx0dGhpcy51cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKTtcblx0XHR0aGlzLnJlcGxhY2VVbml0cyhzeXN0ZW1Vbml0cyk7XG5cdH1cblxuXHRzdGF0aWMgY29udmVydFRlbXBlcmF0dXJlKHRlbXAsIHN5c3RlbVVuaXRzKSB7XG5cdFx0bGV0IHRlbXBOdW1iZXIgPSBwYXJzZUZsb2F0KHRlbXApO1xuXHRcdGlmIChzeXN0ZW1Vbml0cyA9PT0gJ2ltcGVyaWFsJyAmJiB0ZW1wLmluY2x1ZGVzKCfCsEMnKSkge1xuXHRcdFx0dGVtcE51bWJlciA9IE1hdGgucm91bmQoKHRlbXBOdW1iZXIgKiA5KSAvIDUgKyAzMik7XG5cdFx0XHRyZXR1cm4gYCR7dGVtcE51bWJlcn3CsEZgO1xuXHRcdH1cblx0XHRpZiAoc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnICYmIHRlbXAuaW5jbHVkZXMoJ8KwRicpKSB7XG5cdFx0XHR0ZW1wTnVtYmVyID0gTWF0aC5yb3VuZCgoKHRlbXBOdW1iZXIgLSAzMikgKiA1KSAvIDkpO1xuXHRcdFx0cmV0dXJuIGAke3RlbXBOdW1iZXJ9wrBDYDtcblx0XHR9XG5cdFx0cmV0dXJuIHRlbXA7XG5cdH1cblxuXHRzdGF0aWMgY29udmVydFdpbmRTcGVlZChzcGVlZCwgc3lzdGVtVW5pdHMpIHtcblx0XHRsZXQgc3BlZWROdW1iZXIgPSBwYXJzZUZsb2F0KHNwZWVkKTtcblx0XHRpZiAoc3lzdGVtVW5pdHMgPT09ICdpbXBlcmlhbCcgJiYgc3BlZWQuaW5jbHVkZXMoJ2ttL2gnKSkge1xuXHRcdFx0c3BlZWROdW1iZXIgPSBNYXRoLnJvdW5kKHNwZWVkTnVtYmVyIC8gMS42MDkzKTtcblx0XHRcdHJldHVybiBgJHtzcGVlZE51bWJlcn0gbXBoYDtcblx0XHR9XG5cdFx0aWYgKHN5c3RlbVVuaXRzID09PSAnbWV0cmljJyAmJiBzcGVlZC5pbmNsdWRlcygnbXBoJykpIHtcblx0XHRcdHNwZWVkTnVtYmVyID0gTWF0aC5yb3VuZChzcGVlZE51bWJlciAqIDEuNjA5Myk7XG5cdFx0XHRyZXR1cm4gYCR7c3BlZWROdW1iZXJ9IGttL2hgO1xuXHRcdH1cblx0XHRyZXR1cm4gc3BlZWQ7XG5cdH1cblxuXHRzdGF0aWMgcmVwbGFjZVVuaXRzKHN5c3RlbVVuaXRzKSB7XG5cdFx0Y29uc3QgZWxlbWVudHMgPSBbJyN0ZW1wZXJhdHVyZScsICcjZmVlbHMtbGlrZScsICcjd2luZC1zcGVlZCcsICcjdG9tbW9yb3ctY2FyZCAudGVtcCcsICcjYWZ0ZXItdG9tbW9yb3ctY2FyZCAudGVtcCcsICcjbmV4dC1jYXJkIC50ZW1wJ107XG5cblx0XHRlbGVtZW50cy5mb3JFYWNoKChzZWxlY3RvcikgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuXHRcdFx0Y29uc3QgaXNXaW5kU3BlZWQgPSBzZWxlY3RvciA9PT0gJyN3aW5kLXNwZWVkJztcblx0XHRcdGVsZW1lbnQudGV4dENvbnRlbnQgPSBpc1dpbmRTcGVlZCA/IHRoaXMuY29udmVydFdpbmRTcGVlZCh2YWx1ZSwgc3lzdGVtVW5pdHMpIDogdGhpcy5jb252ZXJ0VGVtcGVyYXR1cmUodmFsdWUsIHN5c3RlbVVuaXRzKTtcblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBsb2FkaW5nKHRvZ2dsZSkge1xuXHRcdGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGluZy1zcGlubmVyJyk7XG5cdFx0Y29uc3Qgd2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWF0aGVyLWNvbnRhaW5lcicpO1xuXHRcdHdlYXRoZXIuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScsIHRvZ2dsZSk7XG5cdFx0c3Bpbm5lci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJywgIXRvZ2dsZSk7XG5cdH1cblxuXHRzdGF0aWMgdXBkYXRlVUkoZGF0YSkge1xuXHRcdHRoaXMubG9hZGluZyhmYWxzZSk7XG5cdFx0dGhpcy5jbGVhcldlYXRoZXIoKTtcblx0XHR0aGlzLmRpc3BsYXlXZWF0aGVyKGRhdGEpO1xuXHRcdHRoaXMuc2V0QmNnQ29sb3IoZGF0YSk7XG5cdH1cblxuXHRzdGF0aWMgcGlja0NpdHkoZSkge1xuXHRcdHRoaXMubG9hZGluZyh0cnVlKTtcblx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4nKSkge1xuXHRcdFx0TG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGUudGFyZ2V0LnRleHRDb250ZW50KS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdHRoaXMudXBkYXRlVUkoZGF0YSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgc2VhcmNoQ2l0eSgpIHtcblx0XHRjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtaW5wdXQnKTtcblx0XHRpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlLnRyaW0oKTtcblx0XHRpZiAoaW5wdXQudmFsdWUgIT09ICcnKSB7XG5cdFx0XHR0aGlzLmxvYWRpbmcodHJ1ZSk7XG5cdFx0XHRMb2dpYy5ncmFiRGF0YUJ5Q2l0eSh0aGlzLnNldFVuaXQoKSwgaW5wdXQudmFsdWUpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0aW5wdXQudmFsdWUgPSAnJztcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZVVJKGRhdGEpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuc2V0R3JleUNvbG9yKCk7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBhc3luYyBmaW5kTWUoKSB7XG5cdFx0dGhpcy5sb2FkaW5nKHRydWUpO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBMb2dpYy5nZXRDdXJyZW50UG9zaXRpb24odGhpcy5zZXRVbml0KCkpO1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZVVJKGRhdGEpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBjbGVhcldlYXRoZXIoKSB7XG5cdFx0Y29uc3QgY2FyZElkcyA9IFsnbWFpbi1jYXJkJywgJ2ltZy1jYXJkJywgJ3NlY29uZGFyeS1jYXJkJywgJ3RvbW1vcm93LWNhcmQnLCAnYWZ0ZXItdG9tbW9yb3ctY2FyZCcsICduZXh0LWNhcmQnXTtcblx0XHRjYXJkSWRzLmZvckVhY2goKGlkKSA9PiB7XG5cdFx0XHRjb25zdCBjYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XG5cdFx0XHRjYXJkLnRleHRDb250ZW50ID0gJyc7XG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgZGlzcGxheU1haW5DYXJkKGRhdGEpIHtcblx0XHRjb25zdCBtYWluQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQnKTtcblx0XHRjb25zdCBlbGVtZW50cyA9IFsnY2l0eS1jb3VudHJ5JywgJ3RlbXBlcmF0dXJlJywgJ2Rlc2NyaXB0aW9uJ107XG5cblx0XHRlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG5cdFx0XHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgZWxlbWVudCk7XG5cdFx0XHRlbC50ZXh0Q29udGVudCA9IGRhdGFbZWxlbWVudF07XG5cdFx0XHRtYWluQ2FyZC5hcHBlbmRDaGlsZChlbCk7XG5cdFx0fSk7XG5cblx0XHRpZiAoZGF0YS5jb3VudHJ5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXR5LWNvdW50cnknKS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eX0sICR7ZGF0YS5jb3VudHJ5fWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXR5LWNvdW50cnknKS50ZXh0Q29udGVudCA9IGAke2RhdGEuY2l0eX1gO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5SW1nQ2FyZChkYXRhKSB7XG5cdFx0Y29uc3QgaW1nQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWctY2FyZCcpO1xuXHRcdGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdGltZy5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS5pY29ufUA0eC5wbmdgO1xuXHRcdGltZy5hbHQgPSBkYXRhLmRlc2NyaXB0aW9uO1xuXHRcdGltZ0NhcmQuYXBwZW5kQ2hpbGQoaW1nKTtcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5U2Vjb25kYXJ5Q2FyZChkYXRhKSB7XG5cdFx0Y29uc3Qgc2Vjb25kYXJ5Q2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWNvbmRhcnktY2FyZCcpO1xuXHRcdGNvbnN0IGVsZW1lbnRzID0gWydmZWVscy1saWtlJywgJ2h1bWlkaXR5JywgJ3dpbmQtc3BlZWQnLCAncHJlc3N1cmUnXTtcblx0XHRjb25zdCBkZXNjcmlwdGlvbnMgPSBbJ0ZlZWxzIGxpa2U6ICcsICdIdW1pZGl0eTogJywgJ1dpbmQgc3BlZWQ6ICcsICdQcmVzc3VyZTogJ107XG5cdFx0Y29uc3QgZGF0YVZhbHVlcyA9IFtkYXRhLmZlZWxzTGlrZVRlbXAsIGRhdGEuaHVtaWRpdHlQZXJjZW50LCBkYXRhLndpbmRTcGVlZFVuaXQsIGRhdGEucHJlc3N1cmVVbml0XTtcblxuXHRcdGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG5cdFx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0cC50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uc1tpbmRleF07XG5cdFx0XHRjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdFx0c3Bhbi5pZCA9IGVsZW1lbnQ7XG5cdFx0XHRzcGFuLmFwcGVuZChgICR7ZGF0YVZhbHVlc1tpbmRleF19YCk7XG5cdFx0XHRwLmFwcGVuZENoaWxkKHNwYW4pO1xuXHRcdFx0c2Vjb25kYXJ5Q2FyZC5hcHBlbmRDaGlsZChwKTtcblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50V2l0aENsYXNzKGVsZW1lbnRUeXBlLCBjbGFzc05hbWUpIHtcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XG5cdFx0ZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdH1cblxuXHRzdGF0aWMgZGlzcGxheUNhcmQoZGF0YSwgZGF5SW5kZXgsIGNhcmRJZCkge1xuXHRcdGNvbnN0IGNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjYXJkSWR9YCk7XG5cblx0XHRjb25zdCBkYXlFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50V2l0aENsYXNzKCdwJywgJ2RheScpO1xuXHRcdGNvbnN0IHRlbXBFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50V2l0aENsYXNzKCdwJywgJ3RlbXAnKTtcblx0XHRjb25zdCBpY29uRWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudFdpdGhDbGFzcygnaW1nJywgJ2ljb24nKTtcblxuXHRcdGRheUVsZW1lbnQudGV4dENvbnRlbnQgPSBgICR7ZGF0YS5uZXh0RGF5c1tkYXlJbmRleF0uZGF5fWA7XG5cdFx0dGVtcEVsZW1lbnQudGV4dENvbnRlbnQgPSBgICR7ZGF0YS5uZXh0RGF5c1tkYXlJbmRleF0udGVtcH1gO1xuXHRcdGljb25FbGVtZW50LnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLm5leHREYXlzW2RheUluZGV4XS5pY29ufUA0eC5wbmdgO1xuXHRcdGljb25FbGVtZW50LmFsdCA9IGRhdGEubmV4dERheXNbZGF5SW5kZXhdLmRlc2NyaXB0aW9uO1xuXG5cdFx0Y2FyZC5hcHBlbmQoZGF5RWxlbWVudCwgdGVtcEVsZW1lbnQsIGljb25FbGVtZW50KTtcblx0fVxuXG5cdHN0YXRpYyBkaXNwbGF5V2VhdGhlcihkYXRhKSB7XG5cdFx0dGhpcy5kaXNwbGF5TWFpbkNhcmQoZGF0YSk7XG5cdFx0dGhpcy5kaXNwbGF5SW1nQ2FyZChkYXRhKTtcblx0XHR0aGlzLmRpc3BsYXlTZWNvbmRhcnlDYXJkKGRhdGEpO1xuXG5cdFx0Wyd0b21tb3Jvdy1jYXJkJywgJ2FmdGVyLXRvbW1vcm93LWNhcmQnLCAnbmV4dC1jYXJkJ10uZm9yRWFjaCgoY2FyZElkLCBpbmRleCkgPT4ge1xuXHRcdFx0dGhpcy5kaXNwbGF5Q2FyZChkYXRhLCBpbmRleCwgY2FyZElkKTtcblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBzZXRCY2dDb2xvcihkYXRhKSB7XG5cdFx0bGV0IHRlbXAgPSBkYXRhLnRlbXBlcmF0dXJlO1xuXG5cdFx0aWYgKGRhdGEudGVtcGVyYXR1cmUuaW5jbHVkZXMoJ8KwRicpKSB7XG5cdFx0XHRjb25zdCBzeXN0ZW0gPSAnbWV0cmljJztcblx0XHRcdHRlbXAgPSB0aGlzLmNvbnZlcnRUZW1wZXJhdHVyZShkYXRhLnRlbXBlcmF0dXJlLCBzeXN0ZW0pO1xuXHRcdH1cblxuXHRcdHRlbXAgPSBwYXJzZUludCh0ZW1wLCAxMCk7XG5cblx0XHRjb25zdCBtaW5UZW1wID0gMDtcblx0XHRjb25zdCBtYXhUZW1wID0gMzA7XG5cblx0XHRjb25zdCBtaW5Ic2wgPSAyMjA7XG5cdFx0Y29uc3QgbWF4SHNsID0gMDtcblxuXHRcdHRlbXAgPSB0ZW1wID4gbWF4VGVtcCA/IG1heFRlbXAgOiB0ZW1wO1xuXHRcdHRlbXAgPSB0ZW1wIDwgbWluVGVtcCA/IG1pblRlbXAgOiB0ZW1wO1xuXG5cdFx0Y29uc3QgcmFuZ2VUZW1wID0gbWF4VGVtcCAtIG1pblRlbXA7XG5cdFx0Y29uc3QgcmFuZ2VIc2wgPSBtYXhIc2wgLSBtaW5Ic2w7XG5cdFx0Y29uc3QgZGVnQ291bnQgPSBtYXhUZW1wIC0gdGVtcDtcblx0XHRjb25zdCBoc2xzRGVnID0gcmFuZ2VIc2wgLyByYW5nZVRlbXA7XG5cdFx0Y29uc3QgcmV0dXJuSHVlID0gMzYwIC0gKGRlZ0NvdW50ICogaHNsc0RlZyAtIChtYXhIc2wgLSAzNjApKTtcblxuXHRcdGNvbnN0IGNvbG9yID0gYGhzbCgke3JldHVybkh1ZX0sIDEwMCUsIDc1JSlgO1xuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG5cdH1cblxuXHRzdGF0aWMgc2V0R3JleUNvbG9yKCkge1xuXHRcdGNvbnN0IGNvbG9yID0gYGhzbCgwLCAwJSwgNzUlKWA7XG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcblx0fVxuXG5cdHN0YXRpYyBhdHRhY2hMaXN0ZW5lcnMoKSB7XG5cdFx0Y29uc3Qgc2FtcGxlTG9jYXRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhbXBsZS1sb2NhdGlvbnMnKTtcblx0XHRjb25zdCB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZS11bml0cycpO1xuXHRcdGNvbnN0IHNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYm94Jyk7XG5cdFx0Y29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1idG4nKTtcblx0XHRjb25zdCBmaW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbmQtYnRuJyk7XG5cblx0XHRzYW1wbGVMb2NhdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5waWNrQ2l0eShlKSk7XG5cdFx0c2VhcmNoQm94LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXHRcdHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VhcmNoQ2l0eSgpKTtcblx0XHRmaW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5maW5kTWUoKSk7XG5cdFx0dW5pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlVW5pdCh1bml0QnRuKSk7XG5cdH1cblxuXHRzdGF0aWMgcnVuQXBwKCkge1xuXHRcdHRoaXMuc2V0VW5pdCgpO1xuXHRcdHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICdub3JtYWxpemUuY3NzJztcbmltcG9ydCAnLi9zdHlsZS9zdHlsZS5jc3MnO1xuaW1wb3J0IFVJIGZyb20gJy4vY29kZS91aSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5ydW5BcHAoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=