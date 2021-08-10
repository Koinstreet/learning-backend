const express = require("express");
import passport from 'passport';
const {
  successWithData,
  successNoData,
} = require("../utils/successHandler");
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
const router = express.Router();
import socialAuth from '../controllers/v1/socialAuth'
//google routes

router.post("/googleLogin", socialAuth.googleLogin);

router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
  }));
  
  router.get("/auth/google/redirect",passport.authenticate("google"),(req,res)=>{
    res.send(req.user);
  });

  //logout route

  router.get("/auth/logout", (req, res) => {
    req.logout();
    res.send(req);
  });

  //facebook route
  router.get('/auth/facebook',passport.authenticate('facebook' ,{ scope : ['email', 'public_profile'] }));
  router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    res.send(req);
    successWithData(res, OK, "Logged in successfully", req.user);
  });

  //github routes

  router.get('/auth/github',
  passport.authenticate('github'));

  router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    res.send(req);
    successWithData(res, OK, "Logged in successfully", req.user);
  });

// linkedin routes

router.get('/auth/linkedin',
  passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    res.send(req);
    successWithData(res, OK, "Logged in successfully", req.user);
  });

module.exports = router;
