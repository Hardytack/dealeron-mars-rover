var robotForm = document.querySelector("form");
var robot1Text = document.getElementById("robot1");
var robot2Text = document.getElementById("robot2");
var failure = document.getElementById("failure");
robotForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!e.target[0].value ||
        !e.target[1].value ||
        !e.target[2].value ||
        !e.target[3].value ||
        !e.target[4].value)
        return alert("Please fill out all fields");
    var results = marsRovers(e.target[0].value, e.target[1].value.toUpperCase(), e.target[2].value.toUpperCase(), e.target[3].value.toUpperCase(), e.target[4].value.toUpperCase());
    if (results.valid) {
        robot1Text.innerHTML = "Robot 1's current position is <span>" + results.robot1 + "</span>";
        robot2Text.innerHTML = "Robot 2's current position is <span>" + results.robot2 + "</span>";
        failure.innerHTML = "";
    }
    else {
        failure.innerHTML = "Please enter valid information";
        robot1Text.innerHTML = "";
        robot2Text.innerHTML = "";
    }
});
// Wrapper function for moving the robot
function marsRovers(grid, start1, input1, start2, input2) {
    if (!validGrid(grid.split(""))) {
        return { valid: false };
    }
    if (!validPosition(start1.split("")) || !validPosition(start2.split(""))) {
        return { valid: false };
    }
    if (!validMovement(input1.split("")) || !validMovement(input2.split(""))) {
        return { valid: false };
    }
    var robot1 = operateRobot(start1.split(""), input1.split(""), grid.split(""));
    var robot2 = operateRobot(start2.split(""), input2.split(""), grid.split(""));
    return { valid: true, robot1: robot1.join(""), robot2: robot2.join("") };
}
//Checks if the grid is valid
function validGrid(arr) {
    var check = true;
    arr.forEach(function (num) {
        if (!parseInt(num) || parseInt(num) <= 0) {
            return (check = false);
        }
    });
    return check;
}
// Verify if starting position is valid (first two are number)
function validPosition(arr) {
    var availableLetters = ["N", "S", "E", "W"];
    if (arr.length > 3) {
        return false;
    }
    else if (!parseInt(arr[0]) || !parseInt(arr[1])) {
        return false;
    }
    else if (availableLetters.indexOf(arr[2]) === -1) {
        return false;
    }
    return true;
}
// Verify if the list of instructions is valid (only L, R and M)
function validMovement(arr) {
    var availableLetters = ["M", "L", "R"];
    var check = true;
    arr.forEach(function (letter) {
        if (availableLetters.indexOf(letter) === -1) {
            check = false;
        }
    });
    return check;
}
// Handles each robots movements
function operateRobot(robot, input, grid) {
    input.forEach(function (letter) {
        if (letter == "M") {
            robot = moveRobot(robot, grid);
        }
        else {
            return (robot[2] = changeDirection(robot[2], letter));
        }
    });
    return robot;
}
// Moves the robot depending on its current direction
function moveRobot(robot, grid) {
    if (robot[2] == "N") {
        if (robot[1] >= parseInt(grid[1]))
            return robot;
        else
            robot[1] = parseInt(robot[1]) + 1;
    }
    else if (robot[2] == "E") {
        if (robot[0] >= parseInt(grid[0]))
            return robot;
        else
            robot[0] = parseInt(robot[0]) + 1;
    }
    else if (robot[2] == "S") {
        if (robot[1] <= 0)
            return robot;
        else
            robot[1] = parseInt(robot[1]) - 1;
    }
    else if (robot[2] == "W") {
        if (robot[0] <= 0)
            return robot;
        else
            robot[0] = parseInt(robot[0]) - 1;
    }
    return robot;
}
// Changes the direction the robot is facing
function changeDirection(current, turn) {
    if (turn === "L") {
        if (current == "N")
            return "W";
        if (current == "E")
            return "N";
        if (current == "S")
            return "E";
        else
            return "S";
    }
    else {
        if (current == "N")
            return "E";
        if (current == "E")
            return "S";
        if (current == "S")
            return "W";
        else
            return "N";
    }
}
