const { assert } = require("chai")

function solution(string) {
    let alphabet = {}
    for (let ch of string) {
        if (alphabet.hasOwnProperty(ch)) {
            alphabet[ch]++
        } else {
            alphabet[ch] = 1
        }
    }
    let result = ""
    for (let ch in alphabet) {
        if (alphabet[ch] > 1) {
            result += ch
        }
    }
    return result
}

