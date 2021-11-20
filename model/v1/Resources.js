const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResourceSchema = new Schema(
  {
    title: String,
    mentorship_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mentorship" },
    tags: Array,
    icon: String,
    path: String,
    description: String,
  },

  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;
