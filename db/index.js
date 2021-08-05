const mongoose = require('mongoose')
const keys = require("./keys").mongoURI;

mongoose
    .connect(keys, 
    { useNewUrlParser: true,  useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db


mongoose
