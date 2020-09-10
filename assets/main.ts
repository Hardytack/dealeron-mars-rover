/// <reference path="./validators.ts" />

// Grabs the various html elements used throughout the project
const robotForm = document.querySelector("form");
const robot1Text = document.getElementById("robot1");
const robot2Text = document.getElementById("robot2");
const failure = document.getElementById("failure");

// Connects the html form to the function
robotForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !e.target[0].value ||
    !e.target[1].value ||
    !e.target[2].value ||
    !e.target[3].value ||
    !e.target[4].value
  )
    return alert("Please fill out all fields");
  const results = marsRovers(
    e.target[0].value,
    e.target[1].value.toUpperCase(),
    e.target[2].value.toUpperCase(),
    e.target[3].value.toUpperCase(),
    e.target[4].value.toUpperCase()
  );

  if (results.valid) {
    robot1Text.innerHTML = `Robot 1's current position is <span>${results.robot1}</span>`;
    robot2Text.innerHTML = `Robot 2's current position is <span>${results.robot2}</span>`;
    failure.innerHTML = "";
  } else {
    failure.innerHTML = "Please enter valid information";
    robot1Text.innerHTML = ``;
    robot2Text.innerHTML = "";
  }
});

// Wrapper / Validation function for moving the robot
// See the various validator functions at ./validators.ts
function marsRovers(
  grid: string,
  start1: string,
  input1: string,
  start2: string,
  input2: string
) {
  if (!validGrid(grid.split(""))) {
    return { valid: false };
  }

  if (!validPosition(start1.split("")) || !validPosition(start2.split(""))) {
    return { valid: false };
  }
  if (!validMovement(input1.split("")) || !validMovement(input2.split(""))) {
    return { valid: false };
  }
  let robot1: Array<string> = operateRobot(
    start1.split(""),
    input1.split(""),
    grid.split("")
  );
  let robot2: Array<string> = operateRobot(
    start2.split(""),
    input2.split(""),
    grid.split("")
  );

  return { valid: true, robot1: robot1.join(""), robot2: robot2.join("") };
}

// Handles each robots movements
function operateRobot(
  robot: Array<any>,
  input: Array<string>,
  grid: Array<string>
) {
  input.forEach((letter: string) => {
    if (letter == "M") {
      robot = moveRobot(robot, grid);
    } else {
      return (robot[2] = changeDirection(robot[2], letter));
    }
  });
  return robot;
}

// Moves the robot depending on its current direction
function moveRobot(robot, grid) {
  if (robot[2] == "N") {
    if (robot[1] >= parseInt(grid[1])) return robot;
    else robot[1] = parseInt(robot[1]) + 1;
  } else if (robot[2] == "E") {
    if (robot[0] >= parseInt(grid[0])) return robot;
    else robot[0] = parseInt(robot[0]) + 1;
  } else if (robot[2] == "S") {
    if (robot[1] <= 0) return robot;
    else robot[1] = parseInt(robot[1]) - 1;
  } else if (robot[2] == "W") {
    if (robot[0] <= 0) return robot;
    else robot[0] = parseInt(robot[0]) - 1;
  }
  return robot;
}

// Changes the direction the robot is facing
function changeDirection(current, turn) {
  if (turn === "L") {
    if (current == "N") return "W";
    if (current == "E") return "N";
    if (current == "S") return "E";
    else return "S";
  } else if (turn === "R") {
    if (current == "N") return "E";
    if (current == "E") return "S";
    if (current == "S") return "W";
    else return "N";
  }
}
