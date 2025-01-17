const express = require('express');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

const app = express();

// Passport middleware setup
app.use(passport.initialize());

passport.use(new SteamStrategy({
    returnURL: 'https://cmreynolds1.github.io/:3000/auth/steam/return',
    realm: 'https://cmreynolds1.github.io/:3000/',
    apiKey: '9E20260FB398E3A01FCB284357ADAC97'
  },
  function(identifier, profile, done) {
    // Use the Steam ID or profile information as needed
    return done(null, profile);
  }
));

// Routes for Steam authentication
app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Route for the root path
app.get('/', (req, res) => {
    res.send(`
      <h1>Welcome to the Steam OpenID authentication demo!</h1>
      <p>Click <a href="/auth/steam">here</a> to sign in through Steam.</p>
    `);
  });

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on https://cmreynolds1.github.io/:${port}`);
});
