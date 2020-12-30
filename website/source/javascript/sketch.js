var x = 200;
var y = 200;

function setup() 
{
  let renderer = createCanvas(530, 530);
  renderer.parent("gamearea");
}
  
function draw() 
{
  background(220);
  fill(0);
  
  if (keyIsDown(LEFT_ARROW))  if(x>0) x -= 5;
  if (keyIsDown(RIGHT_ARROW)) if(x<width) x += 5;
  if (keyIsDown(UP_ARROW))    if(y>0) y -= 5;
  if (keyIsDown(DOWN_ARROW))  if(y<height) y += 5;
  
  ellipse(x,y,50,50);
}


