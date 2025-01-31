export const Actions = {
  down: {
    type: "play",
    spread: 3.7,
    bias: "strumD",
  },
  downA: {
    type: "play",
    spread: 6,
    bias: "strumD",
    accent: true,
  },
  downB: {
    type: "play",
    spread: 2,
    bias: "low",
  },
  downH: {
    type: "play",
    spread: 3,
    bias: "high",
  },
  up: {
    type: "play",
    spread: 3.7,
    bias: "strumU",
  },
  upA: {
    type: "play",
    spread: 6,
    bias: "strum",
    accent: true,
  },
  upB: {
    type: "play",
    spread: 2,
    bias: "low",
  },
  upH: {
    type: "play",
    spread: 3,
    bias: "high",
  },
  x: {
    type: "chop",
    spread: 6,
    bias: "low",
  },
  upM: {
    type: "mute",
    spread: 6,
    bias: "low",
  },
  downM: {
    type: "mute",
    spread: 6,
    bias: "low",
  },
  nothing: {
    type: "nothing",
    spread: 0,
    bias: "no",
  },
};
