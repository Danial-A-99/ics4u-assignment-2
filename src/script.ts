import { drawGraph } from "@ics4u-assignment-02/utils";
import type { Coefficients } from "./types";

const canvas = document.getElementById("graph") as HTMLCanvasElement;
const form = document.getElementById("form") as HTMLFormElement;
const history = document.getElementById("history");

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
  const historyItem = document.createElement("historyItem");
  historyItem.className =
    "flex border border-slate-700 gap-25 px-12 py-3 rounded-xl text-sm font-mono bg-slate-800/40 hover:bg-slate-800/70";
  historyItem.innerHTML = `
  <p>${a}</p>
  <p>${b}</p>
  <p>${c}</p>
  <p>${d}</p>
  <div>
  <button type="submit"
  class="ml-2 border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl px-4 text-xs font-bold font-mono h-9">Delete</button>
  <div>
  `;
  history?.append(historyItem);
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

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const a = Number(formData.get("a"));
  const b = Number(formData.get("b"));
  const c = Number(formData.get("c"));
  const d = Number(formData.get("d"));
  console.log(a, b, c, d);
  addToHistory({ a, b, c, d });
});
