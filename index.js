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

app.use("/mentors", mentorRouter);
app.use("/students", studentRouter);

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => app.listen(PORT, () => console.log(`Server is runnign on PORT: ${PORT}`)))
  .catch((err) => console.log(err));
