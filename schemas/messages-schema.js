const mongoose = require('mongoose')

const reqNumber = {
    type: Number,
    required: true
}

const reqString = {
    type: String,
    required: true
}

const messageSchema = mongoose.Schema({
    _id: reqString,
    messages: reqNumber,
    bckUserID: reqString
})

module.exports = mongoose.model('message-db', messageSchema)