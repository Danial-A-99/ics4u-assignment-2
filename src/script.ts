import { drawGraph } from "@ics4u-assignment-02/utils";
import type { Coefficients } from "./types";

const canvas = document.getElementById("graph") as HTMLCanvasElement;
const form = document.getElementById("form") as HTMLFormElement;
const history = document.getElementById("history") as HTMLDivElement;
let inputList: Coefficients[] = [];

drawGraph(
  { a: 0, b: 0, c: 0, d: 0 },
  {
    r1: { x: 0, y: 0 },
    r2: { x: 0, y: 0 },
    r3: { x: 0, y: 0 },
  },
  canvas,
);

const pVal = ({a,b,c,d}:Coefficients):number => {
  return Number(((3 * a * c - b ** 2) / (3 * a ** 2)).toFixed(4));
}

const qVal = ({a,b,c,d}:Coefficients):number => {
  return Number(((27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3)).toFixed(4));
}

const discriminant = ({a,b,c,d}:Coefficients) => {
  return Number(((qVal({a,b,c,d}) / 2) ** 2 + (pVal({a,b,c,d}) / 3) ** 3).toFixed(4));
}
const cardanoMethod = ({ a, b, c, d }: Coefficients) => {
  const q = qVal({a,b,c,d});
  const disc = discriminant({a,b,c,d});
  const u = Math.cbrt(-q/2 + Math.sqrt(disc));
  const v = Math.cbrt(-q/2 - Math.sqrt(disc));
  const root = ((u + v) - (-b)/(3*a)).toFixed(4)
  const r1 = document.getElementById("root-one") as HTMLSpanElement;
  const r2 = document.getElementById("root-two") as HTMLSpanElement;
  const r3 = document.getElementById("root-three") as HTMLSpanElement;
  r1.textContent = `x: ${root} | y: Imaginary`
  r2.textContent = `x: Imaginary | y: Imaginary`
  r3.textContent = `x: Imaginary | y: Imaginary`
  const typeARoots = document.getElementById("roots") as HTMLSpanElement;
  typeARoots.textContent = "1 Real Root, 2 Complex Roots"
  const factoredForm = document.getElementById("factored") as HTMLSpanElement;
  factoredForm.textContent = "No real factorization"
};

const trigonometricMethod = ({ a, b, c, d }: Coefficients) => {
  const p = pVal({a,b,c,d});
  const q = qVal({a,b,c,d});
  const theta = Math.acos(-q / (2 * Math.sqrt(-1 * (p / 3) ** 3))) / 3;
  const x1 = (2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a)).toFixed(4);
  const x2 = (2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a)).toFixed(4);
  const x3 = (2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a)).toFixed(4);
  const factoredForm = document.getElementById("factored") as HTMLSpanElement;
  const r1 = document.getElementById("root-one") as HTMLSpanElement;
  const r2 = document.getElementById("root-two") as HTMLSpanElement;
  const r3 = document.getElementById("root-three") as HTMLSpanElement;
  const typeARoots = document.getElementById("roots") as HTMLSpanElement;
  if (x1 == x2 && x1 != x3){
    factoredForm.textContent = `(x - ${x1})^2 (x - ${x3})`.replace("- -","- ")
    typeARoots.textContent = `Double Real Roots, Single Real Root`
  } else if (x1 == x3 && x1 != x2){
    factoredForm.textContent = `(x - ${x1})^2 (x - ${x2})`.replace("- -","- ")
    typeARoots.textContent = `Double Real Roots, Single Real Root`
  } else if (x2 == x3 && x2 != x1){
    factoredForm.textContent = `(x - ${x2})^2 (x - ${x1})`.replace("- -","- ")
    typeARoots.textContent = `Double Real Roots, Single Real Root`
  } else if (x1 != x3 && x1 != x2){
    factoredForm.textContent = `(x - ${x1}) (x - ${x2}) (x - ${x3})`.replace("- -","- ")
    typeARoots.textContent = `3 Distinct Real Roots`
  } else {
    factoredForm.textContent = `(x - ${x1})^3`.replace("- -","- ")
    typeARoots.textContent = `Triple Real Roots`
  }
  r1.textContent = `x: ${x1} | y: 0.0000`
  r2.textContent = `x: ${x2} | y: 0.0000`
  r3.textContent = `x: ${x3} | y: 0.0000`
  return [x1,x2,x3]
};

