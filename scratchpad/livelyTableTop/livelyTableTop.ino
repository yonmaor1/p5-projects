// SPDX-FileCopyrightText: 2020 Carter Nelson for Adafruit Industries
// https://www.youtube.com/watch?v=dOqPoIPTcCA&t=42s
// SPDX-License-Identifier: MIT
#include <Adafruit_CircuitPlayground.h>
#include <Adafruit_Circuit_Playground.h>


int thresh = 400;
///int debounce = 1000;

////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
void setup() {
  // Initialize serial.
  Serial.begin(9600);
  delay(3000);
  CircuitPlayground.begin();

}

////////////////////////////////////////////////////////////////////////////
void loop() {
  // Check if capacitive touch exceeds threshold.
  for(int p = A1; p <= A7; p++) {
    int t = CircuitPlayground.readCap(p);
    if(t < thresh) {
      CircuitPlayground.setPixelColor(p-14, 0, 0, 0);
    } else{
      CircuitPlayground.setPixelColor(p-14, 0, 0, 30);
    }
    Serial.print(t);
    Serial.print(",");
  }
  Serial.println();
  ///delay(debounce);
}
