const express = require("express");


// NEW CONTROLLERS
const companies = require("../controllers/v1/companies");

// MIDDLEWARE
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get('/userCompanies', authMiddleware.protect, companies.getuserCompanies);

router.get("/", companies.getAllCompany);

router.get("/:id", companies.getCompany);

router.use(authMiddleware.protect);

router.post(
  "/",
  companies.createCompanies
);
router
  .route("/:id")
  .patch(companies.updateCompany)
  .delete(companies.deleteCompany);


module.exports = router;
