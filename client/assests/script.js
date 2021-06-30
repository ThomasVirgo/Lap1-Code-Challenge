const form = document.querySelector('form');
form.addEventListener('submit', getSearchResults);

const results = document.getElementById('results');

const luckyBtn = document.getElementById('lucky');
luckyBtn.addEventListener('click', openNewPage);

async function getSearchResults(event){
    event.preventDefault();
    let input = event.target.search.value;
    console.log(input);
    let response = await fetch(`http://localhost:3000/${input}`);
    let responseJson = await response.json();
    addResults(responseJson);
    console.log(responseJson);
}

function addResults(resultsArray){
    results.innerHTML = ''; //clear previous results
    resultsArray.forEach(result => createResultEntry(result));
}

function createResultEntry(result){
    //CONTAINER
    let div = document.createElement('div');
    div.className = 'result';

    //TITLE
    let title = document.createElement('h2');
    title.className = 'result-title';
    title.textContent = result.title;
    div.appendChild(title);
    
    //DESCRIPTION
    let description = document.createElement('p');
    description.className = 'result-description';
    description.textContent = result.description;
    div.appendChild(description);

    //IMAGE
    
    if (result.thumbnail){
        let image = document.createElement('img');
        image.className = 'result-image';
        image.setAttribute("src", result.thumbnail);  
        div.appendChild(image);
    }

    //APPEND CONTAINER TO RESULTS CONTAINER
    results.appendChild(div);
}

function openNewPage(){
    let input = form.search.value;
    let trimmedInput = input.trim(); //remove any whitespace at both ends
    let dashInput = trimmedInput.split(' ').join('_');
    window.open(`https://en.wikipedia.org/wiki/${dashInput}`);
}


