// how 
// Global app controller
//https://www.food2fork.com/api/search
import Search from './models/Search';
import Recipe from './models/Recipe'
import * as SearchView from './views/SearchView';
import * as RecipeView from './views/RecipeView'
import { elements,renderLoader,clearLoader } from './views/base';


const state ={}


const controlSearch = async () =>{
    
    const query = SearchView.getInput();
    
    if(query){
        // Search item
        state.search = new Search(query);
        
        //prepare UI 
        /*we can call these functions from here as other computations are happening inside Search.js and below we are just fetching results from Search.js*/
        SearchView.clearInput();
        SearchView.clearResult();
        renderLoader(elements.searchres);
        
        try{
        //wait for result
        await state.search.getResults();
        // inside base.js
        clearLoader();
        //pass value to search view to display on screen
        // will work for first page for next see below
        SearchView.renderResults(state.search.results);    
            
        }catch(e){
            alert("Error in control search");
            // i.e if the error occured just remove the loader icon
            clearLoader();
        }
        
    }
    
}

elements.searchInput.addEventListener('submit',e=>{
   e.preventDefault()
    controlSearch();
    
    
});

// function for pagination button "searchResPage" is class of parent element
elements.searchResPage.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    //console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto,10);
        SearchView.clearResult();// with added feature to clear buttons else all 3 will be displayed
        SearchView.renderResults(state.search.results, goToPage);
       // console.log(goToPage);
    }  
    
    
})


/*
Recipe controller
*/

//const r = new Recipe(47746);
//r.getRecipe()
//console.log(r)

const controlRecipe = async () =>{
    
    const id = window.location.hash.replace('#','');
    
    if(id){
        // Search item
        state.recipe = new Recipe(id);
        
        //prepare UI 
        
        
        
        try{
            //wait for result and parse ingredients
        await state.recipe.getRecipe();
            // parsing the ingredients
        state.recipe.parseIngredients()
            
    //cal serving time
        state.recipe.calcServing();
        state.recipe.calTime();
        
    // display result 
        console.log(state.recipe);       
            
        }catch(e){
            alert("error in process Recipe");
            
        }
    
    
    }
    
}


//window.addEventListener('hashchange', controlRecipe);

['hashchange', 'load'].forEach(event =>window.addEventListener(event, controlRecipe));











