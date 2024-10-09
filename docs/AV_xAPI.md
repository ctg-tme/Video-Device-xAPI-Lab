!!! Abstract

    In this section we'll review a few of the AV concepts that are available on Cisco Video Hardware

    Keep in mind, these are high level examples and we have hundreds of API, don't let these be the end of the road in your Journey, it's only the top of the Iceburg. 

    Click each lesson below to expand them, and follow any tasks they introduce


??? lesson "Lesson: Video Compositing"

    !!! info

        Most of the of the Cisco Device portfolio can execute at least 1 of the 3 types of video compositing xAPI branches available

    !!! example "Click on the tabs below to learn more about each Video Compositing Branch"

        === "MainVideoSource"

            The SetMainVideoSource xAPI allows us to alter our video output stream, the camera view the far end receives.

            It allows you to compose your camera feed with up to 4 sources in a 2x2 grid, or 2 sources in a PIP or Prominent Style.

            This xAPI is used in solutions such as Presenter and Audience Mode, Classroom Mode and the Campfire Blueprint Macro.

            Just know, the more IO on a codec, the more possibilities. Keep an open mind as you run through examples on smaller devices :smiley:

            <div style="display: flex; gap: 10px;">
                <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/Status.Video.Input.MainVideoSource/" target="_blank" >
                  Learn more about xStatus Input MainVideoSource <i class="fa-solid fa-square-up-right"></i>
                </a>
                <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/Command.Video.Input.SetMainVideoSource/" target="_blank" >
                  Learn more about xCommand Video Input SetMainVideoSource <i class="fa-solid fa-square-up-right"></i>
                </a>
            </div>

            === "Equal"

                <figure markdown>
                  ![Equal Main](./assets/wx1_1451_part_2/2-2-3_SetMain-2xEqual.png){ width="600" }
                </figure>

            === "PIP"

                <figure markdown>
                  ![PIP Main](./assets/wx1_1451_part_2/2-2-3_SetMain-2xPIP.png){ width="600" }
                </figure>

            === "Prominent"

                <figure markdown="span">
                  ![OSD Output](./assets/wx1_1451_part_2/2-3-3_Execute-xCommand-MultipleSameNameParameter-OSD.png){ width="600" }
                </figure>

        === "Presentation"

            The Presentation Start command, though not glaringly obvious also allows you to composite sources into a single stream, but over the Content Channel of a call.

            It has largely the same feature set as MainVideoSource with a few notable differences

            <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/Command.Presentation.Start/" target="_blank" >
              Learn more about xCommand Presentation Start <i class="fa-solid fa-square-up-right"></i>
            </a>

        === "Video Matrix"

            Video Matrix, again allows you to composite, but it's local to the room.

            You can mix any inputs on the Codec and send them to a specific video output

            Popular uses of the Video Matrix APIs are for local video recording or enabling 2 Laptop shares while on a call, on separate screens (1 local, and another shared in call)

            <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/search?search=Video+Matrix+*" target="_blank" >
              Learn more about the Video Matrix APIs <i class="fa-solid fa-square-up-right"></i>
            </a>
        
    - **Task**: 

        - Install the ==Video Compositing Demo== Macro from the AV-MacroPak.zip file
        - Activate this Macro
            - It will spawn a UserInterface for your with all your available sources
        - Goes through each Page in this macro and build new compositions on the fly using the various controls
        
        ??? tip "Inspect the Macro"

            Feel free to inspect the Video Compositing Demo Macro. It's flexible enough to automatically expand how many input and output sources are selectable.

            It queries the Video Input and Output xConfig branches to determine the # of inputs, then dynamically builds the UI.

            But, the User Experience could use some work in a live build don't you think :smiley:
        
        - Once complete, if you have 10 active macros, be sure to deactivate at least 1 before moving on to the next lesson

