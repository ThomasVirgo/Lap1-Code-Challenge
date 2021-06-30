const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');
const { SearchResult } = require('./model')


//MIDDLEWARE
app.use(cors());
app.use(express.json());


//ROUTES
app.get('/:search', async (req,res) => {
    let searchTerm = req.params.search;
    let results = await googleSearch(searchTerm);
    res.json(results);
})

async function googleSearch(searchTerm){
    let maxChars = 500;
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=10&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    const searchString = encodeURI(rawSearchString);
    let response = await fetch(searchString);
    let responseJson = await response.json();
    if (responseJson.hasOwnProperty('query')){
        let results = responseJson.query.pages;
        let resultsArray = createResultsArray(results);
        return resultsArray;
    }
    return 'unable to retrieve results - sorry :( ';
}

function createResultsArray(results){
    let id = 1;
    let resultsArray = [];
    for (const key in results){
        let title = results[key].title;
        let description = results[key].extract;
        let thumbnail = results[key].hasOwnProperty('thumbnail') ? results[key].thumbnail.source : null;
        let result = new SearchResult(id, title, thumbnail, description);
        // console.log(title, description, thumbnail);
        resultsArray.push(result);
        id ++;
    }
    return resultsArray
}


module.exports = { app };