import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: String,
  mentor: {
    type: String,
    default: "",
  },
});

export const Students = mongoose.model("student", studentSchema);
