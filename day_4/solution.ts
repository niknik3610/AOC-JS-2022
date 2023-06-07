import { promises as fs} from "fs";

const readInput = async (filePath: string) => {
    try {
        const data = await fs.readFile(filePath);
        return data.toString();
    }
    catch (error){
        throw error;
    }
}

const toArray = (input: string): string[] => {
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

function findRange(item: string) {
    let currString = '';
    let currChar = 0;
    
    while(item.at(currChar)!= '-') {
        currString += item.at(currChar);
        currChar += 1;
    }
    let numOne = parseInt(currString);
    currChar += 1;
    currString = '';

    for (currChar; currChar < item.length; currChar++) {
        currString += item.at(currChar);
    }

    let numTwo = parseInt(currString);

    let rangeArray: number[] = [];
    for (let i = numOne; i <= numTwo; i++) {
        rangeArray.push(i);
    }

    return rangeArray;
}

async function solution_one() {
    const data = toArray(await readInput('input')); 
    let sum = data.reduce((acc, line) => {
        const currLine = line.split(',');
        const currLineRange = currLine.map((input) => findRange(input));

        let result = currLineRange[0].some((element) => {
            return !currLineRange[1].find(toFind => toFind == element);
        });
        if (!result) {
            return acc += 1;
        }

        result = currLineRange[1].some((element) => {
            return !currLineRange[0].find(toFind => toFind == element);
        });
        if (!result) {
            acc+=1;
        }

        return acc;
    }, 0);
    return sum;
}

async function solution_two() {
    const data = toArray(await readInput('input')); 
    let sum = data.reduce((acc, line) => {
        const currLine = line.split(',');
        const currLineRange = currLine.map((input) => findRange(input));

        let result = currLineRange[0].some((element) => {
            return currLineRange[1].find(toFind => toFind == element);
        });
        if (result) {
            return acc += 1;
        }

        result = currLineRange[1].some((element) => {
            return currLineRange[0].find(toFind => toFind == element);
        });
        if (result) {
            acc+=1;
        }

        return acc;
    }, 0);
    return sum;
}

// solution_one().then((sol) => console.log(sol))
solution_two().then((sol) => console.log(sol))
