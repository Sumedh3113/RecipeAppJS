import { elements } from './base'


export const getInput = () => elements.searchField.value;

// clear the search field
export const clearInput = () => {
    elements.searchField.value = '';
    

}

// to make space for other search result else it will just append 2 results
export const clearResult = () =>{
    
    elements.searchList.innerHTML = '';
    elements.searchResPage.innerHTML = "";
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

//creating buttons
const CreateButton = (page, type)=>`
        <button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? page - 1 : page + 1 }>
                <span>${type==='prev' ? page - 1 : page + 1 }</span>    
                <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                    
                </button>                
`;

// function which will handle pagination
const renderButton = (page, numResults, resPerPage)=> {
    const pages = Math.ceil(numResults/resPerPage); // to round 4.5 to 5 pages
    // pages > 1 operations should occur only if pages are more than 1
    
    let button;// declare outside as we want to make it available in all 3 conditions
    if(page === 1 && pages > 1){
        // button to go to next page
        button = CreateButton(page, 'next')
        
    }else if(page < pages){
        // both sides
        button =`
            ${CreateButton(page,'prev')}
            ${CreateButton(page,'next')}
    
                `
    } else if(page === pages && pages > 1 ){
        // button to go to previous page
        button = CreateButton(page, 'prev');
    }
    
  elements.searchResPage.insertAdjacentHTML('afterbegin', button);  
};


export const renderResults = (recipes, page = 1, resPerPage=10) =>{
    // render results of current page
    // start from 0, 10,20
    const start = (page - 1)* resPerPage;
    // end at 10,20,30 as end is not included in slice
    const end = page * resPerPage;
    
    // pass each current value to above function
    recipes.slice(start, end).forEach(renderRecipes);
    
    // render pagination button 
    renderButton(page, recipes.length, resPerPage);
}