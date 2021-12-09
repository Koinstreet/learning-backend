const AppError = require("../../../utils/appError");
const { CREATED, OK } = require("http-status-codes");
const { successWithData, successNoData } = require("../../../utils/successHandler");

const Course = require("../../../model/v1/Course");
const Certificate = require("../../../model/v1/certificate")

const PythonShell = require('python-shell').PythonShell;
const ipfs = require('ipfs-http-client')
const client = ipfs.create('https://ipfs.infura.io:5001/api/v0')
const fs = require('fs')
const script = "utils/certifcate/gen.py"

exports.uploadCertificate = async (req, res, next) => {


    try {

        const course = await Course.findById(req.body.id);
        const username = req.user.firstName + " " + req.user.lastName;

        let options = {
            mode: 'text',
            args: [course.description, username, course.name, course.earn]
        };

        PythonShell.run(script, options, function (err, results) {
            if (err) throw err;

            console.log('certificate ' + username + ' created');

            console.log("uploading to IPFS...");
            let path = "utils/certifcate/images/"

            fs.readFile(path + username.replace(/ /g, "_") + ".png", async function (err, file) {
                if (err) throw err;

                let added = await client.add(
                    file,
                    {
                        progress: (prog) => console.log(`received: ${prog}`)
                    }
                )

                let url = `https://ipfs.infura.io/ipfs/${added.path}`

                const certificate = new Certificate({
                    userId: req.user._id,
                    courseId: course._id,
                    ipfsURL: url,
                });

                const newCertificate = await Certificate.create(certificate);

                successWithData(res, OK, "certificate successfully created", newCertificate);
            });
        });

    } catch (err) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }
};


exports.getUserCertificate = async (req, res, next) => {

    try {
        const query = req.body.id;
        const userCertificates = await Certificate.find({ userId: query });
        return successWithData(
            res,
            OK,
            "searched successfully",
            userCertificates
        );

    } catch (err) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }
};

exports.getAllCertificates = async (req, res, next) => {
    try {
        const certificates = await Certificate.find({}).sort("-createdAt").populate("userId").populate("courseId");
        return successWithData(res, OK, "Certificates fetched successfully", certificates);
    } catch (err) {
        console.log(err);
        return AppError.tryCatchError(res, err);
    }
};
