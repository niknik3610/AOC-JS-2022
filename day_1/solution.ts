export {}
const fs = require('fs').promises;

class ElfSum {
    public elf: number;
    public amount: number;

    constructor(elfNum: number, amount: number) {
        this.elf = elfNum;
        this.amount = amount;
    }
}

async function readFile(path: String) {
    try {
        const data = await fs.readFile(path);
        return data.toString();
    } catch {
        throw "There was an error";
    }
}

function calculateSolution(input: String) {
    let sum = 0;
    let maxSum = [
        new ElfSum(0, 0),
        new ElfSum(0, 0),
        new ElfSum(0, 0),
    ];
    let currElf = 1;

    let currCharIndex = 0;
    let currWindow = "";

    while (currCharIndex < input.length) {
        let currChar = input.at(currCharIndex);
        if (currChar === '\n' && currWindow === "") {
            maxSum.reduce((acc, currValue) => {
                if (sum > currValue.amount) {
                    maxSum.splice(acc, 0, new ElfSum(currElf, sum));
                    maxSum.pop();
                    sum = 0;
                }
                return acc += 1;
            }, 0)            
            sum = 0;
            currElf += 1;
        }
        else if (currChar === '\n') {
            sum += +currWindow;
            currWindow = "";
        }
        else {
            currWindow += currChar;   
        }
        currCharIndex += 1; 
    }
    return maxSum.reduce((acc, val) => {
        return acc += val.amount;
    }, 0);
}

try {
    readFile("input")
    .then((input) => console.log(calculateSolution(input)));
} catch (e) {
    throw e;
}
