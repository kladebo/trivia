require('./game.js');

describe("The test environment", function () {
    it("should pass", function () {
        expect(true).toBe(true);
    });

    it("should access game", function () {
        expect(Game).toBeDefined();
    });
});

describe("The App should add Players", function () {
    let sut
    beforeEach(() => {
        sut = new Game()
    });

    it("should create a player", function () {
        sut.add('Player One');

        expect(sut.howManyPlayers()).toBe(1)
    });

    it("should create multiple players", function () {
        sut.add('Player One');
        sut.add('Player Two');
        sut.add('Player Three');

        expect(sut.howManyPlayers()).toBe(3)
    });

    it("should Not be playable with One Player", function () {
        sut.add('Player One');

        expect(sut.isPlayable()).toBe(false)
    });

    it("should be playable with Two or more Player", function () {
        sut.add('Player One');
        sut.add('Player Two');
        sut.add('Player Three');

        expect(sut.isPlayable()).toBe(true)
    });


});

describe("The app should generate answers", function () {
    let sut
    let notAWinner;

    beforeEach(() => {
        sut = new Game()
        sut.add('Player One');
        sut.add('Player Two');
        notAWinner = false;
    });

    it("should give a wrong answer", function () {

        notAWinner = sut.wrongAnswer();
        expect(notAWinner).toBe(true)
    });

  it("should give a right answer", function () {
    notAWinner = true;
    expect(notAWinner).toBe(true)
    notAWinner = sut.wasCorrectlyAnswered();
    expect(notAWinner).toBe(true)
  });

});
