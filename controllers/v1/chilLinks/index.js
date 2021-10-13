const ChildLink = require('../../../model/v1/ChildLinks')
const AppError = require("../../../utils/appError");
const { CREATED, OK } = require("http-status-codes");


const { successWithData, successNoData } = require("../../../utils/successHandler");



exports.ChildLinkGet = async (req, res) => {

    try {
        const childlink = await ChildLink.find({}).populate("added_by").sort("-createdAt");

        return successWithData(res, OK, childlink);

    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}


exports.ChildLinkPost = async (req, res) => {

    try {

        const childLinkInfo = { ...req.body, added_by: req.user.id }

        const childlink = await ChildLink.create(childLinkInfo)

        return successWithData(res, CREATED, childlink)

    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}


exports.ChildLinkUpdate = async (req, res) => {
    try {

        const { id } = req.params
        const recievedChildLink = { ...req.body }

        const updatedChildLink = { _id: id, ...recievedChildLink }

        await ChildLink.findByIdAndUpdate(id, updatedChildLink, { new: true });
        return successWithData(res, OK, "childLink modified", updatedChildLink);

    } catch (error) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }
}


exports.ChildLinkDelete = async (req, res) => {

    try {

        const { id } = req.params
        await ChildLink.findByIdAndRemove(id)
        return successNoData(res, OK, "childLink is deleted");

    } catch (err) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }


}