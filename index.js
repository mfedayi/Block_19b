const names = ["Emad", "Sahar", "Hass", "Afsan", "Russ", "Sorya", "Mustafa"];
const occupations = [
  "doctor",
  "engineer",
  "teacher",
  "developer",
  "writer",
  "artist",
  "lawyer",
];
const prices = [];

// generate random nums and push it to the prices array
const randNums = () => {
  for (let i = 0; i < 10; i++) {
    const randN = Math.floor(Math.random() * 500 + 1);
    prices.push(randN);
  }
};
//calling rand nums array
randNums();

const body = document.querySelector("body");
const section = document.createElement("section");
section.style.display = "flex";
section.style.flexDirection = "column";
section.style.flexWrap = "wrap";
section.style.alignContent = "center";
const ul = document.createElement("ul");
ul.style.listStyleType = "none";
ul.style.listStyle = "none";
ul.style.padding = "0";
ul.style.marginTop = "1rem";

const headerRow = document.createElement("li");
headerRow.style.fontWeight = "bold";
headerRow.style.display = "grid";
headerRow.style.gridTemplateColumns = "1fr 1fr 1fr";
headerRow.innerHTML = `
<span>Name</span>
<span>Occupation</span>
<span>Price</span>
`;
ul.appendChild(headerRow);

// Display list of freelancers containing name, occupation and price
const addFreeLancerToDom = (fl) => {
  const li = document.createElement("li"); // create a new li for each iteration
  li.style.display = "grid";
  li.style.gridTemplateColumns = "1fr 1fr 1fr";
  li.innerHTML = `
    <span>${fl.name}</span
     <span>${fl.occupation}</span>
     <span>${fl.price} </span>
      `;
  ul.appendChild(li);
};

// create initial freelancer array
let freelancers = [
  { name: "Arman", occupation: "engineer", price: 300 },
  { name: "Sana", occupation: "designer", price: 250 },
];

// set max limit of freelancers
const maxLimit = 7;

// Render initial freelancers only once on load
freelancers.forEach(addFreeLancerToDom); //

// add random freelancer
const randomLancer = () => {
  // filter out names already used to prevent duplicates
  const usedNames = freelancers.map((fl) => fl.name);
  const remainingNames = names.filter((n) => !usedNames.includes(n));

  //random name
  const name =
    remainingNames[Math.floor(Math.random() * remainingNames.length)];

  //random occupation
  const occupation =
    occupations[Math.floor(Math.random() * occupations.length)];

  //random price
  const price = prices[Math.floor(Math.random() * prices.length)];

  return { name, occupation, price };

  //freelancers.push(newFreelancer);
  //   return newFreelancer;
};

// define tha avg starting price
const avgPrice = () => {
  const initialVal = 0;
  const totalPrices = freelancers.reduce((t, a) => t + a["price"], initialVal);
  const average = totalPrices / freelancers.length;
  console.log(Math.round(average));
  return average;
};

function updateNewAvgPrice() {
  const total = freelancers.reduce((sum, fl) => sum + fl.price, 0);
  const avg = Math.round(total / freelancers.length);
  document.getElementById(
    "avgPriceText"
  ).textContent = `The average starting price is: ${avg}`;
}

// create main and append body to it.
const main = () => {
  body.append(section);
  body.append(ul);
  const h4 = document.createElement("h4");
  h4.id = "avgPriceText";
  h4.textContent = `The average starting price is: ${avgPrice()}`;
  section.append(h4);
};
main();
const lancerIntervalId = setInterval(() => {
  if (freelancers.length >= maxLimit) {
    clearInterval(lancerIntervalId);
    return;
  }
  const newFreelancer = randomLancer();
  freelancers.push(newFreelancer);
  addFreeLancerToDom(newFreelancer);
  updateNewAvgPrice();
}, 2000); // display a new random freelancer every two seconds
