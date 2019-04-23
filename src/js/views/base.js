export const elements = {
    searchInput: document.querySelector('.search'),
    searchField: document.querySelector('.search__field'),
    searchres: document.querySelector('.results'),
    searchList: document.querySelector('.results__list'),
    searchResPage: document.querySelector('.results__pages')



};


export const renderLoader = parent => {
    const loader = `
            <div class= 'loader'>
                <svg>
                <use href="img/icons.svg#icon-cw"></use>
                </svg>

                </div>

            `;

    parent.insertAdjacentHTML('afterbegin', loader);

}

export const clearLoader = () =>{
    //as loader class is added after search button is clicked
    const loader = document.querySelector('.loader');
    if(loader) loader.parentNode.removeChild(loader)
    
    
}