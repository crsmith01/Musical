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

    var titleEventEl = document.createElement('h3');
    titleEventEl.textContent = resultObj.title;

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
xs

function searchTMApi(query, format) {
    // nee to figure out what query(s) we need from them - this one is just searching for a specific artist's events (replace {{arist name}} with actual artist name - no punctuation needed between words in artist name)
    var ticketMasterQueryUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=3kk6GeYI33isq0pYrdZXtAzFOfgKit6A&locale=*&size='+ size, {
        cors: 'no-cors'
     }
     

    if (format) {
        // this probably isn't right but it gives us an idea - figure out what the query is supposed to be
        ticketMasterQueryUrl = 'https://app.ticketmaster.com' + format + '';
    }
    // Should query be date? or genre or something?
    ticketMasterQueryUrl = ticketMasterQueryUrl + '' + query;

    fetch(tickerMasterQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();   
            }
            return response.json
        })

        // ticketMasterRes function should be blue???
        .then(function (ticketMasterRes) {
            // except it won't be textContent since it's a date entered via datepicker
            resultDateEl.textContent = bandsRes.search.query;

            // might not be this because length isn't really a factor in datepicker. 
            // Basically make it so that if there are no concerts that day, it says no results found
            if (!ticketMasterRes.results.length) {
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


}:


// YouTubeAPi
// Not sure if we need this (next 15 of so lines of code), but the docs mentioned using a client library to make things easier for implementing the YouTube Data API
function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
      'apiKey': 'AIzaSyDxWSUOzk1HgiU8Rdb1gOwYJE3l-H6fACY'
    }).then(function() {
      // 3. Initialize and make the API request.
      return gapi.client.request({
        'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
      })
    }).then(function(response) {
      console.log(response.result);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  };
  // 1. Load the JavaScript client library.
  gapi.load('client', start);




// click events function(s)
function handleSearchFormSubmit (event) {
    event.preventDefault();

    var dateInputVal = document.querySelector('#date-input');
    // any other variables we use for searching (i.e. genre, location, etc.)

    if (!dateInputVal) {
        console.error('You must select a date!');
        return;
    }
    // add any other variable here for searching API
    searchTMApi(dateInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


// local storage
var artistSearchInputVal = document.getElementById("#asearch");
var dateSearchVal = document.getElementById("#datepicker");
// do whatever clickMeBtn we have here instead for the next 4 lines)
// var signUpButton = document.querySelector("#sign-up");

// signUpButton.addEventListener("click", function(event) {
//   event.preventDefault();
  
  // create user object from submission
  var user = {
    artistSearch: artistSearchInputVal.value.trim(),
    dateSearch: dateSearchVal.value.trim(),
  };

  // set new submission to local storage 
  localStorage.setItem("user", JSON.stringify(user));
});
