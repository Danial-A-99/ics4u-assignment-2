import { drawGraph } from "@ics4u-assignment-02/utils";
import type { Coefficients } from "./types";

const canvas = document.getElementById("graph") as HTMLCanvasElement;
const form = document.getElementById("form") as HTMLFormElement;
const history = document.getElementById("history") as HTMLDivElement;
const inputList: Coefficients[] = [];

drawGraph(
  { a: 0, b: 0, c: 0, d: 0 },
  {
    r1: { x: 0, y: 0 },
    r2: { x: 0, y: 0 },
    r3: { x: 0, y: 0 },
  },
  canvas,
);

const pVal = ({ a, b, c, d }: Coefficients): number => {
  return Number((3 * a * c - b ** 2) / (3 * a ** 2));
};

const qVal = ({ a, b, c, d }: Coefficients): number => {
  return Number((27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3));
};

const discriminant = ({ a, b, c, d }: Coefficients) => {
  return Number((qVal({ a, b, c, d }) / 2) ** 2 + (pVal({ a, b, c, d }) / 3) ** 3);
};

const cardanoMethod = ({ a, b, c, d }: Coefficients, p: number, q: number, discriminant: number) => {
  const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
  const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
  const root = (u + v - b / (3 * a)).toFixed(4);
  const r1 = document.getElementById("root-one") as HTMLSpanElement;
  const r2 = document.getElementById("root-two") as HTMLSpanElement;
  const r3 = document.getElementById("root-three") as HTMLSpanElement;
  r1.textContent = `x: ${root} | y: 0.0000`;
  r2.textContent = `x: Imaginary | y: Imaginary`;
  r3.textContent = `x: Imaginary | y: Imaginary`;
  const typeARoots = document.getElementById("roots") as HTMLSpanElement;
  typeARoots.textContent = "1 Real Root, 2 Complex Roots";
  const factoredForm = document.getElementById("factored") as HTMLSpanElement;
  factoredForm.textContent = "No real factorization";
  return [root, root, root];
};

const trigonometricMethod = ({ a, b, c, d }: Coefficients, p: number, q: number) => {
  const theta = Math.acos(-q / (2 * Math.sqrt(-1 * (p / 3) ** 3))) / 3;
  const x1 = (2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a)).toFixed(4);
  const x2 = (2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a)).toFixed(4);
  const x3 = (2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a)).toFixed(4);
  const factoredForm = document.getElementById("factored") as HTMLSpanElement;
  const r1 = document.getElementById("root-one") as HTMLSpanElement;
  const r2 = document.getElementById("root-two") as HTMLSpanElement;
  const r3 = document.getElementById("root-three") as HTMLSpanElement;
  const typeARoots = document.getElementById("roots") as HTMLSpanElement;
  if (x1 === x2 && x1 !== x3) {
    factoredForm.textContent = `(x - ${x1})^2 (x - ${x3})`.replace("- -", "- ");
    typeARoots.textContent = `Double Real Roots, Single Real Root`;
  } else if (x1 === x3 && x1 !== x2) {
    factoredForm.textContent = `(x - ${x1})^2 (x - ${x2})`.replace("- -", "- ");
    typeARoots.textContent = `Double Real Roots, Single Real Root`;
  } else if (x2 === x3 && x2 !== x1) {
    factoredForm.textContent = `(x - ${x2})^2 (x - ${x1})`.replace("- -", "- ");
    typeARoots.textContent = `Double Real Roots, Single Real Root`;
  } else if (x1 !== x3 && x1 !== x2) {
    factoredForm.textContent = `(x - ${x1}) (x - ${x2}) (x - ${x3})`.replace("- -", "- ");
    typeARoots.textContent = `3 Distinct Real Roots`;
  } else {
    factoredForm.textContent = `(x - ${x1})^3`.replace("- -", "- ");
    typeARoots.textContent = `Triple Real Roots`;
  }
  r1.textContent = `x: ${x1} | y: 0.0000`;
  r2.textContent = `x: ${x2} | y: 0.0000`;
  r3.textContent = `x: ${x3} | y: 0.0000`;
  return [x1, x2, x3];
};

const writeEquation = ({ a, b, c, d }: Coefficients) => {
  const originalFunction = document.getElementById("equation") as HTMLSpanElement;
  const newEquation = ` ${a}x³ + ${b}x² + ${c}x + ${d} `
    .replace("+ 0x³", "")
    .replace("+ 0x²", "")
    .replace("+ 0x", "")
    .replaceAll("+ 0 ", "")
    .replaceAll("+ -", "- ");
  originalFunction.textContent = newEquation;
};

const firstDerivative = ({ a, b, c, d }: Coefficients) => {
  const derivative = document.getElementById("first-derivative") as HTMLSpanElement;
  const derivEquation = `${a * 3}x² + ${b * 2}x + ${c}`.replace("+ 0x", "").replace("+ 0", "").replaceAll("+ -", "- ");
  derivative.textContent = derivEquation;
};

const secondDerivative = ({ a, b, c, d }: Coefficients) => {
  const derivative2 = document.getElementById("second-derivative") as HTMLSpanElement;
  const derivEquation = `${a * 3 * 2}x + ${b * 2}`.replace("+ 0", "").replaceAll("+ -", "- ");
  derivative2.textContent = derivEquation;
};

