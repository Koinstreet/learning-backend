const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChapterToolKitSchema = new Schema({
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  documents: {
    type: [
        {
            title:  String,
            subtitle:  String,
            download_link: String
        }
    ],
  },
  date_founded: {
      type: Date,
    },
}, {
  timestamps: true
});

const ChapterToolKit = mongoose.model("ChapterToolKit", ChapterToolKitSchema);

module.exports = ChapterToolKit;
