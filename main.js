// const quizContainer=document.getElementById('quiz');
// const resultsContainer=document.getElementById('results');
// const previousButton=document.getElementById('previous');
// const nextButton=document.getElementById('next');
// const submitButton=document.getElementById('submit');
var quizContainer = document.getElementById('quiz-container');
var previousButton = document.getElementById('previous');
var nextButton = document.getElementById('next');
var current = 0;
var score = 0;

var myQuestions=[
    {
        question: "What's the biggest animal in the world?",
        answers:
        [
          {
            "optionNumber": "1",
            "option":"The blue whale"
          },
          {
            "optionNumber": "2",
            "option":"Tiger"
          },
          {
            "optionNumber": "3",
            "option":"Mouse"
          },
          {
            "optionNumber": "4",
            "option":"Elephant"
          },
        ],
        correctAnswer:"1",
        currentAnswer: null
    },
    {
      question: "Which country is brie cheese originally from?",
      answers:
      [
        {
          "optionNumber": "1",
          "option":"Italy"
        },
        {
          "optionNumber": "2",
          "option":"France"
        },
        {
          "optionNumber": "3",
          "option":"Swedan"
        },
        {
          "optionNumber": "4",
          "option":"Dr. Congo"
        },
      ],
      correctAnswer:"2",
      currentAnswer: null
    },
    {
          question: "Who painted the Mona Lisa?",
          answers:
          [
            {
              "optionNumber": "1",
              "option":"Paja Jovanović"
            },
            {
              "optionNumber": "2",
              "option":"Leonardo da Vinci"
            },
            {
              "optionNumber": "3",
              "option":"Pablo Picasso"
            },
            {
              "optionNumber": "4",
              "option":"Vinsent van Gog"
            },
          ],
          correctAnswer:"2",
          currentAnswer: null
        }
];


function init(){
  var current = 0;
  var score = 0;
  quizContainer.style.display = "none";
}

function buildQuiz(){
  if(current === 0) {
    previousButton.setAttribute("disabled",true);
  } else {
    previousButton.removeAttribute("disabled");
  }

  if(current === myQuestions.length-1) {
      nextButton.innerHTML = 'Finish';
  }
  showQuestion(current);
}

function startQuiz() {
  quizContainer.style.display = "block";
  buildQuiz();
  document.getElementById('startDiv').style.display = "none";
}

function showQuestion(index) {
  question = "";
  answers = "";
  question =  myQuestions[index].question;
  for(var j=0; j<myQuestions[index].answers.length; j++) {
    if(j === myQuestions[index].currentAnswer) {
      answers += `<li class="list-group-item"><label><input type="radio" name="answer" checked> &nbsp ${myQuestions[index].answers[j].option} </label><li>`;
    } else {
      answers += `<li class="list-group-item"><label><input type="radio" name="answer">&nbsp ${myQuestions[index].answers[j].option}</label><li>`;
    }
  }
  document.getElementById('question').innerHTML = question;
  document.getElementById('answers').innerHTML = answers;
}

function nextQuestion() {
  var answers = document.getElementsByName('answer');
  var isCheked = [];
  for(var i=0; i<answers.length; i++) {
      isCheked.push(answers[i].checked);
      if(answers[i].checked === true) {
        myQuestions[current].currentAnswer = i;
      }
  }
  if(isCheked.includes(true)) {
    if(current === myQuestions.length-1) {
      //finish button
      for(var i=0; i<myQuestions.length; i++) {
        if(myQuestions[i].correctAnswer == myQuestions[i].currentAnswer+1) {
          score += 1;
        } else {
          score -= 0.5;
        }
      }

      var form = `<div><label style="font-size:30px"><h2>Your name: </h2><input class="form-control" type='text' id='competitor'/><label><br>
      <button class="btn btn btn-success btn-lg" onClick='saveCompetitor()'>Save</button>
      </div>`;
      quizContainer.style.display = "none";
      document.getElementById('scoreForm').innerHTML = form;
    } else {
      current = current +1;
      buildQuiz();
    }

  } else {
    alert('cekiraj');
  }
}

function previousQuestion() {
  var answers = document.getElementsByName('answer');
  for(var i=0; i<answers.length; i++) {
      if(answers[i].checked === true) {
        myQuestions[current].currentAnswer = i;
      }
  }
  current = current -1;
  buildQuiz();
}

function saveCompetitor() {
    var competitorName = document.getElementById('competitor').value;
    var competitor = {name: competitorName, score: score};

    var localStorageCompetitors = Array.isArray(JSON.parse(window.localStorage.getItem('competitors'))) ? JSON.parse(window.localStorage.getItem('competitors')) : [];
    localStorageCompetitors.push(competitor);
    window.localStorage.setItem('competitors', JSON.stringify(localStorageCompetitors));
    document.getElementById('scoreForm').style.display = 'none';
    var competitors = JSON.parse(window.localStorage.getItem('competitors'));
    competitors.sort(function compare(a, b) {
      var comparison = 0;
      if (a.score > b.score) {
        comparison = -1;
      } else if (a.score < b.score) {
        comparison = 1;
      }
      return comparison;
    });
    document.getElementById('score').innerHTML = `<h2 style="font-family:'Times New Roman', Times, serif;font-size;50px;">Score list:</h2>`;
    var list = `<ul class="list-group">`;
    for(var i=0; i<competitors.length; i++) {
       list += `<li class="list-group-item"><p style="font-weight:bold;font-size:25px;"> ${competitors[i].name}  :  ${competitors[i].score}</p> </li> `;
    }
    document.getElementById('scoreList').innerHTML += list +"</ul>";
}
init();
