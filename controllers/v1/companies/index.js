const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Companies = require("../../../model/v1/Companies");

const validateCompany = require("../../../validators/companies");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createCompanies = async (req, res, next) => {
  try {
    const { errors, isValid } = validateCompany(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }
    let Company = {
        ...req.body,
        authorId: req.user.id,
      };

    const newCompany= await Companies.create(Company);
    return successWithData(
      res,
      CREATED,
      "Company created successfully",
      newCompany
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllCompany= async (req, res, next) => {
  try {
    const companies = await Companies.find({})
      .populate("authorId", "-password")
      .sort("-createdAt");
    return successWithData(res, OK, "Companies fetched successfully", companies);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getCompany = async (req, res, next) => {
  try {
    const company = await Companies.findById(req.params.id).populate(
      "authorId",
      "-password"
    );
    if (!company) return AppError.tryCatchError(res, err);
    return successWithData(res, OK, "company fetched successfully", company);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateCompany = async (req, res, next) => {
  
  try {
    const { errors, isValid } = validateCompanies(req.body);
    if (!isValid) {
      return AppError.validationError(res, BAD_REQUEST, errors);
    }

    const companyUpdate = await Companies.findById(req.params.id);
    if (!companyUpdate) return AppError.tryCatchError(res, err);

    let company = {
        ...req.body,
        authorId: req.user.id,
      };
    
    const modifiedCompany = await Companies.findOneAndUpdate(
      { _id: req.params.id },
      { ...company },
      { new: true }
    );
    return successWithData(res, OK, "Company modified", modifiedCompany);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteCompany = async (req, res, file) => {
  try {
    await Companies.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Company deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
