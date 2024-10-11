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
 * Lesson 2: Execute an xCommand with multiple arguments with the same name
 */

const showAndComposeCamera = function () {
  xapi.Command.Video.Selfview.Set({ Mode: 'On', FullscreenMode: 'On', OnMonitorRole: 'First' });

  // Enter your solution below this line
  
  

  
  // Don't go past this line
}

showAndComposeCamera();