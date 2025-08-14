const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

mongoose.connect(
  'mongodb+srv://kay:Password@cluster0.znmclxp.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("connect MongoDB");
    app.listen(port, () => {
      console.log("port ", port);
    });
  })
  .catch((err) => {
    console.error("error connecting MongoDB", err);
  });

const Schema = mongoose.Schema;
const taskSchema = new Schema({
  activity: { type: String, required: true }
});
const TaskModel = mongoose.model("Task", taskSchema);

const router = express.Router();

app.use("/api/tasks", router);

router.route("/").get(async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/add").post(async (req, res) => {
  const activity = req.body.activity;
  const newTask = new TaskModel({ activity });
  try {
    await newTask.save();
    res.json("Task added");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/update/:id").put(async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json("Error: task not find");
    }
    task.activity = req.body.activity;

    await task.save();
    res.json("Task updated");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("delete/:id").delete(async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json("not find");
    }
    res.json("deleted");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});