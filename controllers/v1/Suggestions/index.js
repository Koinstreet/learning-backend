const Mentor = require('../../../model/v1/Mentor');
const Mentee = require('../../../model/v1/Mentee');
const User = require('../../../model/v1/User');
const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
const { successWithData } = require("../../../utils/successHandler");
const AppError = require("../../../utils/appError");





exports.SuggestionsGet = async (req, res) => {

    const { id } = req.body
    // const sgsInterts = await User.findById(id, { "_id": 0, "programmingSkills": 1, "passions": 1, "skills": 1 });
    const user = await User.findById(id);

    const SgsIntersts = Object.values(user.passions, user.programmingSkills, user.skills)




    // https://docs.mongodb.com/manual/tutorial/model-data-for-schema-versioning/

    try {

        const sgsMentors = await Mentor.find({ suggestions: { $in: [...SgsIntersts] } })

        const sgsMentees = await Mentee.find({ suggestions: { $in: [...SgsIntersts] } })

        const Suggestions = { sgsMentors, sgsMentees };


        return successWithData(res, OK, Suggestions);

    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}
