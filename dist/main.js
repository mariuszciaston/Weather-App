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
        var systemUnits = unitBtn.value || system || 'metric';
        this.updateUnitBtn(unitBtn, systemUnits);
        return systemUnits;
    };
    UI.updateUnitBtn = function (unitBtn, systemUnits) {
        var spanC = document.querySelector('#change-units span#C');
        var spanF = document.querySelector('#change-units span#F');
        var newUnitBtn = unitBtn;
        newUnitBtn.value = systemUnits;
        spanC.classList.toggle('bold', systemUnits === 'metric');
        spanF.classList.toggle('bold', systemUnits === 'imperial');
    };
    UI.toggleUnit = function (unitBtn) {
        var systemUnits = unitBtn.value === 'metric' ? 'imperial' : 'metric';
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
        var elements = ['city-country', 'temperature', 'description'];
        elements.forEach(function (element) {
            var el = document.createElement('h1');
            el.setAttribute('id', element);
            el.textContent = data[element];
            mainCard.appendChild(el);
        });
        if (data.country !== undefined) {
            document.querySelector('#city-country').textContent = "".concat(data.city, ", ").concat(data.country);
        }
        else {
            document.querySelector('#city-country').textContent = "".concat(data.city);
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
        var temp = data.temperature;
        if (data.temperature.includes('°F')) {
            var system = 'metric';
            temp = this.convertTemperature(data.temperature, system);
        }
        temp = parseInt(temp, 10);
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



document.addEventListener('DOMContentLoaded', _code_ui__WEBPACK_IMPORTED_MODULE_2__["default"].runApp());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDhDQUFLO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qyw4Q0FBSztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSwyQkFBMkI7QUFDNUYsNERBQTRELDRCQUE0QjtBQUN4RiwwREFBMEQsNEJBQTRCO0FBQ3RGLHdEQUF3RCx3QkFBd0I7QUFDaEYsd0RBQXdELG1DQUFtQztBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsRUFBRSxFQUFDOzs7Ozs7O1VDdFFsQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOdUI7QUFDSTtBQUNBO0FBQzNCLDhDQUE4QyxnREFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29kZS9sb2dpYy50cyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb2RlL3VpLnRzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIExvZ2ljID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExvZ2ljKCkge1xuICAgIH1cbiAgICBMb2dpYy5nZXREZWdyZWVVbml0ID0gZnVuY3Rpb24gKHN5c3RlbSkge1xuICAgICAgICByZXR1cm4gc3lzdGVtID09PSAnaW1wZXJpYWwnID8gJ8KwRicgOiAnwrBDJztcbiAgICB9O1xuICAgIExvZ2ljLmNvbnZlcnRXaW5kU3BlZWQgPSBmdW5jdGlvbiAoc3lzdGVtLCB3aW5kU3BlZWQpIHtcbiAgICAgICAgdmFyIHdpbmRTcGVlZEluS21IID0gTWF0aC5yb3VuZCh3aW5kU3BlZWQgKiAzLjYpO1xuICAgICAgICByZXR1cm4gc3lzdGVtID09PSAnaW1wZXJpYWwnID8gXCJcIi5jb25jYXQoTWF0aC5yb3VuZCh3aW5kU3BlZWQpLCBcIiBtcGhcIikgOiBcIlwiLmNvbmNhdCh3aW5kU3BlZWRJbkttSCwgXCIga20vaFwiKTtcbiAgICB9O1xuICAgIExvZ2ljLmdldERheU9mV2VlayA9IGZ1bmN0aW9uIChlcG9jaCkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGVwb2NoICogMTAwMCk7XG4gICAgICAgIHZhciBkYXlzID0gWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddO1xuICAgICAgICByZXR1cm4gZGF5c1tkYXRlLmdldERheSgpXTtcbiAgICB9O1xuICAgIExvZ2ljLmV4dHJhY3RXZWF0aGVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhLCBzeXN0ZW0pIHtcbiAgICAgICAgdmFyIGNpdHkgPSBkYXRhLm5hbWUsIGNvdW50cnkgPSBkYXRhLnN5cy5jb3VudHJ5LCBfYSA9IGRhdGEud2VhdGhlclswXSwgd2VhdGhlciA9IF9hLm1haW4sIGRlc2NyaXB0aW9uID0gX2EuZGVzY3JpcHRpb24sIGljb24gPSBfYS5pY29uLCB3aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQsIF9iID0gZGF0YS5tYWluLCB0ZW1wID0gX2IudGVtcCwgZmVlbHNMaWtlID0gX2IuZmVlbHNfbGlrZSwgcHJlc3N1cmUgPSBfYi5wcmVzc3VyZSwgaHVtaWRpdHkgPSBfYi5odW1pZGl0eSwgX2MgPSBkYXRhLmNvb3JkLCBsYXQgPSBfYy5sYXQsIGxvbiA9IF9jLmxvbjtcbiAgICAgICAgdmFyIGRlZ3JlZVVuaXQgPSB0aGlzLmdldERlZ3JlZVVuaXQoc3lzdGVtKTtcbiAgICAgICAgdmFyIHRlbXBlcmF0dXJlID0gXCJcIi5jb25jYXQoTWF0aC5yb3VuZCh0ZW1wKSkuY29uY2F0KGRlZ3JlZVVuaXQpO1xuICAgICAgICB2YXIgZmVlbHNMaWtlVGVtcCA9IFwiXCIuY29uY2F0KE1hdGgucm91bmQoZmVlbHNMaWtlKSkuY29uY2F0KGRlZ3JlZVVuaXQpO1xuICAgICAgICB2YXIgd2luZFNwZWVkVW5pdCA9IHRoaXMuY29udmVydFdpbmRTcGVlZChzeXN0ZW0sIHdpbmRTcGVlZCk7XG4gICAgICAgIHZhciBwcmVzc3VyZVVuaXQgPSBcIlwiLmNvbmNhdChwcmVzc3VyZSwgXCIgaFBhXCIpO1xuICAgICAgICB2YXIgaHVtaWRpdHlQZXJjZW50ID0gXCJcIi5jb25jYXQoaHVtaWRpdHksIFwiJVwiKTtcbiAgICAgICAgcmV0dXJuIHsgY2l0eTogY2l0eSwgY291bnRyeTogY291bnRyeSwgaWNvbjogaWNvbiwgdGVtcGVyYXR1cmU6IHRlbXBlcmF0dXJlLCBmZWVsc0xpa2VUZW1wOiBmZWVsc0xpa2VUZW1wLCBodW1pZGl0eVBlcmNlbnQ6IGh1bWlkaXR5UGVyY2VudCwgd2luZFNwZWVkVW5pdDogd2luZFNwZWVkVW5pdCwgcHJlc3N1cmVVbml0OiBwcmVzc3VyZVVuaXQsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwgd2VhdGhlcjogd2VhdGhlciwgbGF0OiBsYXQsIGxvbjogbG9uIH07XG4gICAgfTtcbiAgICBMb2dpYy5leHRyYWN0TmV4dERheXMgPSBmdW5jdGlvbiAobmV4dERhdGEsIHN5c3RlbSkge1xuICAgICAgICB2YXIgbmV4dERheXMgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgY3VycmVudERhdGUuc2V0RGF0ZShjdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgdmFyIGRhdGVTdHIgPSBjdXJyZW50RGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gICAgICAgICAgICB2YXIgZGF0ZVRpbWVTdHIgPSBcIlwiLmNvbmNhdChkYXRlU3RyLCBcIiAxMjowMDowMFwiKTtcbiAgICAgICAgICAgIHZhciBkYXlEYXRhID0gbmV4dERhdGEubGlzdC5maW5kKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmR0X3R4dCA9PT0gZGF0ZVRpbWVTdHI7IH0pO1xuICAgICAgICAgICAgaWYgKGRheURhdGEpIHtcbiAgICAgICAgICAgICAgICBuZXh0RGF5cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGF5OiB0aGlzXzEuZ2V0RGF5T2ZXZWVrKGRheURhdGEuZHQpLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wOiBNYXRoLnJvdW5kKGRheURhdGEubWFpbi50ZW1wKSArIHRoaXNfMS5nZXREZWdyZWVVbml0KHN5c3RlbSksXG4gICAgICAgICAgICAgICAgICAgIGljb246IGRheURhdGEud2VhdGhlclswXS5pY29uLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGF5RGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudERhdGUuc2V0RGF0ZShjdXJyZW50RGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSArPSAxKSB7XG4gICAgICAgICAgICBfbG9vcF8xKGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0RGF5cztcbiAgICB9O1xuICAgIExvZ2ljLmdldEN1cnJlbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIChzeXN0ZW0pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uLCBfYSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSwgZGF0YSwgZXJyb3JfMTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMCwgMywgLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBwb3NpdGlvbi5jb29yZHMsIGxhdGl0dWRlID0gX2EubGF0aXR1ZGUsIGxvbmdpdHVkZSA9IF9hLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIExvZ2ljLmdyYWJEYXRhQnlQb3NpdGlvbihzeXN0ZW0sIGxhdGl0dWRlLCBsb25naXR1ZGUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBkYXRhXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG51bGxdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMb2dpYy5ncmFiRGF0YUJ5UG9zaXRpb24gPSBmdW5jdGlvbiAoc3lzdGVtLCBsYXQsIGxvbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXBpLCByZXNwb25zZSwgY2l0eSwgZXJyb3JfMjtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaSA9IFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvcmV2ZXJzZT9sYXQ9XCIuY29uY2F0KGxhdCwgXCImbG9uPVwiKS5jb25jYXQobG9uLCBcIiZsaW1pdD0xJmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDQsICwgNV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2NhbGl6YXRpb24gbm90IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eSA9IChfYS5zZW50KCkpWzBdLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5ncmFiRGF0YUJ5Q2l0eShzeXN0ZW0sIGNpdHkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yXzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG51bGxdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBMb2dpYy5ncmFiRGF0YUJ5Q2l0eSA9IGZ1bmN0aW9uIChzeXN0ZW0sIGNpdHkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFwaSwgcmVzcG9uc2UsIGRhdGEsIF9hLCBuZXh0RGF5cywgZXJyb3JfMztcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkgPSBcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9XCIuY29uY2F0KGNpdHksIFwiJnVuaXRzPVwiKS5jb25jYXQoc3lzdGVtLCBcIiZhcHBpZD0yODcxYzg4OTQ0YjgxZmJhYjkyMmQ0NzAxMjY5NWJhM1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCA1LCAsIDZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcywgZXJyb3JfNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDIsICwgM10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGZldGNoKGFwaSwgeyBtb2RlOiAnY29ycycgfSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfNCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3JfNCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0sIDc1MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaXR5ICdcIi5jb25jYXQoY2l0eSwgXCInIG5vdCBmb3VuZFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRoaXMuZXh0cmFjdFdlYXRoZXJEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IF9hLmFwcGx5KHRoaXMsIFtfYi5zZW50KCksIHN5c3RlbV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5ncmFiRGF0YU5leHREYXlzKHN5c3RlbSwgZGF0YS5sYXQsIGRhdGEubG9uKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHREYXlzID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5uZXh0RGF5cyA9IG5leHREYXlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRhdGFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8zID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3JfMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbnVsbF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIExvZ2ljLmdyYWJEYXRhTmV4dERheXMgPSBmdW5jdGlvbiAoc3lzdGVtLCBsYXQsIGxvbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXBpLCByZXNwb25zZSwgbmV4dERhdGEsIG5leHREYXlzLCBlcnJvcl81O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXBpID0gXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PVwiLmNvbmNhdChsYXQsIFwiJmxvbj1cIikuY29uY2F0KGxvbiwgXCImdW5pdHM9XCIpLmNvbmNhdChzeXN0ZW0sIFwiJmFwcGlkPTI4NzFjODg5NDRiODFmYmFiOTIyZDQ3MDEyNjk1YmEzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDQsICwgNV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZmV0Y2goYXBpLCB7IG1vZGU6ICdjb3JzJyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb2NhbGl6YXRpb24gbm90IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgcmVzcG9uc2UuanNvbigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dERhdGEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0RGF5cyA9IHRoaXMuZXh0cmFjdE5leHREYXlzKG5leHREYXRhLCBzeXN0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5leHREYXlzXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfNSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yXzUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG51bGxdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTG9naWM7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTG9naWM7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgTG9naWMgZnJvbSAnLi9sb2dpYyc7XG52YXIgVUkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVUkoKSB7XG4gICAgfVxuICAgIFVJLnNldFVuaXQgPSBmdW5jdGlvbiAoc3lzdGVtKSB7XG4gICAgICAgIHZhciB1bml0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYW5nZS11bml0cycpO1xuICAgICAgICB2YXIgc3lzdGVtVW5pdHMgPSB1bml0QnRuLnZhbHVlIHx8IHN5c3RlbSB8fCAnbWV0cmljJztcbiAgICAgICAgdGhpcy51cGRhdGVVbml0QnRuKHVuaXRCdG4sIHN5c3RlbVVuaXRzKTtcbiAgICAgICAgcmV0dXJuIHN5c3RlbVVuaXRzO1xuICAgIH07XG4gICAgVUkudXBkYXRlVW5pdEJ0biA9IGZ1bmN0aW9uICh1bml0QnRuLCBzeXN0ZW1Vbml0cykge1xuICAgICAgICB2YXIgc3BhbkMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzIHNwYW4jQycpO1xuICAgICAgICB2YXIgc3BhbkYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hhbmdlLXVuaXRzIHNwYW4jRicpO1xuICAgICAgICB2YXIgbmV3VW5pdEJ0biA9IHVuaXRCdG47XG4gICAgICAgIG5ld1VuaXRCdG4udmFsdWUgPSBzeXN0ZW1Vbml0cztcbiAgICAgICAgc3BhbkMuY2xhc3NMaXN0LnRvZ2dsZSgnYm9sZCcsIHN5c3RlbVVuaXRzID09PSAnbWV0cmljJyk7XG4gICAgICAgIHNwYW5GLmNsYXNzTGlzdC50b2dnbGUoJ2JvbGQnLCBzeXN0ZW1Vbml0cyA9PT0gJ2ltcGVyaWFsJyk7XG4gICAgfTtcbiAgICBVSS50b2dnbGVVbml0ID0gZnVuY3Rpb24gKHVuaXRCdG4pIHtcbiAgICAgICAgdmFyIHN5c3RlbVVuaXRzID0gdW5pdEJ0bi52YWx1ZSA9PT0gJ21ldHJpYycgPyAnaW1wZXJpYWwnIDogJ21ldHJpYyc7XG4gICAgICAgIHRoaXMudXBkYXRlVW5pdEJ0bih1bml0QnRuLCBzeXN0ZW1Vbml0cyk7XG4gICAgICAgIHRoaXMucmVwbGFjZVVuaXRzKHN5c3RlbVVuaXRzKTtcbiAgICB9O1xuICAgIFVJLmNvbnZlcnRUZW1wZXJhdHVyZSA9IGZ1bmN0aW9uICh0ZW1wLCBzeXN0ZW1Vbml0cykge1xuICAgICAgICB2YXIgdGVtcE51bWJlciA9IHBhcnNlRmxvYXQodGVtcCk7XG4gICAgICAgIGlmIChzeXN0ZW1Vbml0cyA9PT0gJ2ltcGVyaWFsJyAmJiB0ZW1wLmluY2x1ZGVzKCfCsEMnKSkge1xuICAgICAgICAgICAgdGVtcE51bWJlciA9IE1hdGgucm91bmQoKHRlbXBOdW1iZXIgKiA5KSAvIDUgKyAzMik7XG4gICAgICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQodGVtcE51bWJlciwgXCJcXHUwMEIwRlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnICYmIHRlbXAuaW5jbHVkZXMoJ8KwRicpKSB7XG4gICAgICAgICAgICB0ZW1wTnVtYmVyID0gTWF0aC5yb3VuZCgoKHRlbXBOdW1iZXIgLSAzMikgKiA1KSAvIDkpO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHRlbXBOdW1iZXIsIFwiXFx1MDBCMENcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgfTtcbiAgICBVSS5jb252ZXJ0V2luZFNwZWVkID0gZnVuY3Rpb24gKHNwZWVkLCBzeXN0ZW1Vbml0cykge1xuICAgICAgICB2YXIgc3BlZWROdW1iZXIgPSBwYXJzZUZsb2F0KHNwZWVkKTtcbiAgICAgICAgaWYgKHN5c3RlbVVuaXRzID09PSAnaW1wZXJpYWwnICYmIHNwZWVkLmluY2x1ZGVzKCdrbS9oJykpIHtcbiAgICAgICAgICAgIHNwZWVkTnVtYmVyID0gTWF0aC5yb3VuZChzcGVlZE51bWJlciAvIDEuNjA5Myk7XG4gICAgICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoc3BlZWROdW1iZXIsIFwiIG1waFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3lzdGVtVW5pdHMgPT09ICdtZXRyaWMnICYmIHNwZWVkLmluY2x1ZGVzKCdtcGgnKSkge1xuICAgICAgICAgICAgc3BlZWROdW1iZXIgPSBNYXRoLnJvdW5kKHNwZWVkTnVtYmVyICogMS42MDkzKTtcbiAgICAgICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChzcGVlZE51bWJlciwgXCIga20vaFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlZWQ7XG4gICAgfTtcbiAgICBVSS5yZXBsYWNlVW5pdHMgPSBmdW5jdGlvbiAoc3lzdGVtVW5pdHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gWycjdGVtcGVyYXR1cmUnLCAnI2ZlZWxzLWxpa2UnLCAnI3dpbmQtc3BlZWQnLCAnI3RvbW1vcm93LWNhcmQgLnRlbXAnLCAnI2FmdGVyLXRvbW1vcm93LWNhcmQgLnRlbXAnLCAnI25leHQtY2FyZCAudGVtcCddO1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICB2YXIgaXNXaW5kU3BlZWQgPSBzZWxlY3RvciA9PT0gJyN3aW5kLXNwZWVkJztcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBpc1dpbmRTcGVlZCA/IF90aGlzLmNvbnZlcnRXaW5kU3BlZWQodmFsdWUsIHN5c3RlbVVuaXRzKSA6IF90aGlzLmNvbnZlcnRUZW1wZXJhdHVyZSh2YWx1ZSwgc3lzdGVtVW5pdHMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFVJLmxvYWRpbmcgPSBmdW5jdGlvbiAodG9nZ2xlKSB7XG4gICAgICAgIHZhciBzcGlubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRpbmctc3Bpbm5lcicpO1xuICAgICAgICB2YXIgd2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWF0aGVyLWNvbnRhaW5lcicpO1xuICAgICAgICB3ZWF0aGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnLCB0b2dnbGUpO1xuICAgICAgICBzcGlubmVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnLCAhdG9nZ2xlKTtcbiAgICB9O1xuICAgIFVJLnVwZGF0ZVVJID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jbGVhcldlYXRoZXIoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5V2VhdGhlcihkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRCY2dDb2xvcihkYXRhKTtcbiAgICB9O1xuICAgIFVJLnBpY2tDaXR5ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2FkaW5nKHRydWUpO1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidG4nKSkge1xuICAgICAgICAgICAgTG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGUudGFyZ2V0LnRleHRDb250ZW50KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlVUkoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVUkuc2VhcmNoQ2l0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dCcpO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlLnRyaW0oKTtcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgTG9naWMuZ3JhYkRhdGFCeUNpdHkodGhpcy5zZXRVbml0KCksIGlucHV0LnZhbHVlKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBfdGhpcy51cGRhdGVVSShkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRHcmV5Q29sb3IoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBVSS5maW5kTWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgTG9naWMuZ2V0Q3VycmVudFBvc2l0aW9uKHRoaXMuc2V0VW5pdCgpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVUkuY2xlYXJXZWF0aGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2FyZElkcyA9IFsnbWFpbi1jYXJkJywgJ2ltZy1jYXJkJywgJ3NlY29uZGFyeS1jYXJkJywgJ3RvbW1vcm93LWNhcmQnLCAnYWZ0ZXItdG9tbW9yb3ctY2FyZCcsICduZXh0LWNhcmQnXTtcbiAgICAgICAgY2FyZElkcy5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgdmFyIGNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiLmNvbmNhdChpZCkpO1xuICAgICAgICAgICAgY2FyZC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFVJLmRpc3BsYXlNYWluQ2FyZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBtYWluQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLWNhcmQnKTtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gWydjaXR5LWNvdW50cnknLCAndGVtcGVyYXR1cmUnLCAnZGVzY3JpcHRpb24nXTtcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaWQnLCBlbGVtZW50KTtcbiAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gZGF0YVtlbGVtZW50XTtcbiAgICAgICAgICAgIG1haW5DYXJkLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChkYXRhLmNvdW50cnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHktY291bnRyeScpLnRleHRDb250ZW50ID0gXCJcIi5jb25jYXQoZGF0YS5jaXR5LCBcIiwgXCIpLmNvbmNhdChkYXRhLmNvdW50cnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHktY291bnRyeScpLnRleHRDb250ZW50ID0gXCJcIi5jb25jYXQoZGF0YS5jaXR5KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVUkuZGlzcGxheUltZ0NhcmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgaW1nQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWctY2FyZCcpO1xuICAgICAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltZy5zcmMgPSBcImh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi9cIi5jb25jYXQoZGF0YS5pY29uLCBcIkA0eC5wbmdcIik7XG4gICAgICAgIGltZy5hbHQgPSBkYXRhLmRlc2NyaXB0aW9uO1xuICAgICAgICBpbWdDYXJkLmFwcGVuZENoaWxkKGltZyk7XG4gICAgfTtcbiAgICBVSS5kaXNwbGF5U2Vjb25kYXJ5Q2FyZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBzZWNvbmRhcnlDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlY29uZGFyeS1jYXJkJyk7XG4gICAgICAgIHZhciBlbGVtZW50cyA9IFsnZmVlbHMtbGlrZScsICdodW1pZGl0eScsICd3aW5kLXNwZWVkJywgJ3ByZXNzdXJlJ107XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbnMgPSBbJ0ZlZWxzIGxpa2U6ICcsICdIdW1pZGl0eTogJywgJ1dpbmQgc3BlZWQ6ICcsICdQcmVzc3VyZTogJ107XG4gICAgICAgIHZhciBkYXRhVmFsdWVzID0gW2RhdGEuZmVlbHNMaWtlVGVtcCwgZGF0YS5odW1pZGl0eVBlcmNlbnQsIGRhdGEud2luZFNwZWVkVW5pdCwgZGF0YS5wcmVzc3VyZVVuaXRdO1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBwLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb25zW2luZGV4XTtcbiAgICAgICAgICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi5pZCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBzcGFuLmFwcGVuZChcIiBcIi5jb25jYXQoZGF0YVZhbHVlc1tpbmRleF0pKTtcbiAgICAgICAgICAgIHAuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgICAgICBzZWNvbmRhcnlDYXJkLmFwcGVuZENoaWxkKHApO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFVJLmNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MgPSBmdW5jdGlvbiAoZWxlbWVudFR5cGUsIGNsYXNzTmFtZSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudFR5cGUpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICBVSS5kaXNwbGF5Q2FyZCA9IGZ1bmN0aW9uIChkYXRhLCBkYXlJbmRleCwgY2FyZElkKSB7XG4gICAgICAgIHZhciBjYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIi5jb25jYXQoY2FyZElkKSk7XG4gICAgICAgIHZhciBkYXlFbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50V2l0aENsYXNzKCdwJywgJ2RheScpO1xuICAgICAgICB2YXIgdGVtcEVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoJ3AnLCAndGVtcCcpO1xuICAgICAgICB2YXIgaWNvbkVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnRXaXRoQ2xhc3MoJ2ltZycsICdpY29uJyk7XG4gICAgICAgIGRheUVsZW1lbnQudGV4dENvbnRlbnQgPSBcIiBcIi5jb25jYXQoZGF0YS5uZXh0RGF5c1tkYXlJbmRleF0uZGF5KTtcbiAgICAgICAgdGVtcEVsZW1lbnQudGV4dENvbnRlbnQgPSBcIiBcIi5jb25jYXQoZGF0YS5uZXh0RGF5c1tkYXlJbmRleF0udGVtcCk7XG4gICAgICAgIGljb25FbGVtZW50LnNyYyA9IFwiaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiLmNvbmNhdChkYXRhLm5leHREYXlzW2RheUluZGV4XS5pY29uLCBcIkA0eC5wbmdcIik7XG4gICAgICAgIGljb25FbGVtZW50LmFsdCA9IGRhdGEubmV4dERheXNbZGF5SW5kZXhdLmRlc2NyaXB0aW9uO1xuICAgICAgICBjYXJkLmFwcGVuZChkYXlFbGVtZW50LCB0ZW1wRWxlbWVudCwgaWNvbkVsZW1lbnQpO1xuICAgIH07XG4gICAgVUkuZGlzcGxheVdlYXRoZXIgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRpc3BsYXlNYWluQ2FyZChkYXRhKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5SW1nQ2FyZChkYXRhKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5U2Vjb25kYXJ5Q2FyZChkYXRhKTtcbiAgICAgICAgWyd0b21tb3Jvdy1jYXJkJywgJ2FmdGVyLXRvbW1vcm93LWNhcmQnLCAnbmV4dC1jYXJkJ10uZm9yRWFjaChmdW5jdGlvbiAoY2FyZElkLCBpbmRleCkge1xuICAgICAgICAgICAgX3RoaXMuZGlzcGxheUNhcmQoZGF0YSwgaW5kZXgsIGNhcmRJZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVUkuc2V0QmNnQ29sb3IgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgdGVtcCA9IGRhdGEudGVtcGVyYXR1cmU7XG4gICAgICAgIGlmIChkYXRhLnRlbXBlcmF0dXJlLmluY2x1ZGVzKCfCsEYnKSkge1xuICAgICAgICAgICAgdmFyIHN5c3RlbSA9ICdtZXRyaWMnO1xuICAgICAgICAgICAgdGVtcCA9IHRoaXMuY29udmVydFRlbXBlcmF0dXJlKGRhdGEudGVtcGVyYXR1cmUsIHN5c3RlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcCA9IHBhcnNlSW50KHRlbXAsIDEwKTtcbiAgICAgICAgdmFyIG1pblRlbXAgPSAwO1xuICAgICAgICB2YXIgbWF4VGVtcCA9IDMwO1xuICAgICAgICB2YXIgbWluSHNsID0gMjIwO1xuICAgICAgICB2YXIgbWF4SHNsID0gMDtcbiAgICAgICAgdGVtcCA9IHRlbXAgPiBtYXhUZW1wID8gbWF4VGVtcCA6IHRlbXA7XG4gICAgICAgIHRlbXAgPSB0ZW1wIDwgbWluVGVtcCA/IG1pblRlbXAgOiB0ZW1wO1xuICAgICAgICB2YXIgcmFuZ2VUZW1wID0gbWF4VGVtcCAtIG1pblRlbXA7XG4gICAgICAgIHZhciByYW5nZUhzbCA9IG1heEhzbCAtIG1pbkhzbDtcbiAgICAgICAgdmFyIGRlZ0NvdW50ID0gbWF4VGVtcCAtIHRlbXA7XG4gICAgICAgIHZhciBoc2xzRGVnID0gcmFuZ2VIc2wgLyByYW5nZVRlbXA7XG4gICAgICAgIHZhciByZXR1cm5IdWUgPSAzNjAgLSAoZGVnQ291bnQgKiBoc2xzRGVnIC0gKG1heEhzbCAtIDM2MCkpO1xuICAgICAgICB2YXIgY29sb3IgPSBcImhzbChcIi5jb25jYXQocmV0dXJuSHVlLCBcIiwgMTAwJSwgNzUlKVwiKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgIH07XG4gICAgVUkuc2V0R3JleUNvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29sb3IgPSBcImhzbCgwLCAwJSwgNzUlKVwiO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgfTtcbiAgICBVSS5hdHRhY2hMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzYW1wbGVMb2NhdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FtcGxlLWxvY2F0aW9ucycpO1xuICAgICAgICB2YXIgdW5pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFuZ2UtdW5pdHMnKTtcbiAgICAgICAgdmFyIHNlYXJjaEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYm94Jyk7XG4gICAgICAgIHZhciBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJ0bicpO1xuICAgICAgICB2YXIgZmluZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaW5kLWJ0bicpO1xuICAgICAgICBzYW1wbGVMb2NhdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMucGlja0NpdHkoZSk7IH0pO1xuICAgICAgICBzZWFyY2hCb3guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTsgfSk7XG4gICAgICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnNlYXJjaENpdHkoKTsgfSk7XG4gICAgICAgIGZpbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5maW5kTWUoKTsgfSk7XG4gICAgICAgIHVuaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy50b2dnbGVVbml0KHVuaXRCdG4pOyB9KTtcbiAgICB9O1xuICAgIFVJLnJ1bkFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zZXRVbml0KCk7XG4gICAgICAgIHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG4gICAgfTtcbiAgICByZXR1cm4gVUk7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgVUk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnbm9ybWFsaXplLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUvc3R5bGUuY3NzJztcbmltcG9ydCBVSSBmcm9tICcuL2NvZGUvdWknO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIFVJLnJ1bkFwcCgpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==