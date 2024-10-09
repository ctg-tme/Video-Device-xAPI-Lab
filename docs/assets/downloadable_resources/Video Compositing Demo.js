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

const currentComposition = {
  MainSource: [],
  Presentation: [],
  VideoMatrix: {
    1: [],
    2: [],
    3: []
  }
}

const currentLayout = {
  MainSource: 'Equal',
  Presentation: 'Equal',
  VideoMatrix: {
    1: 'Equal',
    2: 'Equal',
    3: 'Equal'
  }
}

const selectedInput = {
  MainSource: 0,
  Presentation: 0,
  VideoMatrix: 0
}

let selectedOuptut = 1;

const composition = {
  add: async function (input, destination) {

    if (destination != 'VideoMatrix') {
      currentComposition[destination].push(input);

      if (currentLayout[destination] == 'Equal') {
        currentComposition[destination].splice(4)
      } else {
        currentComposition[destination].splice(2)
      }
    }
    switch (destination) {
      case 'MainSource':
        await xapi.Command.Video.Input.SetMainVideoSource({ ConnectorId: currentComposition[destination], Layout: currentLayout[destination] });
        await xapi.Command.UserInterface.Extensions.Widget.SetValue({ WidgetId: `vcd~${destination}~Composition`, Value: `Input Array: [${currentComposition[destination].toString().replace(/,/g, ', ')}]` })
        break;
      case 'Presentation':

        await xapi.Command.UserInterface.Extensions.Widget.SetValue({ WidgetId: `vcd~${destination}~Composition`, Value: `Input Array: [${currentComposition[destination].toString().replace(/,/g, ', ')}]` })
        break;
      case 'VideoMatrix':
        currentComposition[destination][selectedOuptut].push(input);

        if (currentLayout[destination][selectedOuptut] == 'Equal') {
          currentComposition[destination][selectedOuptut].splice(4)
        } else {
          currentComposition[destination][selectedOuptut].splice(2)
        }
        let currentMode = 'Replace';
        for (let connector of currentComposition[destination][selectedOuptut]) {
          await xapi.Command.Video.Matrix.Assign({ SourceId: connector, Mode: currentMode, Layout: currentLayout[destination][selectedOuptut], Output: selectedOuptut });
          if (currentMode == 'Replace') {
            currentMode = 'Add';
          }
        }
        await xapi.Command.UserInterface.Extensions.Widget.SetValue({ WidgetId: `vcd~${destination}~Composition`, Value: `Input Array: [${currentComposition[destination][selectedOuptut].toString().replace(/,/g, ', ')}]` })
        break;
    }

  },
  apply: async function (destination) {
    switch (destination) {
      case 'MainSource':
        await xapi.Command.Video.Input.SetMainVideoSource({ ConnectorId: currentComposition[destination], Layout: currentLayout[destination] });
        break;
      case 'Presentation':
        const presentationState = await xapi.Status.Conference.Presentation.get();

        if (presentationState?.Mode != 'Off' && presentationState?.LocalInstance) {
          xapi.Command.Presentation.Start({ Instance: 'New', ConnectorId: currentComposition[destination], Layout: currentLayout[destination] })
        }
        break;
      case 'VideoMatrix':
        let currentMode = 'Replace';
        for (let connector of currentComposition[destination][selectedOuptut]) {
          await xapi.Command.Video.Matrix.Assign({ SourceId: connector, Mode: currentMode, Layout: currentLayout[destination][selectedOuptut], Output: selectedOuptut });
          if (currentMode == 'Replace') {
            currentMode = 'Add';
          }
        }
        break;
    }
  },
  reset: async function (destination) {
    if (destination != 'VideoMatrix') {
      currentComposition[destination] = [];
    } else {
      currentComposition[destination][selectedOuptut] = [];
    }
    switch (destination) {
      case 'MainSource':
        const defaultMain = await xapi.Config.Video.DefaultMainSource.get()
        await xapi.Command.Video.Input.SetMainVideoSource({ ConnectorId: defaultMain, Layout: 'Equal' });
        await xapi.Command.UserInterface.Extensions.Widget.SetValue({ WidgetId: `vcd~${destination}~Composition`, Value: `Input Array: []` });
        break;
      case 'Presentation':
        const instances = [1, 2, 3, 4, 5, 6];
        for (let instance of instances) {
          await xapi.Command.Presentation.Stop({ Instance: instance });
        }
        await xapi.Command.UserInterface.Extensions.Widget.SetValue({ WidgetId: `vcd~${destination}~Composition`, Value: `Input Array: [${currentComposition[destination].toString().replace(/,/g, ', ')}]` });
        break;
      case 'VideoMatrix':
        const videoOutputs = Object.keys(currentComposition[destination]);
        for (let output of videoOutputs) {
          if (output == selectedOuptut) {
            await xapi.Command.Video.Matrix.Reset({ Output: output });
          }
        }
        await xapi.Command.UserInterface.Extensions.Widget.SetValue({ WidgetId: `vcd~${destination}~Composition`, Value: `Input Array: [${currentComposition[destination][selectedOuptut].toString().replace(/,/g, ', ')}]` });
        break;
    }
  }
}

