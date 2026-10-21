import { drawGraph } from "@ics4u-assignment-02/utils";
import type { Coefficients } from "./types";

const canvas = document.getElementById("graph") as HTMLCanvasElement;
const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const a = Number(formData.get("a"));
  const b = Number(formData.get("b"));
  const c = Number(formData.get("c"));
  const d = Number(formData.get("d"));
  console.log(a, b, c, d);
});

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

const maxPoint = ({ a, b, c, d }: Coefficients) => {
  return "Max Point";
};

const minPoint = ({ a, b, c, d }: Coefficients) => {
  return "Min Point";
};
