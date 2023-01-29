import { WebMidi } from "webmidi";

WebMidi.enable()
  .then(onEnabled)
  .catch((err) => alert(err));

function onEnabled() {
  // Inputs
  WebMidi.inputs.forEach((input) =>
    console.log(input.manufacturer, input.name)
  );

  // Outputs
  WebMidi.outputs.forEach((output) =>
    console.log(output.manufacturer, output.name)
  );

  const myInput = WebMidi.getInputByName("volca sample");
  myInput.addListener("noteon", (e) => {
    console.log(e);
  });

  const myOutput = WebMidi.getOutputByName("volca sample");
  let channel = myOutput.channels[1];
  channel.playNote("C3");
}

const buttonHandler = () => {
  WebMidi.enable()
    .then(onEnabled)
    .catch((err) => alert(err));

  function onEnabled() {
    const myOutput = WebMidi.getOutputByName("volca sample");
    let channel = myOutput.channels[2];
    // channel.playNote("C3");
    channel.sendControlChange(7, [127]).playNote("C3");
    // channel.send([151, 48, 127]);
  }
};

function App() {
  return (
    <div className="m-4">
      <h1 className="font-sans font-bold text-4xl">VS2 Typhon</h1>
      <button
        onClick={buttonHandler}
        className="border-black border p-2 my-2 hover:bg-black hover:text-white"
      >
        Test
      </button>
    </div>
  );
}

export default App;
