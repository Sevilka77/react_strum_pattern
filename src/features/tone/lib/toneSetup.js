import * as Tone from "tone";

import click1 from "@/assets/samples/click1.wav";
import click2 from "@/assets/samples/click2.wav";
import hit from "@/assets/samples/hit.mp3";
import hit2 from "@/assets/samples/hit2.mp3";
import hihat from "@/assets/samples/hihat.mp3";

const masterChannel = new Tone.Channel().toDestination();

const compressor = new Tone.Compressor({
  threshold: -4, // Работает только на тихих звуках
  ratio: 6, // Умеренная компрессия
  attack: 0.05, // Быстрое срабатывание
  release: 0.15,
  knee: 8,
}).connect(masterChannel);

export const channels = {
  master: masterChannel,
  clickChannel: new Tone.Channel().connect(masterChannel),
  hitChannel: new Tone.Channel().connect(masterChannel),
  guitarChannel: new Tone.Channel().connect(compressor),
};

export const numberOfStrings = 6;
// Создаем каналы для каждой струны и подключаем их к основному каналу
export const stringChannels = Array.from({ length: numberOfStrings }, () =>
  new Tone.Channel().connect(channels.guitarChannel),
);
export const samplesHit = {
  hit: new Tone.Player(hit).connect(channels.hitChannel),
  hit2: new Tone.Player(hit2).connect(channels.hitChannel),
  hihat: new Tone.Player(hihat).connect(channels.hitChannel),
};
export const samplesClick = {
  click1: new Tone.Player(click1).connect(channels.clickChannel),
  click2: new Tone.Player(click2).connect(channels.clickChannel),
};
export const players = {};
export const active = {};
