const db = require("../../../DB/index");
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
const {
    successWithData,
    successNoData,
  } = require("../../../utils/successHandler");
const Jobs = require("../../../model/v1/Jobs");
const Location = require("../../../model/v1/Locations");
const Startup = require("../../../model/v1/Startups");
const User = require("../../../model/v1/User");
const Event = require("../../../model/v1/Events");

// Error
const AppError = require("../../../utils/appError");

exports.getSearch = async (req, res, next) => {
    try {
        if (!req.body.keyword) {
            console.log('Keyword field is needed!')
            let errors = "Keyword field is needed!";
              return AppError.validationError(res, BAD_REQUEST, errors);
        }
        
        let query = req.body.keyword ? req.body.keyword : '';

        
    
       const jobs = await Jobs.find({$or:[
        {job_title: {$regex:query, $options:'i'}},
        {location: {$regex:query, $options:'i'}},
        {job_industry: {$regex:query, $options:'i'}}
      ]}).populate("companyId")

      const events = await Event.find({$or:[
        {EventDescription: {$regex:query, $options:'i'}},
        {eventName: {$regex:query, $options:'i'}}
      ]}).populate("host")

      const chapter = await Location.find({$or:[
        {description: {$regex:query, $options:'i'}},
        {location: {$regex:query, $options:'i'}},
        {LocationName: {$regex:query, $options:'i'}}
      ]})

      
      const startups = await Startup.find({$or:[
        {about: {$regex:query, $options:'i'}},
        {location: {$regex:query, $options:'i'}},
        {vision: {$regex:query, $options:'i'}},
        {roadmap: {$regex:query, $options:'i'}},
        {name: {$regex:query, $options:'i'}}
      ]})

      const users = await User.find({$or:[
        {firstName: {$regex:query, $options:'i'}},
        {lastName: {$regex:query, $options:'i'}},
        {userName: {$regex:query, $options:'i'}}
      ]});

    const all = {
        chapter,
        startups,
        jobs,
        users,
        events
    }
          return successWithData(
            res,
            CREATED,
            "search result",
            all
          );
    } catch (err) {
      console.log(err);
      return AppError.tryCatchError(res, err);
    }
  };
