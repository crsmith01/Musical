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

             }
            });   
        }
            //console.log(artist);
    })
};
artistSearch.addEventListener('click', getCity);

var search = document.querySelector('.city');
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