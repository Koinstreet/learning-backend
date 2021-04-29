const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Error
const AppError = require("../../utils/appError");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: false
  },
  password: {
    type: String,
    min: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  courses: {
    type: Array,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  githubId: {
    type: String,
  },
  LinkedinId: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  experience: {
    type: Number,
  },
  isUpdated: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
  },
  is_mentor: {
    type: Boolean,
    default: false
  },
  is_mentee: {
    type: Boolean,
    default: true
  },
  age: {
    type: Number
  },
  birthday: {
    type: Date
  },
  Nationality: {
    type: String
  },
  Ethnicity: {
    type: String
  },
  Gender: {
    type: String
  }

}, {
  timestamps: true
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
} catch(err) {
  console.log('some problems occured while creating account')
  return AppError.tryCatchError(err);
}
});

userSchema.methods.correctPassword = async function (
  incomingPassword,
  userPassword
) {
  try {
  return await bcrypt.compare(incomingPassword, userPassword);
  }
  catch(err){
    console.log('some problems occured while comparing passwords')
    return AppError.tryCatchError(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
