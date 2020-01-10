class ColorGenerator {
  constructor() {
    this.HexaCode = [];
    this.bgColor;
    this.displayColor;
  }

  // When the user hit the generate btn
  getHexaCode() {
    return (
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8)
    );
  }

  changeColors() {
    setInterval(this.getHexaCode, 3000);
  }

  stopDisplay() {
    clearInterval(this.changeColor);
  }

  searchColor(input) {
    this.HexaCode = input;
  }
}
