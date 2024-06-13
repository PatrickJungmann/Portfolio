let score = 0;
let currentQuestionIndex = 0;

let questions = [
    {
        question: "Hauptstadt von Deutschland?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Welche Farbe hat eine Zitrone?",
        answers: ["Gelb", "Blau", "Grün", "Rot"],
        correctAnswer: 0
    },
    {
        question: "Wie viele Beine hat ein Hund?",
        answers: ["2", "6", "8", "4"],
        correctAnswer: 3
    },
    {
        question: "Neuer Mitarbeiter?",
        answers: ["Patrick Jungmann"],
        correctAnswer: 0
    }
];

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // Übergang zum Quiz beendet Screen
        document.getElementById("quiz-container").classList.add("opacity-0");
        setTimeout(() => {
            document.getElementById("quiz-container").hidden = true;
            document.getElementById("result").classList.remove("opacity-0");
            document.getElementById("result").hidden = false;
            document.getElementById("score").textContent = score;
        }, 500);
        return;
    }

    let question = questions[currentQuestionIndex];

    let quizContainer = document.getElementById("quiz-container");

    // Füge Klasse hinzu, um Übergang zu initiieren
    quizContainer.classList.add("transition-opacity", "duration-200", "opacity-0");

    // Nach Übergang Inhalte aktualisieren
    setTimeout(() => {
        quizContainer.classList.remove("opacity-0");
        document.getElementById("question").textContent = question.question;

        let answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";

        question.answers.forEach((answer, index) => {
            let answerButton = document.createElement("button");
            answerButton.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-blue-600", "transition-colors", "duration-300", "shadow-xl");
            answerButton.textContent = answer;
            answerButton.onclick = () => checkAnswer(index);
            answersDiv.appendChild(answerButton);
        });
    }, 500); // Verzögerung, um den Übergang zu ermöglichen
}

displayQuestion();

function checkAnswer(userAnswer) {
    let correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (userAnswer == correctAnswer) {
        score += 1;
    }

    currentQuestionIndex += 1;

    displayQuestion();
}

function nextQuestion() {
    currentQuestionIndex += 1;
    displayQuestion();
}
