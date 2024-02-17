// Global variables

var monochromaticPalette; // this will hold the example palette array
var myPalette1; // new palette variable
var myPalette2; // new palette variable

var slider1; // slider for controlling hue
var slider2; // slider for controlling number of colors

//--------------------------------------------------------------

/// _______Functions start ________ ///

// A monochromatic color scheme. That means it is all the same colour (hue),
// with different shades represented by using fixed intervals of brightness.
// Note that the saturation stays the same throughout.

/**
 * @param {Number} hue Hue angle for this color range, from 0-359
 * @param {Number} sat how "colorful" or gray this color is, from 0-100
 * @param {Number} numberOfColors number of colors in this palette
 * @returns {Array} An array of colour values
 */
function createMonochromaticPalette(hue, sat, numberOfColors) {
  var palette = []; // empty array to fill with colours and return at end
  var maxBrightness = 100; // max brightness value for a colour

  colorMode(HSB); // correct color mode for color() function

  // for all shades of this colour, calculate colour values and add to array
  for (var colorIndex = 0; colorIndex < numberOfColors; colorIndex++) {
    var currentBrightness = (maxBrightness * colorIndex) / numberOfColors;
    var currentColor = color(hue, sat, currentBrightness);

    palette.push(currentColor);
  }

  // return array of colours
  return palette;
}

///---------------------------------------------------------
/// TASK 3 : Finish this function! See below:
///---------------------------------------------------------

// Analogous colors: This is a polychromatic color scheme using

/**
The createAnalogousPalette() takes following 5 arguments and returns an array of color values.
 * @param {Number} hue. Hue angle for this color range, from 0-359
 * @param {Number} sat. How "colorful" or gray this color is, from 0-100 
 * @param {Number} bright. Brightness of colours, from 0-255
 * @param {Number} hueInterval. Interval between hue values for each colour (hue is 0-360 total) 
 * @param {Number} numberOfColors. Number of colors in this palette
 * @returns {Array} An array of colour values
 */

// FINISH THE FUNCTION DEFINITION:
function createAnalogousPalette(hue, sat, bright, hueInterval, numberOfColors) {
  var palette = []; // empty array to fill with colours and return at end

  colorMode(HSB); // correct color mode for color() function

  for (var colorIndex = 0; colorIndex < numberOfColors; colorIndex++) {
    // Calculate the current hue at this point in the loop.
    var currentHue = (hue + hueInterval * colorIndex) % 360;

    // print(currentHue) Print and check that hue value is as expected

    // calculate current colour
    var currentColor = color(currentHue, sat, bright);

    // add the colour to the palette array
    palette.push(currentColor);
  }

  // return the array with palette colors
  return palette;
}

//--------------------------------------------------------------
//--------------------------------------------------------------
// TASK 2 : Finish the draw function! See below:
//--------------------------------------------------------------

/**
 * Draw any array of colours as rectangles on the screen, i.e. a palette.
 *
 * @param {Array} palette. Array of colour values to draw
 * @param {Number} startX. Start x coordinate for palette
 * @param {Number} startY. Start y coordinate for palette
 * @param {Number} size. Size of the entire palette to draw on the screen in pixels
 * @returns {None}
 */

// 1. FINISH THE FUNCTION DEFINITION:
function drawPalette(palette, startX, startY, size) {
  // Find the correct number colors in the palette.
  var numberOfColors = palette.length;

  // size of each of the palette's color swatches in pixels
  var swatchSize = size / numberOfColors;

  push(); // save drawing state
  translate(startX, startY); // move to start x,y position

  for (var colorIndex = 0; colorIndex < numberOfColors; colorIndex++) {
    noStroke();
    rectMode(CORNER);

    // Choose the right palette color for the fill function.
    fill(palette[colorIndex]);

    // Create the rectangle.
    rect(colorIndex * swatchSize, 0, swatchSize, size);

    // move drawing cursor to next position for next loop
    //translate(swatchSize,0);
  }
  pop(); // return to original drawing state
}

//----------------------

// TASK 5: FINISH THIS: complete the drawPaletteRectPattern() function below to draw a row of rectangular
//  colour swatches with some space between them:
//--------------------------------------------------------------

