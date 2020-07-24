const calculator = {
	displayNumber: '0',
	operator: null,
	firstNumber: null,
	secondNumber: false
};

const updateDisplay = () => {
	document.querySelector(".displayNumber").innerText = calculator.displayNumber;
};

const clearCalculator = () => {
	calculator.displayNumber = '0',
	calculator.operator = null,
	calculator.firstNumber = null,
	calculator.secondNumber = false
};

const inputDigit = (digit) => {
	if (calculator.secondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;
    }
    else {
    	if(calculator.displayNumber === '0') {
    		calculator.displayNumber = digit;
		}
		else {
			calculator.displayNumber += digit;
		}
    }
};

const handleOperator = (operator) => {
	if (!calculator.secondNumber) {
       calculator.operator = operator;
       calculator.secondNumber = true;
       calculator.firstNumber = calculator.displayNumber;
   	} else {
       alert('Operator sudah ditetapkan')
   	}
};

const performCalculation = () => {
	if (calculator.firstNumber == null || calculator.operator == null) {
       alert("Anda belum menetapkan operator");
       return;
   	}
 
   	let result = 0;
   	if (calculator.operator === "+") {
       result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber);
   	} 
   	else if (calculator.operator === "x") {
       result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber);
   	}
   	else if (calculator.operator === "/") {
       result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber);
   	}
   	else {
       result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber)
   	}
 
   	calculator.displayNumber = result;
   	calculator.firstNumber = result;
   	calculator.secondNumber = false;
};

const buttons = document.querySelectorAll(".button");
const decimal = document.querySelector(".decimal").textContent;

const inputDecimal = (dot) => {
	calculator.displayNumber += dot;
};

buttons.forEach(button => {
	button.addEventListener('click', (event) => {
		const target = event.target;
		if(target.classList.contains('operator')) {
			handleOperator(target.innerText)
           	updateDisplay();
           	return;
		}
		else if(target.classList.contains('equals')) {
			performCalculation();
           	updateDisplay();
           	return;
       	}
       	else if(target.classList.contains('decimal')) {
       		inputDecimal(decimal);
			updateDisplay();
			return;
       	}
		inputDigit(target.innerText);
		updateDisplay();
	});
});

const clear = document.querySelector(".clear");

clear.addEventListener('click', (event) => {
	clearCalculator();
	updateDisplay();
	return;
});

const deleted = document.querySelector(".delete");

const remove = () => {
	let arrNumber = calculator.displayNumber.split('');
	arrNumber.pop();
	const strNumber = arrNumber.join('');
	if(strNumber.length === 0) {
		calculator.displayNumber = '0';
	}
	else {
		calculator.displayNumber = strNumber;
	}
};

deleted.addEventListener('click', (event) => {
	remove();
	updateDisplay();
	return;
});
