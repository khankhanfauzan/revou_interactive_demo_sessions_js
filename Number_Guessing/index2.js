let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 5;
console.log("Secret Number (for debugging):", secretNumber);
const myInput = document.getElementById("guessInput");
const myButton = document.getElementById("submitGuess");
const myMessage = document.getElementById("message");
function checkGuess(secretNumber, playerGuess, attemptsLeft) {
    if (playerGuess === secretNumber) {
        return { result: "correct", attemptsLeft: attemptsLeft };
    } else if (playerGuess < secretNumber) {
        return { result: "too low", attemptsLeft: attemptsLeft - 1 };
    } else {
        return { result: "too high", attemptsLeft: attemptsLeft - 1 };
    }
}

myButton.addEventListener("click", function () {
    console.log("Button clicked");
    const playerGuess = parseInt(myInput.value, 10);
    const result = checkGuess(secretNumber, playerGuess, attemptsLeft);
    attemptsLeft = result.attemptsLeft;
    if (result.result === "correct") {
        myMessage.textContent = "Congratulations! You've guessed the number!";
        myButton.disabled = true;
    } else if (attemptsLeft > 0) {
        myMessage.textContent = `Your guess is ${result.result}. You have ${attemptsLeft} attempts left.`;
    } else {
        myMessage.textContent = `Game over! The correct number was ${secretNumber}.`;
        myButton.disabled = true;
    }
});