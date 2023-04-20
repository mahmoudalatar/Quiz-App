let quizHeader = document.querySelector(".quizHeader");
let quizBodyOptions = document.querySelector(".quizBody ul");
let quizFooter = document.querySelector(".quizFooter");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let card = document.querySelector(".card");
let questions = [
  {
    ques: "What year was the very first model of the iPhone released?",
    ans: "2007",
    options: ["2005", "2001", "2007", "2003"],
    answer: false,
    wrong: -1,
    counter: 0,
  },
  {
    ques: "What's the shortcut for the “copy” function on most computers?",
    ans: "ctrl c",
    options: ["ctrl v", "alt c", "shift x", "ctrl c"],
    answer: false,
    wrong: -1,
    counter: 0,
  },
  {
    ques: "What is often seen as the smallest unit of memory?",
    ans: "kilobyte",
    options: ["kilobyte", "megabit", "gigabits", "megabyte"],
    answer: false,
    wrong: -1,
    counter: 0,
  },
  {
    ques: "What was Twitter’s original name?",
    ans: "twttr",
    options: ["twttr", "twitter", "twwwtter", "twiwiter"],
    answer: false,
    wrong: -1,
    counter: 0,
  },
  {
    ques: "Who is often called the father of the computer",
    ans: "Charles Babbage",
    options: ["Charles Babbage", "andrew", "michel", "steve"],
    answer: false,
    wrong: -1,
    counter: 0,
  },
  {
    ques: "What does “HTTP” stand for",
    ans: "HyperText Transfer Protocol",
    options: [
      "Cascading Style Sheets",
      "HyperText Markup Language",
      "None of the above",
      "HyperText Transfer Protocol",
    ],
    answer: false,
    wrong: -1,
    counter: 0,
  },
];
let headerCounter = 0;
let done = false;

(function () {
  displayOptions();
  checkAnswer();
  setTime();
})();

next.addEventListener("click", () => {
  if (headerCounter >= questions.length - 1) {
    prev.style.display = "inline";
    done = true;
    showRes();
    headerCounter = questions.length - 1;
  } else {
    headerCounter++;
  }
  if (headerCounter + 1 == 6) {
    next.innerHTML = "done";
  }

  // clearInterval(updateCountdown);
  displayOptions();
  checkAnswer();
  setTime();
});

prev.addEventListener("click", () => {
  if (headerCounter <= 0) {
    headerCounter = 0;
  } else {
    next.innerHTML = "next";
    headerCounter--;
  }
  displayOptions();
  checkAnswer();
});

function checkAnswer() {
  let quizOptions = document.querySelectorAll(".quizBody ul li");
  for (let i = 0; i < 4; i++) {
    if (!questions[headerCounter].answer && !done) {
      quizOptions[i].addEventListener("click", () => {
        if (
          quizOptions[i].innerText == questions[headerCounter].ans &&
          !questions[headerCounter].answer
        ) {
          quizOptions[i].style = "background: #D1F0B3";
          questions[headerCounter].answer = true;
          questions[headerCounter].counter++;
          return;
        } else if (!questions[headerCounter].answer) {
          quizOptions[i].style = "background: #F47174";
          document.getElementById("ans").style = "background: #D1F0B3";
          questions[headerCounter].answer = true;
          questions[headerCounter].wrong = i;
          return;
        }
      });
    }
  }
}

function displayOptions() {
  quizHeader.innerHTML = `<h3>Question ${headerCounter + 1} of ${
    questions.length
  }</h3>
  <p>${questions[headerCounter].ques}</p>`;
  quizBodyOptions.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    if (
      questions[headerCounter].options[i] == questions[headerCounter].ans &&
      questions[headerCounter].answer
    ) {
      quizBodyOptions.innerHTML += `<li id='ans' style='background: #D1F0B3'>${questions[headerCounter].options[i]}</li>`;
    } else if (
      i == questions[headerCounter].wrong &&
      questions[headerCounter].answer
    ) {
      quizBodyOptions.innerHTML += `<li class="${i}" style='background: #F47174 '>${questions[headerCounter].options[i]}</li>`;
    } else if (
      questions[headerCounter].options[i] == questions[headerCounter].ans &&
      !questions[headerCounter].answer
    ) {
      quizBodyOptions.innerHTML += `<li id='ans'>${questions[headerCounter].options[i]}</li>`;
    } else {
      quizBodyOptions.innerHTML += `<li class="${i}">${questions[headerCounter].options[i]}</li>`;
    }
  }
}

function setTime() {
  let current = 0;
  const startingMinutes = 0.2;
  let time = startingMinutes * 60;
  let updateCountdown = setInterval(() => {
    if (done) {
      document.querySelector(".timer p").innerHTML = `00:00`;
      questions[headerCounter].answer = true;
      displayOptions();

      clearInterval(updateCountdown);
    } else {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      document.querySelector(".timer p").innerHTML = `${minutes}:${seconds}`;
      next.addEventListener("click", () => {
        clearInterval(updateCountdown);
        questions[headerCounter - 1].answer = true;
        current++;
      });
      if (time < 10) {
        document.querySelector(".timer").style = "border-color: orange";
      }
      if (!time) {
        clearInterval(updateCountdown);
        document.querySelector(".timer").style = "border-color: red";
        questions[headerCounter].answer = true;
        displayOptions();
      }
      time--;
    }
  }, 1000);
}

function showRes() {
  console.log(questions);
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].counter) {
      score++;
    }
  }
  card.style.visibility = "visible";

  if (score >= questions.length / 2) {
    card.innerHTML = `<i class="fa-solid fa-gifts fa-2xl"></i>
      <h1>congratulation</h1>
      <p>Your score is <span>${score}</span></p>
      <button>done</button>`;
  }
  if (score < questions.length / 2) {
    card.innerHTML = `<i class="fa-solid fa-face-frown-open"></i>
      <h1>Better score next time</h1>
      <p>Your score is <span>${score}</span></p>
      <button>done</button>`;
  }

  document.querySelector(".card button").addEventListener("click", () => {
    card.style.visibility = "hidden";
  });
}
