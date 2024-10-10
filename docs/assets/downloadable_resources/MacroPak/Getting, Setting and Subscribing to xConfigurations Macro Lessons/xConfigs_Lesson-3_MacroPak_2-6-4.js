i/********************************************************
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
 * Lesson 1: Getting an xConfiguration Value
 */

// Enter your solution below this line

const getConfigValue = async function () {
  try {
    // Modify targetConfig below

    const targetConfig = ''; //<-- Make Your Changes Here

    // Don't go past this line
    console.log(targetConfig)
  } catch (e) {
    console.error(e);
  };
};

getConfigValue();