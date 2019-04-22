function defaultLine() {
  return new Konva.Line({
    points: [5, 70, 800, 23],
    stroke: Konva.Util.getRandomColor(),
    strokeWidth: 15,
    lineJoin: "round",
    draggable: true,
    name: "line"
  });
}

function defaultTriangle() {
  return new Konva.RegularPolygon({
    x: 100,
    y: 150,
    sides: 3,
    radius: 70,
    fill: Konva.Util.getRandomColor(),
    stroke: "black",
    strokeWidth: 2,
    draggable: true,
    name: "triangle"
  });
}

function defaultSquare() {
  return new Konva.Rect({
    x: 100,
    y: 60,
    width: 100,
    height: 100,
    fill: Konva.Util.getRandomColor(),
    name: "square",
    stroke: "black",
    strokeWidth: 2,
    draggable: true
  });
}

function defaultRect() {
  return new Konva.Rect({
    x: 60,
    y: 60,
    width: 150,
    height: 90,
    fill: Konva.Util.getRandomColor(),
    name: "rect",
    stroke: "black",
    strokeWidth: 2,
    draggable: true
  });
}

function defaultCircle() {
  return new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 70,
    fill: Konva.Util.getRandomColor(),
    stroke: "black",
    strokeWidth: 2,
    name: "circle",
    draggable: true
  });
}

function defaultEllipse() {
  return new Konva.Ellipse({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radiusX: 100,
    radiusY: 50,
    fill: Konva.Util.getRandomColor(),
    stroke: "black",
    strokeWidth: 2,
    draggable: true,
    name: "ellipse"
  });
}

function defaultCurve() {
  if (lastFourClicks.length < 3) {
    console.log("Must have at least three canvas points to draw a CURVE!");
    return;
  }
  let points = [];
  for (let i = 0; i < lastFourClicks.length; i++) {
    points.push(lastFourClicks[i].x);
    points.push(lastFourClicks[i].y);
  }

  return new Konva.Line({
    points: points,
    stroke: Konva.Util.getRandomColor(),
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
    tension: 1,
    name: "curve",
    draggable: true
  });
}

function defaultPolyLine() {
  if (lastFourClicks.length < 2) {
    console.log("Must have at least two canvas points to draw a line!");
    return;
  }

  let points = [];
  for (let i = 0; i < lastFourClicks.length; i++) {
    points.push(lastFourClicks[i].x);
    points.push(lastFourClicks[i].y);
  }

  return new Konva.Line({
    points: points,
    stroke: Konva.Util.getRandomColor(),
    strokeWidth: 10,
    lineJoin: "round",
    draggable: true,
    name: "polyLine"
  });
}

function defaultPolygon() {
  if (lastFourClicks.length < 3) {
    console.log("Must have at least three canvas points to draw a polygon!");
    return;
  }

  let points = [];
  for (let i = 0; i < lastFourClicks.length; i++) {
    points.push(lastFourClicks[i].x);
    points.push(lastFourClicks[i].y);
  }

  return new Konva.Line({
    points: points,
    fill: Konva.Util.getRandomColor(),
    stroke: "black",
    strokeWidth: 5,
    draggable: true,
    name: "polygon",
    closed: true
  });
}

const shapes = {
  line: defaultLine,
  triangle: defaultTriangle,
  rect: defaultRect,
  square: defaultSquare,
  circle: defaultCircle,
  ellipse: defaultEllipse,
  curve: defaultCurve,
  polyLine: defaultPolyLine,
  polygon: defaultPolygon
};

function saveToFile() {
  let a = document.createElement("a");
  let file = new Blob([JSON.stringify(state)], { type: "text/plain" });
  a.href = URL.createObjectURL(file);

  a.download = "settings.json";

  a.click();

  console.log(file);
}

function loadFromFile() {
  var reader; //GLOBAL File Reader object for demo purpose only

    /**
     * Check for the various File API support.
     */
    function checkFileAPI() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            reader = new FileReader();
            return true; 
        } else {
            alert('The File APIs are not fully supported by your browser. Fallback required.');
            return false;
        }
    }

    /**
     * read text input
     */
    function readText(filePath) {
        var output = ""; //placeholder for text output
        if(filePath.files && filePath.files[0]) {           
            reader.onload = function (e) {
                output = e.target.result;
                displayContents(output);
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
        else if(ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
                output = file.ReadAll(); //text contents of file
                file.Close(); //close file "input stream"
                displayContents(output);
            } catch (e) {
                if (e.number == -2146827859) {
                    alert('Unable to access local files due to browser security settings. ' + 
                     'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' + 
                     'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"'); 
                }
            }       
        }
        else { //this is where you could fallback to Java Applet, Flash or similar
            return false;
        }       
        return true;
    }   

    /**
     * display content using a basic HTML replacement
     */
    function displayContents(txt) {
        var el = document.getElementById('main'); 
        el.innerHTML = txt; //display output in DOM
    } 
}
