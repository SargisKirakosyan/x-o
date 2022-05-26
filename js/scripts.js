var singlePlay, lastStepWin, winStep, playerOne, playerTwo, startButton, cell;
var gameCheck = document.getElementById('gameCheck');
var gameArea = document.getElementById('gameArea');
var switchSide = document.querySelector('.switch-side');
var gameScoreArea = document.querySelector('.game-score');
var userScore = document.getElementById('userScore');
var computerScore = document.getElementById('computerScore');
var messageBlock = document.getElementById('gameMessage');
var messageColor = document.querySelector(".alert");
var messageHeader = document.querySelector(".message-header");
var messageText = document.querySelector(".message-text");
var x = "X";
var o = "O";
var stepsQuantity = 0;
var scoreX = 0;
var scoreO = 0;
var win = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function switchChange() {
    switch (gameCheck.checked) {
        case true:
            singlePlay = true;
            winStep = false;
            if (switchSide.contains(document.querySelector('.switch-side button'))) {
                switchSide.removeChild(document.querySelector('.switch-side button'));
            }
            startButton = document.createElement('button');
            startButton.setAttribute('type', 'button');
            startButton.setAttribute('class', "btn btn-dark");
            startButton.setAttribute('onclick', 'startGame()');
            startButton.innerHTML = "Start game";
            elementRemove(gameArea);
            elementRemove(gameScoreArea);
            switchSide.insertBefore(startButton, switchSide.childNodes[switchSide.length - 1]);
            if (gameArea.contains(document.querySelector('.players-name'))) {
                gameArea.removeChild(document.querySelector('.players-name'));
            }
            messageColor.classList.remove("alert-danger", "alert-success", "alert-secondary", "alert-info");
            messageBlock.style.display = "none";
            stepsQuantity = 0;
            break;
        case false:
            singlePlay = false;
            gameArea.innerHTML = '<div class="players-name"><div class="row"><div class="col-md-6"><label for="player1">Player One</label><div class="input-group"><input type="text" id="player1" class="form-control" placeholder="Enter your name"></div></div><div class="col-md-6"><label for="player2">Player Two</label><div class="input-group"><input type="text" id="player2" class="form-control" placeholder="Enter your name"></div></div></div><div class="row mt-2"><div class="col-md-6"><button type="button" class="btn btn-dark" onclick="startGame()">Start game</button></div></div></div>';
            if (switchSide.contains(document.querySelector('.switch-side button'))) {
                switchSide.removeChild(document.querySelector('.switch-side button'));
            }
            elementRemove(gameScoreArea);
            messageColor.classList.remove("alert-danger", "alert-success", "alert-secondary", "alert-info");
            messageBlock.style.display = "none";
            stepsQuantity = 0;
            break;
    }
}

function changeGame() { /* Change game mode from single to multiplayer or vice versa */
    elementRemove(gameArea);
    elementRemove(gameScoreArea);
    switchChange();
}

function startGame() {
    scoreX = 0;
    scoreO = 0;
    switch (singlePlay) {
        case false:
            playerOne = document.getElementById("player1").value;
            playerTwo = document.getElementById("player2").value;
            startButton = document.createElement('button');
            startButton.setAttribute('type', 'button');
            startButton.setAttribute('class', "btn btn-dark");
            startButton.setAttribute('onclick', 'changeGame()');
            startButton.innerHTML = "Change names";
            switchSide.insertBefore(startButton, switchSide.childNodes[switchSide.length - 1]);
            break;
    }
    elementRemove(gameArea);
    elementRemove(gameScoreArea);
    for (var i = 1; i <= 9; i++) {
        var newCell = document.createElement("input");
        newCell.setAttribute('type', 'text');
        newCell.setAttribute('class', "cell");
        newCell.setAttribute('readonly', '');
        gameArea.appendChild(newCell);
    }
    cell = document.getElementsByClassName("cell");
    for (var j = 0; j < cell.length; j++) {
        cell[j].addEventListener("focus", userStep);
    }
    gameScore(0, 0);
    messageColor.classList.remove("alert-danger", "alert-success", "alert-secondary", "alert-info");
    messageBlock.style.display = "none";
    winStep = false;
}

