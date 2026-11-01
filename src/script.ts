import { drawGraph } from "@ics4u-assignment-02/utils";
import type { Coefficients } from "./types";

const canvas = document.getElementById("graph") as HTMLCanvasElement;
const form = document.getElementById("form") as HTMLFormElement;
const history = document.getElementById("history") as HTMLDivElement;
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
  const p = (3 * a * c - b ** 2) / (3 * a ** 2);
  const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
  const discriminant = (q / 2) ** 2 + (p / 3) ** 3;
  const disc = document.getElementById("discriminant") as HTMLSpanElement;
  const pParam = document.getElementById("p") as HTMLSpanElement;
  const qParam = document.getElementById("q") as HTMLSpanElement;
  disc.textContent = String(discriminant);
  pParam.textContent = String(p);
  qParam.textContent = String(q);

  return "Num of Roots";
};

const trigonometricMethod = ({ a, b, c, d }: Coefficients) => {
  const p = (3 * a * c - b ** 2) / (3 * a ** 2);
  const q = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
  const theta = Math.acos(-q / (2 * Math.sqrt(-1 * (p / 3) ** 3))) / 3;
  const discriminant = (q / 2) ** 2 + (p / 3) ** 3;
  if (discriminant <= 0) {
    const x1 = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
    const x2 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a);
    const x3 = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a);
    console.log(x1, x2, x3);
    //const 
  }
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

const writeFunction = ({ a, b, c, d }: Coefficients) => {
  const writtenversion = ` ${a}x³ + ${b}x² + ${c}x + ${d} `
    .replace("+ 0x³", "")
    .replace("+ 0x²", "")
    .replace("+ 0x", "")
    .replaceAll("+ 0 ", "")
    .replaceAll("+ -", "- ");
  const ogfunction = document.getElementById("equation") as HTMLSpanElement;
  ogfunction.textContent = writtenversion;
};

const firstDerivative = ({ a, b, c, d }: Coefficients) => {
  const newequation = `${a * 3}x² + ${b * 2}x + ${c}`.replace("+ 0x", "").replace("+ 0", "").replaceAll("+ -", "- ");
  const derivative = document.getElementById("first-derivative") as HTMLSpanElement;
  derivative.textContent = newequation;
};

const secondDerivative = ({ a, b, c, d }: Coefficients) => {
  const newequation = `${a * 3 * 2}x + ${b * 2}`.replace("+ 0", "").replaceAll("+ -", "- ");
  const derivative2 = document.getElementById("second-derivative") as HTMLSpanElement;
  derivative2.textContent = newequation;
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
  cardanoMethod({ a, b, c, d });
  writeFunction({ a, b, c, d });
  firstDerivative({ a, b, c, d });
  secondDerivative({ a, b, c, d });
  trigonometricMethod({ a, b, c, d });
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
