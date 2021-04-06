// Globally scoped variables
var resultDateEl = document.querySelector('#result-date');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');



// 
function writeResults(resultObj) {
    console.log(resultObj)

    // set up a <div> to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-dark', 'text-light');
    // will need to change some of the above style-wise since it's bootstrap

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultCard);

    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;

    var bodyContentEl = document.createElement('p');
    // This could change once we see what the API shows
    bodyContentEl.innterHTML = 
        '<strong>Date:</strong>' + resultObj.date + '<br/>';
    
    if (resultObj.artist) {
        bodyContentEl.innterHTML +=
        '<strong>Artist:</strong>' + resultObj.artist.join(', ') + '<br/>';
    }

    if (resultObj.description) {
        bodyContentEl.innterHTML +=
        '<strong>Description:</strong>' + resultObj.description[0];
    } else {
        bodyContentEl.innterHTML +=
        '<strong>Description:</strong>  No description for this event.';
        // should that be no description for this event or artist? Or nix it and use something else
    }

    // can add any other parts to a result tab that we need

    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Learn More';
    linkButtonEl.setAttribute('href', resultObj.url);
    linkButtonEl.classList.add('btn');

    resultBody.append(titleEl, bodyContentEl, linkButtonEl);

    resultContentEl.append(resultCard);
}


function searchBandsApi(query, format) {
    // nee to figure out what query(s) we need from them - this one is just searching for a specific artist's events (replace {{arist name}} with actual artist name - no punctuation needed between words in artist name)
    var bandsQueryUrl = 'https://rest.bandsintown.com/artists/{{artist_name}}/events/?app_id=bb8f8a9b8e2dcb483a539f7f29bcc2a5-id';

    if (format) {
        // this probably isn't right but it gives us an idea - figure out what the query is supposed to be
        bandsQueryUrl = 'https://rest.bandsintown.com/' + format + '';
    }
    // Should query be date? or genre or something?
    bandsQueryUrl = bandsQueryUrl + '' + query;

    fetch(bandsQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();   
            }
            return response.json
        })

        // bandsRes function should be blue???
        .then(function (bandsRes) {
            // except it won't be textContent since it's a date entered via datepicker
            resultDateEl.textContent = bandsRes.search.query;

            // might not be this because length isn't really a factor in datepicker. 
            // Basically make it so that if there are no concerts that day, it says no results found
            if (!bandsRes.results.length) {
                console.log('No results found!');
                resultContentEl.innerHTML = '<h4>No results found, search for another date!</h4>';
              } else {
                resultContentEl.textContent = '';
                for (var i = 0; i < bandsRes.results.length; i++) {
                  writeResults(bandsRes.results[i]);
                }
              }

            }

        })


}



// click events function(s)
function handleSearchFormSubmit (event) {
    event.preventDefault();

    var dateInputVal = document.querySelector('#date-input');
    // any other variables we use for searching (i.e. genre, location, etc.)

    if (!dateInputVal) {
        console.error('You must select a date!');
        return;
    }
    // add any other variabel here for searching API
    searchBandsApi(dateInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


// local storage