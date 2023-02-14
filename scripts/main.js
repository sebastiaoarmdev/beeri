'use strict';

var beerTypes = [
	'images/bottle.png',
	'images/can.png', 
	'images/drink.png', 
	'images/glass.png', 
	'images/mug.png'
];
var beerValue = parseFloat(localStorage.getItem('beerValue') ? localStorage.getItem('beerValue') : 0.0);
var payerCount = parseInt(localStorage.getItem('payerCount') ? localStorage.getItem('payerCount') : 1);
var beerCount = parseInt(localStorage.getItem('beerCount') ? localStorage.getItem('beerCount') : 0);
var beerTotalValue = beerValue * beerCount;
var formattedBeerTotalValue = beerTotalValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
var beerType = localStorage.getItem('beerType') ? localStorage.getItem('beerType') : beerTypes[0];
var beerValuePerPayer = beerTotalValue / payerCount;
var formattedBeerValuePerPayer = beerValuePerPayer.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

const beerValueInput = document.getElementById('beerValue');
const payerCountInput = document.getElementById('payerCount');
const minusButton = document.getElementById('minusButton');
const plusButton = document.getElementById('plusButton');
const beerTypeButtons = document.getElementById('graphicBeerTypes').getElementsByClassName('button');

function updateGraphicBeerTypes() {
	let html = '';
	for (let $beerType of beerTypes) {
		let status = (beerType == $beerType) ? 'on' : 'off';
		html = html + `<img src="${$beerType}" class="button ${status}">`;
	}
	document.getElementById('graphicBeerTypes').innerHTML = html;
}

function updateBeerType(source) {
	for (let $beerType of beerTypes) {
		if (source.includes($beerType)) {
			beerType = $beerType;
			break;
		}
	}
	localStorage.setItem('beerType', beerType);
	for (let beerTypeButton of beerTypeButtons) {
		if (beerTypeButton.src == source) {
			beerTypeButton.classList.replace('off', 'on');
		} else {
			beerTypeButton.classList.replace('on', 'off');
		}
	}
	let graphicBeers = document.getElementsByClassName('graphicBeer');
	for (let graphicBeer of graphicBeers) {
		graphicBeer.src = source;
	}
}

function updateBeerValuePerPayer() {
	let html = '';
	beerValuePerPayer = beerTotalValue / payerCount;
	formattedBeerValuePerPayer = beerValuePerPayer.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
	html = html + `${formattedBeerValuePerPayer}`;
	document.getElementById('beerValuePerPayer').innerHTML = html;
}

function updateBeerTotalValue() {
	let html = '';
	beerTotalValue = beerValue * beerCount;
	formattedBeerTotalValue = beerTotalValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
	html = formattedBeerTotalValue;
	document.getElementById('beerTotal').innerHTML = html;
	updateBeerValuePerPayer();
}

function updateGraphicBeerCount() {
	let html = '';
	for (let i = 0; i < beerCount; i++) {
		html = html + `<img class="graphicBeer" src="${beerType}">`;
	}
	updateBeerTotalValue();
	document.getElementById('graphicBeerCount').innerHTML = html;
	document.getElementById('beerCount').innerHTML = beerCount;
}

function updateBeerCount(increment) {
	beerCount = beerCount + increment;
	localStorage.setItem('beerCount', beerCount);
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
	localStorage.setItem('beerValue', beerValue);
	updateBeerTotalValue();
}

function updatePayerCount(newValue) {
	payerCount = newValue;
	localStorage.setItem('payerCount', payerCount);
	updateBeerValuePerPayer();
}

function start() {
	beerValueInput.value = beerValue;
	payerCountInput.value = payerCount;
	updateGraphicBeerTypes();
	updateBeerValuePerPayer();
	updateGraphicBeerCount();
}

document.onload = start();

beerValueInput.addEventListener('click', function (event) {
	event.target.select();
});

beerValueInput.addEventListener('change', function (event) {
	updateBeerValue(event.target.value);
});

payerCountInput.addEventListener('click', function (event) {
	event.target.select();
});

payerCountInput.addEventListener('change', function (event) {
	updatePayerCount(event.target.value);
});

for (let beerTypeButton of beerTypeButtons) {
	beerTypeButton.addEventListener('click', function (event) {
		updateBeerType(event.target.src);
	})
}

minusButton.addEventListener('click', removeABeer);

plusButton.addEventListener('click', addABeer);
