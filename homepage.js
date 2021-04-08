var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './display-results.html' + searchInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);



var update = function () {
    $('#currentDay').text(moment().format('dddd, MMMM Do'));
    $('#currentTime').text(moment().format('h:mm:ss a'));
  };
  update();
  // Updates the time every second, so clock is is always up-to-date.
  setInterval(update, 1000);
