## JavaScript assignment 
An application that simulates a [Rock paper scissors](https://en.wikipedia.org/wiki/Rock_paper_scissors) game.

## Functional requirements

- Click the 'Let's play' button to start the game
- The user will click one of three options 'rock', 'paper' or 'scissors'
- Computer choice will be random. 
- The app will compare User's choice and Computer's choice

  1. game ends after 10 wins for a player or computer 
     
  1. game ends if a player or computer wins 3 times in a row
      
  1. user interface enhancements
      - buttons are [disabled](https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp) while hands are shaking
      - use rock image for all handshake animations
  1. add a game over screen
      - display winner info after the whole game ends
      - hide hand images and option buttons
  1. add a "Play again" button to game over screen
      - button click starts the game again
      - resets all win history
