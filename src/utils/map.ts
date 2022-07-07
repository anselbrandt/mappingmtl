interface Colors {
  [color: string]: string;
}

export const colors: Colors = {
  maroon: "rgb(62, 9, 6)",
  red: "rgb(154, 38, 30)",
  orange: "rgb(239, 108, 51)",
  yellow: "rgb(215, 215, 1)",
  turquoise: "rgb(0, 220, 203)",
  skyblue: "rgb(0, 165, 210)",
  royalblue: "rgb(26, 79, 129)",
  navy: "rgb(0, 39, 54)",
};

interface RgbColors {
  [color: string]: [number, number, number];
}

export const rgbColors: RgbColors = {
  maroon: [62, 9, 6],
  red: [154, 38, 30],
  orange: [239, 108, 51],
  yellow: [215, 215, 1],
  turquoise: [0, 220, 203],
  skyblue: [0, 165, 210],
  royalblue: [26, 79, 129],
  navy: [0, 39, 54],
};

export const colorNames = [
  "maroon",
  "red",
  "orange",
  "yellow",
  "turquoise",
  "skyblue",
  "royalblue",
  "navy",
];

export const colorsArr = [
  "rgb(62, 9, 6)",
  "rgb(154, 38, 30)",
  "rgb(239, 108, 51)",
  "rgb(215, 215, 1)",
  "rgb(0, 220, 203)",
  "rgb(0, 165, 210)",
  "rgb(26, 79, 129)",
  "rgb(0, 39, 54)",
];
