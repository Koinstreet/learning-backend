const db = require("../../../DB/index");
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
const {
    successWithData,
    successNoData,
  } = require("../../../utils/successHandler");
const Jobs = require("../../../model/v1/Jobs");
const Location = require("../../../model/v1/Locations");
const Startup = require("../../../model/v1/Startups");

// Error
const AppError = require("../../../utils/appError");

exports.getSearch = async (req, res, next) => {
    try {
        if (!req.body.keyword) {
            console.log('Keyword field is needed!')
            let errors = "Keyword field is needed!";
              return AppError.validationError(res, BAD_REQUEST, errors);
        }
        
        let text = req.body.keyword ? req.body.keyword : '';
    
       const jobs = await Jobs.aggregate([
        {
          '$search': {
            'index': 'default', 
            'text': {
              'query': text, 
              'path': [
                'job_title', 'job_title', 'location', 'job_industry',
              ]
            }
          }
        },
      ])

      const chapter = await Location.aggregate([
        {
          '$search': {
            'index': 'default', 
            'text': {
              'query': text, 
              'path': [
                'description', 'location', 'LocationName'
              ]
            }
          }
        },
      ])

      const startups = await Startup.aggregate([
        {
          '$search': {
            'index': 'default', 
            'text': {
              'query': text, 
              'path': [
                'about', 'location', 'vision', 'roadmap', 'name'
              ]
            }
          }
        },
      ])

    const all = {
        chapter,
        startups,
        jobs
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
