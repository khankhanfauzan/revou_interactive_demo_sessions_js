const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getRandomNumber () {
    return Math.floor(Math.random() * 100) + 1;
}

let secretNumber;
let attempts;
let maxAttempts = 10;

function askQuestion(question) {
    return new Promise ((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function getPlayerGuess() {
    let guess;
    let isValid = false;

    while (!isValid) {
        const input = await askQuestion(`\nEnter Your Guess (1-100) [attempts ${attempts + 1}/${maxAttempts}]: `)
        guess = parseInt(input)

        if (isNaN(guess)) {
            console.log("That's not a number! Please enter a valid Number.");
        } else if (guess < 1 || guess > 100) {
            console.log ("Please enter a number between 1 and 100!");
        } else {
            isValid = true;
        }
    }

    return guess;
}

async function playGame() {
    secretNumber = getRandomNumber();
    attempts = 0;
    
    console.clear();
    console.log ("Welcome to the Number Guessing Game!");
    console.log ('='.repeat(50));
    console.log ("I'm thinking about a number between 1-100");
    console.log(`You have ${maxAttempts} attempts to guess it.`);
    console.log('='.repeat(50));
    
    let gameWon = false;

    while (attempts < maxAttempts && !gameWon) {
        const guess = await getPlayerGuess();
        attempts++

        if (guess === secretNumber) {
            console.log(`\n CORRECT! The secret number was ${secretNumber}!`);
            console.log(`You guessed it in ${attempts} attempts`);
            gameWon = true;
        } else if (guess < secretNumber) {
            console.log(`${guess} is too LOW`);
        } else {
            console.log (`${guess} is too HIGH`)
        }

        if(!gameWon && attempts < maxAttempts) {
            console.log(`Attempts remaining:${maxAttempts - attempts}`);
        }
    }
    
    if(!gameWon) {
        console.log(`\GAME OVER! You ran out of attempts.`);
        console.log(`The secret number was ${secretNumber}`);
    }
    
    const playAgain = await askQuestion ("\n Would you like to play again? (yes/no):");

    if (playAgain.toLowerCase() === 'yes' || playAgain.toLowerCase() === 'y') {
        await playGame ();
    } else {
        console.log("\nThank you for playing");
        rl.close();
    }
}

console.log("Starting Number Guessing Game...");
playGame().catch(error => {
    console.error("An error occurred:", error);
    rl.close();
})