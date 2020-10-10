const game = () => {
  let pScore = 0;
  let cScore = 0;
  let gameOver = false;
  const winningScore = 10;
  let pResult = [];
  let cResult = [];
  const winner = document.querySelector('.winner');
  const playerHand = document.querySelector('.player-hand')
  const computerHand = document.querySelector('.computer-hand');
  const final = document.querySelector('.final');
  const playAgainBtn = document.querySelector('.again');
  
  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector('.intro button'); 
    const introScreen = document.querySelector('.intro');
    const match = document.querySelector('.match');

    playBtn.addEventListener('click', () => {
        introScreen.classList.add("fadeOut");
        match.classList.add("fadeIn");
        playAgainBtn.classList.add("fadeOut");
    });
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll('.options button');
    const hands = document.querySelectorAll('.hands img');
    
    for (const hand of hands) {
      hand.addEventListener('animationend', () => {
        hand.style.animation = '';
      });
    }
    //Computer Options
    const computerOptions = ['rock', 'paper', 'scissors'];
   
    for (const option of options) {
      option.addEventListener('click', () => {
        //Player Choice
        const playerChoice = option.textContent;
        //Computer choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        //Disable button while hands are shaking
        const disableBtn = (isDisable) => {
          for(let option of options) {
            option.disabled = isDisable;
          }
        };
        disableBtn(true);
        
        setTimeout(() => {
          //Here is where we call commpareHands function
          compareHands(playerChoice, computerChoice);
          //Update Images
          playerHand.src = `${playerChoice}.png`;
          computerHand.src = `${computerChoice}.png`;
          disableBtn(false);
        }, 1000);

        // use rock image for all handshake animations
        for (let hand of hands) {
          hand.src = 'rock.png';
        }
        //Animation
        playerHand.style.animation = "shakePlayer 1s ease";
        computerHand.style.animation = "shakeComputer 1s ease";
      });
    };
  };

  //Update Score
  const updateScore = () => {
    const playerScore = document.querySelector('.player-score p');
    const computerScore = document.querySelector('.computer-score p');
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  //Update final result after 10 wins for player or computer
  const finalScore = () => {
    if(pScore === winningScore) {
      gameOver = true;
      final.style.opacity = "0";
      playAgainBtn.classList.add("fadeIn");
    }
    if(cScore === winningScore) {
      gameOver = true;
      final.style.opacity = "0";
      playAgainBtn.classList.add("fadeIn");
    }
  };

  //Update final result after 3 times wins in a row
  const finalResult = () => {
    const pThreeLastResults = pResult.slice(-3);
    const cThreeLastResults = cResult.slice(-3);

    console.log('player 3 last result: ' + pThreeLastResults);
    console.log('computer 3 last result: ' + cThreeLastResults);

    const isPlayerWin = isThreeWinInARow(pThreeLastResults);
    const isComputerWin = isThreeWinInARow(cThreeLastResults);

    if(isPlayerWin) {
      console.log('Player wins 3 times in a row');
      gameOver = true;
      final.style.opacity = "0"; 
      playAgainBtn.classList.add("fadeIn");
    }
    if(isComputerWin) {
      console.log('Computer wins 3 times in a row');
      gameOver = true;
      final.style.opacity = "0";
      playAgainBtn.classList.add("fadeIn");
    }
  };
  //reset the game when clicking Play again button
  playAgainBtn.addEventListener('click', () => {
    reset();
  });
  //Reset the game
  const reset = () => {
    gameOver = false;
    final.style.opacity = '1';
    winner.textContent = "Choose an option";
    computerHand.src = 'rock.png';
    playerHand.src = 'rock.png';
    pScore = 0;
    cScore = 0;
    pResult = [];
    cResult = [];
    updateScore();
  };

  //Compare hands
  const compareHands = (playerChoice, computerChoice) => {
    if(!gameOver) {
      //Check for a tie
      if(playerChoice === computerChoice) {
        winner.textContent = 'It is a tie';
        pResult.push('t');
        cResult.push('t');
        console.log('player: ' + pResult);
        console.log('computer: ' + cResult);
        finalScore();
        finalResult();
        return;
      }
      //Check for Rock
      if(playerChoice === 'rock') {
        if(computerChoice === 'scissors') {
          winner.textContent = 'Player Wins';
          pScore++;
          updateScore();
          pResult.push('w');
          cResult.push('l');
          console.log('player: ' + pResult);
          console.log('computer: ' + cResult);
        } else {
          winner.textContent = 'Computer Wins';
          cScore++;
          updateScore();
          pResult.push('l');
          cResult.push('w');
          console.log('player: ' + pResult);
          console.log('computer: ' + cResult);
        }
        finalScore();
        finalResult();
        return;
      };
      //Check for Paper
      if(playerChoice === 'paper') {
        if(computerChoice === 'scissors') {
          winner.textContent = 'Computer Wins';
          cScore++;
          updateScore();
          pResult.push('l');
          cResult.push('w');
          console.log('player: ' + pResult);
          console.log('computer: ' + cResult);
        } else {
          winner.textContent = 'Player Wins';
          pScore++;
          updateScore();
          pResult.push('w');
          cResult.push('l');
          console.log('player: ' + pResult);
          console.log('computer: ' + cResult);
        }
        finalScore();
        finalResult();
        return;
      };
      //Check for Scissors
      if(playerChoice === 'scissors') {
        if(computerChoice === 'rock') {
          winner.textContent = 'Computer Wins';
          cScore++;
          updateScore();
          pResult.push('l');
          cResult.push('w');
          console.log('player: ' + pResult);
          console.log('computer: ' + cResult);
        } else {
          winner.textContent = 'Player Wins';
          pScore++;
          updateScore();
          pResult.push('w');
          cResult.push('l');
          console.log('player: ' + pResult);
          console.log('computer: ' + cResult);
        }
        finalScore();
        finalResult();
        return;
      };   
    };
  };
  //Is call all the inner function
  startGame();
  playMatch();
};

//Check 3 last items in an array if they are wins in a row
const isThreeWinInARow = (resultArr)  => {
  return resultArr.length === 3 && resultArr.every(item => item === 'w');
};

//start the game function
game();
