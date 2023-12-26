/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isAlphanumeric(str) {
  return str.match(/^[a-zA-Z0-9]+$/) !== null;
}

function isPalindrome(str) {
  let newStr = "";
  for(let i = 0; i < str.length; ++i) {
    if(isAlphanumeric(str[i])) {
      newStr = newStr + str[i];
    }
  }

  let length = newStr.length;
  for(let i = 0; i < length/2; i++) {
    if(newStr[i].toLowerCase() != newStr[length-1-i].toLowerCase()) {
      return false;
    }
  }
  return true;
}

console.log(isPalindrome('nAN'));
console.log(isPalindrome('Able, was I ere I saw Elba!'));
console.log(isPalindrome('NAaN'));
console.log(isPalindrome('a man a plan a canal panama'));

module.exports = isPalindrome;
