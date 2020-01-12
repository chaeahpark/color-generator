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

function showRandomColors() {
  for (let i = 0; i < bgColors.length; i++) {
    let randomHexaCode = myPalette.randomHexaCode();
    bgColors[i].style.backgroundColor = randomHexaCode;
    bgColors[i].children[0].children[0].textContent = randomHexaCode;
  }
}

//As soon as a user opens the color generator.
const changeColors = setInterval(showRandomColors, 3000);

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

searchBar.addEventListener("keyup", function(e) {
  e.preventDefault();
  clearInterval(changeColors);

  let colorCodeInput = document.getElementById("search-bar").value;
  bgColors[0].style.backgroundColor = colorCodeInput;
  bgColors[i].children[0].children[0].textContent = colorCodeInput;

  for (let i = 1; i < bgColors.length; i++) {
    bgColors[i].style.backgroundColor = "white";
    bgColors[i].children[0].children[0].textContent = "";
  }
});
