
const movies = require('../src/data');
const array = [...movies]
// Exercise 1: Get the array of all directors.
function getAllDirectors(array) {
  let result = array.map(m => m.director)
  // console.log("EXERCICE 1 ->", result);
  return result;
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  const DIRECTOR_FILMS = array.filter(m => m.director == director);
  // console.log("EXERCICE 2 ->", DIRECTOR_FILMS)
  return DIRECTOR_FILMS
}

// Exercise 3: Calculate the average of the films of a given director.
function moviesAverageOfDirector(array, director) {
  // filtering director's movies to receive a new array with director movies objects
  // const DIRECTOR_FILMS=getMoviesFromDirector(array,director);
  const DIRECTOR_FILMS = array.filter(m => m.director == director);
  const INITIAL_VALUE = 0;
  //applying reduce method to sum scores in each movie
  const SCORE_SUM = DIRECTOR_FILMS.reduce(
    (prevScore, currentScore) => prevScore + currentScore.score, INITIAL_VALUE
  );
  // dividing reduced scored by movie's quantity at DIRECTOR_FILMS array
  const SCORE_AVRG = Math.round((SCORE_SUM / DIRECTOR_FILMS.length) * 100) / 100;
  console.log("EXERCICE 3 ->", SCORE_AVRG);
  return SCORE_AVRG
}

// Exercise 4:  Alphabetic order by title 

function orderAlphabetically(array) {
  const copyArray = [...array];
  // sorting comparing in each iteration if current movie is bigger than previous one (because is a string ow a-b).
  const ALPHABETICAL_TITLES = copyArray.sort(function (movieA, movieB) {
    // return movieA.title.toLowerCase() === movieB.title.toLowerCase() ? 0 : movieA.title.toLowerCase() < movieB.title.toLowerCase() ? -1 : 1;

    // because of non-ASCII characters(not just english movies)
    return movieA.title.toLowerCase().localeCompare(movieB.title.toLowerCase())
  });
  // getting just the titles
  const ALL_TITLES = ALPHABETICAL_TITLES.map(m => m.title);
  // geting the TOP "20"
  const FIRST_20_TITLES = ALL_TITLES.slice(0, 20);

  console.log("EXERCICE 4 ->", FIRST_20_TITLES);

  return FIRST_20_TITLES;
}


// Exercise 5: Order by year, ascending
function orderByYear(array) {
  const copyArray = [...array];
  const ASCENDING_YEARS = copyArray.sort(function (movieA, movieB) {
    // because years are numbers, sort should be a fc where I substract b from a (except if A === B where I should compare)
    return movieA.year === movieB.year ? movieA.title.toLowerCase().localeCompare(movieB.title.toLowerCase()) : movieA.year - movieB.year
  });
  console.log("EXERCICE 5 (first 5 movies) ->", ASCENDING_YEARS.slice(0, 4));

  return ASCENDING_YEARS;
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(movies, genre) {
  const MOVIES_BY_GENRE = movies.filter(movie => movie.genre.includes(genre));
  const GENRE_AVERAGE = moviesAverage(MOVIES_BY_GENRE);
  return GENRE_AVERAGE
}
// Since Exercici 3 is the average  of 'X' director movies I created a new fc to calculate the avrg
function moviesAverage(MOVIES_BY_GENRE) {
  const INITIAL_VALUE = 0;
  const MOVIES_UNSCORED = [];
  console.log(MOVIES_BY_GENRE.length)
  MOVIES_BY_GENRE.map(movie => movie.score == '' ? MOVIES_UNSCORED.push(movie) : movie)
  console.log(MOVIES_BY_GENRE.length)
  //applying reduce method to sum scores in each movie
  const SCORE_SUM = MOVIES_BY_GENRE.reduce(
    (prevScore, currentScore) => prevScore + (currentScore.score == '' ? 0 : currentScore.score), INITIAL_VALUE
  );
  // dividing reduced scored by movie's quantity at DIRECTOR_FILMS array
  const SCORE_AVRG = Math.round((SCORE_SUM / (MOVIES_BY_GENRE.length - MOVIES_UNSCORED.length)) * 100) / 100;

  return SCORE_AVRG
}


// Exercise 7: Modify the duration of movies to minutes

function hoursToMinutes(movies) {
  // deep copy! otherwise movies.duration will be updated
  const CLONED_ARR = JSON.parse(JSON.stringify(movies));

  // Loop to change duration from string to new calculation(number in minutes)
  CLONED_ARR.forEach((movie) => {

    if (isNaN(movie.duration)) {
      let durationNumber = getTotalDuration(movie.duration.toString());
      movie.duration = durationNumber;
    }
  });

  return CLONED_ARR
}
// fc to clean, cut, and get numbers from string
function getTotalDuration(duration) {
  let totalMinutes = 0;
  const ANY_NUMBER = /\d+/;

  // variables to clean string and get numbers
  const STRING_TO_ARRAY = duration.split('');
  const ARRAY_OF_NUMBERS = STRING_TO_ARRAY.filter(character => character.match(ANY_NUMBER));

  // variables to convert to numbers
  const HOURS = parseInt(ARRAY_OF_NUMBERS[0]);
  const GET_MINUTES = ARRAY_OF_NUMBERS.slice(1);
  const MINUTES = parseInt(ARRAY_OF_NUMBERS.length > 1 ? GET_MINUTES.join('') : 0);

  // ternary to check if hours are 0
  HOURS == 0 ? totalMinutes = MINUTES : totalMinutes = HOURS * 60 + MINUTES

  return totalMinutes
}

// Exercise 8: Get the best film of a year
function bestFilmOfYear(array, year) {

  const MOVIES_BY_YEAR = array.filter(movies => movies.year === year);

  let moviesByScore = MOVIES_BY_YEAR.sort((movieA, movieB) => movieA.score - movieB.score);

  let getBestScored = [];
  getBestScored.push(moviesByScore[moviesByScore.length - 1])

  return getBestScored;
}


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear,
  };
}

