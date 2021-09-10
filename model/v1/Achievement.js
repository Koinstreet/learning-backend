const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
       type: {
        type: String,
       required: true,
       }, 
       description: {
       type: String,
       },
       url: {
       type: String,
    }
 })

const  Controller = mongoose.model("achievementSchema", achievementSchema);

 module.exports = Controller;