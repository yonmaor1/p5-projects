function setup() {
  createCanvas(200, 200);
  noLoop();
}

function draw() {
  pixelSide(0, 0, 6);

}

function pixelSide(x, y, s) {
    // total w: 24 h: 28
    push();
    translate(x, y);
    scale(s);
    noStroke();
    fill('black');
    // head
    rect(8, 0, 8, 1);
      // right
    rect(16-1, 1, 1, 1);
    rect(17-1, 2, 1, 1);
    rect(18-1, 3, 1, 2);
    rect(19-1, 5, 1, 6);
      // left
    rect(7, 1, 1, 1);
    rect(6, 2, 1, 1);
    rect(5, 3, 1, 2);
    rect(4, 5, 1, 6)
      // eyes
    rect(7, 7, 2, 2);
    rect(15-1, 7, 2, 2);
      // beak
    fill('orange');
    rect(11, 8, 2, 1);
    rect(11, 9, 3, 1);
    fill('black');
  
    
    // right arm
    rect(20-2, 11, 1, 1);
    rect(21-2, 12, 1, 1);
    rect(22-2, 13, 1, 2);
    rect(23-2, 15, 1, 5);
    rect(21-2, 20, 2, 1);
    // left arm
    rect(3, 11, 1, 1);
    rect(2, 12, 1, 1);
    rect(1, 13, 1, 2);
    rect(0, 15, 1, 5);
    rect(1, 20, 2, 1);
  
    // body
      // right
    rect(19-1, 14, 1, 2);
    rect(20-1, 16, 1, 7);
    rect(19-1, 23, 1, 2);
    rect(18-1, 25, 1, 1);
      // left
    rect(4, 14, 1, 2);
    rect(3, 16, 1, 7);
    rect(4, 23, 1, 2);
    rect(5, 25, 1, 1);
  
    // feet
    rect(10, 26, 4, 1);
      // right
    rect(14, 25, 3, 1);
    rect(13, 26, 5, 2);
    fill('orange');
    rect(14, 26, 3, 1);
      // left
    fill('black');
    rect(6, 25, 3, 1);
    rect(5, 26, 5, 2);
    fill('orange');
    rect(6, 26, 3, 1);
  
    // fill 
      // head
    fill('gray');
    rect(5, 5, 1, 2);
    rect(6, 3, 1, 2);
    rect(7, 2, 1, 2);
  
    rect(16-1, 2, 1, 2);
    rect(17-1, 3, 1, 2);
    rect(18-1, 5, 1, 2);
  
    rect(8, 1, 8, 3);
    rect(10, 4, 4, 1);
    rect(11, 5, 2, 2);
  
      // arms
    rect(4, 11, 2, 1);
    rect(3, 12, 4, 1);
    rect(2, 13, 5, 1);
    rect(2, 14, 2, 3);
    rect(1, 15, 2, 5);
  
    rect(18-1, 11, 2-1, 1);
    rect(17-1, 12, 4-1, 1);
    rect(17-1, 13, 5-1, 1);
    rect(20-1, 14, 2-1, 3);
    rect(21-1, 15, 2-1, 5);
  
    rect(5, 14, 1, 3);
    rect(4, 16, 1, 7);
    rect(5, 22, 1, 3);
    rect(6, 24, 1, 2);
    
    rect(18-1, 14, 1, 3);
    rect(19-1, 16, 1, 7);
    rect(18-1, 22, 1, 3);
    rect(17-1, 24, 1, 2);

    pop();
  
}

function pixelFront(x, y, s) {
  // total w: 24 h: 28
  push();
  translate(x, y);
  scale(s);
  noStroke();
  fill('black');
  // head
  rect(8, 0, 8, 1);
    // right
  rect(16, 1, 1, 1);
  rect(17, 2, 1, 1);
  rect(18, 3, 1, 2);
  rect(19, 5, 1, 6);
    // left
  rect(7, 1, 1, 1);
  rect(6, 2, 1, 1);
  rect(5, 3, 1, 2);
  rect(4, 5, 1, 6)
    // eyes
  rect(7, 7, 2, 2);
  rect(15, 7, 2, 2);
    // beak
  fill('orange');
  rect(11, 8, 2, 1);
  rect(10, 9, 4, 1);
  fill('black');

  
  // right arm
  rect(20, 11, 1, 1);
  rect(21, 12, 1, 1);
  rect(22, 13, 1, 2);
  rect(23, 15, 1, 5);
  rect(21, 20, 2, 1);
  // left arm
  rect(3, 11, 1, 1);
  rect(2, 12, 1, 1);
  rect(1, 13, 1, 2);
  rect(0, 15, 1, 5);
  rect(1, 20, 2, 1);

  // body
    // right
  rect(19, 14, 1, 2);
  rect(20, 16, 1, 7);
  rect(19, 23, 1, 2);
  rect(18, 25, 1, 1);
    // left
  rect(4, 14, 1, 2);
  rect(3, 16, 1, 7);
  rect(4, 23, 1, 2);
  rect(5, 25, 1, 1);

  // feet
  rect(10, 26, 4, 1);
    // right
  rect(14, 25, 3, 1);
  rect(13, 26, 5, 2);
  fill('orange');
  rect(14, 26, 3, 1);
    // left
  fill('black');
  rect(6, 25, 3, 1);
  rect(5, 26, 5, 2);
  fill('orange');
  rect(6, 26, 3, 1);

  // fill 
    // head
  fill('gray');
  rect(5, 5, 1, 2);
  rect(6, 3, 1, 2);
  rect(7, 2, 1, 2);

  rect(16, 2, 1, 2);
  rect(17, 3, 1, 2);
  rect(18, 5, 1, 2);

  rect(8, 1, 8, 3);
  rect(10, 4, 4, 1);
  rect(11, 5, 2, 2);

    // arms
  rect(4, 11, 2, 1);
  rect(3, 12, 4, 1);
  rect(2, 13, 5, 1);
  rect(2, 14, 2, 3);
  rect(1, 15, 2, 5);

  rect(18, 11, 2, 1);
  rect(17, 12, 4, 1);
  rect(17, 13, 5, 1);
  rect(20, 14, 2, 3);
  rect(21, 15, 2, 5);

  rect(5, 14, 1, 3);
  rect(4, 16, 1, 7);
  rect(5, 22, 1, 3);
  rect(6, 24, 1, 2);
  
  rect(18, 14, 1, 3);
  rect(19, 16, 1, 7);
  rect(18, 22, 1, 3);
  rect(17, 24, 1, 2);

  pop();
}