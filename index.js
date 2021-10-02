const form = document.querySelector("form");
const inputTitle = document.querySelector('input[name="title"');
const inputDesc = document.querySelector('input[name="description"');

// taking previous values on new page load
let habits = [];

window.addEventListener("load", storedValues);
function storedValues() {
  let storedHabits = JSON.parse(localStorage.getItem("habits"));
  habits.unshift(...storedHabits);
}

// Taking Data from form and storing into the Array
form.addEventListener("submit", inputHandler);

function inputHandler(e) {
  e.preventDefault();
  if (inputTitle.value === "") {
    alert("Please add a habit");
  } else {
    console.log(inputTitle.value);
    let habit = {
      title: inputTitle.value,
      desc: inputDesc.value,
      date: new Date().getTime(),
    };
    habits.unshift(habit);
    localStorage.setItem("habits", JSON.stringify(habits));
    inputTitle.value = inputDesc.value = "";
  }
}

// Printing the habits
setInterval(function printHabits() {
  const habitContainer = document.querySelector(".habits");
  habitContainer.innerHTML = "";
  let habits1 = JSON.parse(localStorage.getItem("habits"));
  for (let i = 0; i < habits1.length; i++) {
    const timeConvert = () => {
      const date = habits1[i].date;
      const nowDate = new Date().getTime();
      const gap = nowDate - date;

      // How time Works
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Calculations
      const dayValue = Math.floor(gap / day);
      const hourValue = Math.floor((gap % day) / hour);
      const minuteValue = Math.floor((gap % hour) / minute);
      const secondValue = Math.floor((gap % minute) / second);

      habitContainer.innerHTML += `<div class="habit">
        <h3>${habits1[i].title}</h3>
        <h4>${habits1[i].desc}</h4>
        <section class="timer">
            <div class="dayContainer">
                <h4 class="time">${dayValue}</h4>
                <h4 class="timeUnit">Day</h4>
            </div>
            <div class="hourContainer">
                <h4 class="time">${hourValue}</h4>
                <h4 class="timeUnit">Hour</h4>
            </div>
            <div class="minuteContainer">
                <h4 class="time">${minuteValue}</h4>
                <h4 class="timeUnit">Minute</h4>
            </div>
            <div class="secondContainer">
                <h4 class="time">${secondValue}</h4>
                <h4 class="timeUnit">Second</h4>
            </div>`;
    };
    timeConvert();
  }
}, 1000);
