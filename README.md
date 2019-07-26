# LIRI-Unit
LIRI is a Language Interpretation and Recognition Interface.

*It takes in an action request and an optional argument,
such as a movie-title, both using node's process.argv.

*Action requests include retrieving song information from Spotify API, movie information from OMDB and concert info from the Bands in Town API. Below are LIRI's action requests:

```
// Search for song <song name is optional>:
node liri.js spotify-this-song <song name>
![img](spotify-this-song-default.png)
![img](spotify-this-song-input.png)
```

```
// Search for concert:
node liri.js concert-this <band name>
![img](concert-this-input.png)
```

```
// Search for movie <movie name is optional>:
node liri.js movie-this <movie name>
![img](movie-this-default.png)
![img](movie-this-input.png)
```

*LIRI also calls out to a random text file that can include any action or argument. *LIRI'S action request for text file content is:

```
// Read from text file:
node liri.js do-what-it-says
![img](do-what-it-says.png)
```

*LIRI uses npm modules, moment, and dotenv for real-time data and privacy.