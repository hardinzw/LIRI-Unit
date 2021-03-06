//Required Files
require("dotenv").config();
var fs = require("fs");
var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotifyKeys = new Spotify(keys.spotify);


//User Input Commands
var command = process.argv[2];
var value = process.argv[3];

switch (command) {
    case "concert-this":
        bandInfo(value);
        break;

    case "spotify-this-song":
        if (value === undefined) {
            value = "the sign ace of base";
        }
        songInfo(value);
        break;

    case "movie-this":
        if (value === undefined) {
            value = "Mr. Nobody";
        }
        movieInfo(value);
        break;

    case "do-what-it-says":
        doWhat(value);
        break;
};

//Spotify Search
function songInfo(songName) {

    //Spotify API Call
    spotifyKeys.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=1', function (error, songResponse) {
        if (error) {
            return console.log(error);
        }
        console.log("\nSong Info:\n")
        console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
        console.log("Song: " + songResponse.tracks.items[0].name);
        console.log("URL: " + songResponse.tracks.items[0].preview_url);
        console.log("Album: " + songResponse.tracks.items[0].album.name);
    });
};

//Band Search
function bandInfo(bandName) {

    //Bands in Town API Call
    var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=e1cc64d4-2af7-47b1-84ac-e8ae19fcc1a3";

    axios.get(queryURL).then(
        function (bandResponse) {
            console.log("\nEvent Info:\n")
            console.log("Venue: " + bandResponse.data[0].venue.name);
            console.log("City: " + bandResponse.data[0].venue.city);
            console.log(moment(bandResponse.data[0].datetime).format("MM/DD/YYYY"));
            });
        };
    
//Movie Search
function movieInfo(movieName) {

    //Omdb API call
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=93d2b0c7";

    axios.get(queryURL).then(
        function (movieResponse) {
            console.log("\nMovie Info:\n")
            console.log("Title: " + movieResponse.data.Title);
            console.log("Year: " + movieResponse.data.Year);
            console.log("Rated: " + movieResponse.data.imdbRating);
            console.log("Rotten Tomatoes: " + movieResponse.data.Ratings[1].Value);
            console.log("Country: " + movieResponse.data.Country);
            console.log("Language: " + movieResponse.data.Language);
            console.log("Plot: " + movieResponse.data.Plot);
            console.log("Actors: " + movieResponse.data.Actors);
        });
    };

//Instructional function
function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var output = data.split(",");
        for (var i = 0; i < output.length; i++) {
            console.log("\n" + output[i]);
        };
    });
};











