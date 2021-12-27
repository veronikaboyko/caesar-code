function isLetter(charCode) {
  return !(charCode < 65 || (charCode > 90 && charCode < 97) || charCode > 122);
}

function encrypt(data, shift) {
    let result = "";
    for (let i = 0; i < data.length; i++) {
        if (isLetter(data.charCodeAt(i)))
			result += encryptLetter(data[i], shift);
		else result += data[i];
    }
  return result;
}

function encryptLetter(letter, shift) {
	let alphLength = 26;
	let charCode = letter.charCodeAt(0);
	let firstCharCode;
	if (charCode <= 90) firstCharCode = 65;
	else firstCharCode = 97;
	shift = Number(shift);
	if (shift < 0) shift += alphLength;
	return String.fromCharCode(
		firstCharCode + ((charCode - firstCharCode + shift) % alphLength)
	);
}

exports.encrypt = encrypt;
exports.isLetter = isLetter;