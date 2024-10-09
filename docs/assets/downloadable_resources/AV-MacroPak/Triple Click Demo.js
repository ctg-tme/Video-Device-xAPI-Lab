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

/**
 * Macro Author:              Robert(Bobby) McGonigle Jr
 *                            Technical Markteting Engineering, Leader
 *                            Cisco Systems
 * 
 * ---------------------------------------------------------------------
 * Last Revised October 2024
 */

import xapi from 'xapi';

/*Configuration Section*/

const singleClickPanel = 'singleClickPanel' //Panel ID of the Standard Panel you want to open on a single press
const multiClickPanel = 'multiClickPanel'; //Panel ID of the Hidden Panel you'll reveal in X presses in quick succession
const userFacingPanel = 'userFacingPanel'; //Panel ID of the user facing panel

const delayBetweenClicks_ms = 250 //Delay Between Presses in Milliseconds to reveal the Hidden Panel
const maxClicks = 3 //Number of clicks needed to reveal the panel

/*Important objects, do not change*/

let hiddenAccessHandler; //Handles the timeout needed for panel logic
let hiddenAccessCount = 0; //let needed to track # of clicks presses


/*This function governs the panel logic*/
async function openPanel() {
  clearTimeout(hiddenAccessHandler); //Clear the handler on each press
  hiddenAccessCount++; //Increase the count
  if (hiddenAccessCount == maxClicks) {
    console.warn({ Message: `Hidden Panel [${multiClickPanel}] revealed` })
    clearTimeout(hiddenAccessHandler); //Clear the the count threshold is met
    return xapi.Command.UserInterface.Extensions.Panel.Open({
      PanelId: multiClickPanel
    }); //Open the hidden panel
  }
  hiddenAccessHandler = setTimeout(function () {
    console.log({ Message: `Standard Panel [${singleClickPanel}] opened` })
    xapi.Command.UserInterface.Extensions.Panel.Open({
      PanelId: singleClickPanel
    }); //If the button is not pressed quickly enough, open the standard panel
    hiddenAccessCount = 0; //Reset the count
  }, delayBetweenClicks_ms)
};


/*Normal Event logic*/
xapi.Event.UserInterface.Extensions.Panel.Clicked.on(event => {
  switch (event.PanelId) {
    case userFacingPanel: //Run open panel logic when the User Facing panel is pressed// This can be any action button
      openPanel()
      break;
    default:
      break;
  }
});

xapi.Event.UserInterface.Extensions.Widget.Action.on(event => {
  switch (event.WidgetId) {
    case 'visiblePanel_2':
      xapi.Command.UserInterface.Message.Prompt.Display({
        Title: 'You did it!',
        Text: 'You pressed a button<p>Now, find the hidden button to press',
        Duration: 5,
        "Option.1": 'Dismiss'
      })
      break;
    case 'hiddenPanel_2':
      xapi.Command.UserInterface.Message.Prompt.Display({
        Title: 'You did it!',
        Text: 'You pressed the HIDDEN button<p>Well, that\'s about it, happy coding 😊',
        Duration: 5,
        "Option.1": 'Dismiss'
      })
      break;
    default:
      break;
  }
})

async function buildPanels() {

  const userFacingXML = `<Extensions>
  <Panel>
    <Origin>local</Origin>
    <Location>HomeScreenAndCallControls</Location>
    <Icon>Concierge</Icon>
    <Color>#CF7900</Color>
    <Name>User Facing Panel</Name>
    <ActivityType>Custom</ActivityType>
  </Panel>
</Extensions>
`;

  const singleClickXML = `<Extensions>
  <Panel>
    <Origin>local</Origin>
    <Location>Hidden</Location>
    <Icon>Input</Icon>
    <Name>Visible Panel</Name>
    <ActivityType>Custom</ActivityType>
    <Page>
      <Name>Normal Visible Panel</Name>
      <Row>
        <Name>Row</Name>
        <Widget>
          <WidgetId>visiblePanel_1</WidgetId>
          <Name>Nothing to hide here 😊</Name>
          <Type>Text</Type>
          <Options>size=4;fontSize=normal;align=center</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Row</Name>
        <Widget>
          <WidgetId>visiblePanel_2</WidgetId>
          <Name>Oh Look, A Button 🎉</Name>
          <Type>Button</Type>
          <Options>size=4</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Row</Name>
        <Widget>
          <WidgetId>visiblePanel_3</WidgetId>
          <Name>Exit this panel and tap it 3 times in quick succession to reveal a hidden panel</Name>
          <Type>Text</Type>
          <Options>size=4;fontSize=normal;align=center</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Row</Name>
        <Widget>
          <WidgetId>visiblePanel_4</WidgetId>
          <Name>Feel free to use this example to build tools that don't always need to be visible</Name>
          <Type>Text</Type>
          <Options>size=4;fontSize=normal;align=center</Options>
        </Widget>
      </Row>
      <Options>hideRowNames=1</Options>
    </Page>
  </Panel>
</Extensions>
`;

  const multiClickXML = `<Extensions>
  <Panel>
    <Origin>local</Origin>
    <Location>Hidden</Location>
    <Icon>Sliders</Icon>
    <Name>Hidden Panel</Name>
    <ActivityType>Custom</ActivityType>
    <Page>
      <Name>Super Secret Panel</Name>
      <Row>
        <Name>Row</Name>
        <Widget>
          <WidgetId>hiddenPanel_1</WidgetId>
          <Name>Tuck away tools for quick changes to your system on the fly</Name>
          <Type>Text</Type>
          <Options>size=4;fontSize=normal;align=center</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Row</Name>
        <Widget>
          <WidgetId>hiddenPanel_2</WidgetId>
          <Name>WHAT?!?! Another Button!!!</Name>
          <Type>Button</Type>
          <Options>size=4</Options>
        </Widget>
      </Row>
      <Options>hideRowNames=1</Options>
    </Page>
  </Panel>
</Extensions>
`;

  xapi.Command.UserInterface.Extensions.Panel.Save({ PanelId: userFacingPanel }, userFacingXML)

  xapi.Command.UserInterface.Extensions.Panel.Save({ PanelId: singleClickPanel }, singleClickXML)

  xapi.Command.UserInterface.Extensions.Panel.Save({ PanelId: multiClickPanel }, multiClickXML)
}

buildPanels();