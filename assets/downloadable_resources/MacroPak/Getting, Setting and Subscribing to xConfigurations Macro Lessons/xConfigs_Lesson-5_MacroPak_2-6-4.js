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
 * Lab Guide: https://webexcc-sa.github.io/LAB-1451/wx1_1451_part_2/#264-setting-getting-and-subscribing-to-xconfigurations
 * 
 * Lesson 5: Subscribe and Unsubscribe to Multiple xConfigurations under a common node
 */

const delay_in_seconds = 5;

// Edit this Object to include your xConfiguration Subscription
const subscribeToAirplay = ''; //<-- Make Your Changes Here

// Do not edit past this line, but feel free to review what's going on :)

// Here, we use JS Timeouts to set an action to run after X seconds. Timeouts use milliseconds, hence why we multiply by 1000
setTimeout(() => {

  subscribeToAirplay(); //<-- By calling the Object we assigned our Subscription too as a function(), we will unsubscribe from it

  console.warn("Airplay Subscription stopped!");

}, delay_in_seconds * 1000)


// Here, we're randomly assigning a values to the Airplay config, so we can see that configuration on our Subscription
function setRandomAirplayConfigs() {

  function randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  const randomPass = `${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}`

  xapi.Config.Video.Input.AirPlay.Mode.set(Math.random() < 0.5 ? "On" : "Off");

  xapi.Config.Video.Input.AirPlay.Beacon.set(Math.random() < 0.5 ? "Auto" : "Off");

  xapi.Config.Video.Input.AirPlay.Password.set(randomPass);
}


// This countdown is used to help you visualize when the process will complete it's course
// We use console.warn to have this countdown print in another color in the Macro Console
function countdown(startNumber) {
  let currentNumber = startNumber;

  console.warn(`Airplay Subscription stopping in [${currentNumber}] seconds`);

  const interval = setInterval(() => {
    currentNumber--;
    if (currentNumber > 0) {
      console.warn(`Airplay Subscription stopping in [${currentNumber}] seconds`);
    }

    if (currentNumber < 1) {
      clearInterval(interval);
    }
  }, 1000);
}

function init() {
  setInterval(() => {
    setRandomAirplayConfigs();
  }, 500)

  countdown(delay_in_seconds);
}

init();