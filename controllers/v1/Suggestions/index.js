const Mentor = require('../../../model/v1/Mentor');
const Mentee = require('../../../model/v1/Mentee');
const User = require('../../../model/v1/User');
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
const { successWithData } = require("../../../utils/successHandler");
const AppError = require("../../../utils/appError");





exports.SuggestionsGet = async (req, res) => {


    const sgsInterts = await User.find({}, { "programmingSkills": 1, "passions": 1, "skills": 1 });


    try {

        const sgsMentors = await Mentor.find({ suggestions: { $in: [req.body, sgsInterts] } })

        const sgsMentees = await Mentee.find({ suggestions: { $in: [req.body, sgsInterts] } })

        const Suggestions = { sgsMentors, sgsMentees };


        return successWithData(res, OK, Suggestions);

    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}
