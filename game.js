// game.js
const targetWord = "TIKBALANG";
let guessed = Array(targetWord.length).fill("_");

const wordDisplay = document.getElementById("wordDisplay");
const keyboard = document.getElementById("keyboard");
const videoContainer = document.getElementById("videoContainer");
const bgSound = document.getElementById("bgSound");

function updateDisplay() {
  wordDisplay.textContent = guessed.join(" ");
}

function handleKey(letter, button) {
  // highlight
  document.querySelectorAll('.key').forEach(btn => btn.classList.remove('clicked'));
  button.classList.add('clicked');

  // reveal letters
  let found = false;
  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i] === letter && guessed[i] === "_") {
      guessed[i] = letter;
      found = true;
    }
  }

  updateDisplay();
  if (!found) alert("Please put the correct answer");
}

// build keyboard
const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
allLetters.split("").forEach(letter => {
  const btn = document.createElement("button");
  btn.textContent = letter;
  btn.className = "key";
  btn.onclick = () => handleKey(letter, btn);
  keyboard.appendChild(btn);
});

// enter button
const enterBtn = document.createElement("button");
enterBtn.textContent = "ENTER";
enterBtn.className = "key enter";
enterBtn.onclick = () => {
  if (!guessed.includes("_")) {
    document.querySelector(".wrapper-center").style.display = "none";
    videoContainer.style.display = "flex";
    bgSound.muted = false;
    bgSound.volume = 1;
    bgSound.play().catch(() => {
      alert("Audio blocked. Tap screen to allow playback.");
    });
  } else {
    alert("Please complete the word before pressing ENTER.");
  }
};
keyboard.appendChild(enterBtn);

updateDisplay();