xapi.Event.UserInterface.Extensions.Widget.Action.on(({ WidgetId, Type, Value }) => {

  if (WidgetId.includes(`vcd~`) && Type == 'released') {
    const [panelId, pageId, action] = WidgetId.split(`~`)
    let connector = {}
    if (Value.includes(`~`)) {
      const [Name, Type, Id] = Value.split('~');
      connector = { Name, Type, Id };
    }

    switch (action) {
      case 'InputSelect':
        selectedInput[pageId] = connector.Id;
        break;
      case 'LayoutSelect':
        if (pageId == 'VideoMatrix') {
          currentLayout[pageId][selectedOuptut] = Value;
        } else {
          currentLayout[pageId] = Value;
        }
        composition.apply(pageId)
        break;
      case 'Add':
        composition.add(selectedInput[pageId], pageId)
        break;
      case 'Reset': case 'StopShare':
        composition.reset(pageId)
        break;
      case 'StartShare':
        xapi.Command.Presentation.Start({ Instance: 'New', ConnectorId: currentComposition[pageId], Layout: currentLayout[pageId] })
        break;
      case 'OutputSelect':
        selectedOuptut = Value
        break;
    }
  }
})

xapi.Event.UserInterface.Extensions.Event.PageOpened.on(({ PageId }) => {
  if (PageId == `vcd~MainSource`) {
    xapi.Command.Video.Selfview.Set({ Mode: 'On', PIPPosition: "LowerRight" })
  }
});

xapi.Event.UserInterface.Extensions.Event.PageClosed.on(({ PageId }) => {
  if (PageId == `vcd~MainSource`) {
    xapi.Command.Video.Selfview.Set({ Mode: 'Off' })
  }
});