const addData = ({a,b,c,d}:Coefficients) => {
  const disc = discriminant({a,b,c,d});
  if (disc <= 0){
    trigonometricMethod({a,b,c,d})
  } else if (disc > 0){
    cardanoMethod({a,b,c,d})
  }
  minMaxPoints({a,b,c,d})
  const pParam = document.getElementById("p") as HTMLSpanElement;
  const qParam = document.getElementById("q") as HTMLSpanElement;
  const discriminantParam = document.getElementById("discriminant") as HTMLSpanElement;
  pParam.textContent = String(pVal({a,b,c,d}))
  qParam.textContent = String(qVal({a,b,c,d}))
  discriminantParam.textContent = String(discriminant({a,b,c,d}))
}

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

const writeEquation = ({ a, b, c, d }: Coefficients) => {
  const newEquation = ` ${a}x³ + ${b}x² + ${c}x + ${d} `
    .replace("+ 0x³", "")
    .replace("+ 0x²", "")
    .replace("+ 0x", "")
    .replaceAll("+ 0 ", "")
    .replaceAll("+ -", "- ");
  const originalFunction = document.getElementById("equation") as HTMLSpanElement;
  originalFunction.textContent = newEquation;
};

const firstDerivative = ({ a, b, c, d }: Coefficients) => {
  const derivEquation = `${a * 3}x² + ${b * 2}x + ${c}`.replace("+ 0x", "").replace("+ 0", "").replaceAll("+ -", "- ");
  const derivative = document.getElementById("first-derivative") as HTMLSpanElement;
  derivative.textContent = derivEquation;
};

const secondDerivative = ({ a, b, c, d }: Coefficients) => {
  const derivEquation = `${a * 3 * 2}x + ${b * 2}`.replace("+ 0", "").replaceAll("+ -", "- ");
  const derivative2 = document.getElementById("second-derivative") as HTMLSpanElement;
  derivative2.textContent = derivEquation;
};

const minMaxPoints = ({a,b,c,d}:Coefficients) => {
  const minPoint = document.getElementById("minimum") as HTMLSpanElement;
  const maxPoint = document.getElementById("maximum") as HTMLSpanElement;
  const disc = (b*2)**2 - 4 * (a*3) * c
  if (disc >= 0){
    const root1 = Number(((-(b*2) + Math.sqrt(disc))/(2*(a*3))).toFixed(4))
    const root2 = Number(((-(b*2) - Math.sqrt(disc))/(2*(a*3))).toFixed(4))
    const y1 = Number((a*root1**3 + b*root1**2 + c*root1 + d).toFixed(4))
    const y2 = Number((a*root2**3 + b*root2**2 + c*root2 + d).toFixed(4))
    if (y1 > y2){
      maxPoint.textContent = `x: ${root1} | y: ${y1}`
      minPoint.textContent = `x: ${root2} | y: ${y2}`
    } else {
      maxPoint.textContent = `x: ${root2} | y: ${y2}`
      minPoint.textContent = `x: ${root1} | y: ${y1}`
    }
  }
}

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const a = Number(formData.get("a"));
  const b = Number(formData.get("b"));
  const c = Number(formData.get("c"));
  const d = Number(formData.get("d"));
  const existsInHistory = inputList.some((item) => item.a === a && item.b === b && item.c === c && item.d === d);
  if (!existsInHistory) {
    inputList = [...inputList, { a, b, c, d }];
    const location = inputList.findIndex((item) => item.a === a && item.b === b && item.c === c && item.d === d);
    addToHistory({ a, b, c, d }, location);
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
  writeEquation({ a, b, c, d });
  firstDerivative({ a, b, c, d });
  secondDerivative({ a, b, c, d });
  addData({a,b,c,d})
  drawGraph({ a, b, c, d }, {}, canvas);
});

history.addEventListener("click", (event: Event) => {
  event.preventDefault();
  const values = event.target as HTMLElement;
  const theId = Number(values.id.replace("numbers-", ""));
  const delButton = values.closest('button[id^=delete-]')
  if (delButton){
    const theId = Number(delButton.id.replace("delete-", ""));
    const numbersInHistory = document.getElementById(`numbers-${theId}`) as HTMLDivElement;
    numbersInHistory?.remove()
    delButton?.remove()
    inputList[theId] = {a:0,b:0,c:0,d:0} // replacing instead of deleting
  } else{
  console.log(theId);
  console.log(values);
  const valueList = inputList[theId];
  const aInput = document.querySelector('input[name="a"]') as HTMLInputElement;
  const bInput = document.querySelector('input[name="b"]') as HTMLInputElement;
  const cInput = document.querySelector('input[name="c"]') as HTMLInputElement;
  const dInput = document.querySelector('input[name="d"]') as HTMLInputElement;
  aInput.value = String(valueList.a);
  bInput.value = String(valueList.b);
  cInput.value = String(valueList.c);
  dInput.value = String(valueList.d);
  drawGraph( valueList, {}, canvas);
  }
});
