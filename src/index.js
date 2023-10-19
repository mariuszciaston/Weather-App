import './style/style.css';

function component() {
	const element = document.createElement('div');
	element.textContent = 'Hello World!';

	return element;
}

document.body.appendChild(component());

// https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=2871c88944b81fbab922d47012695ba3

// Example of API call:
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2871c88944b81fbab922d47012695ba3



// cosnole.log('I get called from print.js!');




const obj1 = {a: 10};
const obj2 = {b: 20};
const obj3 = {c: 30};

// ES2018
console.log({...obj1, ...obj2, ...obj3}); 