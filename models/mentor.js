import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
  name: String,
  students: {
    type: [String],
    default: [],
  },
});

export const Mentors = mongoose.model("mentor", mentorSchema);
