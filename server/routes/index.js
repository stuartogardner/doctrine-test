var express = require('express');
var router = express.Router();
const ingredients = require('../ingredients');
const recipes = require('../recipes');
const isValidRecipe = require('../lab');

/* GET home page. */
router.get('/api/ingredients', function(req, res, next) {
  // console.log('were server side');
  // console.log(ingredients);
  res.json(ingredients);
});

router.post('/api/recipe', function(req, res, next){
  // console.log('we made it server side');
  // console.log('the recipes are', recipes)
  // console.log('the post contains', req.body);
  let selectedIngredients = req.body;
  res.json(isValidRecipe(selectedIngredients));
})

module.exports = router;
