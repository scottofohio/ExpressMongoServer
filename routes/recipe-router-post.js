const express = require('express')
const Recipe = require('../models/recipe-model')
createRecipe = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a recipe',
    })
  }

  const recipe = new Recipe(body)
  console.log(body);
  if (!recipe) {
    return res.status(400).json({ success: false, error: err })
  }

  recipe
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: recipe._id,
        message: 'Recipe created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Recipe not created!',
      })
    })
}

updateRecipe = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Recipe not found!',
      })
    }
    recipe
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: recipe._id,
          message: 'Recipe updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Recipe not updated!',
        })
      })
  })
}

deleteRecipe = async (req, res) => {
  await Recipe.findOneAndDelete({ _id: req.params.id }, (err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: `Recipe not found` })
    }

    return res.status(200).json({ success: true, data: recipe })
  }).catch(err => console.log(err))
}

const router = express.Router()

router.post('/recipe', createRecipe)
router.put('/recipe/:id', updateRecipe)
router.delete('/recipe/:id', deleteRecipe)

module.exports = router
