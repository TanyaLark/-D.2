let cardNumber = prompt("Введите номер карты: ").trim(); 
checkingCardNumber(cardNumber);

function checkingCardNumber(cardNumber) {
    let clearNumberArray = [];
    for (const element of [...cardNumber]) {
        let parsed = parseInt(element);
        if (parsed >= 0 && parsed <= 9) {
            clearNumberArray.push(parsed);
        }
    }
    console.log(clearNumberArray);

    if (clearNumberArray.length !== 16) {
        console.log("Error!");
    } else {
        let result = {};
        result["card"] = clearNumberArray.join("");
        //Проверка алгоритмом Луна
        let lastDigit = clearNumberArray[clearNumberArray.length - 1];
        let creditCardNumberForLuhnFormula = clearNumberArray.slice(0, 15);
        creditCardNumberForLuhnFormula.reverse();
        for (let i = 0; i < creditCardNumberForLuhnFormula.length; i++) {
            if (i % 2 === 0) {
                creditCardNumberForLuhnFormula[i] = creditCardNumberForLuhnFormula[i] * 2;
                if (creditCardNumberForLuhnFormula[i] > 9) {
                    creditCardNumberForLuhnFormula[i] = creditCardNumberForLuhnFormula[i] - 9;
                }
            }
        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const sum = creditCardNumberForLuhnFormula.reduce(reducer);
        if (lastDigit === sum % 10) {
            result["correct"] = true;
        } else {
            result["correct"] = false;
            return console.log(result);
        }

        //Определение платежной системы
        //Maestro UK	6759, 676770, 676774    Maestro	50, 56–69
        //Mastercard	2221-2720	51–55
        //Visa	4 (including related/partner brands: Dankort, Electron, etc.)
        switch (true) {
            case +clearNumberArray.join("").slice(0, 1) === 4:
                result["paymentSystem"] = "Visa";
                result["accepted"] = true;
                return console.log(result);
            case (+clearNumberArray.join("").slice(0, 2) >= 51 && +clearNumberArray.join("").slice(0, 2) <= 55 ||
                +clearNumberArray.join("").slice(0, 4) >= 2220 && +clearNumberArray.join("").slice(0, 4) <= 2720):
                result["paymentSystem"] = "Mastercard";
                result["accepted"] = true;
                return console.log(result);
            case (+clearNumberArray.join("").slice(0, 2) === 50 ||
                +clearNumberArray.join("").slice(0, 2) >= 56 && +clearNumberArray.join("").slice(0, 2) <= 69):
                result["paymentSystem"] = "Maestro";
                result["accepted"] = true;
                return console.log(result);
            case (+clearNumberArray.join("").slice(0, 4) === 6759 ||
                +clearNumberArray.join("").slice(0, 6) >= 676770 && +clearNumberArray.join("").slice(0, 6) <= 676774):
                result["paymentSystem"] = "Maestro UK";
                result["accepted"] = true;
                return console.log(result);
            default:
                result["paymentSystem"] = "";
                result["accepted"] = false;
                return console.log(result);
        }
    }
}
