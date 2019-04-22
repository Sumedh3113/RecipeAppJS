// Global app controller
//859f648b6965be897c32f469cd4831bf 
//https://www.food2fork.com/api/search
import Search from './models/Search';
import * as SearchView from './views/SearchView';
import { elements } from './views/base';


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
        
        //wait for result
        await state.search.getResults();
        
        //pass value to search view to display on screen
        SearchView.renderResults(state.search.results);
    }
    
}

elements.searchInput.addEventListener('submit',e=>{
   e.preventDefault()
    controlSearch();
    
    
});


