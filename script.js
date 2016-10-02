//// INITIALIZE GAME, set up global vars board, squaresList, wins, user, computer
function startGame() {
    /// BOARD SETUP
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
    /// RESET FOR EACH GAME

    // Array of the keys from object "board".  Used in computerAction() to find blank squares and mark them.  Marked squares are removed from the list in mark().
    squaresList = Object.keys(board);

    /// Clear the board
    for (var i = 0; i < squaresList.length; i++) {
        board[squaresList[i]].innerHTML = "";
    }
    /// show chooseToken dialogue
    document.getElementById('begin-alert').style.display = 'block';
    /// hide turn alert
    document.getElementById('turn-alert').style.display = 'none';
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
/// EXECUTE ON SCRIPT LOAD
startGame();

//// SETTING TOKENS AND TURN ORDER
/// User picks token
function chooseToken(a, b) {
    user.token = a;
    computer.token = b;
    document.getElementById('begin-alert').style.display = 'none';
    firstTurn();
}

/// Generate first turn
function firstTurn() {
    if (Math.random() < 0.5) {
        // Computer goes first.
        // (Not using computerAction because first turn is random.)
        mark(squaresList[(Math.floor(Math.random() * 8) + 1)], computer);
        // Alert the user that it's their turn now
            userTurn = true;
        beginUserTurnAlert();
    } else {
        // User goes first.
            userTurn = true;
        beginUserTurnAlert();
    }
}

//// MARKING FUNCTION
function mark(square, player) {
    // Mark the square on the board
    board[square].className = "animated flipInX";
    board[square].innerHTML = player.token;
    board[square].style.color = player.hex;
    // Remove marked square from list of unmarked
    squaresList.splice(squaresList.indexOf(square), 1);
    // Find the square in each of its winning combinations and update its value with the player's token.  Add the player's value to the win set and increment the win set's fill count.
    for (var i in wins) {
        if (wins[i].squares.hasOwnProperty(square)) {
            wins[i].squares[square] = player.token;
            wins[i].value += player.value;
            wins[i].filled++;
        }
    }
    // Check for win, then draw, then alert user it's their turn
    winCheck();
}

//////// PLAYER ACTIONS
/// USER
function userAction(square) {
  if (userTurn) {
    // Prevent player from changing marked squares
    if (board[square].innerHTML === "") {
        mark(square, user);
    }
    userTurn = false;
    endUserTurnAlert();
    // Computer's turn
    setTimeout(computerAction, 1000);
    }
}

/// COMPUTER
// Start the madness
function computerAction() {
    conditionMet = false;
    // Call first strategy function
    firstPriority();
    setTimeout(beginUserTurnAlert, 500);
    userTurn = true;
}
// SELECT SQUARE TO MARK
// The strategy functions will find the best possible move and send the set that contains it to this function.  This will find the first blank square in that set and send it to the mark() function.
function markEmpty(winSet) {
    var winSetArr = Object.keys(winSet);
    for (var i = 0; i < winSetArr.length; i++) {
        if (squaresList.indexOf(winSetArr[i]) > -1) {
            mark(winSetArr[i], computer);
            break;
        }
    }
}
// STRATEGY FUNCTIONS
/*
STRATEGY:
1. If the computer can win, win.
2. If the user can win, block it.
3. If the computer has started a win set and the user has not blocked it, mark another in the set.
4. If there is a blank win set, mark a square in that set.
5. If the user has started a win set and the computer has not blocked it, block it. (Not sure on priority order of 4 & 5.)
6. Just mark whatever is open to hasten the draw.

PROCESS:
There are six functions--one for each move listed in the strategy above and named for its priority in that list.  They are identical except for the condition that is being tested; each function loops through all 8 winning combinations.  The first combination that meets the function's condition will be sent to markEmpty() and the loop will break.  If no winning set matches the function's condition, the next priority's function will execute in the same way.
// TODO this seems super bloated and it would be cool if there were a way to achieve the same thoroughness without six functions and their loops.
*/

// FIRST check if a win combo has two squares marked by the same computer; if so, mark the last one.
function firstPriority() {
    for (var i in wins) {
        // Check for computer win first.
        if (wins[i].filled === 2 && wins[i].value === 4) {
            markEmpty(wins[i].squares);
            conditionMet = true;
            break;
        }
    }
    if (conditionMet === false) {
        secondPriority();
    }
}
// SECOND check if a win combo has two squares marked by the user; if so, mark the last one.
function secondPriority() {
    for (var i in wins) {
        if (wins[i].filled === 2 && wins[i].value === 2) {
            markEmpty(wins[i].squares);
            conditionMet = true;
            break;
        }
    }
    if (conditionMet === false) {
        thirdPriority();
    }
}
// THIRD check if a win combo has one square filled by the computer; if so, mark the next one.
function thirdPriority() {
    for (var i in wins) {
        if (wins[i].filled === 1 && wins[i].value === 2) {
            markEmpty(wins[i].squares);
            conditionMet = true;
            break;
        }
    }
    if (conditionMet === false) {
        fourthPriority();
    }
}
// FOURTH check if a win combo has no marked squares; if so, mark one.
function fourthPriority() {
    for (var i in wins) {
        if (wins[i].filled === 0) {
            markEmpty(wins[i].squares);
            conditionMet = true;
            break;
        }
    }
    if (conditionMet === false) {
        fifthPriority();
    }
}
// FIFTH check if a win combo has one square filled by the user; if so, mark the next one.
function fifthPriority() {
    for (var i in wins) {
        if (wins[i].filled === 1 && wins[i].value === 1) {
            markEmpty(wins[i].squares);
            conditionMet = true;
            break;
        }
    }
    if (conditionMet === false) {
        sixthPriority();
    }
}
// SIXTH just mark a damn square.
function sixthPriority() {
    for (var i in wins) {
        if (wins[i].filled <= 2) {
            markEmpty(wins[i].squares);
            conditionMet = true;
            break;
        }
    }
}


//////// GAME ENDING EVENTS
/// WIN CHECK
function winCheck() {
    for (var i in wins) {
        if (wins[i].filled === 3 && wins[i].value === 3) {
            displayAlert(winAlert);
            winCount ++;
        } else if (wins[i].filled === 3 && wins[i].value === 6) {
            displayAlert(loseAlert);
            loseCount ++;

        } else {
            drawCheck();
        }
    }
}
/// DRAW CHECK
function drawCheck() {
    if (squaresList.length === 0) {
        displayAlert(drawAlert);
        drawCount ++;
    }
  }



//////// ALERT WINDOWS
/// SOFT ALERTS
function beginUserTurnAlert() {
    setTimeout(function() {
            document.getElementById('turn-alert').style.display = 'block';
            document.getElementById('turn-alert').className = "soft-alert animated fadeInDown";
        },
        500);
}

function endUserTurnAlert() {
    setTimeout(function() {
            document.getElementById('turn-alert').className = "soft-alert animated fadeOutDown";
            document.getElementById('turn-alert').style.display = 'none';
        },
        300);
}

/// HARD ALERTS
var winAlert = document.getElementById('win-alert'),
    loseAlert = document.getElementById('lose-alert'),
    drawAlert = document.getElementById('draw-alert');

function displayAlert(event) {
    setTimeout(function() {

            // hide turn alert
            document.getElementById('turn-alert').style.display = 'none';
            // display win/lose/draw alert
            event.style.display = 'block';
        },
        1100);
}

function dismissAlert(event) {
    event.style.display = 'none';
    // reload board
    setTimeout(function() {
            startGame();
        },
        500);
}
