//// INITIALIZE GAME, set up global vars board, squaresList, wins, user, computer
function startGame() {
    ////// BOARD SETUP
    /// ALL BLANK,
    board = {
        sq1: document.getElementById('sq1'),
        sq2: document.getElementById('sq2'),
        sq3: document.getElementById('sq3'),
        sq4: document.getElementById('sq4'),
        sq5: document.getElementById('sq5'),
        sq6: document.getElementById('sq6'),
        sq7: document.getElementById('sq7'),
        sq8: document.getElementById('sq8'),
        sq9: document.getElementById('sq9')
    };
    /// prob temp var??
    squaresList = Object.keys(board);

    /// for resetting--clear out all marked squares
    for (var i = 0; i < squaresList.length; i++) {
      board[squaresList[i]].innerHTML = "";
    }
    /// show chooseToken dialogue
    document.getElementById('begin-alert').style.display = 'block';
    //// SCORE SETUP
    wins = [
        // ROWS
        { // top row
            filled: 0,
            value: 0,
            squares: {
                sq1: "",
                sq2: "",
                sq3: ""
            }
        }, { // middle row
            filled: 0,
            value: 0,
            squares: {
                sq4: "",
                sq5: "",
                sq6: ""
            }
        }, { // bottom row
            filled: 0,
            value: 0,
            squares: {
                sq7: "",
                sq8: "",
                sq9: ""
            }
        },
        // COLUMNS
        { // left column
            filled: 0,
            value: 0,
            squares: {
                sq1: "",
                sq4: "",
                sq7: ""
            }
        }, { // middle column
            filled: 0,
            value: 0,
            squares: {
                sq2: "",
                sq5: "",
                sq8: ""
            }
        }, { // right column
            filled: 0,
            value: 0,
            squares: {
                sq3: "",
                sq6: "",
                sq9: ""
            }
        },
        // DIAGONALS
        { // top left to bottom right
            filled: 0,
            value: 0,
            squares: {
                sq1: "",
                sq5: "",
                sq9: ""
            }
        }, { // top right to bottom left
            filled: 0,
            value: 0,
            squares: {
                sq3: "",
                sq5: "",
                sq7: ""
            }
        }
    ];

    ///// PLAYER SETUP
    user = {
        value: 1,
        token: "",
        hex: '#F0EEBD'
    };
    computer = {
        value: 2,
        token: "",
        hex: '#ADEBF0'
    };
}
  startGame();
//// User picks token
function chooseToken(a, b) {
    user.token = a;
    computer.token = b;
    document.getElementById('begin-alert').style.display = 'none';
    firstTurn();
}

////// GAME SETUP
//// Generate first turn
function firstTurn() {
    if (Math.random() < 0.5) {
        // Computer goes first.
        //// Not using computerAction because first turn is random.
        mark(squaresList[(Math.floor(Math.random() * 8) + 1)], computer);
        // TODO tiny delay, then "Your turn!"
    } else {
        // User goes first.  "Your turn!"
        document.getElementById('turn-alert').style.display = 'block';
    }
}

//// MARKING FUNCTION
function mark(square, player) {
    // Mark the square on the board
    board[square].innerHTML = player.token;
    board[square].style.color = player.hex;
    // Find the square in each of its winning combinations and update its value with the player's token.  Add the player's value to the win set and increment the win set's fill count.
    for (var i in wins) {
        if (wins[i].squares.hasOwnProperty(square)) {
            wins[i].squares[square] = player.token;
            wins[i].value += player.value;
            wins[i].filled++;
        }
    }
    winCheck();
}

///// USER
function userAction(square) {
    // Prevent player from changing marked squares
    if (board[square].innerHTML === "") {
        mark(square, user);
    }
    document.getElementById('turn-alert').style.display = 'none';

    firstPriority();
}

//// WIN CHECK
function winCheck() {
    for (var i in wins) {
        if (wins[i].filled === 3 && wins[i].value === 3) {
            displayAlert(winAlert);
        } else if (wins[i].filled === 3 && wins[i].value === 6) {
            displayAlert(loseAlert);
        }
    }
}

/*
1. If the computer can win, win.
2. If the user can win, block it.
3. If the computer has started a win set and the user has not blocked it, mark another in the set.
4. If there is a blank win set, mark a square in that set.
5. If the user has started a win set and the computer has not blocked it, block it. (Not sure on priority order of 4 & 5.)
6. Just mark whatever is open to hasten the draw.
*/
function markEmpty(winSet) {
    for (var j in winSet) {
        if (winSet[j] === "") {
          // TODO
            mark(/* something */ toMark, computer);
            break;
        }
    }
}
// FIRST check if a win combo has two squares marked by the same computer; if so, mark the last one.
function firstPriority() {
    for (var i in wins) {
        // Check for computer win first.
        if (wins[i].filled === 2 && wins[i].value === 4) {
            markEmpty(wins[i].squares);
            break;
        } else secondPriority();
    }
}
// SECOND check if a win combo has two squares marked by the user; if so, mark the last one.
function secondPriority() {
    for (var i in wins) {
        if (wins[i].filled === 2 && wins[i].value === 2) {
            markEmpty(wins[i].squares);
            break;
        } else thirdPriority();
    }
}
// THIRD check if a win combo has one square filled by the computer; if so, mark the next one.
function thirdPriority() {
    for (var i in wins) {
        if (wins[i].filled === 1 && wins[i].value === 2) {
            markEmpty(wins[i].squares);
            break;
        } else fourthPriority();
    }
}
// FOURTH check if a win combo has no marked squares; if so, mark one.
function fourthPriority() {
    for (var i in wins) {
        if (wins[i].filled === 0) {
            markEmpty(wins[i].squares);
            break;
        } else fifthPriority();
    }
}
// FIFTH check if a win combo has one square filled by the user; if so, mark the next one.
function fifthPriority() {
    for (var i in wins) {
        if (wins[i].filled === 1 && wins[i].value === 1) {
            markEmpty(wins[i].squares);
            break;
        } else sixthPriority();
    }
}
// SIXTH just mark a damn square.
function sixthPriority() {
    for (var i in wins) {
        if (wins[i].filled <= 2) {
            markEmpty(wins[i].squares);
            break;
        }
    }
}


// // IN CASE OF DRAW
// if (unmarked === 0) {
//     // GAME OVER
// }




///// SOFT ALERTS
function turnAlert() {
    document.getElementById('turn-alert').style.display = 'block';
}
//// HARD ALERTS
var winAlert = document.getElementById('win-alert'),
    loseAlert = document.getElementById('lose-alert'),
    drawAlert = document.getElementById('draw-alert');

function displayAlert(event) {
    event.style.display = 'block';
}

function dismissAlert(event) {
    event.style.display = 'none';
    // reload board
    startGame();
    // etc.
}
