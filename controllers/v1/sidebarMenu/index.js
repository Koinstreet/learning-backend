const SidebarMenu = require('../../../model/v1/SidebarMenu')
const AppError = require("../../../utils/appError");
const { CREATED, OK } = require("http-status-codes");


const { successWithData, successNoData } = require("../../../utils/successHandler");



exports.SidebarGet = async (req, res) => {

    try {
        const Sidebar = await SidebarMenu.find({}).populate("added_by").sort("-createdAt");

        return successWithData(res, OK, Sidebar);

    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}


exports.SidebarPost = async (req, res) => {

    try {

        const sidebarInfo = { ...req.body }

        const Sidebar = await SidebarMenu.create(sidebarInfo)

        return successWithData(res, CREATED, Sidebar)

    } catch (error) {
        return AppError.tryCatchError(res, error)
    }
}


exports.SidebarUpdate = async (req, res) => {
    try {

        const { id } = req.params
        const recievedSidebar = { ...req.body }

        const updatedSidebar = { _id: id, ...recievedSidebar }

        await SidebarMenu.findByIdAndUpdate(id, updatedSidebar, { new: true });
        return successWithData(res, OK, "Sidebar modified", updatedSidebar);

    } catch (error) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }
}


exports.SidebarDelete = async (req, res) => {

    try {

        const { id } = req.params
        await SidebarMenu.findByIdAndRemove(id)
        return successNoData(res, OK, "startup deleted");

    } catch (err) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }


}