function userStep() {
    switch (singlePlay) {
        case true:
            this.value = x;
            this.setAttribute('disabled', '');
            checkWinner();
            stepsQuantity++;
            showMessage("Think");
            var systemStep = setTimeout(function () {
                if (stepsQuantity == 1) {
                    var randomCell = randomCellNumber();
                    if (cell[randomCell].value == "") {
                        cell[randomCell].value = o;
                        cell[randomCell].setAttribute('disabled', '');
                        messageBlock.style.display = "none";
                    }
                } else {
                    for (var k = 0; k < 8; k++) {
                        if (cell[win[k][0]].value == o && cell[win[k][1]].value == o && cell[win[k][2]].value == "") {
                            cell[win[k][2]].value = o;
                            cell[win[k][2]].setAttribute('disabled', '');
                            messageBlock.style.display = "none";
                            winStep = true;
                            break;
                        } else if (cell[win[k][0]].value == o && cell[win[k][1]].value == "" && cell[win[k][2]].value == o) {
                            cell[win[k][1]].value = o;
                            cell[win[k][1]].setAttribute('disabled', '');
                            messageBlock.style.display = "none";
                            winStep = true;
                            break;
                        } else if (cell[win[k][0]].value == "" && cell[win[k][1]].value == o && cell[win[k][2]].value == o) {
                            cell[win[k][0]].value = o;
                            cell[win[k][0]].setAttribute('disabled', '');
                            messageBlock.style.display = "none";
                            winStep = true;
                            break;
                        }
                    }
                    if (winStep == false) {
                        for (var k = 0; k < 8; k++) {
                            if (cell[win[k][0]].value == x && cell[win[k][1]].value == x && cell[win[k][2]].value == "") {
                                cell[win[k][2]].value = o;
                                cell[win[k][2]].setAttribute('disabled', '');
                                messageBlock.style.display = "none";
                                break;
                            } else if (cell[win[k][0]].value == x && cell[win[k][1]].value == "" && cell[win[k][2]].value == x) {
                                cell[win[k][1]].value = o;
                                cell[win[k][1]].setAttribute('disabled', '');
                                messageBlock.style.display = "none";
                                break;
                            } else if (cell[win[k][0]].value == "" && cell[win[k][1]].value == x && cell[win[k][2]].value == x) {
                                cell[win[k][0]].value = o;
                                cell[win[k][0]].setAttribute('disabled', '');
                                messageBlock.style.display = "none";
                                break;
                            }
                        }
                    }
                }
                stepsQuantity++;
                checkWinner();
            }, 1000);
            break;
        case false:
            if (stepsQuantity % 2 == 0) {
                this.value = x;
            } else {
                this.value = o;
            }
            this.setAttribute('disabled', '');
            stepsQuantity++;
            checkWinner();
            break;
    }
}

function randomCellNumber() { /* Generate random cell number and paste O if that cell is empty */
    var randomCell = Math.floor(Math.random() * 8);
    switch (cell[randomCell].value) {
        case "":
            return randomCell;
            break;
        default:
            return randomCellNumber();
            break;
    }
}