/**
 * Draw a pattern (row) of colourful boxes, with spacing between them using array of colours,
 *   e.g. a palette.
 *
 * @param {Array} palette. Array of colour values to draw
 * @param {Number} startX. Start x coordinate for palette
 * @param {Number} startY. Start y coordinate for palette
 * @param {Number} rectSize. Size of each rectangular colour area to draw, in pixels
 * @param {Number} rectSpacing. Spacing between rectangular colour areas
 */

// 1. FINISH THE FUNCTION DEFINITION:
function drawPaletteRectPattern(
  palette,
  startX,
  startY,
  rectSize,
  rectSpacing
) {
  // Find the correct total number colors in the palette.
  var numberOfColors = palette.length;

  push(); // save drawing state
  translate(startX, startY); // move to start x,y position

  for (var colorIndex = 0; colorIndex < numberOfColors; colorIndex++) {
    noStroke();
    rectMode(CORNER); // draw based on top corner

    // Choose the right palette color for the fill function.
    fill(palette[colorIndex]);

    // Create the rectangle.
    rect(colorIndex * (rectSize + rectSpacing), 0, rectSize, rectSize);
  }
  pop(); // return to original drawing state
}

///-------------------------------------------
///----------SETUP----------------------------
///-------------------------------------------

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);

  var hue = 60;
  var sat = 100;
  var bright = 50;
  var hueInterval = 15;
  var numberOfColors = 12;

  // EXAMPLE: generate palettes and store in global variables
  monochromaticPalette = createMonochromaticPalette(hue, sat, numberOfColors);

  // create palette_1 and palette_2:
  myPalette1 = createAnalogousPalette(
    hue,
    sat,
    bright,
    hueInterval,
    numberOfColors
  );
  myPalette2 = createAnalogousPalette(
    180,
    sat,
    bright,
    hueInterval,
    numberOfColors
  );

  // Calculate slider positions for center alignment
  // const sliderX = width / 2 - 100; // X position for sliders
  // const sliderY = height / 2 - 50; // Y position for sliders
  // const sliderSpacing = 50; // Vertical spacing between sliders

  // Create sliders
  slider1 = createSlider(0, 60, 20);
  slider1.position(730, 80);
  // createSliderText("Change Hue:", sliderX, sliderY - 20); // Text for slider1

  slider2 = createSlider(3, 20, 12);
  slider2.position(730, 120);
  // createSliderText("Change Value:", sliderX, sliderY + sliderSpacing - 20); // Text for slider2
}

///-------------------------------------------
///----------DRAW----------------------------
///-------------------------------------------

/// draw the palettes.

function draw() {
  background(0);
  noStroke();

  // Label the palette. See https://p5js.org/reference/#/p5/text
  fill(180); // gray
  textSize(16);
  text("Monochromatic   shades of green", 10, 48 - 12); // an explanation, with a name for it
  drawPalette(monochromaticPalette, 10, 48, 200);

  // Label the palette 1
  fill(180); // gray
  text("Analogous 1  with hue variation", 10, 300 - 12); // an explanation, with a name for it
  drawPalette(myPalette1, 10, 300, 200);

  // Label the palette 2
  fill(180); // gray
  text("Analogous 2 with hue variation", 10, 550 - 12); // an explanation, with a name for it
  drawPalette(myPalette2, 10, 550, 200);

  // Update hue and number of colors based on slider values
  var hueValue = slider1.value();
  var numberOfColors = slider2.value();

  // Create a new palette based on slider values
  var dynamicPalette = createMonochromaticPalette(
    hueValue,
    100,
    numberOfColors
  );

  // Label the dynamic palette
  fill(180); // gray
  text("Dynamic Palette varying hue and value", 300, 48 - 12); // an explanation, with a name for it
  drawPalette(dynamicPalette, 300, 48, 200);

  // Draw a pattern of rectangles with varying spacing based on slider value
  drawPaletteRectPattern(dynamicPalette, 300, 300, 50, numberOfColors);

  // Display the current value of slider1 (Change Hue)
  fill(255); // white text
  text("Hue: " + hueValue, slider1.x + slider1.width + 10, slider1.y + 20);

  // Display the current value of slider2 (Change Value)
  text(
    "Value: " + numberOfColors,
    slider2.x + slider2.width + 10,
    slider2.y + 20
  );
  fill(180); // gray
  text("Rectangular varying hue and value", 300, 300 - 12); //an explanation, with a name for it
}
