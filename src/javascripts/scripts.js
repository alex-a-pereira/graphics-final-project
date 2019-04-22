const Konva = require("konva");

// Add your scripts here
const lastFourClicks = [];
const state = [];

const reader = new FileReader();


const width = window.innerWidth;
const height = window.innerHeight;

const stage = new Konva.Stage({
  container: "container",
  width,
  height
});
const layer = new Konva.Layer();

stage.add(layer);



reader.onload = e => {
  const text = e.currentTarget.result[0];
  const parsed = JSON.parse(text);
  console.log(parsed);
};

async function readFile() {
  const fp = document.getElementById("files").files[0];
  reader.readAsText(fp);
}

// function clearClicks() {
//   while (lastFourClicks.length > 0) {
//     lastFourClicks.shift();
//   }
// }

// ON DRAG, CHECK FOR MOUSEUP POSITION. SAVE THAT TO STATE. WHEN WE open from file, set position for all knova nodes via setAbsolutePostion
// https://konvajs.org/api/Konva.Transform.html#setAbsolutePosition__anchor

const drawCanvas = () => {
  for (let i = 0; i < state.length; i++) {
    layer.add(state[i]);
  }
  stage.find("Transformer").destroy();
  layer.draw();
};

const shapeFactory = shape => {
  const newShape = shapes[shape]();
  state.push(newShape);
  drawCanvas();
};


stage.on("click tap", e => {
  const mousePos = {
    x: event.clientX,
    y: event.clientY
  };
  console.log(mousePos);
  lastFourClicks.push(mousePos);

  if (lastFourClicks.length > 5) {
    lastFourClicks.shift();
  }

  if (e.target === stage) {
    stage.find("Transformer").destroy();
    layer.draw();
    return;
  }

  const okNames = [
    "line",
    "triangle",
    "square",
    "rect",
    "circle",
    "ellipse",
    "curve",
    "polyLine",
    "polygon"
  ];
  if (!okNames.includes(e.target.attrs.name)) {
    return;
  }

  stage.find("Transformer").destroy();

  let tr = new Konva.Transformer();
  layer.add(tr);
  tr.attachTo(e.target);
  layer.draw();
});
