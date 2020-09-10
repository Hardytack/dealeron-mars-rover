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
// export { validGrid, validMovement, validPosition };
