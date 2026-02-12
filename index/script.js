
// Převod měn na CZK
const exchangeRates = {
    USD: 22,
    EUR: 25,
    CZK: 1
};

// Výsledné pole
const allEmployees = [];

// ID se musí zvyšovat
let newId = 1;


// FUNKCE PRO VALIDACI
function isValidEmployee(name, salary) {

    if (name === undefined || name === "") {
        console.error("Chybí jméno zaměstnance");
        return false;
    }

    if (salary === undefined || salary === null) {
        console.error("Chybí plat zaměstnance");
        return false;
    }

    return true;
}

// FIRMA A (bomboloExecutive)
function processCompanyA() {

    for (let i = 0; i < data.bomboloExecutive.length; i++) {

        let employee = data.bomboloExecutive[i];

        // bereme jen ACTIVE
        if (employee.status === "ACTIVE") {

            let firstName = employee.name.first;
            let lastName = employee.name.last;

            let fullName = firstName + " " + lastName;

            let fix = employee.salary.fix;
            let bonus = employee.salary.bonus;

            let totalSalary = fix + bonus;

            if (isValidEmployee(fullName, totalSalary)) {

                let newEmployee = {
                    id: newId,
                    fullName: fullName,
                    totalSalary: totalSalary,
                    company: "Firma A",
                    isActive: true
                };

                allEmployees.push(newEmployee);

                console.log("Zpracován zaměstnanec Firma A:", fullName);

                newId++;
            }
        }
    }
}

// POMOCNÁ FUNKCE PRO PARSOVÁNÍ PLATU (Firma B)
function parseSalary(text) {

    let numbersOnly = "";

    for (let i = 0; i < text.length; i++) {

        let character = text[i];

        if (character >= "0" && character <= "9") {
            numbersOnly = numbersOnly + character;
        }
    }

    return Number(numbersOnly);
}


// FIRMA B (norwayLegion)
function processCompanyB() {

    for (let i = 0; i < data.norwayLegion.length; i++) {

        let employee = data.norwayLegion[i];

        // jen HPP
        if (employee.detaily.uvazek === "HPP") {

            let fullName = employee.jmeno;

            let salaryText = employee.plat;

            let totalSalary = parseSalary(salaryText);

            if (isValidEmployee(fullName, totalSalary)) {

                let newEmployee = {
                    id: newId,
                    fullName: fullName,
                    totalSalary: totalSalary,
                    company: "Firma B",
                    isActive: true
                };

                allEmployees.push(newEmployee);

                console.log("Zpracován zaměstnanec Firma B:", fullName);

                newId++;
            }
        }
    }
}

// FIRMA C (apolloDiscounted)
function processCompanyC() {

    for (let i = 0; i < data.apolloDiscounted.length; i++) {

        let employee = data.apolloDiscounted[i];

        let fullName = employee.profile.personal_data.full_name;

        let amount = employee.finance.amount;
        let currency = employee.finance.currency;

        let rate = exchangeRates[currency];

        let totalSalary = amount * rate;

        if (isValidEmployee(fullName, totalSalary)) {

            let newEmployee = {
                id: newId,
                fullName: fullName,
                totalSalary: totalSalary,
                company: "Firma C",
                isActive: true
            };

            allEmployees.push(newEmployee);

            console.log("Zpracován zaměstnanec Firma C:", fullName);

            newId++;
        }
    }
}


// SPUŠTĚNÍ

processCompanyA();
processCompanyB();
processCompanyC();


// TESTY
console.log("TEST RUN");

if (allEmployees.length === 7) {
    console.log("Počet zaměstnanců je správný");
} else {
    console.error("Počet zaměstnanců není správný. Aktuální počet:", allEmployees.length);
}

// kontrola unikátních ID
let idCheck = {};

for (let i = 0; i < allEmployees.length; i++) {

    let currentId = allEmployees[i].id;

    if (idCheck[currentId]) {
        console.error("Duplicitní ID nalezeno:", currentId);
    }

    idCheck[currentId] = true;
}

console.log("Výsledné pole:", allEmployees);