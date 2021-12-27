let { encrypt } = require("./encrypt");
let { isLetter } = require("./encrypt");
let { getFrequency } = require("./frequency");
let tableGlobalFrec = getFrequency();

function serializeString(str) {
  let result = new Map();
  let countLetters = 0;
  str = str.toLowerCase();
  for (let i = 0; i < str.length; i++) {
    if (isLetter(str.charCodeAt(i))) {
      result.set(
        str[i],
        result.get(str[i]) === undefined ? 1 : result.get(str[i]) + 1
      );
      countLetters++;
    }
  }
  for (let letter of result.keys()) 
    result.set(letter, (result.get(letter) / countLetters) * 100);
  return result;
}

function bestShift(tableCurrentFreq) {
	let difference = 0;
    let alphLength = 26;
    for (let letter of tableCurrentFreq.keys()) {
		difference += Math.abs(
			tableGlobalFrec.get(letter) - tableCurrentFreq.get(letter)
        );
    }
    difference = difference / alphLength;
  return difference;
}

function decrypt(data) {
	let alphLength = 26;
	let difference = [100, 0];
	for (let shift = 0; shift < alphLength; shift++) {
		let tempStr = encrypt(data, shift);
		tempStr = serializeString(tempStr);
		let tempMin = bestShift(tempStr);
		if (tempMin < difference[0]) {
			difference[0] = tempMin;
			difference[1] = shift;
		}
	}
	return [difference[1], encrypt(data, difference[1])];
}
exports.decrypt = decrypt;