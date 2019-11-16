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
     if (nodeArgs.length<4){
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