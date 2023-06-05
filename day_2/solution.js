//X = 1, Y = 2, Z = 3
//A/X = ROCK, B/Y = PAPER, C/Z = SCISSORS 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fs = require('fs').promises;
var readInput = function (filePath) { return __awaiter(_this, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.readFile(filePath)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.toString()];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
var split = function (input) {
    var currentLine = "";
    var currCharIndex = 0;
    var currChar = "";
    var splitString = [];
    while (currCharIndex < input.length) {
        currChar = input.at(currCharIndex);
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
};
var convMove = function (move) {
    switch (move) {
        case "A": //rock
            return 0;
        case "X":
            return 0;
        case "B": //paper
            return 1;
        case "Y":
            return 1;
        case "C": //scissors
            return 2;
        case "Z":
            return 2;
        default:
            throw "Invalid Move";
    }
};
var convWinState = function (state) {
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
};
var getWin = function (yourMove, opponentMove) {
    if ((convMove(yourMove) + 1) % 3 === convMove(opponentMove)) {
        return 0; //loss
    }
    else if (convMove(yourMove) === convMove(opponentMove)) {
        return 3; //draw
    }
    return 6; //win
};
var calculateSolution_one = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, sum;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readInput('input')
                    .then(function (data) { return split(data); })];
            case 1:
                data = _a.sent();
                sum = data.reduce(function (acc, value) {
                    var yourMove = value.at(2);
                    var oppMove = value.at(0);
                    return acc + getWin(yourMove, oppMove) + convMove(yourMove) + 1;
                }, 0);
                console.log(sum);
                return [2 /*return*/];
        }
    });
}); };
var calculateSolution_two = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, sum;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readInput('input')
                    .then(function (data) { return split(data); })];
            case 1:
                data = _a.sent();
                sum = data.reduce(function (acc, value) {
                    var oppMove = value.at(0);
                    console.log(oppMove);
                    var desiredState = convWinState(value.at(2));
                    var movePoints = -1;
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
                return [2 /*return*/];
        }
    });
}); };
//calculateSolution_one();
calculateSolution_two();
