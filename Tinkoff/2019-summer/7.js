const inputData = 
`3
3 3
2 2
1 1`

Да ну в жопу такие задачи. Их только через ChatGPT. 

function method(str) {
    let treesConfig = str.split(`\n`)
    const countOfTrees = str.shift()
    treesConfig = treesConfig.map(tree => {
        const arr = tree.split(" ")
        return {partsCount: arr[0], smallest: arr[1]}
    })

    
}


console.log(method(inputData))