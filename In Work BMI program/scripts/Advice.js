function advicePage() {
  if (localStorage.getItem("tbRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {

    var user = JSON.parse(localStorage.getItem(
      "user"));
    var BMILevel = user.BMIRange;

    var tbRecords = JSON.parse(localStorage.getItem(
      "tbRecords"));
    tbRecords.sort(compareDates);
    var i = tbRecords.length - 1;
    var BMI = tbRecords[i].BMI;

    var c = document.getElementById(
      "AdviceCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, 550, 550);
    ctx.font = "22px Arial";
    drawAdviceCanvas(ctx, BMILevel, BMI);

  }
}

function drawAdviceCanvas(ctx, BMILevel, BMI) {
  ctx.font = "22px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Your current BMI is " + BMI +
    ".", 25, 320);

  if (BMILevel == "StageA") {
    ctx.fillText(
      "Your target BMI range is: 18.5-25.0",
      25, 350);
    levelAwrite(ctx, BMI);
    levelAMeter(ctx, BMI);
  } else if (BMILevel == "StageB") {
    ctx.fillText(
      "Your target BMI range is: 18.5-25.0",
      25, 350);
    levelBwrite(ctx, BMI);
    levelBMeter(ctx, BMI);
  } else if (BMILevel == "StageC") {
    ctx.fillText(
      "Your target BMI range is: 18.5-25.0",
      25, 350);
    levelCwrite(ctx, BMI);
    levelCMeter(ctx, BMI);
  }
}

//For deciding what to write for given values of BMI level A
function levelAwrite(ctx, BMI) {
  if ((BMI >= 0.01) && (BMI <= 0.1)) {
    writeAdvice(ctx, "green");
  } else if ((BMI >= 0.1) && (BMI <= 0.5)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelBwrite(ctx, BMI) {
  if ((BMI >= 0.1) && (BMI <= 0.5)) {
    writeAdvice(ctx, "green");
  } else if ((BMI >= 0.5) && (BMI <= 2.0)) {
    writeAdvice(ctx, "yellow");
  } else if ((BMI >= 0.01) && (BMI <= 0.1)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelCwrite(ctx, BMI) {
  if ((BMI >= 0.35) && (BMI <= 2.0)) {
    writeAdvice(ctx, "green");
  } else if ((BMI >= 2) && (BMI <= 10)) {
    writeAdvice(ctx, "yellow");
  } else if ((BMI >= 0.1) && (BMI <= 0.35)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function writeAdvice(ctx, level) {
  var adviceLine1 = "";
  var adviceLine2 = "";

  if (level == "red") {
    adviceLine1 =
      "You are overweight. Please consult with your family";
    adviceLine2 = "physician urgently.";
  } else if (level == "yellow") {
    adviceLine1 =
      "You are Underweight. Contact family physician ";
    adviceLine2 = "and eat more.";
  } else if (level = "green") {
    adviceLine1 =
      "Your BMI is normal. re-check BMI in 3-6 months.";
  }
  ctx.fillText("Your BMI-level is " + level +
    ".", 25, 380);
  ctx.fillText(adviceLine1, 25, 410);
  ctx.fillText(adviceLine2, 25, 440);
}

function levelAMeter(ctx, BMI) {
  if (BMI <= 3) {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 3, BMI)
      .Set("chart.colors.ranges", [
        [0.5, 3, "red"],
        [0.1, 0.5, "yellow"],
        [0.01, 0.1, "#0f0"]
      ]);
  } else {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, BMI, BMI)
      .Set("chart.colors.ranges", [
        [0.5, 3, "red"],
        [0.1, 0.5, "yellow"],
        [0.01, 0.1, "#0f0"],
        [3.01, BMI, "red"]
      ]);
  }
  drawMeter(cg);
}

function levelBMeter(ctx, BMI) {
  if (BMI <= 3) {
    var bcg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 3, BMI)
      .Set("chart.colors.ranges", [
        [2.01, 3, "red"],
        [0.51, 2, "yellow"],
        [0.1, 0.5, "#0f0"],
        [0.01, 0.1, "yellow"]
      ]);
  } else {
    var bcg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, BMI, BMI)
      .Set("chart.colors.ranges", [
        [2.01, 3, "red"],
        [0.51, 2, "yellow"],
        [0.1, 0.5, "#0f0"],
        [0.01, 0.1, "yellow"],
        [3, BMI, "red"]
      ]);
  }
  drawMeter(bcg);
}

function levelCMeter(ctx, BMI) {
  if (BMI <= 15) {
    var ccg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 15, BMI)
      .Set("chart.colors.ranges", [
        [10.01, 15, "red"],
        [2.01, 10, "yellow"],
        [0.35, 2, "#0f0"],
        [0.1, .34, "yellow"]
      ]);
  } else {
    var ccg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, BMI, BMI)
      .Set("chart.colors.ranges", [
        [10.01, 15, "red"],
        [2.01, 10, "yellow"],
        [0.35, 2, "#0f0"],
        [0.1, 0.34, "yellow"],
        [15.01, BMI, "red"]
      ]);
  }
  drawMeter(ccg);
}

// Meter properties
function drawMeter(g) {
  g.Set("chart.value.text.units.post", "bmi")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "BMI LEVEL")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}