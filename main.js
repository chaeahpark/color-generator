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

  searchColor(input) {
    this.hexaCode = input;
  }
}

const myPalette = new ColorGenerator();
const changeColors = setInterval(showRandomColors, 3000);
const bgColors = document.getElementsByClassName("bgColor");
const generateBtn = document.getElementById("generate-btn");
const stopBtn = document.getElementById("stop-btn");
const searchBar = document.getElementById("search-bar");
let userInput = "#";

function showRandomColors() {
  for (let i = 0; i < bgColors.length; i++) {
    let hexaCode = myPalette.randomHexaCode();
    bgColors[i].style.backgroundColor = hexaCode;
    bgColors[i].children[0].textContent = hexaCode;
  }
}

//As soon as a user opens the color generator.
document.addEventListener("DOMContentLoaded", function() {
  showRandomColors();
  changeColors;
});

// When a user clicked the GENERATE button, show random hexa code and its color.
generateBtn.addEventListener("click", function(e) {
  e.preventDefault();
  changeColors;
});

// When a user clicked the STOP button, stop generating random colors.
stopBtn.addEventListener("click", function(e) {
  e.preventDefault();
  clearInterval(changeColors);
});

//Taking a user input and show the result
searchBar.addEventListener("keydown", function(e) {
  e.preventDefault();
  clearInterval(changeColors);
  console.log(e);

  if (e.key === "Backspace") {
    userInput = userInput.concat("");
    searchBar.value = searchBar.value.substring(0, searchBar.value.length - 1);
  } else {
    userInput = userInput.concat(e.key);
    searchBar.value = userInput;
  }
  //searchBar.setAttribute("value", e.key);
  //console.log(e.key);
});
