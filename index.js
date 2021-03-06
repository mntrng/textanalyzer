const express = require('express'),
    app = express(),
    port = process.env.PORT || 3001
const cors = require("cors")

app.listen(port)
app.use(express.json())
app.use(cors())

console.log("Server started on " + port)

app.post("/analyze", (req, res) => {
    res.json(textAnalyzer(req.body.text))
})

const textAnalyzer = (text) => {
    const textWithoutSpaces = text.replace(/ /g, "")
    const words = text.replace(/\s*$/,"")

    const occurrences = [...cleanText(textWithoutSpaces)].reduce((dictionary, character) => {
        dictionary[character] = ++dictionary[character] || 1
        return dictionary
    }, {})
    
    const sortedOccs = Object.keys(occurrences).sort()
                             .reduce((acc, key) => {
                                 acc[key] = occurrences[key]
                                 return acc
                             }, {})
    
    const characterCount = Object.entries(sortedOccs)
                                 .map(([key, value]) => ({ [key]: value })
    )
    
    const textLength = {
        withSpaces: text.length,
        withoutSpaces: textWithoutSpaces.length
    }
    
    return {
        textLength,
        wordCount: words.split(" ").length,
        characterCount: characterCount
    }
}

const cleanText = (text) => {
    return text.toLowerCase().replace(/[^a-z]+/g, "")
}

module.exports = app