function checkWinner() {
    if (stepsQuantity == 8) {
        lastStepWin = false;
        for (var k = 0; k < win.length; k++) {
            if (cell[win[k][0]].value == o && cell[win[k][1]].value == o && cell[win[k][2]].value == o) {
                lastStepWin = true;
            }
        }
        switch (lastStepWin) {
            case true:
                showMessage(o);
                ++scoreO;
                gameScore(scoreX, scoreO);
                gameStopped();
                break;
            case false:
                showMessage("Tie");
                gameStopped();
                clearTimeout(systemStep);
                break;
        }
    }
    for (var k = 0; k < win.length; k++) {
        if (cell[win[k][0]].value == x && cell[win[k][1]].value == x && cell[win[k][2]].value == x) {
            showMessage(x);
            ++scoreX;
            gameScore(scoreX, scoreO);
            gameStopped();
            clearTimeout(systemStep);
        } else if (cell[win[k][0]].value == o && cell[win[k][1]].value == o && cell[win[k][2]].value == o) {
            showMessage(o);
            ++scoreO;
            gameScore(scoreX, scoreO);
            gameStopped();
        }
    }
}

function gameScore(x, o) { /* Showing game score for both single & multiplayer mode */
    switch (singlePlay) {
        case true:
            gameScoreArea.innerHTML = '<p class="text-left font-weight-bold text-uppercase text-info h5">Score</p><p id="userScore" class="text-left">You (X): ' + x + '</p><p id="computerScore" class="text-left">Computer (O): ' + o + '</p><button class="btn btn-secondary" onclick="newGame()">New Game</button>';
            break;
        case false:
            gameScoreArea.innerHTML = '<p class="text-left font-weight-bold text-uppercase text-info h5">Score</p><p id="userScore" class="text-left">' + playerOne + ' (X): ' + x + '</p><p id="computerScore" class="text-left">' + playerTwo + ' (O): ' + o + '</p><button class="btn btn-secondary" onclick="newGame()">New Game</button>';
            break;
    }
}

function gameStopped() { /* Completely stoping the game */
    for (var j = 0; j < cell.length; j++) {
        cell[j].setAttribute('disabled', '');
        cell[j].removeEventListener('focus', userStep);
    }
}

function showMessage(gameWinner) { /* Showing the message for win, lose and tie in both single & multiplayer mode */
    messageColor.classList.remove("alert-info");
    switch (singlePlay) {
        case true:
            switch (gameWinner) {
                case x:
                    messageColor.classList.add("alert-success");
                    messageHeader.innerText = "You win!";
                    messageText.innerText = "Congtratulations, You win this round.";
                    break;
                case o:
                    messageColor.classList.add("alert-danger");
                    messageHeader.innerText = "You lose!";
                    messageText.innerText = "Unfortunately, You lose this round.";
                    break;
                case "Tie":
                    messageColor.classList.add("alert-secondary");
                    messageHeader.innerText = "Tie!";
                    messageText.innerText = "Nobody won this round.";
                    break;
                case "Think":
                    messageColor.classList.add("alert-info");
                    messageHeader.innerText = "I'm thinking!";
                    messageText.innerText = "Please wait, I'm thinking.";
                    break;
            }
            break;
        case false:
            switch (gameWinner) {
                case x:
                    messageColor.classList.add("alert-success");
                    messageHeader.innerText = "" + playerOne + " win!";
                    messageText.innerText = "Congtratulations, You win this round.";
                    break;
                case o:
                    messageColor.classList.add("alert-success");
                    messageHeader.innerText = "" + playerTwo + " win!";
                    messageText.innerText = "Congtratulations, You win this round.";
                    break;
                case "Tie":
                    messageColor.classList.add("alert-secondary");
                    messageHeader.innerText = "Tie!";
                    messageText.innerText = "Nobody won this round.";
                    break;
            }
            break;
    }
    messageBlock.style.display = "block";
}

function elementRemove(element) { /* Removing game area or game score area */
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function newGame() {
    for (var j = 0; j < cell.length; j++) {
        cell[j].value = '';
        cell[j].removeAttribute('disabled');
        cell[j].addEventListener('focus', userStep);
    }
    messageColor.classList.remove("alert-danger", "alert-success", "alert-secondary", "alert-info");
    messageBlock.style.display = "none";
    stepsQuantity = 0;
    winStep = false;
}

window.onload = function () {
    switchChange();
}