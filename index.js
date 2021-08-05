const express = require('express')
const cors = require('cors')
const path = require('path');
const passport = require("passport");
const db = require('./db')
const recipeRouterGet = require('./routes/recipe-router-get')
const recipeRouterPost = require('./routes/recipe-router-post')
const users = require("./routes/users");
const app = express()
const apiPort = 5000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use(passport.initialize());// Passport config
require("./db/passport")(passport);// Routes

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', recipeRouterGet)
app.use('/api/post', passport.authenticate('jwt', { session: false}), recipeRouterPost);

app.use('/users', users);





app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
