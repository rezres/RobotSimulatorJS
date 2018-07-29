//Please Make sure to Include robot.js for this to work.
function runTest() {
    //Init Robot
    var testRobot = new Robot();
    //Constraints 
    var succes = {
        preventMoveUnplaced: false,
        preventReportUnplaced: false,
        preventRightUnplaced: false,
        preventLeftUnplaced: false,
        placeX: false,
        placeY: false,
        placeDirection: false,
        maxX: false,
        maxY: false,
        zeroX: false,
        zeroY: false,
    };
    //Test Case 
    //Below All Functions before Place, all should return false
    succes.preventMoveUnplaced = testRobot.canMove() === false;
    succes.preventReportUnplaced = testRobot.report() === false;
    succes.preventRightUnplaced = testRobot.canTurn() === false;
    succes.preventLeftUnplaced = testRobot.canTurn() === false;

    //place at 0 1 facing north
    testRobot.place(0, 1, 'North');
    //Check x equals 0
    succes.placeX = testRobot.x === 0;
    //Check y equals 100, 1 square equals to 100 
    succes.placeY = testRobot.y === 100;
    //Check North
    succes.placeDirection = testRobot.facingNorth();

    //Place again at 0 0 North  
    testRobot.place(0, 0, 'N');
    //Test Max Y
    while (testRobot.canMove()) {
        testRobot.move();
    }
    //Below move will fail, if not y will exceed max y
    testRobot.move();
    succes.maxY = testRobot.maxCoordinatorY === testRobot.y;

    //Place again at 0 4 South  
    testRobot.place(0, 4, 'S');
    testRobot.report();
    //Test zero Y 
    while (testRobot.canMove()) {
        testRobot.move();
    }
    //Below move will fail, if not, y will be -1 
    testRobot.move();
    //Check y is 0 
    succes.zeroY = 0 === testRobot.y;


    //Place again at 0 0 East  
    testRobot.place(0, 0, 'E');
    //Test Max X
    while (testRobot.canMove()) {
        testRobot.move();
    }
    //Below Move will fail, if not, x will exceed max x
    testRobot.move();
    succes.maxX = testRobot.maxCoordinatorX === testRobot.x;
    testRobot.report();


    //Place again at 0 4 West  
    testRobot.place(0, 4, 'W');
    //Test Zero X 
    while (testRobot.canMove()) {
        testRobot.move();
    }
    //This will fail, if not, x will be -1 
    testRobot.move();
    //check x is still 0
    succes.zeroX = 0 === testRobot.x;

    var testSuccess = 0;
    var failedTest = "";
    var testResult = "";
    for (var prop in succes) {
        if (succes[prop] === false) {
            failedTest += '\n\r ' + prop + " Failed";
        }
        else {
            testSuccess += 1;
        }
    }
    if (failedTest === "") {
        alert('All Test Passed');
    }
    else {
        alert(testSuccess + " Passed out of " + Object.keys(succes).length + failedTest);
    }
} 