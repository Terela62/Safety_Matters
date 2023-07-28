// Example based on https://www.youtube.com/watch?v=urR596FsU68
// 5.17: Introduction to Matter.js - The Nature of Code
// by @shiffman

// module aliases
let size;
let engine;
let world;
let bottomWall;
let j;
let k;
let boxes = [];
let circles = [];
let grounds = [];
let mConstraint;
let delayBetweenDays = 100;
let delayBetweenBalls = 60;
let delayBallDrop = 4000;
let delayRestart = 10000;

var capturer = new CCapture({ format: 'webm' , framerate: 30} );
var btn;
var counter = 1;
  

let canvas;


    var Engine = Matter.Engine,
        //Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Bodies = Matter.Bodies,
        World = Matter.World;


// Matter.runner.isFixed = true
// engine.positionIterations = 100,
// engine.velocityIterations = 100,
// body_opts = {restitution:0, friction:0}

//preload excel data sheet that records tweets per day

function preload() {
  
data = loadTable("twitter_data_pow.csv", "csv", "header");
}

  // create engine 
  
  engine = Engine.create({
    enableSleeping: true
  });
  world = engine.world;
   engine.gravity.y *=0.12;
  //engine.friction = 0.1;
 // engine.restitution = 1;
//engine.inertia = 100;


  
      // create renderer
    //var render = Render.create({
        //element: document.body,
        //engine: engine,
        //options: {
        //    width: 800,
         //   height: 600,
       //     showAngleIndicator: true
     //   }
    //});

    //Render.run(render);
    
    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);




 function setup() {
  frameRate(30);
  canvas = createCanvas(220, 1200);
  
  //video capture using ccapture
  //btn = document.createElement('button');
  //btn.textContent = "save recording";
  //document.body.appendChild(btn);
  //btn.onclick = save_record;
  //capturer.start();
  
  //Buttons for testing
  	
  //button =createButton('Delete WAll');
  //button.mousePressed(deleteBoundary);
  
  button2 =createButton('Reset Sketch');
  button2.mousePressed(resetSketch);
  
  //grounds.push(new Boundary(0, height / 2, 10, height));
  //grounds.push(new Boundary(width, height / 2, 10, height));
  //grounds.push(new Boundary(width / 2, 0, width, 10));
   leftWall= Bodies.rectangle(0,height/2, 45, height,{isStatic: true,friction:0});
   rightWall = Bodies.rectangle(width, height/2, 15, height,{isStatic: true,friction:0});
   bottomWall = Bodies.rectangle(width/2, 1000, 220, 15,{isStatic: true,friction:0.5});
  Composite.add(world,[bottomWall, leftWall, rightWall]);
   
order();
  
 }

async function order(){
  await ballDrop();
  await deleteBoundary();
  await resetSketch();
}

let count = 0;
function draw() {
  background('#FFFFFF');

  Engine.update(engine);

  for (let box of boxes) {
    box.show();
  }
  
  for (var i = 0; i<circles.length; i++) {
    circles[i].show();

  }
  for (let ground of grounds) {
    ground.show();
}
    capturer.capture(document.getElementById('defaultCanvas0'));  
}
function save_record() {
  capturer.save();
}

   
async function ballDrop(){

  
  if (data) {
    let numRows = data.getRowCount();
    let numCols = data.getColumnCount();


    for (j = 0; j < numRows; j++) {
      //print(j);
      //print(numRows);
      //print(numCols);
      
      for (k = 0; k < numCols; k++) {
        
        let nBalls = data.get(j, k);

        //print('this is' +k);
        //print(nBalls);
        if (k == 0) {
          //shewaswalkinghome
          color = "#FF9800";
        } else if (k==1) {
          //reclaimthesestreets
          color = "#E97CA1";
        } else if (k==2) {
          //all women
          color = "#6A4A76";
        } else if (k==3) {
          //crime_not_compliment
          color = "#03A9F4";
        } else if (k==4) {
          //reclaimthestreets
          color = "#FF0055";
        } else{
          //saraheverard
          color ='#BF9D35';
        }
        let size =nBalls;
        if (nBalls>0){
        circles.push(new Circle(width / 2, -10, size, color));
          
        await sleep(delayBetweenBalls); //Call the sleep function below}
        }
      }
      await sleep(delayBetweenDays); //Call the sleep function below}
    }
    await sleep(delayBallDrop); //delay to allow balls to finish before dropping

  }
}


  
 // deletes bottom wall to allow balls to drop and leave screen 
   
async function deleteBoundary(){ 
  
  var allBodies = Matter.Composite.allBodies(world);                       
  for (var i = 0; i<allBodies.length; i++) {
  //Matter.Body.setStatic(allBodies[i], false);  
  Matter.Sleeping.set(allBodies[i],false);
  //Matter.Body.applyForce(allBodies[i],allBodies[i].position, {x:0,y:-0.00000000000001})
    
}
   var px = 1 + 1 * Math.sin(engine.timing.timestamp * 0.002);

  
  //Matter.Body.setStatic(leftWall, false)
  //Matter.Body.setStatic(rightWall, false)
  //Matter.Body.setVelocity(bottomWall, {x:0.000001,y:0})
  //Matter.Body.setPosition(bottomWall, {x:200,y:0},[updateVelocity=false]);
  //Matter.Body.setStatic(bottomWall, false)
  Matter.Body.setPosition(bottomWall, { x: px, y: 0 }, true)
  //Matter.Composite.remove(world,[bottomWall]);
  //Matter.Sleeping.update(allBodies,1);
  
   var allBodies = Matter.Composite.allBodies(world);                       
  for (var i = 0; i<allBodies.length; i++) {
  //Matter.Body.setStatic(allBodies[i], false);  
  Matter.Sleeping.set(allBodies[i],false);
  //Matter.Body.applyForce(allBodies[i],allBodies[i].position, {x:0,y:-0.00000000000001})
    
}
  
await sleep(delayRestart); //allows balls to clear screen before sketch restarted
}

//recalls balldrop and clears sketch
async function resetSketch(){

  //console.log(world.bodies.length)
  Composite.clear(world);
  Engine.clear(engine);
  //Render.stop(render);
  //Runner.stop(runner);
  clear();
  circles = [];
  grounds = [];
  j =0;
  i=0;
  //mRows = data.getRowCount();
  //mCols = data.getColumnCount();
   leftWall= Bodies.rectangle(0,height/2, 45, height,{isStatic: true,friction:0});
   rightWall = Bodies.rectangle(width, height/2, 15, height,{isStatic: true,friction:0});
   bottomWall = Bodies.rectangle(width/2, 1000, 220, 15,{isStatic: true,friction:0.5});
  Composite.add(world,[bottomWall, leftWall, rightWall]);
  
  order();
}

async function sleep(ms) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
  callback();
}
