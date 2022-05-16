let img, parts;
let options = {withLandmarks: true, withDescriptors: false};

function preload() {
  img = loadImage('face.png');
}

function setup() {
  createCanvas(img.width*4, img.height*2);
  faceapi = ml5.faceApi(options, modelReady);
  background(255);
  image(img, img.width*2, 0, img.width*2, img.height*2)
  image(img, 0, 0, img.width*2, img.height*2);
}

function modelReady() {
  faceapi.detectSingle(img, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(results);
  parts = results.parts;
  noFill();
  stroke(0, 0, 255);
  strokeWeight(3);
  drawFace();
}

function drawFace() {
  stroke(255, 200, 255);

  //입술그리기
  beginShape();
  for(let i=0; i<13; i++){
    vertex(parts.mouth[i]._x*2, parts.mouth[i]._y*2);
    fill(255,0,0);
  }
  vertex(parts.mouth[0]._x*2, parts.mouth[0]._y*2);
  endShape();
  
  beginShape();
  for(let i=12; i<parts.mouth.length; i++){
    vertex(parts.mouth[i]._x*2, parts.mouth[i]._y*2);
    fill(255,100,100);
  }
  vertex(parts.mouth[0]._x*2, parts.mouth[0]._y*2);
  endShape();


  //코 그리기 
  //noFill();
  fill(255);
  beginShape();
  for(let i=0; i<parts.nose.length; i++){
    vertex(parts.nose[i]._x*2, parts.nose[i]._y*2);
  }
  endShape();

  //눈 그리기
  fill(100, 100, 255);
  beginShape();
  for(let i=0; i<parts.leftEye.length; i++){
    vertex(parts.leftEye[i]._x*2, parts.leftEye[i]._y*2);
  }
  vertex(parts.leftEye[0]._x*2, parts.leftEye[0]._y*2);
  endShape();

  beginShape();
  for(let i=0; i<parts.rightEye.length; i++){
    vertex(parts.rightEye[i]._x*2, parts.rightEye[i]._y*2);
  }
  vertex(parts.rightEye[0]._x*2, parts.rightEye[0]._y*2);
  endShape();

  //눈썹 그리기    
  noFill();
  stroke(0);
  strokeWeight(7);
  beginShape();
  for(let i=0; i<parts.leftEyeBrow.length; i++){
    vertex(parts.leftEyeBrow[i]._x*2, parts.leftEyeBrow[i]._y*2);
  }
  endShape();

  beginShape();
  for(let i=0; i<parts.rightEyeBrow.length; i++){
    vertex(parts.rightEyeBrow[i]._x*2, parts.rightEyeBrow[i]._y*2);
  }
  endShape();
}