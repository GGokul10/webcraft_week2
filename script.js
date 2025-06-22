// DOM Elements
const heightInput = document.getElementById("height-input");
const weightInput = document.getElementById("weight-input");
const heightResult = document.getElementById("height-result");
const weightResult = document.getElementById("weight-result");
const bmiResult = document.getElementById("bmi-result");
const bmiComment = document.getElementById("bmi-comment");
const heightLabel = document.getElementById("height-label");
const weightLabel = document.getElementById("weight-label");
const heightSwapBtn = document.getElementById("height-swap");
const weightSwapBtn = document.getElementById("weight-swap");

// Modes
let isCmToFt = true;
let isKgToLbs = true;

function convertHeight() {
    const value = parseFloat(heightInput.value);
    if (isNaN(value)) {
        heightResult.textContent = "✍️...";
        return;
    }

    if (isCmToFt) {
        const totalInches = value / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        heightResult.textContent = `${value} cm = ${feet} ft ${inches} in`;
    } else {
        const cm = (value * 2.54).toFixed(1);
        heightResult.textContent = `${value} in = ${cm} cm`;
    }

    calculateBMI();
}

function convertWeight() {
    const value = parseFloat(weightInput.value);
    if (isNaN(value)) {
        weightResult.textContent = "✍️...";
        return;
    }

    if (isKgToLbs) {
        const lbs = (value * 2.20462).toFixed(1);
        weightResult.textContent = `${value} kg = ${lbs} lbs`;
    } else {
        const kg = (value / 2.20462).toFixed(1);
        weightResult.textContent = `${value} lbs = ${kg} kg`;
    }

    calculateBMI();
}

function calculateBMI() {
    let heightCm, weightKg;

    const hVal = parseFloat(heightInput.value);
    const wVal = parseFloat(weightInput.value);
    if (isNaN(hVal) || isNaN(wVal)) {
        bmiResult.textContent = "—";
        bmiComment.textContent = "";
        return;
    }

    heightCm = isCmToFt ? hVal : hVal * 2.54;
    weightKg = isKgToLbs ? wVal : wVal / 2.20462;

    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);
    bmiResult.textContent = `Your BMI is ${bmi}`;

    function updateBMIProgress(bmi) {
        const fill = document.getElementById("bmi-fill");
        const valueDisplay = document.getElementById("bmi-value");
        const comment = document.getElementById("bmi-comment");

        const minBMI = 0;
        const maxBMI = 40;
        const clampedBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
        const percent = (clampedBMI / maxBMI) * 100;

        fill.style.width = `${percent}%`;
        valueDisplay.textContent = `Your BMI: ${bmi.toFixed(1)}`;


    }

    let suggestion = "";
    if (bmi < 18.5) {
        suggestion = "Underweight - consider gaining some weight.";
    } else if (bmi < 24.9) {
        suggestion = "Normal - great job!";
    } else if (bmi < 29.9) {
        suggestion = "Overweight - consider regular exercise.";
    } else {
        suggestion = "Obese - seek medical advice if needed.";
    }

    bmiComment.textContent = suggestion;
    updateBMIProgress(bmi);

}

heightInput.addEventListener("input", convertHeight);
weightInput.addEventListener("input", convertWeight);

heightSwapBtn.addEventListener("click", () => {
    isCmToFt = !isCmToFt;
    heightLabel.textContent = isCmToFt ? "cm → feet & inches" : "in → cm";
    heightInput.placeholder = isCmToFt ? "Enter value in cm" : "Enter value in inches";
    heightInput.value = "";
    heightResult.textContent = "✍️...";
    bmiResult.textContent = "—";
    bmiComment.textContent = "";
});

weightSwapBtn.addEventListener("click", () => {
    isKgToLbs = !isKgToLbs;
    weightLabel.textContent = isKgToLbs ? "kg → pounds" : "lbs → kg";
    weightInput.placeholder = isKgToLbs ? "Enter value in kg" : "Enter value in lbs";
    weightInput.value = "";
    weightResult.textContent = "✍️...";
    bmiResult.textContent = "...";
    bmiComment.textContent = "";
});
