const occupation = document.getElementById('occupation');
const grossMonthly = document.getElementById('gross-monthly-income');
const netMonthly = document.getElementById('net-monthly-income');
const taxTable = document.getElementById('taxes-table');
// all input expense tags
const expenses = [
    document.getElementById('savings'),
    document.getElementById('education'),
    document.getElementById('housing'),
    document.getElementById('utilities'),
    document.getElementById('transportation'),
    document.getElementById('food'),
    document.getElementById('clothing'),
    document.getElementById('media'),
    document.getElementById('entertainment'),
    document.getElementById('other')
];
const displayExpenses = document.getElementById('display-bills');
const displayLeftovers = document.getElementById('leftovers');
const displayNet = document.getElementById('net-monthly');

const eventLog = document.getElementById('event-log');
const random = document.getElementById('random');
const events = [
    {description: 'You bet it all on black and won!', effectDesc: 'Money Doubles', effect: (n) => n},
    {description: 'You bet it all on red 40', effectDesc: 'cancer', effect: (n) => 0},
    {description: 'You bet it all on red and lost', effectDesc: 'Lose it All', effect: (n) => -n},
    {description: 'Lucky penny!', effectDesc: '+0.01', effect: (n) => 0.01},
    {description: 'Evil penny >:)', effectDesc: '-0.01', effect: (n) => -0.01},
    {description: 'Divorce :(', effectDesc: 'Money Halved', effect: (n) => -n/2},
    {description: 'Lottery!', effectDesc: '+1,000,000', effect: (n) => 1000000},
    {description: 'Children', effectDesc: '-3,000', effect: (n) => -3000},
    {description: 'Steal from apple (like the company (and get arrested lmao))', effectDesc: '-1000', effect: (n) => -1000},
    {description: "Friggin' packet yo", effectDesc: 'return to penny', effect: (n) => -n + 0.01},
    {description: "Wallet stole", effectDesc: '-0 to 300', effect: (n) => -Math.round(Math.random() * 300)},
    {description: "Heist", effectDesc: '+0 to 10000000', effect: (n) => Math.round(Math.random() * 10000000)},
    {description: "Bowser space", effectDesc: 'If poor, add a zero. If rich, money becomes negative.', effect: (n) => (n > 1000000) ? -n*2 : Math.floor(n)*9},
    {description: "Poor jackpot", effectDesc: 'If broke, gain 2 billion dollars', effect: (n) => (n === 0) ? 2000000000 : 0},
    {description: "Newton doesn't discover gravity", effectDesc: 'Flip cent and dollar amounts', effect: (n) => -n + (n % 1) * 100 + (Math.floor(n) / (10 ** n.toString().length))},
    {description: "Obtain sugar mommy", effectDesc: 'Happiness :)', effect: (n) => Infinity},
    {description: "Nuclear Bomb", effectDesc: 'Vaporized (lose it all)', effect: (n) => -n}
]

let monthlyIncome = 3370;
let leftovers = 3370;

// Whenever the occupation changes we change a buncha values
occupation.addEventListener('change', () => {
    // Updates the monthly income portion of the table, the funny stuff adds a comma
    // The funny stuff takes the first digit, then the comma goes in, then it pads the rest to make it three digits long
    grossMonthly.innerHTML = `Monthly Income: $${(Math.round(occupation.value / 12)).toLocaleString('en-US')}`;

    // Federal Taxes
    taxTable.children[0].children[0].children[1].innerHTML = `$${Math.round(occupation.value / 12 * 0.12)}`;
    // State Taxes
    taxTable.children[0].children[1].children[1].innerHTML = `$${Math.round(occupation.value / 12 * 0.07)}`;
    // Social Security
    taxTable.children[0].children[2].children[1].innerHTML = `$${Math.round(occupation.value / 12 * 0.062)}`;
    // Medicare
    taxTable.children[0].children[3].children[1].innerHTML = `$${Math.round(occupation.value / 12 * 0.0145)}`;
    // State Disability
    taxTable.children[0].children[4].children[1].innerHTML = `$${Math.round(occupation.value / 12 * 0.01)}`;
    // Retirement Investment
    taxTable.children[0].children[5].children[1].innerHTML = `$${Math.round(occupation.value / 12 * 0.05)}`;

    monthlyIncome = Math.round(occupation.value / 12 - (occupation.value / 12 * 0.12) - (occupation.value / 12 * 0.07) - (occupation.value / 12 * 0.062) - (occupation.value / 12 * 0.0145) - (occupation.value / 12 * 0.01) - (occupation.value / 12 * 0.05) - 180);
    netMonthly.innerHTML = `Monthly Income After Tax: $${monthlyIncome.toLocaleString('en-US')}`;
    displayNet.innerHTML = `$${monthlyIncome.toLocaleString('en-US')}`

    leftovers = monthlyIncome;
    for (let expense of expenses) {
        leftovers -= expense.value;
    }

    displayLeftovers.innerHTML = `Leftovers: $${leftovers.toLocaleString('en-US')}`;
    eventLog.innerHTML = '<tr><td>Description</td><td>Effect</td></tr>';
})

// add an event listener to each input expense tag
// im smart and goted btw
for (let i in expenses) {
    expenses[i].addEventListener('change', () => {
        if (expenses[i].value === '') {
            displayExpenses.children[i].children[1].innerHTML = `$0`;
        } else {
            displayExpenses.children[i].children[1].innerHTML = `$${expenses[i].value.toLocaleString('en-US')}`;
        }

        leftovers = monthlyIncome;
        for (let expense of expenses) {
            leftovers -= expense.value;
        }

        displayLeftovers.innerHTML = `Leftovers: $${leftovers.toLocaleString('en-US')}`;
        eventLog.innerHTML = '<tr><td>Description</td><td>Effect</td></tr>';
    })
}

random.addEventListener('click', () => {
    let event = events[Math.floor(Math.random() * events.length)];
    eventLog.innerHTML = `<tr><td>${event.description}</td><td>${event.effectDesc}</td></tr>` + eventLog.innerHTML;
    leftovers += event.effect(leftovers);
    if (isNaN(leftovers)) {
        leftovers = 0;
    }

    displayLeftovers.innerHTML = `Leftovers: $${leftovers.toLocaleString('en-US')}`;
})