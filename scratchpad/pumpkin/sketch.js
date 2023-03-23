var resize;
var pumpkin;
var pumpkinColor=[];
var xPosition, yPosition, marginXY;

var pumpkinWidth;
var pumpkinHeight;
var pumpkinWidthInit;
var pumpkinHeightInit;
var ctrlARadius;
var ctrlBRadius;
var ctrlAngleA;
var ctrlAngleB;
var tempColor;
var divs;
var sinParam = 0;
var sinStep = 0.1

function setup() {
  createCanvas(400, 500);
	
  xPosition=20;
  yPosition=20;
  marginXY=101;
  xPosition += (marginXY * 0.5);
  yPosition += (marginXY * 0.5);
  ///frameRate(4);
  resize=0.9125;
  rectMode(CENTER);
  background(65, 40, 29);
  pumpkinColor = [color("#FF7518"),color("#FB7D07"), color("#C65102"), color("#E26238"), color("#ff9300"), color("#FF4500")];
	divs = int(random(4, 9));
	
	pumpkinWidth = random(15, 30) * resize;
	pumpkinWidthInit = pumpkinWidth;
  pumpkinHeight = pumpkinWidth * 3.25 * resize;
	pumpkinHeightInit = pumpkinHeight;
  ctrlARadius = random(15, 45) * resize;
  ctrlBRadius = random(25, 60) * resize;
  ctrlAngleA = radians(random(-6, 6));
  ctrlAngleB = radians(random(-6, 6));
	tempColor = int(random(pumpkinColor.length));

  textFont('Georgia');
}

function draw() {
  // drawPumpkin(xPosition + marginXY, yPosition + marginXY);
  // calculateNextPlacement();
	background(65, 40, 29);
  var smallText = 12;
  fill("#C65102");
  textSize(smallText);
  text('the 15104 staff wishes you...', smallText, smallText*2);

  var bigText = 32;
  var mainText = 'A HAPPY HALLOWEEN';
  var letterScale = 10;
  textSize(bigText);

  // noLoop();
  var biggestLetterH = ((1/2)*((1/2)*0 - (mainText.length/4))*((1/2)*0 - (mainText.length/4)));
  push();
  translate(0, -250);
  rectMode(CORNER);
  textAlign(LEFT, TOP);

  for (var i = 0; i < mainText.length; i++){
    letterScale = (1/2)*((1/2)*i - (mainText.length/4))*((1/2)*i - (mainText.length/4)) + 10;
    print(letterScale);

    push();
    translate(smallText + 0.92*(i * width / mainText.length), bigText*8 + smallText);
    //translate(0, -(biggestLetterH-letterScale*bigText));
    scale(1, letterScale);
    //translate(0, bigText * letterScale);
    //rect(0, 0, width / mainText.length, biggestLetterH);
    text(mainText[i], 0, 0);
    pop();
  }
  rectMode(CENTER);
  pop();

  // push();
  // translate(width/2, height/2);
  // scale(1, 14);
  // text(mainText[0], 0, 0);
  // pop();



	pumpkinHeight = pumpkinHeightInit/3 * sin(sinParam) + pumpkinHeightInit/1.2;
	// pumpkinWidth = 1 * sin(sinParam) + pumpkinWidthInit/1.2;
	sinParam += sinStep;
	
	push();
	translate(0, height/2);
	push();
	translate(0, -pumpkinHeight);
	drawPumpkin(width/2 - pumpkinWidth/2, height/2 + pumpkinHeight, pumpkinWidth, pumpkinHeight, ctrlARadius, ctrlBRadius, ctrlAngleA, ctrlAngleB, tempColor);
	// line(0, height/2 + pumpkinHeight/2, width, height/2 + pumpkinHeight/2)
	// line(0, height/2, width, height/2)
	pop();
	pop();
}

function calculateNextPlacement() {
  var spacingX = marginXY * resize;
  var spacingY = marginXY * resize;
  xPosition = xPosition + spacingX;
  if (xPosition + (spacingX * 1.5) + marginXY >= width) {
    xPosition = 20 + (marginXY * 0.5);
    yPosition = yPosition + spacingY;
    if (yPosition + spacingY + marginXY > height) {
      xPosition=20;
      yPosition=20;
      xPosition+=(marginXY * 0.5);
      yPosition+=(marginXY * 0.5);
 		background(64,40,30);
    }
  }
}

