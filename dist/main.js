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

/***/ "./src/code/logic.ts":
/*!***************************!*\
  !*** ./src/code/logic.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Logic = /** @class */ (function () {
    function Logic() {
    }
    Logic.getDegreeUnit = function (system) {
        return system === 'imperial' ? '°F' : '°C';
    };
    Logic.convertWindSpeed = function (system, windSpeed) {
        var windSpeedInKmH = Math.round(windSpeed * 3.6);
        return system === 'imperial' ? "".concat(Math.round(windSpeed), " mph") : "".concat(windSpeedInKmH, " km/h");
    };
    Logic.getDayOfWeek = function (epoch) {
        var date = new Date(epoch * 1000);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };
    Logic.extractWeatherData = function (data, system) {
        var city = data.name, country = data.sys.country, _a = data.weather[0], weather = _a.main, description = _a.description, icon = _a.icon, windSpeed = data.wind.speed, _b = data.main, temp = _b.temp, feelsLike = _b.feels_like, pressure = _b.pressure, humidity = _b.humidity, _c = data.coord, lat = _c.lat, lon = _c.lon;
        var degreeUnit = this.getDegreeUnit(system);
        var temperature = "".concat(Math.round(temp)).concat(degreeUnit);
        var feelsLikeTemp = "".concat(Math.round(feelsLike)).concat(degreeUnit);
        var windSpeedUnit = this.convertWindSpeed(system, windSpeed);
        var pressureUnit = "".concat(pressure, " hPa");
        var humidityPercent = "".concat(humidity, "%");
        return { city: city, country: country, icon: icon, temperature: temperature, feelsLikeTemp: feelsLikeTemp, humidityPercent: humidityPercent, windSpeedUnit: windSpeedUnit, pressureUnit: pressureUnit, description: description, weather: weather, lat: lat, lon: lon };
    };
    Logic.extractNextDays = function (nextData, system) {
        var nextDays = [];
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        var _loop_1 = function (i) {
            var dateStr = currentDate.toISOString().split('T')[0];
            var dateTimeStr = "".concat(dateStr, " 12:00:00");
            var dayData = nextData.list.find(function (item) { return item.dt_txt === dateTimeStr; });
            if (dayData) {
                nextDays.push({
                    day: this_1.getDayOfWeek(dayData.dt),
                    temp: Math.round(dayData.main.temp) + this_1.getDegreeUnit(system),
                    icon: dayData.weather[0].icon,
                    description: dayData.weather[0].description,
                });
            }
            currentDate.setDate(currentDate.getDate() + 1);
        };
        var this_1 = this;
        for (var i = 0; i < 3; i += 1) {
            _loop_1(i);
        }
        return nextDays;
    };
    Logic.getCurrentPosition = function (system) {
        return __awaiter(this, void 0, void 0, function () {
            var position, _a, latitude, longitude, data, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                navigator.geolocation.getCurrentPosition(resolve, reject);
                            })];
                    case 1:
                        position = _b.sent();
                        _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
                        return [4 /*yield*/, Logic.grabDataByPosition(system, latitude, longitude)];
                    case 2:
                        data = _b.sent();
                        return [2 /*return*/, data];
                    case 3:
                        error_1 = _b.sent();
                        alert(error_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Logic.grabDataByPosition = function (system, lat, lon) {
        return __awaiter(this, void 0, void 0, function () {
            var api, response, city, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = "https://api.openweathermap.org/geo/1.0/reverse?lat=".concat(lat, "&lon=").concat(lon, "&limit=1&appid=2871c88944b81fbab922d47012695ba3");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(api, { mode: 'cors' })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Localization not found");
                        return [4 /*yield*/, response.json()];
                    case 3:
                        city = (_a.sent())[0].name;
                        return [2 /*return*/, this.grabDataByCity(system, city)];
                    case 4:
                        error_2 = _a.sent();
                        alert(error_2);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Logic.grabDataByCity = function (system, city) {
        return __awaiter(this, void 0, void 0, function () {
            var api, response, data, _a, nextDays, error_3;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        api = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=").concat(system, "&appid=2871c88944b81fbab922d47012695ba3");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var res, error_4;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 2, , 3]);
                                                    return [4 /*yield*/, fetch(api, { mode: 'cors' })];
                                                case 1:
                                                    res = _a.sent();
                                                    resolve(res);
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    error_4 = _a.sent();
                                                    reject(error_4);
                                                    return [3 /*break*/, 3];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); }, 750);
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 2:
                        response = _b.sent();
                        if (!response.ok)
                            throw new Error("City '".concat(city, "' not found"));
                        _a = this.extractWeatherData;
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.apply(this, [_b.sent(), system]);
                        return [4 /*yield*/, this.grabDataNextDays(system, data.lat, data.lon)];
                    case 4:
                        nextDays = _b.sent();
                        data.nextDays = nextDays;
                        return [2 /*return*/, data];
                    case 5:
                        error_3 = _b.sent();
                        alert(error_3);
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Logic.grabDataNextDays = function (system, lat, lon) {
        return __awaiter(this, void 0, void 0, function () {
            var api, response, nextData, nextDays, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = "https://api.openweathermap.org/data/2.5/forecast?lat=".concat(lat, "&lon=").concat(lon, "&units=").concat(system, "&appid=2871c88944b81fbab922d47012695ba3");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(api, { mode: 'cors' })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Localization not found");
                        return [4 /*yield*/, response.json()];
                    case 3:
                        nextData = _a.sent();
                        nextDays = this.extractNextDays(nextData, system);
                        return [2 /*return*/, nextDays];
                    case 4:
                        error_5 = _a.sent();
                        alert(error_5);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Logic;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logic);


/***/ }),

/***/ "./src/code/ui.ts":
/*!************************!*\
  !*** ./src/code/ui.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ "./src/code/logic.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var UI = /** @class */ (function () {
    function UI() {
    }
    UI.setUnit = function (system) {
        var unitBtn = document.querySelector('#change-units');
        var systemUnits = unitBtn.dataset.unit || system || 'metric';
        this.updateUnitBtn(unitBtn, systemUnits);
        return systemUnits;
    };
    UI.updateUnitBtn = function (unitBtn, systemUnits) {
        var spanC = document.querySelector('#change-units span#C');
        var spanF = document.querySelector('#change-units span#F');
        unitBtn.dataset.unit = systemUnits;
        spanC.classList.toggle('bold', systemUnits === 'metric');
        spanF.classList.toggle('bold', systemUnits === 'imperial');
    };
    UI.toggleUnit = function (unitBtn) {
        var systemUnits = unitBtn.dataset.unit === 'metric' ? 'imperial' : 'metric';
        this.updateUnitBtn(unitBtn, systemUnits);
        this.replaceUnits(systemUnits);
    };
    UI.convertTemperature = function (temp, systemUnits) {
        var tempNumber = parseFloat(temp);
        if (systemUnits === 'imperial' && temp.includes('°C')) {
            tempNumber = Math.round((tempNumber * 9) / 5 + 32);
            return "".concat(tempNumber, "\u00B0F");
        }
        if (systemUnits === 'metric' && temp.includes('°F')) {
            tempNumber = Math.round(((tempNumber - 32) * 5) / 9);
            return "".concat(tempNumber, "\u00B0C");
        }
        return temp;
    };
    UI.convertWindSpeed = function (speed, systemUnits) {
        var speedNumber = parseFloat(speed);
        if (systemUnits === 'imperial' && speed.includes('km/h')) {
            speedNumber = Math.round(speedNumber / 1.6093);
            return "".concat(speedNumber, " mph");
        }
        if (systemUnits === 'metric' && speed.includes('mph')) {
            speedNumber = Math.round(speedNumber * 1.6093);
            return "".concat(speedNumber, " km/h");
        }
        return speed;
    };
    UI.replaceUnits = function (systemUnits) {
        var _this = this;
        var elements = ['#temperature', '#feels-like', '#wind-speed', '#tommorow-card .temp', '#after-tommorow-card .temp', '#next-card .temp'];
        elements.forEach(function (selector) {
            var element = document.querySelector(selector);
            var value = element.textContent;
            var isWindSpeed = selector === '#wind-speed';
            element.textContent = isWindSpeed ? _this.convertWindSpeed(value, systemUnits) : _this.convertTemperature(value, systemUnits);
        });
    };
    UI.loading = function (toggle) {
        var spinner = document.querySelector('#loading-spinner');
        var weather = document.querySelector('#weather-container');
        weather.classList.toggle('hide', toggle);
        spinner.classList.toggle('hide', !toggle);
    };
    UI.updateUI = function (data) {
        this.loading(false);
        this.clearWeather();
        this.displayWeather(data);
        this.setBcgColor(data);
    };
    UI.pickCity = function (e) {
        var _this = this;
        this.loading(true);
        if (e.target.classList.contains('btn')) {
            _logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabDataByCity(this.setUnit(), e.target.textContent).then(function (data) {
                _this.updateUI(data);
            });
        }
    };
    UI.searchCity = function () {
        var _this = this;
        var input = document.querySelector('#search-input');
        input.value = input.value.trim();
        if (input.value !== '') {
            this.loading(true);
            _logic__WEBPACK_IMPORTED_MODULE_0__["default"].grabDataByCity(this.setUnit(), input.value)
                .then(function (data) {
                input.value = '';
                _this.updateUI(data);
            })
                .catch(function () {
                _this.setGreyColor();
            });
        }
    };
    UI.findMe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading(true);
                        return [4 /*yield*/, _logic__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentPosition(this.setUnit())];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            this.updateUI(data);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UI.clearWeather = function () {
        var cardIds = ['main-card', 'img-card', 'secondary-card', 'tommorow-card', 'after-tommorow-card', 'next-card'];
        cardIds.forEach(function (id) {
            var card = document.querySelector("#".concat(id));
            card.textContent = '';
        });
    };
    UI.displayMainCard = function (data) {
        var mainCard = document.querySelector('#main-card');
        var elements = ['city', 'temperature', 'description'];
        elements.forEach(function (element) {
            if (element in data) {
                var el = document.createElement('h1');
                el.setAttribute('id', element === 'city' ? 'city-country' : element);
                el.textContent = data[element];
                mainCard.appendChild(el);
            }
        });
        if (data.country) {
            document.querySelector('#city-country').textContent += ", ".concat(data.country);
        }
    };
    UI.displayImgCard = function (data) {
        var imgCard = document.querySelector('#img-card');
        var img = document.createElement('img');
        img.src = "https://openweathermap.org/img/wn/".concat(data.icon, "@4x.png");
        img.alt = data.description;
        imgCard.appendChild(img);
    };
    UI.displaySecondaryCard = function (data) {
        var secondaryCard = document.querySelector('#secondary-card');
        var elements = ['feels-like', 'humidity', 'wind-speed', 'pressure'];
        var descriptions = ['Feels like: ', 'Humidity: ', 'Wind speed: ', 'Pressure: '];
        var dataValues = [data.feelsLikeTemp, data.humidityPercent, data.windSpeedUnit, data.pressureUnit];
        elements.forEach(function (element, index) {
            var p = document.createElement('p');
            p.textContent = descriptions[index];
            var span = document.createElement('span');
            span.id = element;
            span.append(" ".concat(dataValues[index]));
            p.appendChild(span);
            secondaryCard.appendChild(p);
        });
    };
    UI.createElementWithClass = function (elementType, className) {
        var element = document.createElement(elementType);
        element.className = className;
        return element;
    };
    UI.displayCard = function (data, dayIndex, cardId) {
        var card = document.querySelector("#".concat(cardId));
        var dayElement = this.createElementWithClass('p', 'day');
        var tempElement = this.createElementWithClass('p', 'temp');
        var iconElement = this.createElementWithClass('img', 'icon');
        dayElement.textContent = " ".concat(data.nextDays[dayIndex].day);
        tempElement.textContent = " ".concat(data.nextDays[dayIndex].temp);
        iconElement.src = "https://openweathermap.org/img/wn/".concat(data.nextDays[dayIndex].icon, "@4x.png");
        iconElement.alt = data.nextDays[dayIndex].description;
        card.append(dayElement, tempElement, iconElement);
    };
    UI.displayWeather = function (data) {
        var _this = this;
        this.displayMainCard(data);
        this.displayImgCard(data);
        this.displaySecondaryCard(data);
        ['tommorow-card', 'after-tommorow-card', 'next-card'].forEach(function (cardId, index) {
            _this.displayCard(data, index, cardId);
        });
    };
    UI.setBcgColor = function (data) {
        var tempStr = data.temperature;
        var temp;
        if (tempStr.includes('°F')) {
            var system = 'metric';
            tempStr = this.convertTemperature(tempStr, system);
        }
        temp = parseInt(tempStr, 10);
        var minTemp = 0;
        var maxTemp = 30;
        var minHsl = 220;
        var maxHsl = 0;
        temp = temp > maxTemp ? maxTemp : temp;
        temp = temp < minTemp ? minTemp : temp;
        var rangeTemp = maxTemp - minTemp;
        var rangeHsl = maxHsl - minHsl;
        var degCount = maxTemp - temp;
        var hslsDeg = rangeHsl / rangeTemp;
        var returnHue = 360 - (degCount * hslsDeg - (maxHsl - 360));
        var color = "hsl(".concat(returnHue, ", 100%, 75%)");
        document.documentElement.style.backgroundColor = color;
    };
    UI.setGreyColor = function () {
        var color = "hsl(0, 0%, 75%)";
        document.documentElement.style.backgroundColor = color;
    };
    UI.attachListeners = function () {
        var _this = this;
        var sampleLocations = document.querySelector('#sample-locations');
        var unitBtn = document.querySelector('#change-units');
        var searchBox = document.querySelector('#search-box');
        var searchBtn = document.querySelector('#search-btn');
        var findBtn = document.querySelector('#find-btn');
        sampleLocations.addEventListener('click', function (e) { return _this.pickCity(e); });
        searchBox.addEventListener('submit', function (e) { return e.preventDefault(); });
        searchBtn.addEventListener('click', function () { return _this.searchCity(); });
        findBtn.addEventListener('click', function () { return _this.findMe(); });
        unitBtn.addEventListener('click', function () { return _this.toggleUnit(unitBtn); });
    };
    UI.runApp = function () {
        this.setUnit();
        this.attachListeners();
    };
    return UI;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);


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
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/style.css */ "./src/style/style.css");
/* harmony import */ var _code_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code/ui */ "./src/code/ui.ts");



document.addEventListener('DOMContentLoaded', function () { return _code_ui__WEBPACK_IMPORTED_MODULE_2__["default"].runApp(); });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw4Q0FBSztBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw4Q0FBSztBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsOENBQUs7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsMkJBQTJCO0FBQzVGLDREQUE0RCw0QkFBNEI7QUFDeEYsMERBQTBELDRCQUE0QjtBQUN0Rix3REFBd0Qsd0JBQXdCO0FBQ2hGLHdEQUF3RCxtQ0FBbUM7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLEVBQUUsRUFBQzs7Ozs7OztVQ3JRbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnVCO0FBQ0k7QUFDQTtBQUMzQiw0REFBNEQsT0FBTyxnREFBRSxZQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb2RlL2xvZ2ljLnRzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvZGUvdWkudHMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgTG9naWMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTG9naWMoKSB7XG4gICAgfVxuICAgIExvZ2ljLmdldERlZ3JlZVVuaXQgPSBmdW5jdGlvbiAoc3lzdGVtKSB7XG4gICAgICAgIHJldHVybiBzeXN0ZW0gPT09ICdpbXBlcmlhbCcgPyAnwrBGJyA6ICfCsEMnO1xuICAgIH07XG4gICAgTG9naWMuY29udmVydFdpbmRTcGVlZCA9IGZ1bmN0aW9uIChzeXN0ZW0sIHdpbmRTcGVlZCkge1xuICAgICAgICB2YXIgd2luZFNwZWVkSW5LbUggPSBNYXRoLnJvdW5kKHdpbmRTcGVlZCAqIDMuNik7XG4gICAgICAgIHJldHVybiBzeXN0ZW0gPT09ICdpbXBlcmlhbCcgPyBcIlwiLmNvbmNhdChNYXRoLnJvdW5kKHdpbmRTcGVlZCksIFwiIG1waFwiKSA6IFwiXCIuY29uY2F0KHdpbmRTcGVlZEluS21ILCBcIiBrbS9oXCIpO1xuICAgIH07XG4gICAgTG9naWMuZ2V0RGF5T2ZXZWVrID0gZnVuY3Rpb24gKGVwb2NoKSB7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZXBvY2ggKiAxMDAwKTtcbiAgICAgICAgdmFyIGRheXMgPSBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J107XG4gICAgICAgIHJldHVybiBkYXlzW2RhdGUuZ2V0RGF5KCldO1xuICAgIH07XG4gICAgTG9naWMuZXh0cmFjdFdlYXRoZXJEYXRhID0gZnVuY3Rpb24gKGRhdGEsIHN5c3RlbSkge1xuICAgICAgICB2YXIgY2l0eSA9IGRhdGEubmFtZSwgY291bnRyeSA9IGRhdGEuc3lzLmNvdW50cnksIF9hID0gZGF0YS53ZWF0aGVyWzBdLCB3ZWF0aGVyID0gX2EubWFpbiwgZGVzY3JpcHRpb24gPSBfYS5kZXNjcmlwdGlvbiwgaWNvbiA9IF9hLmljb24sIHdpbmRTcGVlZCA9IGRhdGEud2luZC5zcGVlZCwgX2IgPSBkYXRhLm1haW4sIHRlbXAgPSBfYi50ZW1wLCBmZWVsc0xpa2UgPSBfYi5mZWVsc19saWtlLCBwcmVzc3VyZSA9IF9iLnByZXNzdXJlLCBodW1pZGl0eSA9IF9iLmh1bWlkaXR5LCBfYyA9IGRhdGEuY29vcmQsIGxhdCA9IF9jLmxhdCwgbG9uID0gX2MubG9uO1xuICAgICAgICB2YXIgZGVncmVlVW5pdCA9IHRoaXMuZ2V0RGVncmVlVW5pdChzeXN0ZW0pO1xuICAgICAgICB2YXIgdGVtcGVyYXR1cmUgPSBcIlwiLmNvbmNhdChNYXRoLnJvdW5kKHRlbXApKS5jb25jYXQoZGVncmVlVW5pdCk7XG4gICAgICAgIHZhciBmZWVsc0xpa2VUZW1wID0gXCJcIi5jb25jYXQoTWF0aC5yb3VuZChmZWVsc0xpa2UpKS5jb25jYXQoZGVncmVlVW5pdCk7XG4gICAgICAgIHZhciB3aW5kU3BlZWRVbml0ID0gdGhpcy5jb252ZXJ0V2luZFNwZWVkKHN5c3RlbSwgd2luZFNwZWVkKTtcbiAgICAgICAgdmFyIHByZXNzdXJlVW5pdCA9IFwiXCIuY29uY2F0KHByZXNzdXJlLCBcIiBoUGFcIik7XG4gICAgICAgIHZhciBodW1pZGl0eVBlcmNlbnQgPSBcIlwiLmNvbmNhdChodW1pZGl0eSwgXCIlXCIpO1xuICAgICAgICByZXR1cm4geyBjaXR5OiBjaXR5LCBjb3VudHJ5OiBjb3VudHJ5LCBpY29uOiBpY29uLCB0ZW1wZXJhdHVyZTogdGVtcGVyYXR1cmUsIGZlZWxzTGlrZVRlbXA6IGZlZWxzTGlrZVRlbXAsIGh1bWlkaXR5UGVyY2VudDogaHVtaWRpdHlQZXJjZW50LCB3aW5kU3BlZWRVbml0OiB3aW5kU3BlZWRVbml0LCBwcmVzc3VyZVVuaXQ6IHByZXNzdXJlVW5pdCwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLCB3ZWF0aGVyOiB3ZWF0aGVyLCBsYXQ6IGxhdCwgbG9uOiBsb24gfTtcbiAgICB9O1xuICAgIExvZ2ljLmV4dHJhY3ROZXh0RGF5cyA9IGZ1bmN0aW9uIChuZXh0RGF0YSwgc3lzdGVtKSB7XG4gICAgICAgIHZhciBuZXh0RGF5cyA9IFtdO1xuICAgICAgICB2YXIgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjdXJyZW50RGF0ZS5zZXREYXRlKGN1cnJlbnREYXRlLmdldERhdGUoKSArIDEpO1xuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZVN0ciA9IGN1cnJlbnREYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcbiAgICAgICAgICAgIHZhciBkYXRlVGltZVN0ciA9IFwiXCIuY29uY2F0KGRhdGVTdHIsIFwiIDEyOjAwOjAwXCIpO1xuICAgICAgICAgICAgdmFyIGRheURhdGEgPSBuZXh0RGF0YS5saXN0LmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0uZHRfdHh0ID09PSBkYXRlVGltZVN0cjsgfSk7XG4gICAgICAgICAgICBpZiAoZGF5RGF0YSkge1xuICAgICAgICAgICAgICAgIG5leHREYXlzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBkYXk6IHRoaXNfMS5nZXREYXlPZldlZWsoZGF5RGF0YS5kdCksXG4gICAgICAgICAgICAgICAgICAgIHRlbXA6IE1hdGgucm91bmQoZGF5RGF0YS5tYWluLnRlbXApICsgdGhpc18xLmdldERlZ3JlZVVuaXQoc3lzdGVtKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogZGF5RGF0YS53ZWF0aGVyWzBdLmljb24sXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXlEYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5zZXREYXRlKGN1cnJlbnREYXRlLmdldERhdGUoKSArIDEpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgdGhpc18xID0gdGhpcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIF9sb29wXzEoaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHREYXlzO1xuICAgIH07XG4gICAgTG9naWMuZ2V0Q3VycmVudFBvc2l0aW9uID0gZnVuY3Rpb24gKHN5c3RlbSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24sIF9hLCBsYXRpdHVkZSwgbG9uZ2l0dWRlLCBkYXRhLCBlcnJvcl8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFswLCAzLCAsIDRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHBvc2l0aW9uLmNvb3JkcywgbGF0aXR1ZGUgPSBfYS5sYXRpdHVkZSwgbG9uZ2l0dWRlID0gX2EubG9uZ2l0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgTG9naWMuZ3JhYkRhdGFCeVBvc2l0aW9uKHN5c3RlbSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3JfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbnVsbF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExvZ2ljLmdyYWJEYXRhQnlQb3NpdGlvbiA9IGZ1bmN0aW9uIChzeXN0ZW0sIGxhdCwgbG9uKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcGksIHJlc3BvbnNlLCBjaXR5LCBlcnJvcl8yO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXBpID0gXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9yZXZlcnNlP2xhdD1cIi5jb25jYXQobGF0LCBcIiZsb249XCIpLmNvbmNhdChsb24sIFwiJmxpbWl0PTEmYXBwaWQ9Mjg3MWM4ODk0NGI4MWZiYWI5MjJkNDcwMTI2OTViYTNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvY2FsaXphdGlvbiBub3QgZm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBjaXR5ID0gKF9hLnNlbnQoKSlbMF0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmdyYWJEYXRhQnlDaXR5KHN5c3RlbSwgY2l0eSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8yID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3JfMik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbnVsbF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExvZ2ljLmdyYWJEYXRhQnlDaXR5ID0gZnVuY3Rpb24gKHN5c3RlbSwgY2l0eSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXBpLCByZXNwb25zZSwgZGF0YSwgX2EsIG5leHREYXlzLCBlcnJvcl8zO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaSA9IFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1cIi5jb25jYXQoY2l0eSwgXCImdW5pdHM9XCIpLmNvbmNhdChzeXN0ZW0sIFwiJmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsIDUsICwgNl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzLCBlcnJvcl80O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMiwgLCAzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl80ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcl80KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSwgNzUwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNpdHkgJ1wiLmNvbmNhdChjaXR5LCBcIicgbm90IGZvdW5kXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdGhpcy5leHRyYWN0V2VhdGhlckRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gX2EuYXBwbHkodGhpcywgW19iLnNlbnQoKSwgc3lzdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdyYWJEYXRhTmV4dERheXMoc3lzdGVtLCBkYXRhLmxhdCwgZGF0YS5sb24pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dERheXMgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLm5leHREYXlzID0gbmV4dERheXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGF0YV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yXzMgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChlcnJvcl8zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBudWxsXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTG9naWMuZ3JhYkRhdGFOZXh0RGF5cyA9IGZ1bmN0aW9uIChzeXN0ZW0sIGxhdCwgbG9uKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcGksIHJlc3BvbnNlLCBuZXh0RGF0YSwgbmV4dERheXMsIGVycm9yXzU7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkgPSBcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9XCIuY29uY2F0KGxhdCwgXCImbG9uPVwiKS5jb25jYXQobG9uLCBcIiZ1bml0cz1cIikuY29uY2F0KHN5c3RlbSwgXCImYXBwaWQ9Mjg3MWM4ODk0NGI4MWZiYWI5MjJkNDcwMTI2OTViYTNcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgNCwgLCA1XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmZXRjaChhcGksIHsgbW9kZTogJ2NvcnMnIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxvY2FsaXphdGlvbiBub3QgZm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNwb25zZS5qc29uKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0RGF0YSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHREYXlzID0gdGhpcy5leHRyYWN0TmV4dERheXMobmV4dERhdGEsIHN5c3RlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV4dERheXNdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl81ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3JfNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbnVsbF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBMb2dpYztcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBMb2dpYztcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCBMb2dpYyBmcm9tICcuL2xvZ2ljJztcbnZhciBVSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVSSgpIHtcbiAgICB9XG4gICAgVUkuc2V0VW5pdCA9IGZ1bmN0aW9uIChzeXN0ZW0pIHtcbiAgICAgICAgdmFyIHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzJyk7XG4gICAgICAgIHZhciBzeXN0ZW1Vbml0cyA9IHVuaXRCdG4uZGF0YXNldC51bml0IHx8IHN5c3RlbSB8fCAnbWV0cmljJztcbiAgICAgICAgdGhpcy51cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKTtcbiAgICAgICAgcmV0dXJuIHN5c3RlbVVuaXRzO1xuICAgIH07XG4gICAgVUkudXBkYXRlVW5pdEJ0biA9IGZ1bmN0aW9uICh1bml0QnRuLCBzeXN0ZW1Vbml0cykge1xuICAgICAgICB2YXIgc3BhbkMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzIHNwYW4jQycpO1xuICAgICAgICB2YXIgc3BhbkYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzIHNwYW4jRicpO1xuICAgICAgICB1bml0QnRuLmRhdGFzZXQudW5pdCA9IHN5c3RlbVVuaXRzO1xuICAgICAgICBzcGFuQy5jbGFzc0xpc3QudG9nZ2xlKCdib2xkJywgc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnKTtcbiAgICAgICAgc3BhbkYuY2xhc3NMaXN0LnRvZ2dsZSgnYm9sZCcsIHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnKTtcbiAgICB9O1xuICAgIFVJLnRvZ2dsZVVuaXQgPSBmdW5jdGlvbiAodW5pdEJ0bikge1xuICAgICAgICB2YXIgc3lzdGVtVW5pdHMgPSB1bml0QnRuLmRhdGFzZXQudW5pdCA9PT0gJ21ldHJpYycgPyAnaW1wZXJpYWwnIDogJ21ldHJpYyc7XG4gICAgICAgIHRoaXMudXBkYXRlVW5pdEJ0bih1bml0QnRuLCBzeXN0ZW1Vbml0cyk7XG4gICAgICAgIHRoaXMucmVwbGFjZVVuaXRzKHN5c3RlbVVuaXRzKTtcbiAgICB9O1xuICAgIFVJLmNvbnZlcnRUZW1wZXJhdHVyZSA9IGZ1bmN0aW9uICh0ZW1wLCBzeXN0ZW1Vbml0cykge1xuICAgICAgICB2YXIgdGVtcE51bWJlciA9IHBhcnNlRmxvYXQodGVtcCk7XG4gICAgICAgIGlmIChzeXN0ZW1Vbml0cyA9PT0gJ2ltcGVyaWFsJyAmJiB0ZW1wLmluY2x1ZGVzKCfCsEMnKSkge1xuICAgICAgICAgICAgdGVtcE51bWJlciA9IE1hdGgucm91bmQoKHRlbXBOdW1iZXIgKiA5KSAvIDUgKyAzMik7XG4gICAgICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQodGVtcE51bWJlciwgXCJcXHUwMEIwRlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnICYmIHRlbXAuaW5jbHVkZXMoJ8KwRicpKSB7XG4gICAgICAgICAgICB0ZW1wTnVtYmVyID0gTWF0aC5yb3VuZCgoKHRlbXBOdW1iZXIgLSAzMikgKiA1KSAvIDkpO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHRlbXBOdW1iZXIsIFwiXFx1MDBCMENcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfTtcbiAgICBVSS5jb252ZXJ0V2luZFNwZWVkID0gZnVuY3Rpb24gKHNwZWVkLCBzeXN0ZW1Vbml0cykge1xuICAgICAgICB2YXIgc3BlZWROdW1iZXIgPSBwYXJzZUZsb2F0KHNwZWVkKTtcbiAgICAgICAgaWYgKHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnICYmIHNwZWVkLmluY2x1ZGVzKCdrbS9oJykpIHtcbiAgICAgICAgICAgIHNwZWVkTnVtYmVyID0gTWF0aC5yb3VuZChzcGVlZE51bWJlciAvIDEuNjA5Myk7XG4gICAgICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoc3BlZWROdW1iZXIsIFwiIG1waFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnICYmIHNwZWVkLmluY2x1ZGVzKCdtcGgnKSkge1xuICAgICAgICAgICAgc3BlZWROdW1iZXIgPSBNYXRoLnJvdW5kKHNwZWVkTnVtYmVyICogMS42MDkzKTtcbiAgICAgICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChzcGVlZE51bWJlciwgXCIga20vaFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlZWQ7XG4gICAgfTtcbiAgICBVSS5yZXBsYWNlVW5pdHMgPSBmdW5jdGlvbiAoc3lzdGVtVW5pdHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gWycjdGVtcGVyYXR1cmUnLCAnI2ZlZWxzLWxpa2UnLCAnI3dpbmQtc3BlZWQnLCAnI3RvbW1vcm93LWNhcmQgLnRlbXAnLCAnI2FmdGVyLXRvbW1vcm93LWNhcmQgLnRlbXAnLCAnI25leHQtY2FyZCAudGVtcCddO1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICB2YXIgaXNXaW5kU3BlZWQgPSBzZWxlY3RvciA9PT0gJyN3aW5kLXNwZWVkJztcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBpc1dpbmRTcGVlZCA/IF90aGlzLmNvbnZlcnRXaW5kU3BlZWQodmFsdWUsIHN5c3RlbVVuaXRzKSA6IF90aGlzLmNvbnZlcnRUZW1wZXJhdHVyZSh2YWx1ZSwgc3lzdGVtVW5pdHMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFVJLmxvYWRpbmcgPSBmdW5jdGlvbiAodG9nZ2xlKSB7XG4gICAgICAgIHZhciBzcGlubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRpbmctc3Bpbm5lcicpO1xuICAgICAgICB2YXIgd2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWF0aGVyLWNvbnRhaW5lcicpO1xuICAgICAgICB3ZWF0aGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnLCB0b2dnbGUpO1xuICAgICAgICBzcGlubmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnLCAhdG9nZ2xlKTtcbiAgICB9O1xuICAgIFVJLnVwZGF0ZVVJID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jbGVhcldlYXRoZXIoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRCY2dDb2xvcihkYXRhKTtcbiAgICB9O1xuICAgIFVJLnBpY2tDaXR5ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2FkaW5nKHRydWUpO1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4nKSkge1xuICAgICAgICAgICAgTG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGUudGFyZ2V0LnRleHRDb250ZW50KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlVUkoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVUkuc2VhcmNoQ2l0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dCcpO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgTG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGlucHV0LnZhbHVlKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGVVSShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRHcmV5Q29sb3IoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBVSS5maW5kTWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgTG9naWMuZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuc2V0VW5pdCgpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVUkuY2xlYXJXZWF0aGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FyZElkcyA9IFsnbWFpbi1jYXJkJywgJ2ltZy1jYXJkJywgJ3NlY29uZGFyeS1jYXJkJywgJ3RvbW1vcm93LWNhcmQnLCAnYWZ0ZXItdG9tbW9yb3ctY2FyZCcsICduZXh0LWNhcmQnXTtcbiAgICAgICAgY2FyZElkcy5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgdmFyIGNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiLmNvbmNhdChpZCkpO1xuICAgICAgICAgICAgY2FyZC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFVJLmRpc3BsYXlNYWluQ2FyZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBtYWluQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQnKTtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gWydjaXR5JywgJ3RlbXBlcmF0dXJlJywgJ2Rlc2NyaXB0aW9uJ107XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50IGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaWQnLCBlbGVtZW50ID09PSAnY2l0eScgPyAnY2l0eS1jb3VudHJ5JyA6IGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gZGF0YVtlbGVtZW50XTtcbiAgICAgICAgICAgICAgICBtYWluQ2FyZC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YS5jb3VudHJ5KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eS1jb3VudHJ5JykudGV4dENvbnRlbnQgKz0gXCIsIFwiLmNvbmNhdChkYXRhLmNvdW50cnkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBVSS5kaXNwbGF5SW1nQ2FyZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBpbWdDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltZy1jYXJkJyk7XG4gICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1nLnNyYyA9IFwiaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiLmNvbmNhdChkYXRhLmljb24sIFwiQDR4LnBuZ1wiKTtcbiAgICAgICAgaW1nLmFsdCA9IGRhdGEuZGVzY3JpcHRpb247XG4gICAgICAgIGltZ0NhcmQuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICB9O1xuICAgIFVJLmRpc3BsYXlTZWNvbmRhcnlDYXJkID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHNlY29uZGFyeUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2Vjb25kYXJ5LWNhcmQnKTtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gWydmZWVscy1saWtlJywgJ2h1bWlkaXR5JywgJ3dpbmQtc3BlZWQnLCAncHJlc3N1cmUnXTtcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9ucyA9IFsnRmVlbHMgbGlrZTogJywgJ0h1bWlkaXR5OiAnLCAnV2luZCBzcGVlZDogJywgJ1ByZXNzdXJlOiAnXTtcbiAgICAgICAgdmFyIGRhdGFWYWx1ZXMgPSBbZGF0YS5mZWVsc0xpa2VUZW1wLCBkYXRhLmh1bWlkaXR5UGVyY2VudCwgZGF0YS53aW5kU3BlZWRVbml0LCBkYXRhLnByZXNzdXJlVW5pdF07XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHAudGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbnNbaW5kZXhdO1xuICAgICAgICAgICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzcGFuLmlkID0gZWxlbWVudDtcbiAgICAgICAgICAgIHNwYW4uYXBwZW5kKFwiIFwiLmNvbmNhdChkYXRhVmFsdWVzW2luZGV4XSkpO1xuICAgICAgICAgICAgcC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgICAgIHNlY29uZGFyeUNhcmQuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVUkuY3JlYXRlRWxlbWVudFdpdGhDbGFzcyA9IGZ1bmN0aW9uIChlbGVtZW50VHlwZSwgY2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIFVJLmRpc3BsYXlDYXJkID0gZnVuY3Rpb24gKGRhdGEsIGRheUluZGV4LCBjYXJkSWQpIHtcbiAgICAgICAgdmFyIGNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiLmNvbmNhdChjYXJkSWQpKTtcbiAgICAgICAgdmFyIGRheUVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoJ3AnLCAnZGF5Jyk7XG4gICAgICAgIHZhciB0ZW1wRWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudFdpdGhDbGFzcygncCcsICd0ZW1wJyk7XG4gICAgICAgIHZhciBpY29uRWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudFdpdGhDbGFzcygnaW1nJywgJ2ljb24nKTtcbiAgICAgICAgZGF5RWxlbWVudC50ZXh0Q29udGVudCA9IFwiIFwiLmNvbmNhdChkYXRhLm5leHREYXlzW2RheUluZGV4XS5kYXkpO1xuICAgICAgICB0ZW1wRWxlbWVudC50ZXh0Q29udGVudCA9IFwiIFwiLmNvbmNhdChkYXRhLm5leHREYXlzW2RheUluZGV4XS50ZW1wKTtcbiAgICAgICAgaWNvbkVsZW1lbnQuc3JjID0gXCJodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCIuY29uY2F0KGRhdGEubmV4dERheXNbZGF5SW5kZXhdLmljb24sIFwiQDR4LnBuZ1wiKTtcbiAgICAgICAgaWNvbkVsZW1lbnQuYWx0ID0gZGF0YS5uZXh0RGF5c1tkYXlJbmRleF0uZGVzY3JpcHRpb247XG4gICAgICAgIGNhcmQuYXBwZW5kKGRheUVsZW1lbnQsIHRlbXBFbGVtZW50LCBpY29uRWxlbWVudCk7XG4gICAgfTtcbiAgICBVSS5kaXNwbGF5V2VhdGhlciA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGlzcGxheU1haW5DYXJkKGRhdGEpO1xuICAgICAgICB0aGlzLmRpc3BsYXlJbWdDYXJkKGRhdGEpO1xuICAgICAgICB0aGlzLmRpc3BsYXlTZWNvbmRhcnlDYXJkKGRhdGEpO1xuICAgICAgICBbJ3RvbW1vcm93LWNhcmQnLCAnYWZ0ZXItdG9tbW9yb3ctY2FyZCcsICduZXh0LWNhcmQnXS5mb3JFYWNoKGZ1bmN0aW9uIChjYXJkSWQsIGluZGV4KSB7XG4gICAgICAgICAgICBfdGhpcy5kaXNwbGF5Q2FyZChkYXRhLCBpbmRleCwgY2FyZElkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBVSS5zZXRCY2dDb2xvciA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciB0ZW1wU3RyID0gZGF0YS50ZW1wZXJhdHVyZTtcbiAgICAgICAgdmFyIHRlbXA7XG4gICAgICAgIGlmICh0ZW1wU3RyLmluY2x1ZGVzKCfCsEYnKSkge1xuICAgICAgICAgICAgdmFyIHN5c3RlbSA9ICdtZXRyaWMnO1xuICAgICAgICAgICAgdGVtcFN0ciA9IHRoaXMuY29udmVydFRlbXBlcmF0dXJlKHRlbXBTdHIsIHN5c3RlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcCA9IHBhcnNlSW50KHRlbXBTdHIsIDEwKTtcbiAgICAgICAgdmFyIG1pblRlbXAgPSAwO1xuICAgICAgICB2YXIgbWF4VGVtcCA9IDMwO1xuICAgICAgICB2YXIgbWluSHNsID0gMjIwO1xuICAgICAgICB2YXIgbWF4SHNsID0gMDtcbiAgICAgICAgdGVtcCA9IHRlbXAgPiBtYXhUZW1wID8gbWF4VGVtcCA6IHRlbXA7XG4gICAgICAgIHRlbXAgPSB0ZW1wIDwgbWluVGVtcCA/IG1pblRlbXAgOiB0ZW1wO1xuICAgICAgICB2YXIgcmFuZ2VUZW1wID0gbWF4VGVtcCAtIG1pblRlbXA7XG4gICAgICAgIHZhciByYW5nZUhzbCA9IG1heEhzbCAtIG1pbkhzbDtcbiAgICAgICAgdmFyIGRlZ0NvdW50ID0gbWF4VGVtcCAtIHRlbXA7XG4gICAgICAgIHZhciBoc2xzRGVnID0gcmFuZ2VIc2wgLyByYW5nZVRlbXA7XG4gICAgICAgIHZhciByZXR1cm5IdWUgPSAzNjAgLSAoZGVnQ291bnQgKiBoc2xzRGVnIC0gKG1heEhzbCAtIDM2MCkpO1xuICAgICAgICB2YXIgY29sb3IgPSBcImhzbChcIi5jb25jYXQocmV0dXJuSHVlLCBcIiwgMTAwJSwgNzUlKVwiKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgIH07XG4gICAgVUkuc2V0R3JleUNvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sb3IgPSBcImhzbCgwLCAwJSwgNzUlKVwiO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgfTtcbiAgICBVSS5hdHRhY2hMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzYW1wbGVMb2NhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FtcGxlLWxvY2F0aW9ucycpO1xuICAgICAgICB2YXIgdW5pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2UtdW5pdHMnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYm94Jyk7XG4gICAgICAgIHZhciBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ0bicpO1xuICAgICAgICB2YXIgZmluZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaW5kLWJ0bicpO1xuICAgICAgICBzYW1wbGVMb2NhdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMucGlja0NpdHkoZSk7IH0pO1xuICAgICAgICBzZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTsgfSk7XG4gICAgICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnNlYXJjaENpdHkoKTsgfSk7XG4gICAgICAgIGZpbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5maW5kTWUoKTsgfSk7XG4gICAgICAgIHVuaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy50b2dnbGVVbml0KHVuaXRCdG4pOyB9KTtcbiAgICB9O1xuICAgIFVJLnJ1bkFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRVbml0KCk7XG4gICAgICAgIHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG4gICAgfTtcbiAgICByZXR1cm4gVUk7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgVUk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnbm9ybWFsaXplLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuY3NzJztcbmltcG9ydCBVSSBmcm9tICcuL2NvZGUvdWknO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFVJLnJ1bkFwcCgpOyB9KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==