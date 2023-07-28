require("dotenv").config();
const express = require("express");
const crypto = require("node:crypto");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const {
  validateCreateSudent,
  validateUpdateSudent,
} = require("./validateStudent");

app.use(cors());
app.use(express.json());

const students = require("./students.json");
app.get("/", (req, res) => {
  console.log("Hello, world!");
  res.send("Hello, world!");
});

app.get("/api/v1/students", (req, res) => {
  res.send(students);
});

app.get("/api/v1/students/:id", (req, res) => {
  const { id } = req.params;
  const student = students.find((student) => student.id == id);
  res.send(student);
});

app.post("/api/v1/students", (req, res) => {
  const student = req.body;
  const id = crypto.randomUUID();
  student.id = id;
  const { error, value } = validateCreateSudent(student);
  if (error) {
    res.status(400).send({ error });
    return;
  }
  students.push(value);
  res.send(students);
});

app.patch("/api/v1/students/:id", (req, res) => {
  const { id } = req.params;
  const updatedStd = req.body;

  const index = students.findIndex((student) => student.id == id);
  if (index === -1) {
    res.status(404).send({ message: "student not found" });
    return;
  }
  const { error, value } = validateUpdateSudent(updatedStd);
  if (error) {
    res.status(400).send({ error });
    return;
  }
  students[index] = { ...students[index], ...value };
  res.send(students);
});

app.delete("/api/v1/students/:id", (req, res) => {
  const { id } = req.params;
  const index = students.findIndex((student) => student.id == id);
  console.log(index);
  if (index === -1) {
    res.status(404).send({ message: "student not found" });
    return;
  }
  students.splice(index, 1);
  res.send(students);
});

app.listen(PORT, () => {
  console.log(`server starts on port ${PORT}`);
});
