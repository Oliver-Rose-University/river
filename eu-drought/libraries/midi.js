// =============================================================================================
/**
 * DO NOT MODIFY THIS CODE
 */

/**
 * set up the Midi controller system
 */
function setupController() {
  WebMidi.enable()
    .then(onEnabled)
    .catch((err) => alert(err));
}

/**
 * gets called by MIDI library once MIDI enabled
 */
function onEnabled() {
  console.log("enabled");
  // Display available MIDI input devices
  if (WebMidi.inputs.length < 1) {
  } else {
    WebMidi.inputs.forEach((device, index) => {
      console.log(`${index}: ${device.name}`);
    });
  }

  // get controller from inputs connected (always 0)
  myController = WebMidi.inputs[0];

  // read control change messages
  myController.channels[1].addListener("controlchange", allCC);

  // read note messages
  myController.channels[1].addListener("noteon", allNoteOn);
}
