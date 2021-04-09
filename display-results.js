// Globally scoped variables
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');


// not sure if we need this???
function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search

  // Get the query and format values
  var query = searchParamsArr[0].split('=').pop();'"'

  searchYouTubeApi(query);
}


// YouTube API set up 
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






function searchYouTubeAPI (query) {
  var result = document.
  // trying to get the artist name from Randy's ticketmaster API results
  const currentEvent = JSON.parse(localStorage.getItem("artistName") || "{}");

  // var requestYouTubeUrl = '  https://youtube.googleapis.com/youtube/v3/youtube.search.list?part=snippet&order=viewCount&q=skateboarding+dog&type=video&videoDefinition=high';
  var requestYouTubeUrl = '  https://youtube.googleapis.com/youtube/v3/youtube.search.list?part=snippet&order=viewCount&q=' + currentEvent + '&type=video&videoDefinition=high';

  fetch (requestYouTubeUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json(;
      })
    .then(function (youtubeResults) {
      resultTextEl.textContent = youtubeResults.search.query;
      console.log(youtubeResults);

      if (!youtubeResults.results.length) {
        console.log('No results found for this artist!');
        resultContentEl.innerHTML = '<h3>No results found for this artist, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < youtubeResults.results.length; i++) {
          printResults(youtubeResults.results[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });




// YouTube API parameters explained:
// Calls the search.list method to find the most viewed, high-definition (HD) videos associated with the query. The query sets the order, part, q, type, and videoDefinition parameters.
// part = snippet = The part parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet.
// order = viewCount = by most viewed (video with most views appears first) - idea is that the most popular videos for that artist appear
// q = query = here we use the artist that resulted in the Ticketmaster API search
// type = video
// &videoDefinition = high
// key = developer API key




// Function to print the results to the results page
function printResults(resultObj) {
  console.log(resultObj)

  // set up a <div> to hold the result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card-content');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-content');
  resultCard.append(resultCard);

  var titleEventEl = document.createElement('h3');
  titleEventEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
// traversing through what the API gives us (title and description of video = will not show actual video)
  bodyContentEl.innterHTML =   
    if (resultObj.items.snippet.title) {
        bodyContentEl.innterHTML +=
        '<strong>Artist:</strong>' + resultObj.items.snippet.title.join(', ') + '<br/>';
    }

    if (resultObj.items.snippet.description) {
        bodyContentEl.innerHTML +=
        '<strong>Description:</strong>' + resultObj.items.snippet.description[0] + '<br/>'];
    } else {
        bodyContentEl.innerHTML +=
        '<strong>Description:</strong>  No description for this event.'  + '<br/>';
    }


// parts to traverse to and use and display from the youtube API
// items.snippet.title;
// items.snippet.description;
// items.snippet.channelTitle;



//  link to external site:
//   var linkButtonEl = document.createElement('a');
//   linkButtonEl.textContent = 'Popular YouTube Video for Artist';
//   linkButtonEl.setAttribute('href', resultObj.url);
//   linkButtonEl.classList.add('btn');
// resultBody.append(titleEl, bodyContentEl, linkButtonEl);



  resultBody.append(titleEl, bodyContentEl);

  resultContentEl.append(resultCard);
}




// The below I think was moved to the homepage.js or script.js = whichever we're using = pretty sure Randy's is the one we're going wtih
// click events function(s)
var searchFormEl = document.querySelector('#search-form');

// Function to submit form
function handleSearchFormSubmit(event) {
  event.preventDefault();

  // trim() method to eliminate extra space typed in by user
  var searchInputVal = document.querySelector('#search-input').value.trim();

  // Conditional to ensure there is a value searched
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  console.log('worked!')

  // In future, add function for spell checking

  // Redirects to the results page
  var queryString = './display-results.html?q=' + searchInputVal;

  location.assign(queryString);
}
// Event listener 
searchFormEl.addEventListener('click', handleSearchFormSubmit);
