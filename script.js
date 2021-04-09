var cities = [];
var cityresults = [];


var update = function () {
    $('#currentDay').text(moment().format('dddd, MMMM Do'));
    $('#currentTime').text(moment().format('h:mm:ss a'));
  };
  update();

var artistSearch = document.getElementById('btn');
var size = 200;
function getCity(){
    var city = document.querySelector('.City').value; 
fetch(
    // Explain each parameter in comments below.
    'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=3kk6GeYI33isq0pYrdZXtAzFOfgKit6A&city=' + city + '&locale=*&classificationName=music&size='+ size, {
   cors: 'no-cors'
    }
  )
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
             //displayArtistRepo(data);
             console.log(data);
             // console.log(response);
             //console.log(response);
             var events = data._embedded.events;
             for (var i = 0; i<events.length; i++){
                var artist = events[i].name;
                console.log(artist);
               var results = document.querySelector('.results');
                var artistName = document.createElement('a');
                artistName.textContent = artist;
               results.appendChild(artistName);

               localStorage.setItem(artist, artist);


              //  This (next 5 lines of code) is what the AskBCS person was saying was needed to set the results of this API to local storage for use in the YouTube API 
              const obj = {
                id: data._embedded.events[0].id,
                name: data._embedded.events[0].name
              };
              localStorage.setItem("currentEvent", JSON.stringify(obj));
             }
            });   
        }
            //console.log(artist);
    })
};
artistSearch.addEventListener('click', getCity);

var search = document.querySelector('.City');
  var user = {
    artistSearch: search.value
  };


  // set new submission to local storage   

  function saveCity(){
   

    var city = document. querySelector('input').value;

     
    cities.push(city);

    localStorage.setItem("city", city);

    console.log(city + 'city');

  }


  
  function showResults(){
    var results = document.querySelector('.results');
    cityresults.push(results);

    

  }


  artistSearch.addEventListener('click', saveCity );
  artistSearch.addEventListener('click', showResults );





// This is partially redundant with what Randy has above for the button - let's take a look 
var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
// takes us to the next page BUT currently prevents us from seeing the results of Randy's API
  var queryString = './display-results.html?q=' + searchInputVal;

  locatin.assign(queryString);
}

searchFormEl.addEventListener('click', handleSearchFormSubmit);
