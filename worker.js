// Worker code for loading audio samples
self.onmessage = async function (event) {
  const { type, payload } = event.data;

  if (type === "loadSamples") {
    const { samples } = payload;
    const results = [];

    for (let i = 0; i < samples.length; i++) {
      const sample = samples[i];
      const response = await fetch(sample.url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await self.audioContext.decodeAudioData(arrayBuffer);
      results.push({ name: sample.name, audioBuffer });

      // Send progress update back to the main thread
      const progress = ((i + 1) / samples.length) * 100;
      postMessage({ type: "progress", progress });
    }

    // Send the results back when done
    postMessage({ type: "done", results });
  }
};

// Create AudioContext within the worker
let audioContext = new (self.AudioContext || self.webkitAudioContext)();
self.audioContext = audioContext;
