"use strict"

const addMonths = (el) => {
  let annualUseKw = 0;
  let dailyUseKw = 0;
  const mpc = document.getElementById(el);
  const months = mpc.getElementsByTagName("input");

  // Ensure valid input
  for (let i = 0; i < months.length; i++) {
    if (months[i].value) {
      annualUseKw += Number(months[i].value);
    }
  }

  dailyUseKw = annualUseKw / 365;
  return dailyUseKw;
};

function sunHours() {
  let hrs;
  let theZone = document.forms.solarForm.zone.selectedIndex;
  theZone += 1;

  switch (theZone) {
    case 1:
      hrs = 6;
      break;
    case 2:
      hrs = 5.5;
      break;
    case 3:
      hrs = 5;
      break;
    case 4:
      hrs = 4.5;
      break;
    case 5:
      hrs = 4.2;
      break;
    case 6:
      hrs = 3.5;
      break;
    default:
      hrs = 0;
  }
  return hrs;
}

const calculateSolar = () => {
  const dailyUseKw = addMonths("mpc");
  let sunHoursPerDay = sunHours();

  if (sunHoursPerDay === 0 || dailyUseKw === 0) {
    alert("Please complete all required fields.");
    return; // Exit function if there's an issue
  }

  let minKwNeeds = dailyUseKw / sunHoursPerDay;
  let realKwNeeds = minKwNeeds * 1.25;
  let realWattNeeds = realKwNeeds * 1000;

  const panelInfo = calculatePanel();
  const [panelOutput, panelName] = panelInfo;

  let panelsNeeded = Math.ceil(realWattNeeds / panelOutput);

  const feedback = document.getElementById("feedback");
  feedback.innerHTML = "";  // Clear previous feedback

  let str1 = `Based on your average daily use of <strong>${Math.round(
    dailyUseKw
  )} KW</strong>, 
  you will need to purchase <strong>${panelsNeeded} ${panelName} solar panels</strong> to
  offset 100% of your electricity bill.`;

  str1 += `<br /><br />`;

  feedback.innerHTML += str1;

  const str2 = `Your average daily electricity consumption: <strong>${Math.round(
    dailyUseKw
  )} Kwh per day</strong>.<br />Average sunshine hours per day: ${sunHoursPerDay} hours.
  Realistic watts needed per hour: <strong>${Math.round(
    realWattNeeds
  )} watts/hour</strong>.<br />
  The <strong>${panelName}</strong> panel you selected generates about <strong>${panelOutput} watts per hour</strong>`;

  feedback.innerHTML += str2;
};

const calculatePanel = () => {
  const userChoice = document.forms.solarForm.panel.selectedIndex;
  const panelOptions = document.forms.solarForm.panel.options;
  const power = panelOptions[userChoice].value;
  const name = panelOptions[userChoice].text;
  return [power, name];
};

document.getElementById("btn").addEventListener("click", () => {
  calculateSolar();
  window.alert("This is Nurzida's Solar Calculator!");
});
