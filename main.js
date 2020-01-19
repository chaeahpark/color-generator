//https://dev.to/jess/how-do-i-use-foreach-on-dom-elements-3m9h
const bgColors = document.querySelectorAll(".bgColor");
const generateBtn = document.getElementById("generate-btn");
const stopBtn = document.getElementById("stop-btn");
const copyBtn = document.querySelectorAll("copy-btn");
const searchBar = document.getElementById("search-bar");
const firstColorBox = document.getElementById("start");
const colorDisplay = document.getElementById("colors");
//variables for the timer
let isTimerRunning = false;
let timerID = 0;
//Searchbar focus event indicator
let searchBarFocused;

//Generate hexa code randomly
function randomHexaCode() {
  let hexaCode;
  return (hexaCode =
    "#" +
    Math.random()
      .toString(16)
      .slice(2, 8)
      .toUpperCase());
}

// Display random hexa code colors
function showRandomColors() {
  const randomColors = [...bgColors].forEach(bgColor => {
    let hexaCode = randomHexaCode();
    bgColor.style.backgroundColor = hexaCode;
    bgColor.children[0].children[0].textContent = hexaCode;
  });
  console.log("random");
  return randomColors;
}

//Set the setInterval to change colors.
function setColorTimer() {
  if (!isTimerRunning) {
    timerID = setInterval(showRandomColors, 1000);
    isTimerRunning = true;
    console.log("timer is working: timer id : " + timerID);
  }
}

//Remove the setInterval to stop generating colors.
function clearColorTimer() {
  if (isTimerRunning) {
    clearInterval(timerID);
    isTimerRunning = false;
    console.log("timer stoped : timer id : " + timerID);
  }
}

// Change the color display when the user uses the search bar.
function searchModeDisplay() {
  console.log(bgColors);

  [...bgColors].forEach(bgColor => {
    bgColor.style.backgroundColor = "white";
    bgColor.children[0].children[0].textContent = "";
    //modify the following part.
    bgColor.children[0].children[1].style.backgroundColor = "white";
    bgColor.children[0].children[1].style.color = "white";
  });
}

// Show the HEX color when a user searches color through the searchbar
function showSearchingColor() {
  let colorCodeInput = document.getElementById("search-bar").value;

  if (colorCodeInput.search(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/gi) >= 0) {
    firstColorBox.style.backgroundColor = colorCodeInput;
    firstColorBox.style.borderBottomLeftRadius = "0.5rem";
    firstColorBox.style.borderBottomRightRadius = "0.5rem";
    firstColorBox.children[0].children[0].textContent = colorCodeInput;
    firstColorBox.children[0].children[1].style.backgroundColor = "#f2f0f0";
    firstColorBox.children[0].children[1].style.color = "black";
  }
}

function verifyHexaCodeInput(input) {
  let userInputCode = input.target.value;
  const alertBox = document.createElement("div");
  alertBox.id = "alertBox";
  alertBox.style.backgroundColor = "#e34a20";
  alertBox.style.color = "white";
  alertBox.style.padding = "0.8rem 2rem";
  alertBox.style.height = "3rem";
  alertBox.style.fontSize = "1.2 rem";
  alertBox.style.borderRadius = "0.3rem";
  const alertText = document.createTextNode("Please type in valid inputs.");
  alertBox.appendChild(alertText);

  if (userInputCode.search(/[G-Zg-z]/i) >= 0) {
    colorDisplay.insertBefore(alertBox, firstColorBox);
    alertBoxCreated = document.getElementById("alertBox");

    setTimeout(function() {
      colorDisplay.removeChild(alertBoxCreated);
    }, 2000);
  }
}

// copy hexa code.
function copyColorCode() {
  const copyBtns = document.querySelectorAll(".copy-btn");

  [...copyBtns].forEach(copyBtn => {
    copyBtn.addEventListener("click", function() {
      let copiedColorCode = copyBtn.previousElementSibling;
      let text = copiedColorCode.textContent;
      const input = document.createElement("input");

      document.body.appendChild(input);
      input.style = "position: absolute; left: -100px; top: -100px";
      input.value = text;
      input.focus();
      input.select();
      document.execCommand("copy");

      document.body.removeChild(input);
    });
  });
}

//Recover color boxes when the user clicks the generate button after using the search bar.
function recoverColorBoxes() {
  bgColors[0].style.borderBottomLeftRadius = "0";
  bgColors[0].style.borderBottomRightRadius = "0";

  [...bgColors].forEach(bgColor => {
    const btn = bgColor.children[0].children[1];
    const hexaCode = bgColor.children[0].children[0];
    hexaCode.style.color = "white";
    btn.style.backgroundColor = "#f0f0f0";
    btn.style.color = "black";
  });
}

// When the document is first loaded
document.addEventListener("DOMContentLoaded", function() {
  searchBarFocused = false;
  showRandomColors();
  setColorTimer();
  //Copy button is enabled
  copyColorCode();
});

// When a user clicked the GENERATE button, show random hexa code and its color.
generateBtn.addEventListener("click", function(e) {
  e.preventDefault();

  recoverColorBoxes();
  showRandomColors();
  setColorTimer();
});

// When a user clicked the STOP button, stop generating random colors.
stopBtn.addEventListener("click", function(e) {
  e.preventDefault();
  clearColorTimer();
});

// When the search bar get focused, stop generating random colors.
searchBar.addEventListener("focus", function() {
  searchBarFocused = true;
  clearColorTimer();
  searchModeDisplay();
  console.log(searchBarFocused);
});

searchBar.addEventListener("focusout", function() {
  searchBarFocused = false;
  recoverColorBoxes();
  showRandomColors();
  setColorTimer();
  console.log(searchBarFocused);
});

//When a user type in the hexa code color, change the output display.
searchBar.addEventListener("keyup", function(e) {
  e.preventDefault();
  searchBarFocused = true;
  showSearchingColor();
  verifyHexaCodeInput(e);
});

colorDisplay.addEventListener("mouseover", function() {
  console.log(searchBarFocused);

  clearColorTimer();
});

colorDisplay.addEventListener("mouseleave", function() {
  console.log(searchBarFocused);

  if (searchBarFocused === true) {
    searchModeDisplay();
  }
  if (searchBarFocused === false) {
    setColorTimer();
  }
});
