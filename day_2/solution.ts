//X = 1, Y = 2, Z = 3
//A/X = ROCK, B/Y = PAPER, C/Z = SCISSORS 

const fs = require('fs').promises; 
const readInput = async (filePath: string) => {
    try {
        const data = await fs.readFile(filePath);
        return data.toString();
    }
    catch (error){
        throw error;
    }
}

const split = (input: string): string[] => {
    let currentLine = "";
    let currCharIndex = 0;
    let currChar = "";
    let splitString: string[] = [];


    while (currCharIndex < input.length) {
        currChar = input.at(currCharIndex)!; 
        if (currChar === '\n') {
            splitString.push(currentLine);
            currentLine = "";
        }
        else {
            currentLine += currChar;
        }

        currCharIndex += 1;
    }

    return splitString;
}

const convMove = (move: string) => {
        switch (move) {
            case "A":   //rock
                return 0;
            case "X":
                return 0;
            case "B":   //paper
                return 1;
            case "Y":
                return 1;
            case "C":   //scissors
                return 2;
            case "Z":
                return 2;
            default: 
                throw "Invalid Move";
        }
}

const convWinState = (state: string) => {
    switch (state) {
        case "X":
            return 0;
        case "Y":
            return 3;
        case "Z":
            return 6;
        default:
            console.log(state);
            throw "Invalid State";
    }
}

const getWin = (yourMove: string, opponentMove: string): number => {
    if ((convMove(yourMove) + 1) % 3 === convMove(opponentMove)) {
        return 0;   //loss
    }
    else if (convMove(yourMove) === convMove(opponentMove)) {
        return 3;   //draw
    }
    return 6;       //win
}

const calculateSolution_one = async () => {
    const data = await readInput('input')
    .then((data) => split(data));

    const sum = data.reduce((acc, value) => {
        const yourMove = value.at(2)!;
        const oppMove = value.at(0)!;
        return acc + getWin(yourMove, oppMove) + convMove(yourMove) + 1;
    }, 0);
    console.log(sum);
}

const calculateSolution_two = async () => {
    const data = await readInput('input')
    .then((data) => split(data));

    const sum = data.reduce((acc, value) => { 
        const oppMove = value.at(0)!;
        console.log(oppMove);
        const desiredState = convWinState(value.at(2)!);
        let movePoints = -1;

        if (getWin("X", oppMove) === desiredState) {
            movePoints = 1;
        } 
        else if (getWin("Y", oppMove) === desiredState) {
            movePoints = 2;
        }
        else if (getWin("Z", oppMove) === desiredState) {
            movePoints = 3;
        }

        console.log(desiredState + " " + movePoints);
        return acc + movePoints + desiredState;
    }, 0);
    console.log(sum);
}

//calculateSolution_one();
calculateSolution_two();
