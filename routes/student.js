import express from "express";
import { Students } from "../models/student.js";
import { Mentors } from "../models/mentor.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  const students = await Students.find();
  res.send(students);
});

router.route("/create").post(async (req, res) => {
  const student = req.body;

  const newStudent = new Students({
    name: student.name,
  });

  await newStudent.save();

  res.status(201).json({
    success: true,
    data: newStudent,
  });
});

router.route("/assign").post(async (req, res) => {
  const params = req.query;
  const student = await Students.findOne({ name: params.student });
  const fromMentor = await Mentors.findOne({ name: student.mentor });
  const toMentor = await Mentors.findOne({ name: params.mentor });
  fromMentor.students = fromMentor.students.filter((ele) => ele !== student.name);
  await fromMentor.save();
  toMentor.students.push(student.name);
  await toMentor.save();
  student.mentor = toMentor.name;
  await student.save();
  res.send({ toMentor, fromMentor, student });
});

export default router;
