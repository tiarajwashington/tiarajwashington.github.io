function advicePage() {
  if (localStorage.getItem("tbRecords") ===
    null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {

    var tbRecords = JSON.parse(localStorage.getItem(
      "tbRecords"));
    tbRecords.sort(compareDates);
    var i = tbRecords.length - 1;
    var BMI = tbRecords[i].BMI;
    var BMILevel = tbRecords[i].BMI;

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

  if ((BMILevel >= 0.01) && (BMILevel <= 18.5)) {
    ctx.fillText(
      "Your target BMI range is: 18.5-25.0",
      25, 350);
    levelAwrite(ctx, BMI);
    levelAMeter(ctx, BMI);
  } else if ((BMILevel >= 18.51) && (BMILevel <= 25.0)) {
    ctx.fillText(
      "You are within your target range",
      25, 350);
    levelBwrite(ctx, BMI);
    levelBMeter(ctx, BMI);
  } else if (BMILevel >= 25.01) {
    ctx.fillText(
      "Your target BMI range is: 18.5-25.0",
      25, 350);
    levelCwrite(ctx, BMI);
    levelCMeter(ctx, BMI);
  }
}

//For deciding what to write for given values of BMI level A
function levelAwrite(ctx, BMI) {
  if ((BMI >= 0.01) && (BMI <= 18.5)) {
    writeAdvice(ctx, "yellow");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelBwrite(ctx, BMI) {
  if ((BMI >= 18.51) && (BMI <= 25.0)) {
    writeAdvice(ctx, "green");
  } else {
    writeAdvice(ctx, "red");
  }
}

function levelCwrite(ctx, BMI) {
  if (BMI >= 25.01) {
    writeAdvice(ctx, "red");
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
  if (BMI <= 35) {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 35, BMI)
      .Set("chart.colors.ranges", [
        [25.0, 35, "red"],
        [18.5, 25.0, "#0f0"],
        [0.01, 18.5, "yellow"]
      ]);
  } else {
    var cg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, BMI, BMI)
      .Set("chart.colors.ranges", [
        [25.0, 35, "red"],
        [18.5, 25.0, "#0f0"],
        [0.01, 18.5, "yellow"],
        [35.01, BMI, "red"]
      ]);
  }
  drawMeter(cg);
}

function levelBMeter(ctx, BMI) {
  if (BMI <= 35) {
    var bcg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 35, BMI)
      .Set("chart.colors.ranges", [
        [30.01, 35, "red"],
        [25.01, 30, "red"],
        [18.5, 25.0, "#0f0"],
        [0.01, 18.5, "yellow"]
      ]);
  } else {
    var bcg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, BMI, BMI)
      .Set("chart.colors.ranges", [
        [30.01, 35, "red"],
        [25.01, 30, "red"],
        [18.5, 25.0, "#0f0"],
        [0.01, 18.5, "yellow"],
        [35, BMI, "red"]
      ]);
  }
  drawMeter(bcg);
}

function levelCMeter(ctx, BMI) {
  if (BMI <= 45) {
    var ccg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, 45, BMI)
      .Set("chart.colors.ranges", [
        [40.01, 45, "red"],
        [30.01, 40, "red"],
        [25.0, 30, "red"],
        [18.5, 25.0, "#0f0"]
      ]);
  } else {
    var ccg = new RGraph.CornerGauge(
        "AdviceCanvas", 0, BMI, BMI)
      .Set("chart.colors.ranges", [
        [40.01, 45, "red"],
        [30.01, 40, "red"],
        [25.0, 30, "red"],
        [18.5, 25.0, "#0f0"],
        [45.01, BMI, "red"]
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
