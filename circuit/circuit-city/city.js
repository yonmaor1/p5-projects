// function generateCity(rows = 10, cityWidth = 18, cityHeight = 25, measuringUnit = 'rem') {
//     // (re)set all previous values and :root variables
//     const city = document.getElementById("city");
//     city.innerHTML = "";
//     const colorsArray = choseColorPalette();
//     const minimumBuildingHeight = cityHeight / rows;
//     document.querySelector(":root").setAttribute("style", `--rows: ${rows}; --city-width: ${cityWidth + measuringUnit}; --city-height: ${cityHeight + measuringUnit}`);
  
//     // creates city rows
//     for (let r = 1; r <= rows; r++) {
//       const decrement = 100 / rows;
//       let counter = 0 - decrement;
//       const div = document.createElement("DIV");
//       counter = counter + decrement * r;
//       div.style.bottom = counter + '%';
//       city.appendChild(div).classList.add(`row${r}`);
//     }
//     // creates buildings with different styles and adds  windows to each
//     for (let br = 0; br < rows; br++) {
//       for (let b = 1; b < generateRandomNumber(rows + rows / 3, rows * 2); b++) {
//         let row = city.getElementsByClassName(`row${br + 1}`)[0]
//         const theColor = colorsArray[generateRandomNumber(0, 5)];
//         const div = document.createElement("DIV");
//         div.innerHTML = generateWindows(70, 90);
//         div.style.backgroundColor = `hsl(${theColor[0]}, ${theColor[1]}%, ${theColor[2]}%)`;
//         div.style.borderLeft = `0.5rem solid hsl(${theColor[0]}, ${theColor[1] - 30}%, ${theColor[2] - 30}%)`
//         div.style.borderTop = `0.2rem solid hsl(${theColor[0]}, ${theColor[1] - 30}%, ${theColor[2] - 30}%)`
//         div.style.borderRight = `1px solid hsl(${theColor[0]}, ${theColor[1] - 30}%, ${theColor[2] - 30}%)`
//         div.style.height = minimumBuildingHeight + minimumBuildingHeight / generateRandomNumber(3, 10) + 'rem';
//         row.appendChild(div).classList.add(`building${choseBuildingStyle()}`);
//       }
//     }
//   };
  
//   //////// FUNCTIONS THAT GENERATE A NEW CITY ON PAGE LOAD AND BUTTON CLICK
  
//   document.onload = generateCity(generateRandomNumber(6, 12));
  
//   document.getElementById("button").onclick = function () {
//     generateCity(generateRandomNumber(6, 12));
//   };
//   document.getElementById("city").onclick = function () {
//     generateCity(generateRandomNumber(6, 12));
//   };
  
//   //////// REUSABLE HELPER FUNCTIONS THAT GET CALLED INSIDE generateCity()
  
//   // function that returns a random number, parameters min and max decide the number range to pick from
//   function generateRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
  
//   // function that picks one random color palette
//   function choseColorPalette() {
//     // arrays of different color palettes for hsl(x , y , z) values
//     const colors = [
//       [[196, 41, 95], [15, 8, 91], [22, 12, 53], [228, 5, 20], [210, 12, 62], [194, 101, 43]],
//       [[196, 41, 95], [226, 100, 94], [30, 16, 75], [292, 21, 43], [274, 45, 24], [249, 59, 13]],
//       [[196, 41, 95], [29, 71, 89], [15, 68, 67], [330, 39, 54], [267, 51, 14], [285, 80, 2]],
//       [[196, 41, 95], [212, 30, 89], [193, 38, 17], [9, 29, 42], [15, 31, 54], [191, 14, 53]],
//       [[196, 41, 95], [29, 52, 87], [21, 60, 73], [8, 12, 62], [280, 4, 15], [12, 24, 24]],
//       [[196, 41, 95], [202, 35, 85], [28, 56, 79], [34, 70, 61], [300, 5, 29], [292, 16, 10]],
//       [[39, 52, 6], [20, 14, 17], [229, 19, 34], [224, 36, 56], [233, 47, 74], [39, 47, 74]],
//       [[194, 100, 28], [36, 99, 47], [198, 33, 76], [81, 49, 53], [192, 67, 55], [28, 99, 72]],
//     ];
//     return colors[generateRandomNumber(0, colors.length - 1)]
//   }
  
//   // function that sets the CSS style for a building
//   function choseBuildingStyle() {
//     // CSS styles
//     const stylesArray = ['-style1', '-style2', '-style3', '-style4', '-style5', '-style6', '-style7', '-style8', '-style9', '-style10', '-style11']
//     return stylesArray[generateRandomNumber(0, stylesArray.length - 1)]
//   }
  
//   // functions that generates and colors the windows for each building where it's called
//   function generateWindows(min, max) {
//     // window colors array in HEX code values
//     const windowColors = [
//       '#fff', '#effcff', '#e2eef1', '#ebe4d4', '#eae9eb', '#e5edfd'
//     ]
//     const windowColor = windowColors[generateRandomNumber(0, windowColors.length - 1)]
//     const windowNumber = generateRandomNumber(min, max);
//     let string = ''
//     for (let w = 0; w < windowNumber; w++) {
//       string += `<div class="window" style="background: ${windowColor}"></div>`
  
//     }
//     return string
//   }

const buildingColors = ['#303030', '#B3B3B3', '#FFEfC4'];
const windowColors = ['#121212', '#D6CDF7'];

function setup(){
    createCanvas(400, 400);
    noLoop();
}

function draw(){
    background('lightgray');
    building1(10, 10);
}

// generates random building with rectangular windows
function building1(x, y){
    var buildingFill = buildingColors[int(random(buildingColors.length))];
    var buildingWidth = random(width / 8, width / 3);
    var buildingHeight = random(buildingWidth - height / 8, buildingWidth + height / 8);
    var windowFill = windowColors[int(random(windowColors.length))];
    var windowGap = random(4, 10);
    var windowRows = random(30);
    var windowHeight = ((buildingHeight - 2*windowGap) / windowRows) - (windowGap);
    var windowCols = random(30);
    var windowWidth = ((buildingWidth - 2*windowGap) / windowCols) - (windowGap);

    fill(buildingFill);
    rect(x, y, buildingWidth, buildingHeight);
    fill(windowFill);
    for (var i = 0; i < windowCols; i++){
        for (var j = 0; j < windowRows; j++){
            rect(   windowGap + x + i * (windowWidth + windowGap), 
                    windowGap + y + j * (windowHeight + windowGap), 
                    windowWidth, windowHeight);
        }
    }


}

