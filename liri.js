//Required Files
require("dotenv").config();
var fs = require("fs");
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotifyKeys = new Spotify(keys.spotify);
var logFile = "./log.text";
var log = require('simple-node-logger').createSimpleLogger(logFile);
    log.setLevel("all");

//User Input Commands
var userInput = process.argv;
var inputTopic = process.argv[2];

switch (inputTopic) {
    case "concert-this":
        bandInfo();
        break;

    case "spotify-this-song":
        songInfo();
        break;

    case "movie-this":
        movieInfo();
        break;

    case "do-what-it-says":
        doWhat();
        break;
};

//Spotify Search
function songInfo() {
    var songName = "";
    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            songName = songName + "+" + userInput[i];
        }
        else {
            songName += userInput[i];
        };
    };

    //Spotify API Call
    spotifyKeys.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function (error, songResponse) {
        if (error) {
            return logOutput(error);
        }
        logOutput("\nSong Info:\n")
        logOutput("Artist: " + songResponse.tracks.items[0].artists[0].name);
        logOutput("Song: " + songResponse.tracks.items[0].name);
        logOutput("URL: " + songResponse.tracks.items[0].preview_url);
        logOutput("Album: " + songResponse.tracks.items[0].album.name);
    });
};

//Band Search
function bandInfo() {
    var bandName = "";
    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            bandName = bandName + "+" + userInput[i];
        }
        else {
            bandName += userInput[i];
        };
    };

    //Bands in Town API Call
    var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=e1cc64d4-2af7-47b1-84ac-e8ae19fcc1a3";

    axios.get(queryURL).then(
        function (bandResponse) {
            logOutput("\nEvent Info:\n")
            logOutput("Venue: " + bandResponse.data[0].venue.name);
            logOutput("City: " + bandResponse.data[0].venue.city);
            logOutput(moment(bandResponse.data[0].datetime).format("MM/DD/YYYY"));
        }
    );
};

//Movie Search
function movieInfo() {
    var movieName = "";

    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            movieName = movieName + "+" + userInput[i];
        }
        else {
            movieName += userInput[i];
        }

        //Omdb API call
        var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=93d2b0c7";

        axios.get(queryURL).then(
            function (movieResponse) {
                logOutput("\nMovie Info:\n")
                logOutput("Title: " + movieResponse.data.Title);
                logOutput("Year: " + movieResponse.data.Year);
                logOutput("Rated: " + movieResponse.data.imdbRating);
                logOutput("Rotten Tomatoes: " + movieResponse.data.Ratings[1].Value);
                logOutput("Country: " + movieResponse.data.Country);
                logOutput("Language: " + movieResponse.data.Language);
                logOutput("Plot: " + movieResponse.data.Plot);
                logOutput("Actors: " + movieResponse.data.Actors);
            });

    };
};

//Instructional function
function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return logOutput(error);
        }
        var output = data.split(",");
        for (var i = 0; i < output.length; i++) {
            logOutput(output[i]);
        };
    });
};

//Log output to .txt file
function logOutput(logText) {
    log.info(logText);
};










