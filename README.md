# liri-node-app
A command line app using node.js that pulls data from 3 API's

### How it works
LIRI (Inspired from Apple's Siri), pulls data from Bands in Town API, Node Spotify and OMDB using npm packages and axios. You can get information on touring bands, movies and songs using this app.

Once the App runs (by navigating to the file's root and runnin node liri.js), you can choose among these 3 actions:
* concert-this <artist> (This will pull show dates of the artist if on tour)
* spotify-this-song <song> (This will give you info on the song provided)
* movie-this <movie> (This will give you info on the movie provided)
* do-what-it-says (This will run any of the previous commands from a random.txt file found in the same directory)
<h3>example: spotify-this-song thriller<h3>

Keep in mind that cloning this app would only let you pull data using concert-this and movie-this. You would need to create a .env file with your own Spotify Developer credentials. Also, mode nodules are not tracked on github, so make sure you install axios, moment, dotenv and spotify's npm.




