function solution(string) {
    let words = string.split(`\n`)
    words.shift()
    words = words.map(word => {
        let alphabet = {}
        for (let ch of word) {
            if (alphabet.hasOwnProperty(ch)) alphabet[ch]++
            else alphabet[ch] = 1
        }
        for (let ch in alphabet) {
            if (alphabet[ch] != 2) return "No"
        }
        return "Yes"
    });
    return words.join(`\n`)
}

console.log(solution(`1\nABBA\nMASW\nAAWW`))