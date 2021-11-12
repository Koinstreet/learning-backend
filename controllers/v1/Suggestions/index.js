const Mentor = require('../../../model/v1/Mentor');
const Mentee = require('../../../model/v1/Mentee');
const Course = require('../../../model/v1/Course');
const Company = require('../../../model/v1/Companies');
const Event = require('../../../model/v1/Events');
const Jobs = require('../../../model/v1/Jobs');
const Startup = require('../../../model/v1/Startups')
const User = require('../../../model/v1/User');
const { OK } = require("http-status-codes");
const { successWithData } = require("../../../utils/successHandler");
const AppError = require("../../../utils/appError");





exports.SuggestionsMentorsGet = async (req, res) => {

    const { id } = req.params
    const user = await User.findById(id);

    const SgsIntersts = Object.values(user.passions, user.programmingSkills, user.skills)


    // https://docs.mongodb.com/manual/tutorial/model-data-for-schema-versioning/

    try {

        const sgsMentors = await Mentor.find({ suggestions: { $in: [...SgsIntersts] } })

        console.log(sgsMentors);

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

    try {
        const sgsMentees = await Mentee.find({
            $or: [
                { suggestions: { $in: [...SgsIntersts] } },
                { interest_in: { $in: [...SgsIntersts] } }
            ]
        })
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

    try {
        const sgsCourses = await Course.aggregate([
            { $unwind: '$tags' },
            {
                $match: {
                    $or: [
                        { tags: { $in: [...SgsIntersts] } },
                        { name: { $in: [...SgsIntersts] } }
                    ]
                }
            }
        ])

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
        const sgsCompanies = await Company.aggregate([{ $unwind: '$specialties' }, { $match: { specialties: { $in: [...sgsIntersts] } } }])
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

        const sgsEvents = await Event.aggregate([
            { $unwind: '$tags' },
            {
                $match: {
                    $or: [
                        { tags: { $in: [...sgsIntersts] } },
                        { catName: { $in: [...sgsIntersts] } },
                        { eventName: { $in: [...sgsIntersts] } }
                    ]
                }
            }])

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
        const sgsJobs = await Jobs.aggregate([
            { $unwind: '$min_requirements' },
            {
                $match: {
                    $or: [
                        { min_requirements: { $in: [...sgsIntersts] } },
                        { job_title: { $in: [...sgsIntersts] } }
                    ]
                }
            }
        ])

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
        const sgsStartups = await Startup.aggregate([
            { $unwind: '$tags' },
            {
                $match: {
                    $or: [
                        { tags: { $in: [...sgsIntersts] } },
                        { industry: { $in: [...sgsIntersts] } }
                    ]
                }
            }
        ]);

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
            {
                $match: {
                    $or: [
                        { passions: { $in: [...sgsPassions] } },
                        { programmingSkills: { $in: [...sgsprogrammingSkills] } },
                        { $match: { skills: { $in: [...sgsSkills] } } }
                    ]
                }
            },
        ])

        // let sgsUsers = [...new Map(allCategories.map((item) => [item["id"], item])).values()];
        const Suggestions = { sgsUsers };

        return successWithData(res, OK, Suggestions);
    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}