const bgColors = document.getElementsByClassName("bgColor");
const generateBtn = document.getElementById("generate-btn");
const stopBtn = document.getElementById("stop-btn");
const copyBtn = document.querySelectorAll("copy-btn");
const searchBar = document.getElementById("search-bar");
const firstColorBox = document.getElementById("start");
const colorDisplay = document.getElementById("colors");

//Generate hexa code randomly
function randomHexaCode() {
  let hexaCode;
  return (hexaCode =
    "#" +
    Math.random()
      .toString(16)
      .slice(2, 8));
}

// Display random hexa code colors
function showRandomColors() {
  bgColors.forEach(bgColor => {
    let hexaCode = randomHexaCode();
    bgColor.style.backgroundColor = hexaCode;
    bgColor.children[0].children[0].textContent = hexaCode;
  });
  /*
  for (let bgColor of bgColors) {
    let hexaCode = randomHexaCode();
    bgColor.style.backgroundColor = hexaCode;
    bgColor.children[0].children[0].textContent = hexaCode;
  }
  */
}
//As soon as a user opens the color generator.
const changeColors = setInterval(showRandomColors, 1000);

// Change the color display when the user uses the search bar.
function searchModeDisplay() {
  let colorCodeInput = document.getElementById("search-bar").value;

  firstColorBox.style.backgroundColor = colorCodeInput;
  firstColorBox.style.borderBottomLeftRadius = "0.5rem";
  firstColorBox.style.borderBottomRightRadius = "0.5rem";
  firstColorBox.children[0].children[0].textContent = colorCodeInput;

  for (let i = 1; i < bgColors.length; i++) {
    bgColors[i].style.backgroundColor = "white";
    bgColors[i].children[0].children[0].textContent = "";
    //modify the following part.
    bgColors[i].children[0].children[1].style.backgroundColor = "white";
    bgColors[i].children[0].children[1].style.color = "white";
  }
}

//Recover color boxes when the user clicks the generate button after using the search bar.
function recoverColorBoxes() {
  bgColors[0].style.borderBottomLeftRadius = "0";
  bgColors[0].style.borderBottomRightRadius = "0";

  bgColors.forEach(bgColor => {
    const btn = bgColor.children[0].children[1];
    const hexaCode = bgColor.children[0].children[0];
    hexaCode.style.color = "white";
    btn.style.backgroundColor = "#f0f0f0";
    btn.style.color = "black";
  });
  /*
  for (let bgColor of bgColors) {
    const btn = bgColor.children[0].children[1];
    const hexaCode = bgColor.children[0].children[0];
    hexaCode.style.color = "white";
    btn.style.backgroundColor = "#f0f0f0";
    btn.style.color = "black";
  }
  */
}

// copy hexa code.
function copyColorCode() {
  const copyBtns = document.querySelectorAll(".copy-btn");

  for (let copyBtn of copyBtns) {
    copyBtn.addEventListener("click", function(e) {
      let copiedColorCode = copyBtn.previousElementSibling;
      let text = copiedColorCode.textContent;
      console.log(text);
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.style = "position: absolute; left: -100px; top: -100px";
      input.value = text;
      input.focus();
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    });
  }
}

// When the document is first loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log(bgColors);
  showRandomColors();
  changeColors;
  //Copy button is enabled
  copyColorCode();
});

// When a user clicked the GENERATE button, show random hexa code and its color.
generateBtn.addEventListener("click", function(e) {
  recoverColorBoxes();
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
});

colorDisplay.addEventListener("mouseover", function() {
  clearInterval(changeColors);
});

colorDisplay.addEventListener("mouseleave", function() {
  showRandomColors();

  changeColors;
});
