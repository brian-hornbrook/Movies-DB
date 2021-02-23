const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Movie = require('../models/movies')

// show
router.get('/', (req, res) => {
    Movie.find({})
        .then(movies => {
            res.render('index', { movies: movies })
        })
        .catch(err => {
            console.log("couldn't load movies");
            console.log(err);
        })

})

// new
router.get('/new', (req, res) => {
    res.render('new')
})
// create
router.post('/', (req, res) => {
    Movie.create({
        title: req.body.title,
        year: req.body.year
    })
    res.redirect('/movies')
})

// show
router.get('/:id', (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            res.render('show', { movie: movie })
        })
})

// edit
router.get('/:id/edit', (req, res) => {
    Movie.findByIdAndUpdate(req.params.id)
        .then(movie => {
            res.render('edit', { movie: movie })
        })
})

// update
router.post('/:id/edit', (req, res) => {
    Movie.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            year: req.body.year
        }
    )
        .then(
            res.redirect('/movies')
        )
})

// delete
router.post('/:id/delete', (req, res) => {
    Movie.findByIdAndDelete(
        req.params.id
    )
        .then(
            res.redirect('/movies')
        )
})

module.exports = router
