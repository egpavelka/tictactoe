This is the second-to-last project in FreeCodeCamp's Front End Development curriculum.

Project info: https://www.freecodecamp.com/challenges/build-a-tic-tac-toe-game

Completed project on codepen.io: http://codepen.io/elwyn/pen/JKRJNJ

Up and running: http://egpavelka.com/tictactoe

____________________________________________

# DESCRIPTION OF PROJECT FROM FCC

## Build a Tic Tac Toe Game

### Objective: Build a CodePen.io app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/KzXQgy/.

- Rule #1: Don't look at the example project's code. Figure it out for yourself.

- Rule #2: Fulfill the below user stories. Use whichever libraries or APIs you need. Give it your own personal style.

- User Story: I can play a game of Tic Tac Toe with the computer.

- User Story: My game will reset as soon as it's over so I can play again.

- User Story: I can choose whether I want to play as X or O.


## CHANGELOG
____________________________________________
## [Release 1.2] 2016.10.02
### BUG FIX
- Added userTurn boolean to prevent user double play while computerAction() is in timeout.

### IN PROCESS
- Added counts for game stats--user will be able to see their percentage of draws/losses/wins in the game over alerts.

## [Release 1.1] 2016.09.13
### COMPLETED
- Added a timeout to computerAction() so that it doesn't jump straight back to user's turn.
- Added a timeout before alert is displayed upon lose/win/draw so that user can see what happened on the board.
- Added a notification that it's the user's turn.
- Added animations to marking action and notifications.

## [Release 1.0] 2016.09.12
### COMPLETED
- Game works.  I think I successfully made it unbeatable.

### IN PROCESS
- Add a timeout to computerAction() so that it doesn't jump straight back to user's turn.
- Add a timeout before alert is displayed upon lose/win/draw so that user can see what happened.
- Add a notification that it's the user's turn.
- Add animations to marking action and notifications.
- Add highlight to winning combination.

## [Unreleased 0.1] 2016.09.11
### COMPLETED
- Base design is done.
- Game initialization process works, user can mark squares, wins and losses and draws are recognized and the user is notified about them and able to restart the game.

### IN PROCESS
- Umm, the entire computer turn logic is wild; first it must be able to mark a space....
- Add a notification that it's the user's turn.
- Add animations to marking action and notifications.
- Add highlight to winning combination.
