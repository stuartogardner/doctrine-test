const recipes = require('./recipes');

// console.log('it enters here, the recipes are',recipes);

const isValideRecipe = function(ingredients){
    let sortedArray = ingredients.sort();
    // console.log('the sorted array is', sortedArray);
    let foundRecipe = [];
    let recipesToTest = Object.entries(recipes);
    // console.log('the recipes to test are', recipesToTest);
    recipesToTest.map((recipe) => {
        // console.log('the recipes being mapped are', recipe[1].sort().join());
        if(recipe[1].sort().join() === sortedArray.join()){
            // console.log('yyyyyeah, its a mathc');
            foundRecipe.push(recipe[0]);            
        } 
    })
    // console.log('the found recipe is', foundRecipe[0]);
    return foundRecipe.length>0 ? foundRecipe[0] : 'fail';
}

// isValideRecipe(['coconut', 'wine', 'cheese']);

module.exports = isValideRecipe;

