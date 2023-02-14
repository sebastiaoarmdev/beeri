const beerTypes = [
	'images/bottle.png',
	'images/can.png', 
	'images/drink.png', 
	'images/glass.png', 
	'images/mug.png'
];

class Beer {
    #value;
    #type;

    get value() {
        return (this.#value * 1.0);
    }

    set value(newValue) {
        this.#value = parseFloat(newValue);
    }

    get formattedValue() {
        return this.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }

    get type() {
        return this.#type;
    }

    set type(newValue) {
        this.#type = '';
        for (let $beerType of beerTypes) {
            if (newValue.includes($beerType)) {
                this.#type = String($beerType);
                break;
            }
        }
    }    

    constructor($value, $type) {
        this.value = $value;
        this.type = $type;
    }
}

class Payer {
    #count;

    get count() {
        return this.#count;
    }

    set count(newValue) {
        this.#count = parseInt(newValue);
    }

    constructor($count) {
       this.count = $count;
    }
}

class BeerCounter {
    #count;
    #beer;
    #payer;

    get count() {
        return this.#count;
    }

    set count(newValue) {
        this.#count = parseInt(newValue);
    }

    get beer() {
        return this.#beer;
    }

    set beer(newValue) {
        if (newValue instanceof Beer) {
            this.#beer = newValue;
        } else {
            throw `Error: ${newValue} (${typeof newValue}) must be a instance of Beer`;
        }
    }

    get payer() {
        return this.#payer;
    }

    set payer(newValue) {
        if (newValue instanceof Payer) {
            this.#payer = newValue;
        } else {
            throw `Error: ${newValue} (${typeof newValue}) must be a instance of Payer`;
        }
    }

    get totalValue() {
        return (this.beer.value * this.beer.count);
    }

    get formattedTotalValue() {
        return this.totalValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }

    get valueByPayer() {
        return (this.totalValue / this.payer.count);
    }

    get formattedValueByPayer() {
        return this.valueByPayer.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }

    constructor($count, $beer, $payer) {
       this.count = $count;
       this.beer = $beer;
       this.payer = $payer;
    }
}