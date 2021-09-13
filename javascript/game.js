exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function () {
    var MAXPLAYCOUNT = 6
    var places = new Array(MAXPLAYCOUNT);
    var purses = new Array(MAXPLAYCOUNT);
    var inPenaltyBox = new Array(MAXPLAYCOUNT);

    var players = [];
    var popQuestions = [];
    var scienceQuestions = [];
    var sportsQuestions = [];
    var rockQuestions = [];

    var currentPlayer = 0;
    var isGettingOutOfPenaltyBox = false;

    var didPlayerWin = function () {
        return !(purses[currentPlayer] === MAXPLAYCOUNT)
    };

    var currentCategory = function () {
        if (places[currentPlayer] === 0)
            return 'Pop';
        if (places[currentPlayer] === 4)
            return 'Pop';
        if (places[currentPlayer] === 8)
            return 'Pop';
        if (places[currentPlayer] === 1)
            return 'Science';
        if (places[currentPlayer] === 5)
            return 'Science';
        if (places[currentPlayer] === 9)
            return 'Science';
        if (places[currentPlayer] === 2)
            return 'Sports';
        if (places[currentPlayer] === 6)
            return 'Sports';
        if (places[currentPlayer] === 10)
            return 'Sports';
        return 'Rock';
    };

    var updateCurrentPlayer = function () {
        currentPlayer += 1;
        if (currentPlayer === players.length) {
            currentPlayer = 0;
        }
    }

    var askQuestion = function () {
        if (currentCategory() === 'Pop')
            console.log(popQuestions.shift());
        if (currentCategory() === 'Science')
            console.log(scienceQuestions.shift());
        if (currentCategory() === 'Sports')
            console.log(sportsQuestions.shift());
        if (currentCategory() === 'Rock')
            console.log(rockQuestions.shift());
    };

    for (var i = 0; i < 50; i++) {
        popQuestions.push("Pop Question " + i);
        scienceQuestions.push("Science Question " + i);
        sportsQuestions.push("Sports Question " + i);
        rockQuestions.push("Rock Question " + i);
    }

    this.isPlayable = function () {
        return this.howManyPlayers() >= 2;
    };

    this.add = function (playerName) {
        players.push(playerName);
        places[this.howManyPlayers() - 1] = 0;
        purses[this.howManyPlayers() - 1] = 0;
        inPenaltyBox[this.howManyPlayers() - 1] = false;

        console.log(playerName + " was added");
        console.log("They are player number " + players.length);
    };

    this.howManyPlayers = function () {
        return players.length;
    };

    this.roll = function (roll) {
        if (this.isPlayable()) {
            console.log(players[currentPlayer] + " is the current player");
            console.log("They have rolled a " + roll);

            var MAXPLACES = 12;

            if (inPenaltyBox[currentPlayer]) {
                if (roll % 2 !== 0) {
                    isGettingOutOfPenaltyBox = true;

                    console.log(players[currentPlayer] + " is getting out of the penalty box");
                    places[currentPlayer] = places[currentPlayer] + roll;
                    if (places[currentPlayer] > MAXPLACES - 1) {
                        places[currentPlayer] = places[currentPlayer] - MAXPLACES;
                    }

                    console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
                    console.log("The category is " + currentCategory());
                    askQuestion();
                } else {
                    console.log(players[currentPlayer] + " is not getting out of the penalty box");
                    isGettingOutOfPenaltyBox = false;
                }
            } else {

                places[currentPlayer] = places[currentPlayer] + roll;
                if (places[currentPlayer] > (MAXPLACES - 1)) {
                    places[currentPlayer] = places[currentPlayer] - MAXPLACES;
                }

                console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
                console.log("The category is " + currentCategory());
                askQuestion();
            }
        }
    };

    this.wasCorrectlyAnswered = function () {
        var winner = true;
        if (inPenaltyBox[currentPlayer]) {
            if (isGettingOutOfPenaltyBox) {
                console.log('Answer was correct!!!!');
                purses[currentPlayer] += 1;
                console.log(players[currentPlayer] + " now has " +
                    purses[currentPlayer] + " Gold Coins.");

                winner = didPlayerWin();
                updateCurrentPlayer()

                return winner;
            } else {
                updateCurrentPlayer()

                return winner;
            }

        } else {

            console.log("Answer was correct!!!!");

            purses[currentPlayer] += 1;
            console.log(players[currentPlayer] + " now has " +
                purses[currentPlayer] + " Gold Coins.");

            winner = didPlayerWin();
            updateCurrentPlayer()

            return winner;
        }
    };

    this.wrongAnswer = function () {
        console.log('Question was incorrectly answered');
        console.log(players[currentPlayer] + " was sent to the penalty box");
        inPenaltyBox[currentPlayer] = true;

        updateCurrentPlayer()

        return true;
    };
};

var notAWinner = false;

var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do {

    game.roll(Math.floor(Math.random() * 6) + 1);

    if (Math.floor(Math.random() * 10) === 7) {
        notAWinner = game.wrongAnswer();
    } else {
        notAWinner = game.wasCorrectlyAnswered();
    }

} while (notAWinner);
