const form = document.querySelector('form');
form.addEventListener('submit', getSearchResults);
const results = document.getElementById('results');

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
    resultsArray.forEach(item => {
        let el = document.createElement('h3');
        el.innerHTML = item.title;
        results.appendChild(el);
    })
}