??? lesson "Lesson: Audio Routing and Control Concepts"

    We won't be able to perform a robust lab on this topic, as Audio Routing is only available on our larger endpoints, and some of our Smaller Endpoints lack the IO to make this section worthwhile

    But, there are a whole suite of APIs associated to Audio Routing, Type and Control

    !!! example ""

        === "Audio Routing"

            Audio Routing is available on Sx80, Codec Pro and Codec EQ based platforms

            !!! important "Know that Codec EQ systems will need a license key for use"

            In the WebUI is a feature called the ==Audio Console==

            The Audio Console, at a high level, allows grouping of audio sources, routing inputs to outputs, adjusting gain structures and the ability to build and assign up to 8 different Equalizers with 6 parametric bands per equalizer 

            You can also alter these route dynamically using the API

            <a class="md-button md-button--primary" href="https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce913/sx-mx-dx-room-kit-boards-customization-guide-ce913.pdf" target="_blank" >
              Learn more about the Audio Console (Page 58) <i class="fa-solid fa-square-up-right"></i>
            </a>

            <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/Status.SystemUnit.Software.OptionKeys.AVIntegrator/" target="_blank" >
              Learn more about xStatus SystemUnit Software OptionKeys AVIntegrator <i class="fa-solid fa-square-up-right"></i>
            </a>

            <div style="display: flex; gap: 10px;">
                <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/search?search=Audio+Input+LocalInput" target="_blank" >
                  Learn more about Audio Input LocalInput xAPIs <i class="fa-solid fa-square-up-right"></i>
                </a>
                <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/search?search=Audio+Output+LocalOutput" target="_blank" >
                  Learn more about Audio Output LocalOutput xAPIs <i class="fa-solid fa-square-up-right"></i>
                </a>
            </div>
        
        === "Audio Types"

            Cisco Video Codecs offer many ways to connect Audio. It's good to know from a design perspective, but it's also good to know that for each Audio Type, there may be a corresponding xAPI to go along with it

            !!! warning ""

                | **Codec Platform**    | **Analog Inputs** | **Analog Inputs** | **USB Inputs** | **USB Outputs** | **Ethernet Inputs (Cisco/AES67)** | **Ethernet Outputs (Cisco`**`/AES67)** |
                |-----------------------|-------------------|-------------------|----------------|-----------------|-----------------------------------|------------------------------------|
                | **_Room Bar_**        |         ❌         |         ❌         |        1       |        1        |                 1                 |                  ❌                 |
                | **_Room Bar Pro_**    |         2         |         1         |        1       |        1        |                3-8*               |                 4*                 |
                | **_Board Pro Gen 2_** |         2         |         1         |        1       |        1        |                3-8*               |                 4*                 |
                | **_Codec EQ_**        |         3         |         1         |        1       |        1        |                3-8*               |                 4*                 |
                | **_Codec Pro_**       |         8         |         6         |        1       |        1        |                 8                 |                  4                 |

                `*` = 8 Ethernet and AES67 Audio requires AES67
                `**` = Cisco's DNAM IV Amplifier is an Ethernet Based Audio Output. Only available on Room Panorama and Codec EQ Systems

            !!! curious ""

                | Codec Platform | **HDMI Audio Inputs** | **HDMI Audio Outputs** | **USB-C Audio Inputs** | **USB-C Audio Outputs** |
                |----------------|-----------------------|------------------------|------------------------|-------------------------|
                | Room Bar       |           1           |            ❌           |        1 (BYOD)        |         1 (BYOD)        |
                | Room Bar Pro   |           1           |            ❌           |        1 (BYOD)        |         1 (BYOD)        |
                | Board Pro G2   |           1           |            ❌           |        1 (BYOD)        |         1 (BYOD)        |
                | Codec EQ       |   3 (1 ARC Enabled)   |            3           |        1 (BYOD)        |         1 (BYOD)        |
                | Codec Pro      |   5 (3 ARC Enabled)   |            3           |            ❌           |            ❌            |

        === "Audio Techniques in the Field"

            === "Individual Microphone Muting"

                It's quite a common request to mute specific audio inputs. It's not possible out of the box for our endpoints, but by altering the Audio Input's ==Configuration Mode== using an automation, you can cut audio input at the source

                All Audio Input types allow you to disable them. That coupled with custom controls on the Touch Panel can enable experiences like this

                <a class="md-button md-button--primary" href="https://roomos.cisco.com/xapi/search?search=Audio+Input+*+*+Mode" target="_blank" >
                  Learn more about Audio Input xConfigurations <i class="fa-solid fa-square-up-right"></i>
                </a>

            === "Audio Ducking"

                You can access Audio VuMeter information from all Audio Input types

                Using this information, and a robust set of rules, you can duck certain microphones in a space when a HandHeld or Lavalier goes hot, giving your presenter the Audio Stage.

                <a class="md-button md-button--primary" href="https://github.com/gve-sw/gve_devnet_webex_codec_ceiling_mic_gain_ducker_macro" target="_blank" >
                  Check out Cisco Devnet's Audio Ducker Macro <i class="fa-solid fa-square-up-right"></i>
                </a>

            === "Audio Based Automation"

                Many asks on the field today are for custom camera automation, and may rely on audio based events

                That's entirely possible, in fact, the Presenter and Audio Solution and Campfire blueprint leverage these techniques

                <a class="md-button md-button--primary" href="https://github.com/ctg-tme/audio-zone-manager-library-macro/tree/main" target="_blank" >
                  Check out the Audio Zone Manager (AZM) Macro Library <i class="fa-solid fa-square-up-right"></i>
                </a>

