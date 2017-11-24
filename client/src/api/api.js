import axios from 'axios';

const getIngredients = function(){
    // console.log('weve entered step 2')
    return axios.get('http://localhost:3000/api/ingredients')
    .then(ingredients => {
        // console.log('back on the FE, the ingredients data is', ingredients.data)
        return ingredients.data;
    });
}

const checkRecipe = function(selectedIngredients){
    // console.log('weve entered the FE api file');
    // console.log('weve entered the FE api file', selectedIngredients);
    
    return axios.post('http://localhost:3000/api/recipe', selectedIngredients)
    .then(response => {
        // console.log('were back at the api file on the FE')
        // console.log('the response is', response.data)
        return response.data;
    });

}

export {getIngredients};
export {checkRecipe};