const minMaxPoints = ({ a, b, c, d }: Coefficients) => {
  const minPoint = document.getElementById("minimum") as HTMLSpanElement;
  const maxPoint = document.getElementById("maximum") as HTMLSpanElement;
  const disc = (b * 2) ** 2 - 4 * (a * 3) * c;
  if (disc >= 0) {
    const root1 = Number((-(b * 2) + Math.sqrt(disc)) / (2 * (a * 3)));
    const root2 = Number((-(b * 2) - Math.sqrt(disc)) / (2 * (a * 3)));
    const y1 = Number(a * root1 ** 3 + b * root1 ** 2 + c * root1 + d);
    const y2 = Number(a * root2 ** 3 + b * root2 ** 2 + c * root2 + d);
    if (y1 > y2) {
      maxPoint.textContent = `x: ${root1.toFixed(4)} | y: ${y1.toFixed(4)}`;
      minPoint.textContent = `x: ${root2.toFixed(4)} | y: ${y2.toFixed(4)}`;
    } else {
      maxPoint.textContent = `x: ${root2.toFixed(4)} | y: ${y2.toFixed(4)}`;
      minPoint.textContent = `x: ${root1.toFixed(4)} | y: ${y1.toFixed(4)}`;
    }
  } else {
    maxPoint.textContent = `x: N/A | y: N/A`;
    minPoint.textContent = `x: N/A | y: N/A`;
  }
};

const addData = ({ a, b, c, d }: Coefficients) => {
  const values = { a, b, c, d };
  const disc = discriminant(values);
  const p = pVal(values);
  const q = qVal(values);
  let r = ["0", "0", "0"];
  if (disc <= 0) {
    trigonometricMethod(values, p, q);
    r = trigonometricMethod(values, p, q);
  } else {
    cardanoMethod(values, p, q, disc);
    r = cardanoMethod(values, p, q, disc);
  }
  minMaxPoints(values);
  writeEquation(values);
  firstDerivative(values);
  secondDerivative(values);
  drawGraph(values, { r1: { x: Number(r[0]), y: 0 }, r2: { x: Number(r[1]), y: 0 }, r3: { x: Number(r[2]), y: 0 } }, canvas);
  const pParam = document.getElementById("p") as HTMLSpanElement;
  const qParam = document.getElementById("q") as HTMLSpanElement;
  const discriminantParam = document.getElementById("discriminant") as HTMLSpanElement;
  pParam.textContent = String(p.toFixed(4));
  qParam.textContent = String(q.toFixed(4));
  discriminantParam.textContent = String(disc.toFixed(4));
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
  history.append(historyItem);
};

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const a = Number(formData.get("a"));
  const b = Number(formData.get("b"));
  const c = Number(formData.get("c"));
  const d = Number(formData.get("d"));
  console.log("hi");
  if (inputList.length >= 1) {
    let existsInList = false;
    for (let i = 0; i < inputList.length; i++) {
      const itemInList = inputList[i];
      if (a !== itemInList.a || b !== itemInList.b || c !== itemInList.c || d !== itemInList.d) {
        existsInList = false;
      } else {
        existsInList = true;
        break;
      }
    }
    if (!existsInList) {
      const addedItemList = { a, b, c, d };
      inputList.push(addedItemList);
      const location = inputList.indexOf(addedItemList);
      addToHistory(addedItemList, location);
    }
  } else {
    const addedItemList = { a, b, c, d };
    inputList.push(addedItemList);
    const location = inputList.indexOf(addedItemList);
    addToHistory(addedItemList, location);
  }
  console.log(a, b, c, d);
  console.log(inputList);
});

form.addEventListener("input", (event: Event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const a = Number(formData.get("a"));
  const b = Number(formData.get("b"));
  const c = Number(formData.get("c"));
  const d = Number(formData.get("d"));
  addData({ a, b, c, d });
});

history.addEventListener("click", (event: Event) => {
  event.preventDefault();
  const values = event.target as HTMLElement;
  const aInput = document.getElementById("a") as HTMLInputElement;
  const bInput = document.getElementById("b") as HTMLInputElement;
  const cInput = document.getElementById("c") as HTMLInputElement;
  const dInput = document.getElementById("d") as HTMLInputElement;
  const theId = Number(values.id.replace("numbers-", ""));
  const delButton = values.closest("button[id^=delete-]");
  if (delButton) {
    const theId = Number(delButton.id.replace("delete-", ""));
    const numbersInHistory = document.getElementById(`numbers-${theId}`) as HTMLDivElement;
    numbersInHistory?.remove();
    delButton?.remove();
    inputList[theId] = { a: 0, b: 0, c: 0, d: 0 }; // replacing instead of deleting
  } else {
    console.log(theId);
    console.log(values);
    const valueList = inputList[theId];
    aInput.value = String(valueList.a);
    bInput.value = String(valueList.b);
    cInput.value = String(valueList.c);
    dInput.value = String(valueList.d);
    addData(valueList);
  }
});
