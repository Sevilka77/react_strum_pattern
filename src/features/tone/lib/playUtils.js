import { players, active, samplesClick, samplesHit } from "./toneSetup";

export function playStringSound(sample, type, time, db, offset) {
  let modifiedSample;

  switch (type) {
    case "play":
      modifiedSample = sample.concat("Z");
      break;
    case "mute":
      modifiedSample = sample.replace(/[^o]/g, "F").concat("Z");
      break;
    case "chop":
      modifiedSample = sample.concat("C");
      break;
    default:
      modifiedSample = sample;
  }
  if (!players[modifiedSample]) {
    console.warn(`Player ${modifiedSample} not loaded`);
    return;
  }

  if (active[players[modifiedSample].stringId]) {
    let sample = active[players[modifiedSample].stringId]; // Получаем значение сэмпла для данного ключа
    if (players[sample]) {
      players[sample].fadeOut = 0.05;
      players[sample].stop(time);
      active[players[modifiedSample].stringId] = "";
    }
  }

  players[modifiedSample].volume.value =
    type == "chop" ? db - 7 : type == "mute" ? db + 5 : db;

  active[players[modifiedSample].stringId] = modifiedSample;

  players[modifiedSample].start(time + offset, 0.03);
}

export function playInstruction(instructions, time) {
  instructions.forEach((instruction) => {
    const { type, sample, db, offset } = instruction;

    // Убедимся, что это не "nothing", и что db - валидное число
    if (type !== "nothing" && !isNaN(db)) {
      playStringSound(sample, type, time, db, offset);
    }
  });
}

export function playHit(sound, time) {
  if (sound[0].type != "nothing") {
    samplesHit["hihat"].start(time);
  }
}
export const playMetronome = (
  time,
  index,
  clickMainBeat,
  clickSubbeat,
  clickTaktBeat,
  noteDuration,
) => {
  if (clickTaktBeat && index === 0) {
    samplesClick["click2"].start(time); // Звук для такта
  } else {
    if (noteDuration === "4n") {
      samplesClick["click1"].start(time);
    } else if (noteDuration === "8n") {
      if (index % 2 === 0) {
        if (clickMainBeat) {
          samplesClick["click1"].start(time);
        }
      } else {
        if (clickSubbeat) {
          samplesClick["click1"].start(time);
        }
      }
    } else if (noteDuration === "16n") {
      if (index % 4 === 0) {
        if (clickMainBeat) {
          samplesClick["click1"].start(time);
        }
      } else {
        if (clickSubbeat) {
          samplesClick["click1"].start(time);
        }
      }
    } // Звук для бита
  }
};
