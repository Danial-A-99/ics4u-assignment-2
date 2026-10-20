import { drawGraph } from "@ics4u-assignment-02/utils";
import type { Coefficients } from "./types";

const canvas = document.getElementById("graph") as HTMLCanvasElement;
const a = document.getElementById("a") as HTMLCanvasElement;
const b = document.getElementById("b") as HTMLCanvasElement;
const c = document.getElementById("c") as HTMLCanvasElement;
const d = document.getElementById("d") as HTMLCanvasElement;

drawGraph(
  { a: 0, b: 0, c: 0, d: 0 },
  {
    r1: { x: 0, y: 0 },
    r2: { x: 0, y: 0 },
    r3: { x: 0, y: 0 },
  },
  canvas,
);

const cardanoMethod = ({ a, b, c, d }: Coefficients) => {
  return "Num of Roots";
};

const trigonometricMethod = ({ a, b, c, d }: Coefficients) => {
  return "Num of Roots";
};

const getNumOfRoots = ({ a, b, c, d }: Coefficients) => {
  return 1;
};

const checkDuplicates = ({ a, b, c, d }: Coefficients) => {
  return "y/n duplicate";
};

const addToHistory = ({ a, b, c, d }: Coefficients) => {
  return "HTML";
};

const removeFromHistory = ({ a, b, c, d }: Coefficients) => {
  return "HTML without that part";
};

const deriveFunction = ({ a, b, c, d }: Coefficients) => {
  return "Derived Version Of Function";
};
