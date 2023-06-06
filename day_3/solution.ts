import {promises as fs} from 'fs';

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

function convToPrio(item: string): number {
    let convItem = item.charCodeAt(0);
    if (convItem <= 'Z'.charCodeAt(0)) {
        convItem -= 38;
    }
    else {
        convItem -= 96;
    }
    return convItem;
}

function checkDuplicateChars(str1: string, str2: string): string {
    let dupeMap = new Map();
    Array.from(str1).map((char) => dupeMap.set(char, true));
    for (let i = 0; i < str2.length; i++) {
        let currChar = str2.charAt(i);
        if (dupeMap.get(currChar) != undefined) {
            return currChar;
        }
    }
    throw "No match";
}

function getHalf(string: string) {
  let x: number;
  if (string.length % 2 == 0) {
    x = (string.length / 2);
  } else {
    x = (string.length / 2) - 1;
  }
  return x; 
}


async function solution_1() {
    const data = split(await readInput("input"));
    return data.reduce((acc, value) => {
        const middle = getHalf(value);
        const dupe = checkDuplicateChars(value.substring(0, middle), value.substring(middle));

        console.log(dupe + ": " + convToPrio(dupe));
        return acc + convToPrio(dupe);
    }, 0);
}

async function solution_2() {
    const data = split(await readInput("input"));
    let currGroupLen = 0;
    let currGroupMap = new Map();
    let sum = 0;

    //this is disgusting but it works :/
    for (let i = 0; i < data.length; i++) {
        currGroupLen += 1;
        const currentBackpack = data[i];
        const currentBackpackMap = new Map();

        Array.from(currentBackpack).map((val) => { 
            let currEntry = currentBackpackMap.get(val);
            if (currEntry === undefined) {
                currEntry = currGroupMap.get(val);
                if (currEntry === undefined) {
                    currEntry = 0;
                }
                currGroupMap.set(val, currEntry+=1);
            }
            currentBackpackMap.set(val, true);
        });

        if (currGroupLen == 3) {
            currGroupMap.forEach((val, key) => {
                if (val == 3) {
                    sum += convToPrio(key);
                }
            });
            currGroupMap.clear();
            currGroupLen = 0;
        }
    }
    return sum;
}

//solution_1().then((sol) => console.log(sol));
solution_2().then((sol) => console.log(sol));
