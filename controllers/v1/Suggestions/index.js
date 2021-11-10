const Mentor = require('../../../model/v1/Mentor');
const Mentee = require('../../../model/v1/Mentee');
const Course = require('../../../model/v1/Course');
const Company = require('../../../model/v1/Companies');
const Jobs = require('../../../model/v1/Jobs');
const Startup = require('../../../model/v1/Startups')
const User = require('../../../model/v1/User');
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
const { successWithData } = require("../../../utils/successHandler");
const AppError = require("../../../utils/appError");





exports.SuggestionsMentorsGet = async (req, res) => {

    const { id } = req.params
    // const sgsInterts = await User.findById(id, { "_id": 0, "programmingSkills": 1, "passions": 1, "skills": 1 });
    const user = await User.findById(id);

    const SgsIntersts = Object.values(user.passions, user.programmingSkills, user.skills)


    console.log(...SgsIntersts)

    // https://docs.mongodb.com/manual/tutorial/model-data-for-schema-versioning/

    try {

        const sgsMentors = await Mentor.find({ suggestions: { $in: [...SgsIntersts] } })


        const Suggestions = { sgsMentors };


        return successWithData(res, OK, Suggestions);

    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}


exports.SuggestionsMentesGet = async (req, res) => {

    const { id } = req.params
    const user = await User.findById(id);

    const SgsIntersts = Object.values(user.passions, user.programmingSkills, user.skills)

    // https://docs.mongodb.com/manual/tutorial/model-data-for-schema-versioning/

    try {
        const sgsMentees = await Mentee.find({ suggestions: { $in: [...SgsIntersts] } })
        const Suggestions = { sgsMentees };

        return successWithData(res, OK, Suggestions);

    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}

exports.SuggestionsCoursesGet = async (req, res) => {

    const { id } = req.params
    const user = await User.findById(id)

    const SgsIntersts = Object.values(user.passions, user.programmingSkills, user.skills)

    // const notSgsIntersts = Object.values(user.courses)
    // , $nin: [...notSgsIntersts]
    try {

        const sgsCourses = await Course.find({ tags: { $in: [...SgsIntersts] } })
        const Suggestions = { sgsCourses };

        return successWithData(res, OK, Suggestions);

    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}

exports.SuggestionsCompaniesGet = async (req, res) => {

    const { id } = req.params
    const user = await User.findById(id);

    const sgsIntersts = Object.values(user.passions, user.programmingSkills, user.skills);

    try {
        const sgsCompanies = await Company.find({ specialties: { $in: [...sgsIntersts] } })
        const Suggestions = { sgsCompanies };

        return successWithData(res, OK, Suggestions);
    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}

exports.SuggestionsEventsGet = async (req, res) => {

    const { id } = req.id
    const user = await User.findById(id);

    const sgsIntersts = Object.values(user.passions, user.programmingSkills, user.skills);

    try {
        const sgsEvents = await Event.find({ catName: { $in: [...sgsIntersts] }, eventName: { $in: [...sgsIntersts] }, tags: { $in: [...sgsIntersts] } });
        const Suggestions = { sgsEvents };

        return successWithData(res, OK, Suggestions);
    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}

exports.SuggestionsJobsGet = async (req, res) => {

    const { id } = req.id
    const user = await User.findById(id);

    const sgsIntersts = Object.values(user.passions, user.programmingSkills, user.skills);

    try {
        const sgsJobs = await Jobs.aggregate([{ $unwind: '$min_requirements' }, { $match: { min_requirements: { $in: [...sgsIntersts] } } }, { $match: { job_title: { $in: [...sgsIntersts] } } }])
        const Suggestions = { sgsJobs };

        return successWithData(res, OK, Suggestions);
    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}


exports.SuggestionsStartupsGet = async (req, res) => {

    const { id } = req.id
    const user = await User.findById(id);

    const sgsIntersts = Object.values(user.passions, user.programmingSkills, user.skills);

    try {
        const sgsStartups = await Startup.aggregate([{ $unwind: '$tags' }, { $match: { industry: { $in: [...sgsIntersts] } } }, { $match: { tags: { $in: [...sgsIntersts] } } }])
        const Suggestions = { sgsStartups };

        return successWithData(res, OK, Suggestions);
    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}


exports.SuggestionsUsersGet = async (req, res) => {

    const { id } = req.id
    const user = await User.findById(id);

    const sgsSkills = Object.values(user.skills)
    const sgsPassions = Object.values(user.passions)
    const sgsprogrammingSkills = Object.values(user.programmingSkills)

    try {
        const sgsUsers = await User.aggregate([
            { $match: { id: { $nin: [id] } } },
            { $unwind: '$passions' },
            { $unwind: '$programmingSkills' },
            { $unwind: '$skills' },
            { $match: { passions: { $in: [...sgsPassions] } } },
            { $match: { programmingSkills: { $in: [...sgsprogrammingSkills] } } },
            { $match: { skills: { $in: [...sgsSkills] } } }
        ])
        const Suggestions = { sgsUsers };

        return successWithData(res, OK, Suggestions);
    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}