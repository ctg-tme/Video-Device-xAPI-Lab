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
 * Lab Guide: https://webexcc-sa.github.io/LAB-1451/wx1_1451_part_2/#263-executing-xcommands
 * 
 * Lesson 3: Execute an xCommand with a multiline argument
 */

// Assign values to these Objects
const myPanelId = '';

const myUserinterfaceXML = ``;


const buildUserInterface = async function (){
  try {
    // Enter your solution below this line

    

    // Don't go past this line
    console.log(`Panel [${myPanelId}] saved to the codec`)
  } catch (e){
    console.error(e)
  }
}


async function cleanupLesson2(){
  await xapi.Command.Video.Selfview.Set({Mode: 'Off'});
  await xapi.Command.Video.Input.SetMainVideoSource({ConnectorId: 1, Layout: 'Equal'});
}

async function init(){
  await cleanupLesson2()

  await buildUserInterface();
}

init();