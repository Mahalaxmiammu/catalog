const fs = require('fs');

// decodes to base 10
function toDecimal(value, base) {
    return parseInt(value, base);
}

// interpolate points 
function lagrangeInterpolation(xValues, yValues, x) {
    let total = 0;
    for (let i = 0; i < xValues.length; i++) {
        let xi = xValues[i];
        let yi = yValues[i];
        let term = yi;
        for (let j = 0; j < xValues.length; j++) {
            if (i !== j) {
                term = term * (x - xValues[j]) / (xi - xValues[j]);
            }
        }
        total += term;
    }
    return total;
}

// secret compute wrapper
function findSecret(xValues, yValues, k) {
    let xSubset = xValues.slice(0, k);
    let ySubset = yValues.slice(0, k);
    return lagrangeInterpolation(xSubset, ySubset, 0); // Evaluate at x = 0 for the constant term
}

// file parse
function processJson(jsonInput) {
    let xValues = [];
    let yValues = [];

    for (let key in jsonInput) {
        if (key !== 'keys') {
            let base = parseInt(jsonInput[key].base);
            let value = jsonInput[key].value;
            xValues.push(parseInt(key));
            yValues.push(toDecimal(value, base));
        }
    }

    let k = jsonInput.keys.k;
    let secret = findSecret(xValues, yValues, k);

    return secret ;
}

// wrong points

fs.readFile('test1.json', 'utf8', (err, data) => {
	console.log("test1")
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        const jsonDocument = JSON.parse(data);
        const secret  = processJson(jsonDocument);
        console.log("The secret is:", secret);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});


fs.readFile('test2.json', 'utf8', (err, data) => {
	console.log("test2")
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        const jsonDocument = JSON.parse(data);
        const secret  = processJson(jsonDocument);
        console.log("The secret is:", secret);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});

