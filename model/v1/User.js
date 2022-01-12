const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Error
const AppError = require("../../utils/appError");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String
    },
    primaryLanguage: {
      type: String
    },
    passions: {
      type: Array
    },
    avatarOptions: {
      type: Array
    },
    softSkills: {
      type: Array
    },
    programmingSkills: {
      type: Array
    },
    skills: {
      type: Array
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      unique: false
    },
    userName: {
      type: String,
      default: ""
    },
    publicAddress: {
      type: String
    },
    password: {
      type: String,
      min: 8
    },
    role: {
      type: String,
      enum: ["user", "admin", "pm"],
      default: "user"
    },
    courses: {
      type: Array
    },
    googleId: {
      type: String
    },
    facebookId: {
      type: String
    },
    githubId: {
      type: String
    },
    LinkedinId: {
      type: String
    },
    profilePicture: {
      type: String
    },
    phoneNumber: {
      type: Number
    },
    experience: {
      type: Number
    },
    isUpdated: {
      type: Boolean,
      default: false
    },
    location: {
      type: String
    },
    is_mentor: {
      type: Boolean,
      default: false
    },
    is_mentee: {
      type: Boolean,
      default: false
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
    educationLevel: {
      type: String
    },
    schoolName: {
      type: String
    },
    expectedGraduationYear: {
      type: Date
    },
    graduationStatus: {
      type: String
    },
    degree: {
      type: String
    },
    Ethnicity: {
      type: Array
    },
    Gender: {
      type: String
    },
    FacebookLink: {
      type: String
    },
    LinkedinLink: {
      type: String
    },
    GithubLink: {
      type: String
    },
    DribbleLink: {
      type: String
    },
    bio: {
      type: String
    },
    backgroundPicture: {
      type: String
    },
    profileVisibility: {
      type: Boolean,
      default: true
    },
    birthdayVisibility: {
      type: Boolean,
      default: true
    },
    locationVisibility: {
      type: Boolean,
      default: true
    },
    emailVisibility: {
      type: Boolean,
      default: true
    },
    notifyMessages: {
      type: Boolean,
      default: true
    },
    notifyAccountActivity: {
      type: Boolean,
      default: true
    },
    notifyJobAlerts: {
      type: Boolean,
      default: true
    },
    notifyEvents: {
      type: Boolean,
      default: true
    },
    hometown: String,
    GoogleLink: String,
    FigmaLink: String,
    ClickupLink: String,
    enteredHighSchoolYear: Date,
    studentStatus: String
  },
  {
    timestamps: true
  }
);

try {
  userSchema.pre("save", async function(next) {
    try {
      if (!this.isModified("password")) return next();
      this.password = await bcrypt.hash(this.password, 12);
      next();
    } catch (err) {
      console.log("some problems occured while creating account", err);
    }
  });

  userSchema.methods.correctPassword = async function(
    incomingPassword,
    userPassword
  ) {
    try {
      return await bcrypt.compare(incomingPassword, userPassword);
    } catch (err) {
      console.log("some problems occured while comparing passwords", err);
    }
  };
} catch (err) {
  console.log("some problems occured while creating account", err);
}
const User = mongoose.model("User", userSchema);

module.exports = User;
