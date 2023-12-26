/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/


function isAnagram(str1, str2) {
  if(str1.length != str2.length) {
    return false;
  }

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  let map1 = {};
  let map2 = {};

  for (let i=0;i<str1.length; ++i) {
    // console.log(str1[i], map1[str1[i]])
    map1[str1[i]] = map1[str1[i]] ? map1[str1[i]] + 1 : 1 ;
    // console.log(str1[i], map1[str1[i]])
    map2[str2[i]] = map2[str2[i]] ? map2[str2[i]] + 1 : 1;
  }

  // console.log(map1.entries);

  for(let i=0; i<str1.length; ++i) {
    // console.log(map1[str1[i]], map2[str1[i]]);
    if (map1[str1[i]] != map2[str1[i]]) {
      return false;
    }
  }

  return true;
}

console.log(isAnagram("apple", "alppe"));
console.log(isAnagram("abcd", "abcc"));
console.log(isAnagram("rick", "cirk"));
console.log(isAnagram("apple", "alppadfe"));
console.log(isAnagram("", ""));

module.exports = isAnagram;
