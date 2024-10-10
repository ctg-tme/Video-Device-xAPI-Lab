/********************************************************
Copyright (c) 2024 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at
               https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************/

import xapi from 'xapi';

/**
 * Lab Guide: https://webexcc-sa.github.io/LAB-1451/wx1_1451_part_2/#265-getting-and-subscribing-to-xstatuses
 * 
 * Lesson 4: Subscribe and Unsubscribe to Multiple xStatuses under a common node
*/

const delay_in_seconds = 10;

// Edit this Object to include your xStatus Subscription
const subscribeToCameraPositions = '';  //<-- Make Your Changes Here

// Do not edit past this line, but feel free to review what's going on :)

// Here, we use JS Timeouts to set an action to run after X seconds. Timeouts use milliseconds, hence why we multiply by 1000
setTimeout(() => {

  subscribeToCameraPositions(); //<-- By calling the Object we assigned our Subscription too as a function(), we will unsubscribe from it

  console.warn("CameraPositions Subscription stopped!");

}, delay_in_seconds * 1000)


// This countdown is used to help you visualize when the process will complete it's course
// We use console.warn to have this countdown print in another color in the Macro Console
function countdown(startNumber) {
  let currentNumber = startNumber;

  console.warn(`CameraPositions Subscription stopping in [${currentNumber}] seconds`);

  const interval = setInterval(() => {
    currentNumber--;
    if (currentNumber > 0) {
      console.warn(`CameraPositions Subscription stopping in [${currentNumber}] seconds`);
    }

    if (currentNumber < 1) {
      clearInterval(interval);
    }
  }, 1000);
}

function init() {
  countdown(delay_in_seconds);
}

init();