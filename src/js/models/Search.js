import axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query;

    }


    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '859f648b6965be897c32f469cd4831bf';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.results = res.data.recipes;
            //console.log(this.results);

        } catch (e) {
            alert(e);
        }


    }

}
