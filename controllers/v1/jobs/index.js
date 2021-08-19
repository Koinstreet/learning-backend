const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
const moment = require('moment');
const url = require('url');
const querystring = require('querystring');

// DB
const Jobs = require("../../../model/v1/Jobs");

const validateJob = require("../../../validators/job");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createJob = async (req, res, next) => {
  try {
    const { errors, isValid } = validateJob(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let job = {
        ...req.body,
        authorId: req.user.id,
      };

    const newJob= await Jobs.create(job);
    return successWithData(
      res,
      CREATED,
      "Job created successfully",
      newJob
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllJobs= async (req, res, next) => {
  try {

    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    
    let time = 100;

    if (parsedQs.date_posted === 'week'){
      time = 7
    }
    else if(parsedQs.date_posted === 'day'){
      time = 1
    }
    else if(parsedQs.date_posted === 'month'){
      time = 30
    }
    else {
      time = 100
    }

    let pay = parsedQs.pay ? parsedQs.pay : 0;
    let timeFilter = parsedQs.date_posted ? { updatedAt: { $gte: new Date(moment().subtract(time, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss')), $lt: new Date() } }: {};
    let payFilter = parsedQs.pay ? { pay: { '$gt': pay, '$lt': 150000} } : {};
    let remoteFilter = parsedQs.remote ? { remote: parsedQs.remote } : {};
    let jobTypeFilter = parsedQs.job_type ? { job_type: { $in: (parsedQs.job_type).split(",") } }: {};
    let job_industry = parsedQs.job_industry ? { job_industry: { $in: (parsedQs.job_industry).split(",") } }: {};

    let allFilter = ({$and: [remoteFilter, payFilter, jobTypeFilter, timeFilter, job_industry]}) ? ({$and: [remoteFilter, payFilter, jobTypeFilter, timeFilter, job_industry]}) : {};

    const jobs = await Jobs.find(allFilter)
      .populate("companyId")
      .sort("-createdAt");
    return successWithData(res, OK, "Jobs fetched successfully", jobs);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getSearch = async (req, res, next) => {
  try {
    if (!req.body.job_title || req.body.location) {
      console.log('please enter any keyword to search')
     let  errors = "please enter any keyword to search";
        return AppError.validationError(res, BAD_REQUEST, errors);
      }

    let job_title = req.body.job_title ? req.body.job_title : '';
    let location = req.body.location ? req.body.location : '';
    
      let text = job_title + location;
  
     const searchJobs = await Jobs.aggregate([
      {
        '$search': {
          'index': 'default', 
          'text': {
            'query': text !== '' ? text : true,
            'path': [
              'job_title', 'job_description', 'location', 'job_industry',
            ]
          }
        }
      },
    ])
        return successWithData(
          res,
          CREATED,
          "search result",
          searchJobs
        );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};



exports.getJob = async (req, res, next) => {
  try {
    const job = await Jobs.findById(req.params.id).populate(
      "authorId",
      "-password"
    );
    if (!job) { let error = {message: "undefined job"}; return AppError.tryCatchError(res, error);}
    return successWithData(res, OK, "Job fetched successfully", job);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateJob = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateJob(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const jobUpdate = await Jobs.findById(req.params.id);
    if (!jobUpdate) { let error = {message: "undefined Job"}; return AppError.tryCatchError(res, error);}

    let job = {
        ...req.body,
        authorId: req.user.id,
      };
    
    const modifiedJob = await Jobs.findOneAndUpdate(
      { _id: req.params.id },
      { ...job },
      { new: true }
    );
    return successWithData(res, OK, "Job modified", modifiedJob);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteJob = async (req, res, file) => {
  try {
    await Jobs.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Job deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
