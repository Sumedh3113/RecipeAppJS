import { elements } from './base'


export const getInput = () => elements.searchField.value;

// clear the search field
export const clearInput = () => {
    elements.searchField.value = '';

}

// to make space for other search result else it will just append 2 results
export const clearResult = () =>{
    
    elements.searchList.innerHTML = '';
    
}

const limitRecipeTitle=(title, limit = 17)=>{
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur)=>{
            if(acc + cur.length < limit){
        newTitle.push(cur);    
            
        }                    
            return acc + cur.length;                    
                                
                                }, 0);
    return `${newTitle.join(' ')}...`;
        
    }
    return title;
}
// this one is private funtion no need to export it
const renderRecipes = recipe =>{
    // no need to write html on one line as we are using template string
    const markup = `
        <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>

`
    elements.searchList.insertAdjacentHTML('beforeend',markup); 
    
}

export const renderResults = recipes =>{
    // pass each current value to above function
    recipes.forEach(renderRecipes);
}