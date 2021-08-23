import express from "express";
import { Mentors } from "../models/mentor.js";
import { Students } from "../models/student.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  const mentors = await Mentors.find();
  res.send(mentors);
});

router.route("/create").post(async (req, res) => {
  const mentor = req.body;

  const newMentor = new Mentors({
    name: mentor.name,
  });

  await newMentor.save();

  res.status(201).json({
    success: true,
    data: newMentor,
  });
});

router.route("/assign").post(async (req, res) => {
  const params = req.query;
  const mentor = await Mentors.findOne({ name: params.mentor });
  const students = params.students.split(",");
  mentor.students = students;
  await mentor.save();

  students.forEach(async (ele) => {
    const student = await Students.findOne({ name: ele });
    if (!student.mentor) {
      student.mentor = params.mentor;
      await student.save();
    }
  });
  res.send({ mentor, students });
});

router.route("/students/:mentor").post(async (req, res) => {
  const { mentor } = req.params;
  const Mentor = await Mentors.findOne({ name: mentor });
  const students = Mentor.students;
  res.send(students);
});

export default router;
