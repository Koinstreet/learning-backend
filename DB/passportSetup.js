/* eslint-disable */
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import cookieSession from 'cookie-session';
import 'dotenv/config';
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const User = require("../model/v1/User");

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
});
  

// google social auth

passport.use(new GoogleStrategy({
  clientID: '560139434715-36o7v8kif9lfp2s7sc99o6cfmtshrpre.apps.googleusercontent.com',
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'https://koinstreet-learn-api.herokuapp.com/auth/google/redirect',
},
(accessToken, refreshToken, profile, done) => {
      // passport callback function
      //check if user already exists in our db with the given profile ID
      var providerData = profile._json;
      
      User.findOne({googleId: profile.id}).then((currentUser)=>{
        if(currentUser){
          //if we already have a record with the given profile ID
          done(null, currentUser);
        } else{
             //if not, create a new user 
            new User({
              googleId: profile.id,
              firstName: profile.name.familyName,
              lastName: profile.name.givenName,
              email: profile.emails[0].value,
              profilePicture: (providerData.picture) ? providerData.picture : undefined
            }).save().then((newUser) =>{
              done(null, newUser);
            });
        }})
    })
);


// facebook social auth


passport.use(
    new FacebookStrategy(
      {
        clientID: 460712018474173,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: 'https://koinstreet-learn-api.herokuapp.com/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'name','email', 'gender', 'picture.type(large)']
      },
      (accessToken, refreshToken, profile, done) => {

            User.findOne({facebookId: profile.id }).then((currentUser)=>{
          if(currentUser){
            //if we already have a record with the given profile ID
            done(null, currentUser);
          } else{
               //if not, create a new user 
              new User({
                facebookId: profile.id,
                firstName: profile.name.familyName,
                lastName: profile.name.givenName,
                email: profile.emails[0].value,
                profilePicture: profile.photos[0].value ? profile.photos[0].value : undefined
              }).save().then((newUser) =>{
                done(null, newUser);
              });
          }})
      }
    )
  );


  // github social auth

  passport.use(new GitHubStrategy({
    clientID: '903f1822e37b95f9fb87',
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://koinstreet-learn-api.herokuapp.com/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {

    User.findOne({githubId: profile.id}).then((currentUser)=>{
      if(currentUser){
        //if we already have a record with the given profile ID
        done(null, currentUser);
      } else{
           //if not, create a new user 
          new User({
            githubId: profile.id,
            firstName: profile.displayName.split(' ')[0],
            lastName: profile.displayName.split(' ')[1],
            email: profile._json.email || null,
            profilePicture: profile._json.avatar_url ? profile._json.avatar_url : undefined
          }).save().then((newUser) =>{
            done(null, newUser);
          });
      }})
  }
));

// linkedin social auth

passport.use(new LinkedinStrategy({
    clientID: '78d8zhef4ewsrp',
    clientSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: "https://koinstreet-learn-api.herokuapp.com/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
  },
  (accessToken, refreshToken, profile, done) => {

    User.findOne({LinkedinId: profile.id}).then((currentUser)=>{
        console.log(profile._json)
      if(currentUser){
        //if we already have a record with the given profile ID
        done(null, currentUser);
      } else{
           //if not, create a new user 
          new User({
            LinkedinId: profile.id,
            // firstName: profile.displayName.split(' ')[0],
            // lastName: profile.displayName.split(' ')[1],
            // email: profile._json.email || null,
            // profilePicture: profile._json.avatar_url ? profile._json.avatar_url : undefined
          }).save().then((newUser) =>{
            done(null, newUser);
          });
      }})
  }
));


export default passport;
