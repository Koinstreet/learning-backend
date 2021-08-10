const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");
const {
    successWithData,
    successNoData,
  } = require("../../../utils/successHandler");
const {OAuth2Client} = require('google-auth-library')
const User = require("../../../model/v1/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createSendToken = require("../auth/createSendToken");

// Error
const AppError = require("../../../utils/appError");

const client = new OAuth2Client(process.env.CLIENT_ID)

exports.googleLogin = async (req, res, next) => {
    try {
       const {tokenId} = req.body;
       
       client.verifyIdToken({ idToken: tokenId, audience: process.env.CLIENT_ID }).then((response)=>{
           const {email_verified, name, email, given_name, family_name, picture} = response.payload;
           if(email_verified){
            User.findOne({email}).exec((err, user)=>{
                if(err){
                    let error = 'something went wrong'
                    return AppError.validationError(res, BAD_REQUEST, error);
                }
                else{

                    if(user){

                        User.findOne({ email }).then((user)=>{
                            createSendToken(user, 201, res, "User Authorized");
                            return successWithData(res, 200, "user logged in", user);
                        });
                        
                    }

                    else{
                        let password = email+process.env.JWT_SECRET;
                        bcrypt.hash(password, 10, ((err, hash) => {
                            if (err) {
                                let error = 'something went wrong'
                                return AppError.validationError(res, BAD_REQUEST, error);
                            }
                            let user = new User({name, email, password: hash, firstName: given_name, lastName: family_name, profilePicture: picture})

                            user.save((err, data) => {
                                if (err) {
                                    let error = 'something went wrong'
                                    return AppError.validationError(res, BAD_REQUEST, error);
                                  }

                                  else{
                                    const token = jwt.sign({ _id: data._id}, process.env.JWT_SECRET, {
                                        expiresIn: process.env.JWT_EXPIRES_IN,
                                      });

                                    return successWithData(res, 201, "user created", { token,
                                        user});
                                  }
                            })


                        }))
                    }
                }
            })
           }
       })
      
    } catch (err) {
      console.log(err);
      let error = 'something went wrong'
      return AppError.validationError(res, BAD_REQUEST, error);
    }
  };
