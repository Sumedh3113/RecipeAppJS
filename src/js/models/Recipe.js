import axios from 'axios'
import {key, proxy } from '../config'


export default class Recipe {
    constructor(id) {
        this.id = id;

    }


    async getRecipe() {
        
            // here we use /get as mentioned on api site 
            // only these properties will be assigned to object from all the properties
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            //console.log(this.results);

        } catch (e) {
            alert(e);
        }

    }
calTime(){    
    const numIng = this.ingredients.length;
    const period = Math.ceil(numIng/3);
    this.time = period * 15;
}

calcServing(){
        this.servings = 4;
}
   
// parsing i.e formating the ingredients
parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                
                /* every element present in ingredients string which is also 
                in unitsLong array replace it with unitsShort value*/
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses using regular expression
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            // find present units(i.e ounce, tablespoon etc) in  units array and get index of that in arrIng array
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            // it will store occurence index of unit i.e 4 cups index is 1 for 4 1/2 cups index is 2
 
            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                // this means there is only 1 number before the unit
                if (arrCount.length === 1) {
                    // as some ingredients have 1 - 1/2 which should be 1 1/2
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    // join 4 1/2 as "4+1/2" which will be evaluated as 4.5
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                // , 10 is base 
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ') // start with 1st position and join elements till the end
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient    
                }
                 //in above object when its just tomato then return 1 tomato
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }

    
    
    

}
