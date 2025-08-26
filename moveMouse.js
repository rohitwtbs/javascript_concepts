const robot = require('robotjs');

setInterval(() => {
  const mouse = robot.getMousePos();
  // Move mouse by 1 pixel and back
  robot.moveMouse(mouse.x + 1, mouse.y);
  robot.moveMouse(mouse.x, mouse.y);
  console.log('Mouse moved to keep system active');
}, 30000); // every 30 seconds