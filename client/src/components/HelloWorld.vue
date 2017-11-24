<template>
  <div class="hello">
    <h2>Ingredients to choose from</h2>
    <ul v-for="ingredient in ingredients">
      <button v-if="selectedIngredients.indexOf(ingredient) === -1" @click="addIngredient(ingredient)">Add {{ingredient}}</button>
      <button v-else @click="removeIngredient(ingredient)">Remove {{ingredient}}</button>
    </ul>
    <h2 v-if="selectedIngredients.length===0">Please select three ingredients</h2>
    <h2 v-if="selectedIngredients.length===1">Please select two more ingredients</h2>
    <h2 v-if="selectedIngredients.length===2">Please select one more ingredient</h2>
    <h2 v-if="selectedIngredients.length>0">The ingredients you have selected are...</h2>
    <p v-for="selectedIngredient in selectedIngredients">{{selectedIngredient}}</p>
    <p class="error-message" v-if="error">{{error}}</p>
    <button :disabled="buttonState" @click="checkRecipe(selectedIngredients)">Click here to create your recipe</button>
    <p v-if="recipe!==null && recipe!=='fail'">You've created {{recipe.charAt(0).toUpperCase() + recipe.slice(1)}}</p>
    <p class="error-message" v-if="recipe==='fail'">That's not a valid recipe, try again</p>
  </div>
</template>

<script>
import {getIngredients} from '@/api/api';
import {checkRecipe} from '@/api/api';

export default {
  name: 'HelloWorld',
  data () {
    return {
      ingredients: [],
      selectedIngredients: [],
      error: null,
      buttonState: true,
      recipe: null,
    }
  },
  created() {
      // console.log('the get ingredients computed has been called');
      getIngredients()
      .then(response => {
        // console.log('back at the beginning', response)
        this.ingredients = response;
        });
  },
  methods: {
    addIngredient(ingredient){
      if(this.selectedIngredients.length<3){
        this.selectedIngredients.push(ingredient);
      } else {
        this.error = "You can only add three ingredients";
        setTimeout(()=> this.error = null, 3000);
      }
      if(this.selectedIngredients.length === 3){
        this.buttonState = false;
      }
    },
    removeIngredient(ingredient){
      this.selectedIngredients = this.selectedIngredients.filter((el) => el!==ingredient);
      this.selectedIngredients.length !==3 ? this.buttonState = true : null;
      this.recipe=null;
    },
    checkRecipe(selectedIngredients){
      // console.log('the ingreds are', selectedIngredients)
      checkRecipe(selectedIngredients)
    .then(response => {
      // console.log('recipe result', response);
      let splitResponse = response!=='fail' ? response.split(/(?=[A-Z])/).join(" ") : 'fail';
      this.recipe = splitResponse;
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.error-message{
  color: salmon;
}
</style>
