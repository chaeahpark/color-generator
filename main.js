class ColorGenerator {
  constructor() {
    this.hexaCode;
  }

  // When the user hit the generate btn
  randomHexaCode() {
    return (
      (this.hexaCode =
        "#" +
        Math.random()
          .toString(16)
          .slice(2, 8)) + "9f"
    );
  }
}

const myPalette = new ColorGenerator();
const bgColors = document.getElementsByClassName("bgColor");
const generateBtn = document.getElementById("generate-btn");
const stopBtn = document.getElementById("stop-btn");
const searchBar = document.getElementById("search-bar");
let emptyBoxes = false;

function showRandomColors() {
  for (let i = 0; i < bgColors.length; i++) {
    let randomHexaCode = myPalette.randomHexaCode();
    bgColors[i].style.backgroundColor = randomHexaCode;
    bgColors[i].children[0].children[0].textContent = randomHexaCode;
  }
}

//As soon as a user opens the color generator.
const changeColors = setInterval(showRandomColors, 1000);

function recoverColorBoxes() {
  bgColors[0].style.borderBottomLeftRadius = "0";
  bgColors[0].style.borderBottomRightRadius = "0";

  for (let i = 0; i < bgColors.length; i++) {
    const btn = bgColors[i].children[0].children[1];
    const hexaCode = bgColors[i].children[0].children[0];
    hexaCode.style.color = "black";
    btn.style.backgroundColor = "#f0f0f0";
    btn.style.color = "black";
  }
}

function searchModeDisplay() {
  let colorCodeInput = document.getElementById("search-bar").value;

  bgColors[0].style.backgroundColor = colorCodeInput;
  bgColors[0].style.borderBottomLeftRadius = "0.5rem";
  bgColors[0].style.borderBottomRightRadius = "0.5rem";
  bgColors[0].children[0].children[0].textContent = colorCodeInput;

  for (let i = 1; i < bgColors.length; i++) {
    let btn = document.getElementsByClassName("btn");
    bgColors[i].style.backgroundColor = "white";
    bgColors[i].children[0].children[0].textContent = "";
    //modify the following part.
    bgColors[i].children[0].children[1].style.backgroundColor = "white";
    bgColors[i].children[0].children[1].style.color = "white";
  }
}

// When the document is first loaded
document.addEventListener("DOMContentLoaded", function() {
  showRandomColors();
  changeColors;
});

// When a user clicked the GENERATE button, show random hexa code and its color.
generateBtn.addEventListener("click", function(e) {
  /* What is the difference?
  When there is e.preventDefault()
  When there is no e.preventDefault() 
  */
  //e.preventDefault();
  recoverColorBoxes();
  //showRandomColors();
  /*
  if (emptyBoxes === true) {
    emptyBoxes === false;
    recoverColorBoxes();
    //showRandomColors();
  }
  */
  changeColors;
});

// When a user clicked the STOP button, stop generating random colors.
stopBtn.addEventListener("click", function(e) {
  e.preventDefault();
  clearInterval(changeColors);
});

// When the search bar get focused, stop generating random colors.
searchBar.addEventListener("focus", function(e) {
  e.preventDefault;
  clearInterval(changeColors);
});

//When a user type in the hexa code color, change the output display.
searchBar.addEventListener("keyup", function(e) {
  e.preventDefault();
  searchModeDisplay();
  emptyBoxes = true;
});
