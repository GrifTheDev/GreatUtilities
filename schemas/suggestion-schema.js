const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const suggestionSchema = mongoose.Schema({
    _id: reqString,
    AuthorName: reqString,
    AuthorID: reqString,
    Suggestion: reqString,
    MessageID: reqString
})

module.exports = mongoose.model('suggestion-db', suggestionSchema)