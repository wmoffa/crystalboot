$(document).ready(function () {
  // initialize valuea
  var imageList = [
    "images.jpeg",
    "images-1.jpeg",
    "images-2.jpeg",
    "images-3.jpeg"
  ];
  var minNumber = 1;
  var maxNumber = 12;
  var wonCount = 0;
  var lossCount = 0;

  initVars();

  $(document).on("click", ".crystal-image", function () {
    if (stall == false) {
      var crystalValue = $(this).attr("data-crystalvalue");

      currentScore = currentScore + parseInt(crystalValue);
      if (currentScore > targetScore) {
        message = "You Lost!!";
        stall = true; // stop selecting crystals
        updateScreen();
        lossCount++;
      }

      if (currentScore == targetScore) {
        message = "You Won!!";
        stall = true; // stop collecting cystals
        wonCount++;
      }

      updateScreen();
    }
  });

  function randomNumberFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function updateScreen() {
    $("#gamesWon").text(wonCount);
    $("#gamesLost").text(lossCount);
    $("#currentScore").text(currentScore);
    $("#targetScore").text(targetScore);
    $("#message").text(message);
  }

  function initVars() {
    crystalValues = [0, 0, 0, 0];
    imageCrystal = [];
    currentScore = 0;
    targetScore = randomNumberFromRange(19, 40);
    message = "";
    stall = false;

    x = 0;

    // reset crystals
    $("#crystal0").empty();
    $("#crystal1").empty();
    $("#crystal2").empty();
    $("#crystal3").empty();

    // get values for crystal - loop will prevent duplicate crysta; values
    while (x < 4) {
      randomNumber = randomNumberFromRange(1, 12);
      if ($.inArray(randomNumber, crystalValues) == -1) {
        crystalValues[x] = randomNumber;
        x++;
      }
    }

    // add values to the crystals
    for (var i = 0; i < 4; i++) {
      imageCrystal = $("<img>");

      imageCrystal.addClass("crystal-image");
      imageCrystal.addClass("card-body");

      imageCrystal.attr("src", "assets/images/" + imageList[i]);
      imageCrystal.attr("height", "150px");
      imageCrystal.attr("width", "200px");

      imageCrystal.attr("data-crystalvalue", crystalValues[i]);
      divName = "#crystal" + i;
      $(divName).append(imageCrystal);
    }

    updateScreen();
  }

  $("#reset-button").on("click", function () {
    initVars();
  });
}); //ready