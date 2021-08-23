import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mentorRouter from "./routes/mentor.js";
import studentRouter from "./routes/student.js";

const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URI || "mongodb+srv://gopal:1213@cluster0.azvtw.mongodb.net/assignMentorData";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    "/mentors/": "to view all the mentors",
    "/mentors/create": "to create new mentor",
    "/mentors/assign?students=s1,s2&mentor=m1": "to assign students s1 and s2 to mentor m1",
    "/mentors/students/m1": "to view the students of mentor m1",

    "/students/": "to view all the students",
    "/studetns/create": "to create new student",
    "/students/assign?student=s1&mentor=m2": "to change the mentor of student s1 to mentor m2",
  });
});

app.use("/mentors", mentorRouter);
app.use("/students", studentRouter);

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => app.listen(PORT, () => console.log(`Server is runnign on PORT: ${PORT}`)))
  .catch((err) => console.log(err));
