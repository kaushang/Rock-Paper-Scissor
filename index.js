function start() {
    let userInput = document.getElementById("input").value;
    let name = document.querySelector(".user-name");
    name.textContent = userInput + ":  " + userScore;
    let secondContainer = document.querySelector(".sec-cont");
    let thirdContainer = document.querySelector(".third-cont");
    let mainContainer = document.querySelector(".fpage");
    secondContainer.style.display = 'none';
    mainContainer.style.height = '100vh';
    thirdContainer.style.display = 'flex';
    document.querySelector("#rps-head").style.display = "none";
}
function check(e) {
    let userInput = document.getElementById("input").value;
    let required = document.querySelector(".required");
    if (userInput == "") {
        required.style.display = "block";
    }
    else {
        start();
    }
}
document.querySelector("input").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        check();
    }
});
// GENESIS
document.querySelector(".start-btn").addEventListener('click', check);

let blueCont = document.querySelector("#blue");
let redCont = document.querySelector("#red");
blueCont.style.display = "none";
redCont.style.display = "none";

// Declartion and initialization of variables
let rounds = 1;
let userScore = 0;
let computerScore = 0;
let computer = document.querySelector(".computer-score");
computer.textContent = "Computer:  " + computerScore;

// Function of play again button
let ref = document.querySelector(".play-again");
ref.addEventListener('click', () => {
    location.reload();
})

let temp = -1;
let count = 1;
function display(event) {
    // Random number generation
    let rand = randomNumber(1, 4);

    // Ensure that computer doesn't generate same choice more than twice
    if (rand === temp) {
        if (count === 2) {
            while (rand === temp) {
                rand = randomNumber(1, 4);
            }
            temp = rand;
            count = 1;
        }
        else {
            count++;
        }
    }
    else {
        temp = rand;
        count = 1;
    }

    // Gets ID of choice choosen
    let targetId = event.target.getAttribute("id");

    // Displaying user chosen image
    let toDisplay1 = document.getElementById("blue");
    if (targetId === "1") {
        toDisplay1.src = "./rock.png";
    } else if (targetId === "2") {
        toDisplay1.src = "./paper.png";
    } else {
        toDisplay1.src = "./scissor.png";
    }

    // Displaying randomly generated image
    let toDisplay2 = document.getElementById("red");
    if (rand === 1) {
        toDisplay2.src = "./rock.png";
    } else if (rand === 2) {
        toDisplay2.src = "./paper.png";
    } else {
        toDisplay2.src = "./scissor.png";
    }

    // Displaying both the images into the blocks
    blueCont.style.display = "block";
    redCont.style.display = "block";

    // Fetching required tags before assigning points
    let computer = document.querySelector(".computer-score");
    let name = document.querySelector(".user-name");
    let userInput = document.getElementById("input").value;

    // Assigning points on the basis of the rule of the game
    if ((targetId === "1" && rand === 2) || (targetId === "2" && rand === 3) || (targetId === "3" && rand === 1)) {
        computerScore++;
        computer.textContent = "Computer:  " + computerScore;
        rounds++;
    }
    else if ((targetId === "1" && rand === 3) || (targetId === "2" && rand === 1) || (targetId === "3" && rand === 2)) {
        userScore++;
        name.textContent = userInput + ":  " + userScore;
        rounds++;
    }

    if (rounds == 8) {
        // Removing the vs logo
        let vs = document.querySelector("#vs");
        vs.style.display = "none";

        // Displaying the decision
        document.querySelector(".mid").style.justifyContent = "center";
        let dec = document.querySelector(".decision");
        if (userScore > computerScore) {
            dec.textContent = userInput + " WON!";
        }
        else {
            dec.textContent = "Computer WON!";
        }
        dec.style.display = "block";
        // Removing Choose
        document.querySelector(".choose").style.display = "none";

        // Removing some things and Displaying some things
        let term = document.querySelector(".tbv");
        let gen = document.querySelector(".play-again");
        let roundUpdate = document.querySelector(".rounds");
        roundUpdate.style.display = "none";
        term.style.display = "none";
        gen.style.display = "block";
        return;
    }

    // Updation of the round number
    let roundUpdate = document.querySelector(".rounds");
    let roundUpdate2 = document.querySelector("#mround");
    roundUpdate.textContent = "Round " + rounds;
    roundUpdate2.textContent = "Round " + rounds;

    if (rounds === 7) {
        roundUpdate.style.backgroundColor = "rgb(150, 0, 0)";
        roundUpdate2.style.backgroundColor = "rgb(150, 0, 0)";
        roundUpdate.style.border = "rgb(150, 0, 0)";
        roundUpdate2.style.border = "rgb(150, 0, 0)";
        roundUpdate.style.color = "rgb(255, 255, 255)";
        roundUpdate2.style.color = "rgb(255, 255, 255)";
        roundUpdate.textContent = "Last Round!";
        roundUpdate2.textContent = "Last Round!";
    }
}
// Choice selection
let choice = document.querySelectorAll(".choice-items");
for (let i = 0; i < choice.length; i++) {
    let currChoice = choice[i];
    currChoice.addEventListener('click', display);
}
// Random number generator function
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
