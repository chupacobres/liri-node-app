require("dotenv").config();

var fs = require("fs");

var axios = require("axios");

var keys = require("./key.js");

var moment = require("moment");

var Spotify = require("node-spotify-api");

var action = process.argv[2];

var value = "";
var valueArr = [];
var nodeArgs = process.argv;
for (var i = 3; i < nodeArgs.length; i++) {
    valueArr.push(nodeArgs[i]);
}
value = valueArr.join(" ");
handleUser(action, value);
function handleUser(action, value){
    

    switch (action) {
        case "concert-this":
            concertThis();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {

                console.log(response.data[i].venue.name + " in " + response.data[i].venue.city + ", " + response.data[i].venue.country + " on " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
            }
        },
        function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );
}
function spotifyThisSong() {
    if (nodeArgs.length < 4) {
        value = "amber";
    }
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    spotify
        .search({ type: 'track', query: value })
        .then(function (response) {
            console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("Release date: " + response.tracks.items[0].album.release_date);
            console.log("Preview URL: " + response.tracks.items[0].preview_url)
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movieThis() {
    if (nodeArgs.length < 4) {
        value = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + value).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log(response.data.Ratings[1].Source, response.data.Ratings[1].Value);
            console.log("Production Country(ies): " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
        },
        function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        console.log(data);

        var dataArr = data.split(",");

        console.log(dataArr);

        handleUser(...dataArr)
    });

}