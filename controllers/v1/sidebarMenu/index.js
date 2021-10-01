const SidebarMenu = require('../../../model/v1/SidebarMenu')
const AppError = require("../../../utils/appError");
const { CREATED, OK } = require("http-status-codes");


const { successWithData } = require("../../../utils/successHandler");

exports.SidebarGet = async (req, res) => {

    try {
        const Sidebar = await SidebarMenu.find({});

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