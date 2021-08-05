const express = require('express')
const Recipe = require('../models/recipe-model')
const router = express.Router()

getRecipeById = async (req, res) => {
  await Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      return res.status(200).json({ success: true, data: recipe })
  }).catch(err => console.log(err))
}

getRecipes = async (req, res) => {
  await Recipe.find({}, (err, recipes) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!recipes.length) {
          return res
              .status(404)
              .json({ success: false, error: `Recipe not found` })
      }
      return res.status(200).json({ success: true, data: recipes })
  }).catch(err => console.log(err))
}


router.get('/recipes', getRecipes)
router.get('/recipe/:id', getRecipeById)

module.exports = router