async function buildUserInterface() {
  const videoInputs = await xapi.Config.Video.Input.Connector.get();
  const videoOutputs = await xapi.Config.Video.Output.Connector.get();

  const pages = ['MainSource', 'Presentation', 'VideoMatrix']

  let inputSelectGroupButtonXML = {}

  for (let page of pages) {
    inputSelectGroupButtonXML[page] = ``;
    let inputValues = ``
    for (let input of videoInputs) {
      if (input?.Name) {
        let modName = input.Name.replace(/~/g, '-')
        inputValues = inputValues + `<Value><Key>${modName}~${input.InputSourceType}~${input.id}</Key><Name>${modName}</Name></Value>`
      }
    }
    inputSelectGroupButtonXML[page] = `<Row><Name>Select Input Source</Name><Widget>
          <WidgetId>vcd~${page}~InputSelect</WidgetId>
          <Type>GroupButton</Type>
          <Options>size=4</Options>
          <ValueSpace>
          ${inputValues}
          </ValueSpace>
        </Widget></Row>`
  }

  let outputSelectGroupButtonXML = ``;

  let outputValues = ``
  for (let output of videoOutputs) {
    outputValues = outputValues + `<Value><Key>${output.id}</Key><Name>HDMI Out ${output.id}</Name></Value>`
  }

  outputSelectGroupButtonXML = `<Row>
        <Name>Select Output Source</Name>
        <Widget>
          <WidgetId>vcd~VideoMatrix~OutputSelect</WidgetId>
          <Type>GroupButton</Type>
          <Options>size=4</Options>
          <ValueSpace>
            ${outputValues}
          </ValueSpace>
        </Widget>
      </Row>`

  const xml = `<Extensions>
  <Panel>
    <PanelId>vcd</PanelId>
    <Origin>local</Origin>
    <Location>HomeScreen</Location>
    <Icon>Tv</Icon>
    <Color>#FC5143</Color>
    <Name>Video Compositing Demo</Name>
    <ActivityType>Custom</ActivityType>
    <Page>
      <Name>MainSource</Name>
      ${inputSelectGroupButtonXML['MainSource']}
      <Row>
        <Name>Select Layout</Name>
        <Widget>
          <WidgetId>vcd~MainSource~LayoutSelect</WidgetId>
          <Type>GroupButton</Type>
          <Options>size=4</Options>
          <ValueSpace>
            <Value>
              <Key>Equal</Key>
              <Name>Equal</Name>
            </Value>
            <Value>
              <Key>PIP</Key>
              <Name>PIP</Name>
            </Value>
            <Value>
              <Key>Prominent</Key>
              <Name>Prominent</Name>
            </Value>
          </ValueSpace>
        </Widget>
      </Row>
      <Row>
        <Name>Current Composition</Name>
        <Widget>
          <WidgetId>vcd~MainSource~Composition</WidgetId>
          <Name>[...]</Name>
          <Type>Text</Type>
          <Options>size=4;fontSize=normal;align=right</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Select Action</Name>
        <Widget>
          <WidgetId>vcd~MainSource~Add</WidgetId>
          <Name>Add</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>vcd~MainSource~Reset</WidgetId>
          <Name>Reset</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <PageId>vcd~MainSource</PageId>
      <Options/>
    </Page>
    <Page>
      <Name>Presentation</Name>
      ${inputSelectGroupButtonXML['Presentation']}
      <Row>
        <Name>Select Layout</Name>
        <Widget>
          <WidgetId>vcd~Presentation~LayoutSelect</WidgetId>
          <Type>GroupButton</Type>
          <Options>size=4</Options>
          <ValueSpace>
            <Value>
              <Key>Equal</Key>
              <Name>Equal</Name>
            </Value>
            <Value>
              <Key>Prominent</Key>
              <Name>Prominent</Name>
            </Value>
          </ValueSpace>
        </Widget>
      </Row>
      <Row>
        <Name>Current Composition</Name>
        <Widget>
          <WidgetId>vcd~Presentation~Composition</WidgetId>
          <Name>[...]</Name>
          <Type>Text</Type>
          <Options>size=4;fontSize=normal;align=right</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Select Action</Name>
        <Widget>
          <WidgetId>vcd~Presentation~Add</WidgetId>
          <Name>Add</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>vcd~Presentation~Reset</WidgetId>
          <Name>Reset</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>vcd~Presentation~StartShare</WidgetId>
          <Name>Start Share</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>vcd~Presentation~StopShare</WidgetId>
          <Name>Stop Share</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <PageId>vcd~Presentation</PageId>
      <Options/>
    </Page>
    <Page>
      <Name>Video Matrix</Name>
      ${inputSelectGroupButtonXML['VideoMatrix']}
      <Row>
        <Name>Select Layout</Name>
        <Widget>
          <WidgetId>vcd~VideoMatrix~LayoutSelect</WidgetId>
          <Type>GroupButton</Type>
          <Options>size=4</Options>
          <ValueSpace>
            <Value>
              <Key>Equal</Key>
              <Name>Equal</Name>
            </Value>
            <Value>
              <Key>Prominent</Key>
              <Name>Prominent</Name>
            </Value>
          </ValueSpace>
        </Widget>
      </Row>
      ${outputSelectGroupButtonXML}
      <Row>
        <Name>Current Composition</Name>
        <Widget>
          <WidgetId>vcd~VideoMatrix~Composition</WidgetId>
          <Name>[...]</Name>
          <Type>Text</Type>
          <Options>size=4;fontSize=normal;align=right</Options>
        </Widget>
      </Row>
      <Row>
        <Name>Select Action</Name>
        <Widget>
          <WidgetId>vcd~VideoMatrix~Add</WidgetId>
          <Name>Add</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
        <Widget>
          <WidgetId>vcd~VideoMatrix~Reset</WidgetId>
          <Name>Reset</Name>
          <Type>Button</Type>
          <Options>size=2</Options>
        </Widget>
      </Row>
      <PageId>vcd~VideoMatrix</PageId>
      <Options/>
    </Page>
  </Panel>
</Extensions>
`;

  await xapi.Command.UserInterface.Extensions.Panel.Save({ PanelId: 'vcd' }, xml);
}

buildUserInterface()

// <Row>
//         <Name>Select Input Source</Name>
        // <Widget>
        //   <WidgetId>vcd~MainSource~InputSelect</WidgetId>
        //   <Type>GroupButton</Type>
        //   <Options>size=4</Options>
        //   <ValueSpace>
        //     <Value>
        //       <Key>Name~ConnectorType~ConnectorId</Key>
        //       <Name>Input Name</Name>
        //     </Value>
        //     <Value>
        //       <Key>Name~ConnectorType~ConnectorId</Key>
        //       <Name>Input Name</Name>
        //     </Value>
        //   </ValueSpace>
        // </Widget>
//       </Row>