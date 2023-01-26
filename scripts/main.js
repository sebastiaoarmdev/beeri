var beerCount = 0;
var beerValue = 0;
var beerTotalValue = beerValue * beerCount;
var formattedBeerTotalValue = beerTotalValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
var beerTypes = [
	'images/bottle.png',
	'images/can.png', 
	'images/drink.png', 
	'images/glass.png', 
	'images/mug.png'];
var beerType = beerTypes[0];
var payerCount = 1;
var beerValuePerPayer = beerTotalValue/payerCount;
var formattedBeerValuePerPayer = beerValuePerPayer.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

const beerValueInput = document.getElementById('beerValue');
const payerCountInput = document.getElementById('payerCount');
const minusButton = document.getElementById('minusButton');
const plusButton = document.getElementById('plusButton');

function updateGraphicBeerTypes() {
	let divGraphicBeerTypesInnerHTML = '';
	for (let i = 0; i < beerTypes.length; i++) {
		let status = beerType == beerTypes[i] ? 'on' : 'off';
		divGraphicBeerTypesInnerHTML = divGraphicBeerTypesInnerHTML + `<img src="${beerTypes[i]}" class="button ${status}" onclick="updateBeerType(this)">`;
	}
	document.getElementById('graphicBeerTypes').innerHTML = divGraphicBeerTypesInnerHTML;
}

function updateBeerType(element) {
	beerType = element.src;
	let beerTypeButtons = document.getElementsByClassName('button');
	for (let i = 0; i < beerTypeButtons.length; i++) {
		beerTypeButtons[i].classList.replace('on', 'off');
	}
	element.classList.replace('off', 'on');
	let beers = document.getElementsByClassName('graphicBeer');
	for (let i = 0; i < beers.length; i++) {
		beers[i].src = beerType;
	}
}

function updateBeerValuePerPayer() {
	let divBeerValuePerPayerInnerHTML = '';
	beerValuePerPayer = beerTotalValue/payerCount;
	formattedBeerValuePerPayer = beerValuePerPayer.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
	divBeerValuePerPayerInnerHTML = divBeerValuePerPayerInnerHTML + `${formattedBeerValuePerPayer}`;
	document.getElementById('beerValuePerPayer').innerHTML = divBeerValuePerPayerInnerHTML;
}

function updateBeerTotalValue() {
	let divBeerTotalInnerHTML = '';
	beerTotalValue = beerValue * beerCount;
	formattedBeerTotalValue = beerTotalValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
	divBeerTotalInnerHTML = formattedBeerTotalValue;
	document.getElementById('beerTotal').innerHTML = divBeerTotalInnerHTML;
	updateBeerValuePerPayer();
}

function updateGraphicBeerCount() {
	let divGraphicCountInnerHTML = '';
	for (let i = 0; i < beerCount; i++) {
		divGraphicCountInnerHTML = divGraphicCountInnerHTML + `<img class="graphicBeer" src="${beerType}">`;
	}
	updateBeerTotalValue();
	document.getElementById('graphicBeerCount').innerHTML = divGraphicCountInnerHTML;
	document.getElementById('beerCount').innerHTML = beerCount;
}

function updateBeerCount(increment) {
	beerCount = beerCount + increment;
	updateGraphicBeerCount();
}

function addABeer() {
	updateBeerCount(+1);
}

function removeABeer() {
	if (beerCount > 0) {
		updateBeerCount(-1);
	}
}

function updateBeerValue(newValue) {
	beerValue = newValue;
	updateBeerTotalValue();
}
function updatePayerCount(newValue) {
	payerCount = newValue;
	updateBeerValuePerPayer();
}

function start() {
	updateGraphicBeerTypes();
}

beerValueInput.addEventListener('click', function(event) {
	event.target.select();
});

beerValueInput.addEventListener('change', function(event) {
	updateBeerValue(event.target.value);
});

payerCountInput.addEventListener('click', function(event) {
	event.target.select();
});

payerCountInput.addEventListener('change', function(event) {
	updatePayerCount(event.target.value);
});

minusButton.addEventListener('click', removeABeer);

plusButton.addEventListener('click', addABeer);

document.onload = start();
