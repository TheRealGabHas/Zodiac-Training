let total_score = 0;

const sign = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
];

const START_BTN = document.getElementById("start-btn");

async function changeBgColor(element, color, time) {
    let initial_color = element.style.getPropertyValue("background-color");
    element.style.setProperty("background-color", color);
    await delay(time);
    element.style.setProperty("background-color", initial_color);
}

function start_zodiac() {
    let time = 30;
    total_score = 0;
    START_BTN.innerHTML = "Running";
    document.getElementById('score').innerHTML = "Score : " + total_score;
    ask();
    let timer = setInterval(function () {
        document.getElementById("timer").innerHTML = "Time : " + time + "s";
        time--;
        if (time < 0) {
            clearInterval(timer);
            START_BTN.innerHTML = "Start";
            document.querySelectorAll('.answer').forEach(element => changeBgColor(element, "white", 1000).then(() => {
            }));
            document.getElementById("share").style.setProperty("background-color", "#2ada2f");
        }
    }, 1000)

}

START_BTN.addEventListener('click', () => {
    if (START_BTN.innerHTML === "Start") {
        start_zodiac();
    } else if (START_BTN.innerHTML === "Running") {
        return "running";
    }
});


function ask() {
    const choice = sign[Math.floor(Math.random() * sign.length)];
    document.getElementsByClassName('asked-zodiac')[0].innerHTML = choice;
    return choice;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function check_answer(answer) {
    if (START_BTN.innerHTML === "Running") { // Game is running
        if (answer.id === document.getElementsByClassName('asked-zodiac')[0].innerHTML) { // Answer is correct
            total_score++;
            document.getElementById('score').innerHTML = "Score : " + total_score;
            changeBgColor(document.getElementById(answer.id), "#2fff2f", 100).then(() => {
            });
            ask();
        } else {
            changeBgColor(document.getElementById(answer.id), "#fc4141", 100).then(() => {
            });
        }
    }
}


document.querySelectorAll('.answer').forEach(element => element.addEventListener("mousedown", item => {
    const answer = item.target;
    check_answer(answer);
}));

document.querySelectorAll("i.answer").forEach(element => element.addEventListener("mousedown", item => {
    const answer = document.getElementById(item.target.classList[1]);
    check_answer(answer);
}));


document.addEventListener('click', item => {
    if (item.target.id === "share") {
        if (document.getElementById("timer").innerHTML === "Time : 0s") {
            const time = document.getElementById("timer").innerHTML;
            const score = document.getElementById("score").innerHTML;
            const message = "🔮 zodiac.gabhas.fr 🔮\n⏳ " + time + " remaining\n🎯 " + score + " pts";
            navigator.clipboard.writeText(message).then(() => {
            });
            changeBgColor(item.target, "#02ff68", 200).then(() => {
            });
        } else {
            changeBgColor(item.target, "#cc0000", 200).then(() => {
            });
        }
    }
});
