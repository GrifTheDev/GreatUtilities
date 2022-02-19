const mongoose = require('mongoose')

const reqNumber = {
    type: Number,
    required: true
}

const reqString = {
    type: String,
    required: true
}

const countingSchema = mongoose.Schema({
    _id: reqString,
    number: reqNumber,
    userID: reqString
})

module.exports = mongoose.model('counting-db', countingSchema)