function drawPumpkin(x, y, pumpkinWidth, pumpkinHeight, ctrlARadius, ctrlBRadius, ctrlAngleA, ctrlAngleB, tempcolor){
	push();
	
  stroke(255,36);
  strokeWeight(3.5);
  fill(pumpkinColor[tempcolor]);
  translate(x, y);
	scale(3);

  // multiply by -0.5 to move to left / move up
  // multiply by 0.5 to scale the right / down accordingly
  var adjustLA = -0.5;
  var adjustRB = 0.5;
  var xALeft = pumpkinWidth * adjustLA;
  var yALeft = pumpkinHeight * adjustLA;

  var xBLeft = pumpkinWidth * adjustLA;
  var yBLeft = pumpkinHeight * adjustRB;

  var xARight = pumpkinWidth * adjustRB;
  var yARight = pumpkinHeight * adjustLA;

  var xBRight = pumpkinWidth * adjustRB;
  var yBRight = pumpkinHeight * adjustRB;

  var ctrlXALeft = xALeft + cos(ctrlAngleA-PI) * ctrlARadius;
  var ctrlYALeft = yALeft + sin(ctrlAngleA-PI) * ctrlARadius;

  var ctrlXBLeft = xBLeft + cos(-ctrlAngleB-PI) * ctrlBRadius;
  var ctrlYBLeft = yBLeft + sin(-ctrlAngleB-PI) * ctrlBRadius;

  var ctrlXARight = xARight + cos(-ctrlAngleA) * ctrlARadius;
  var ctrlYARight = yARight + sin(-ctrlAngleA) * ctrlARadius;

  var ctrlXBRight = xBRight + cos(ctrlAngleB) * ctrlBRadius;
  var ctrlYBRight = yBRight + sin(ctrlAngleB) * ctrlBRadius;

  // put things on a level surface
  translate(0, -pumpkinHeight * 0.5);
	
  beginShape();
  // start from left top
  vertex(xALeft, yALeft);
  bezierVertex( ctrlXALeft, ctrlYALeft, ctrlXBLeft, ctrlYBLeft, xBLeft, yBLeft);
  // end on left bottom
  // and back around...
  // pick up from right bottom
  vertex( xBRight, yBRight);
  bezierVertex( ctrlXBRight, ctrlYBRight, ctrlXARight, ctrlYARight, xARight, yARight);
  // end on right top
  endShape(CLOSE);

  // draw interior contours
  noFill();


	// lerps from right to left,
	// adding vertical divisions evenly
	// as it goes.
  for (var i = 1; i < divs; i++) {
    var pct = float(i)/divs;
    var topX = lerp(xARight, xALeft, pct);
    var botX = lerp(xBRight, xBLeft, pct);
    var ctlX1 = lerp(ctrlXARight, ctrlXALeft, pct);
    var ctlY1 = lerp(ctrlYARight, ctrlYALeft, pct);
    var ctlX2 = lerp(ctrlXBRight, ctrlXBLeft, pct);
    var ctlY2 = lerp(ctrlYBRight, ctrlYBLeft, pct);
		  stroke(20, 8);
 		  strokeWeight(5);
    bezier(topX, yALeft, ctlX1, ctlY1, ctlX2, ctlY2, botX, yBLeft);
		  stroke(0, 25);
  	  strokeWeight(1);
	  bezier(topX, yALeft, ctlX1, ctlY1, ctlX2, ctlY2, botX, yBLeft);
  }

	// run the stem drawing routine...
  stem(0, -pumpkinHeight * 0.5);
  pop();
	
}

// these values are just "what worked well"
// at the time.
function stem(rootX, rootY) {
  noStroke();
	fill("#C58055");
	stroke(0,50);
  var stemLength = 11;
  var stemWide = 12*resize;
  var stemTall = stemWide * 0.4;
  push();
  translate(rootX, rootY); 
  for (var i=0; i<stemLength; i++) {
    var stemDir = 0.6;
    stemDir = stemDir * 180;
    stemDir = stemDir + 180;
    stemDir = radians(stemDir);
    ellipse(0, 0, stemWide, stemTall);
    rotate(stemDir);
    translate(0.65, 0);
    rotate(-stemDir);
    stemWide = stemWide * 0.985;
  }
  pop();
}