??? lesson "Lesson: HID Sources"

    !!! info

        In this lesson, we'll leverage the USB HID capabilities of the Codec

        HID Devices, such as keyboards, mice and presentation clickers can connect the the Codec and be used as a Custom Control interface. 

        When ==xConfiguration Peripherals InputDevice Mode== is set to {++On++}, you can leverage ==xEvent UserInterface InputDevice Key Action== to subscribe to those device clicks

        Let's build an Example :smiley:

    -  **xAPI(s)**:
        - xConfiguration Peripherals InputDevice Mode
        - xEvent UserInterface InputDevice Key Action
        - xCommand Video Input SetMainVideoSource
        - xCommand Video Matrix Assign
        - xCommand Audio Volume Increase
        - xCommand Audio Volume Decrease

    - **Goal**:
        - Use the Macro Editor to subscribe to HID Device Inputs coming from a Provided Presentation Clicker
        - Use the events coming in from the device to do the following
            - Left Arrow: Set your Main Source to your Internal Camera
            - Right Arrow: Compose your Camera with an incoming Camera Feed from a Partner Station
            - Up Arrow: Increase your system volume
            - Down Arrow: Decrease your system volume

    - **Setup**:
        - Partner up with another station in this lab
        - Connect the USB Dongle for your Presentation Clicker to any open USB A connector on your Codec
        - Connect Connect the ==Second HDMI Output== from your Codec to the {++HDMI Input++} of your Partner Codec
            - The partner Station should do the same for you

    - **Task**:

        - Create a new Macro called ==Presentation Clicker==
        - Save and Activate this Macro
        - Define and Declare an `init()` function
            - This function should set the following xAPIs and Values using Macro Syntax
                - xConfiguration Peripherals InputDevice Mode: On
                - xCommand Video Matrix Assign ConnectorId: 1 Output: 2
            
            ??? example "View `init()` function"

                ```javascript
                function init(){
                  xapi.Config.Peripherals.InputDevice.Mode.set('On');
                  xapi.Command.Video.Matrix.Assign({
                    ConnectorId: 1,
                    Output: 2
                  });
                }
                ```

        - Subscribe to ==xEvent UserInterface InputDevice Key Action==
            - Within the subscription, establish a `switch...case` statement that switches based on an incoming Key
            
            ??? example "View Presentation Keys"

                | **Button**        | **Keys**                 | **Action to run**                    | **Note**                                                       |
                |-------------------|--------------------------|--------------------------------------|----------------------------------------------------------------|
                | **_Left Arrow_**  | `KEY_PAGEUP`               | Set Camera to Internal Camera        |                                                                |
                | **_Right Arrow_** | `KEY_PAGEDOWN`             | Compose Internal and External Camera |                                                                |
                | **_Up Arrow_**    | `KEY_B`                    | Increase Volume                      |                                                                |
                | **_Down_**        | `KEY_LEFTSHIFT` and `KEY_F5` | Decrease Volume                      | This button alternates keys, handle both with the same command |

            - Assign the following actions to each key, using the provide xAPI written in Macro Syntax
                - **Left Arrow**: xCommand Video Input SetMainVideoSource ConnectorId: 1
                - **Right Arrow**: xCommand Video Input SetMainVideoSource ConnectorId: 1 ConnectorId: 2 Layout: Equal
                - **Up Arrow**: xCommand Audio Volume Increase
                - Down Arrow: xCommand Audio Volume Decrease

            - Add console.log() where appropriate

            ??? example "View InputDevice Subscription"

                ``` javascript
                xapi.Event.UserInterface.InputDevice.Key.Action.on(({ Code, Key, Type }) => {
                  console.log(`Key Pressed: [${Key}]`)
                  switch (Key) {
                    case 'KEY_PAGEUP': //Left Arrow
                      xapi.Command.Video.Input.SetMainVideoSource({ ConnectorId: [1] })
                      break;
                    case 'KEY_PAGEDOWN': // Right Arrow
                      xapi.Command.Video.Input.SetMainVideoSource({ ConnectorId: [1, 2], Layout: 'Equal' })
                      break;
                    case 'KEY_B': // Up Arrow
                      xapi.Command.Audio.Volume.Increase()
                      break;
                    case 'KEY_LEFTSHIFT': case 'KEY_F5': // Down Arrow
                      xapi.Command.Audio.Volume.Decrease()
                      break;
                  }
                })
                ```
            
            - Once complete, save your macro, make sure it's active and try out the Presentation Clicker


??? lesson "Lesson: WebView OSD and Controller" // Build from Scratch

??? lesson "Lesson: Room Analytics" Pre-Made

??? lesson "Lesson: Triple Click Example" // Premade

??? lesson "Lesson: Pressed and released modal" Build from Scratch

??? lesson "Lesson: Bad Macro, how to fix" // Premade - But fix it