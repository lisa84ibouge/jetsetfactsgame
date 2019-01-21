$('.btn').on('click', function () {
    game.loadQuestion();
})
$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
})
$(document).on('click', '#reset', function () {
    game.reset();
})

var questions = [{
        question: "What is the capital of Tanzania?",
        answers: ["Dar Es Salaam", "Marrakech", "Cape Town", "Nairobi"],
        correctAnswer: "Dar Es Salaam",
        image: "<img src='tanzania.jpg'>"
    }, {
        question: "How do you say 'maybe' in French?",
        answers: ["oui", "non", "peut-etre"],
        correctAnswer: "peut-etre",
        image: "<img src='france1.jpg'>"
    },
    {
        question: "What is considered a French delicacy?",
        answers: ["duck", "foie gras", "champagne", "All 3 of these"],
        correctAnswer: "All 3 of these",
        image: "<img src='france2.jpg'>"
    }, {
        question: "What is the capital of Hungary?",
        answers: ["Budapest", "Vienna", "Moscow", "Dubrovnik"],
        correctAnswer: "Budapest",
        image: "<img src='hungary.jpg'>"
    },
    {
        question: "What is the capital of Norway?",
        answers: ["Dublin", "London", "Stockholm", "Oslo"],
        correctAnswer: "Oslo",
        image: "<img src='geiranger.jpg'>"
    }, {
        question: "What is a term in Irish for 'having fun?'",
        answers: ["stick in the mud", "jolly","good ol' craic", "drunk"],
        correctAnswer: "good ol' craic",
        image: "<img src='craic.jpg'>"
    }
]

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {

        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            console.log("Time's Up!");
            game.timeUp();
        }
    },

    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html("<h2> TIME REMAINING <span id='counter'>30</span> SECONDS</h2>")
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>');
         
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
           // $('#subwrapper').append('<h2>' + questions[this.currentQuestion].question + '</h2>');
            $('#subwrapper').append('<button class="answer-button" id="button-' +i+'" data-name="'+ questions[game.currentQuestion].answers[i]+'">' + questions[game.currentQuestion].answers[i] + '</button>'); 

            /*for (var a = 0; a < questions[i].guesses.length; a++) {
                $('#subwrapper').append('<h2>' + questions[i].guesses + '<h2>')
                $('#subwrapper').append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] + '">' +
                    questions[this.currentQuestion].answers[i] + '</button>');
            } */

        }
    },



    nextQuestion: function () {
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2> Out of time!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer + '</h3>')
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    reset: function () {
        clearInterval(timer);
        $('#subwrapper').html("<h2>All Done!</h2>");
        $('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
        $('#subwrapper').append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $('#subwrapper'.append("<h3>Unanswered: " + game.unanswered + "</h3>"))
        $('#subwrapper').append("<button id='reset'>RESET</button>");
    },



    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();

        } else {
            game.answeredIncorrectly();
        }

    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>All Done!</h2>");
        $('#subwrapper').append("<h3>Correct: " + game.correct+ "</h3>");
        $('#subwrapper').append("<h3>Incorrect: " + game.incorrect+"</h3>");
        $('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>")
        $('#subwrapper').append("<button id='reset'> RESET</button>")
    },



    answeredCorrectly: function () {
        console.log("You Got It!")
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>You got it right!</h2>');
        $('#subwrapper').append(questions[game.currentQuestion].image);
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("Sorry! That's not correct!");

        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>You got it wrong!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer + '</h3>')
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    reset: function () {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    },
}