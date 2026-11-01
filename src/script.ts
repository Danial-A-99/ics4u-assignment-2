import { drawGraph } from "@ics4u-assignment-02/utils";
import type { Coefficients } from "./types";

const canvas = document.getElementById("graph") as HTMLCanvasElement;
const form = document.getElementById("form") as HTMLFormElement;
const history = document.getElementById("history") as HTMLDivElement;
const delbutton = document.getElementById("deleteButton");
let valinputs: Coefficients[] = [];

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
  return "true/false duplicate";
};

const addToHistory = ({ a, b, c, d }: Coefficients, locationInList: number) => {
  const historyItem = document.createElement("historyItem");
  historyItem.id = `item-${locationInList}`;
  historyItem.className = "flex items-center gap-2";
  historyItem.innerHTML = `
  <button id="numbers-${locationInList}" class="flex-1 text-left p-3 rounded-xl bg-slate-800/40 border border-slate-700 hover:bg-slate-800/70 transition">
    <div class="grid grid-cols-4 font-mono text-slate-200 text-sm">
      <span class="text-center">${a}</span>
      <span class="text-center">${b}</span>
      <span class="text-center">${c}</span>
      <span class="text-center">${d}</span>
    </div>
  </button>
  <button id="delete-${locationInList}" class="px-3 py-2 text-xs font-medium rounded-lg border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 transition">Delete</button>
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
  const existsInHistory = valinputs.some((item) => item.a === a && item.b === b && item.c === c && item.d === d);
  if (!existsInHistory) {
    valinputs = [...valinputs, { a, b, c, d }];
    const location = valinputs.findIndex((item) => item.a === a && item.b === b && item.c === c && item.d === d);
    addToHistory({ a, b, c, d }, location);
  }
  console.log(a, b, c, d);
  console.log(valinputs);
});

form.addEventListener("input", (event: Event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const a = Number(formData.get("a"));
  const b = Number(formData.get("b"));
  const c = Number(formData.get("c"));
  const d = Number(formData.get("d"));
  drawGraph({ a, b, c, d }, {}, canvas);
});

history.addEventListener("click", (event: Event) => {
  event.preventDefault();
  const values = event.target as HTMLElement;
  const theid = Number(values.id.replace("numbers-", ""));
  console.log(theid);
  console.log(values);
  const lesnombres = valinputs[theid];
  console.log(lesnombres);
  const a = lesnombres.a;
  const b = lesnombres.b;
  const c = lesnombres.c;
  const d = lesnombres.d;
  console.log(a, b, c, d);
  const ainput = document.querySelector('input[name="a"]') as HTMLInputElement;
  const binput = document.querySelector('input[name="b"]') as HTMLInputElement;
  const cinput = document.querySelector('input[name="c"]') as HTMLInputElement;
  const dinput = document.querySelector('input[name="d"]') as HTMLInputElement;
  ainput.value = String(a);
  binput.value = String(b);
  cinput.value = String(c);
  dinput.value = String(d);
  drawGraph({ a, b, c, d }, {}, canvas);
});
