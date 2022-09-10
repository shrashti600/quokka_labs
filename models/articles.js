const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongodb");

const articleSchema = Schema(
  {
    title: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Articles", articleSchema);
