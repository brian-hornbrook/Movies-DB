const express = require('express')
const app = express()
const mongoose = require('mongoose')

// models
const Movie = require('./models/movies')

// routes
const movieRoutes = require('./routes/index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// connect to database
mongoose.connect('mongodb://localhost/Movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('database connected');
    })
    .catch(err => {
        console.log("didn't connect");
        console.log(err);
    })


app.use('/movies', movieRoutes)


app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3001, () => {
    console.log('Movies database on Port 3001');
})
