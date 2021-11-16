const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResourceSchema = new Schema(
  {
    name: String,
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
