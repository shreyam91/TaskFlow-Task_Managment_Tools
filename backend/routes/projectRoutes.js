const express = require("express");
const router = express.Router();
const Project = require("../models/Project"); // Adjust based on your structure

// Create a new project
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Project name is required" });
    }

    const project = new Project({ name });
    await project.save();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find(); // This will fetch all projects from the database
    // Map _id to id for frontend compatibility
    const mappedProjects = projects.map((project) => ({
      id: project._id.toString(),
      name: project.name,
      url: `/projects/${project._id}`, // adjust if needed
    }));

    res.json(mappedProjects);// Respond with the list of projects
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load projects" });
  }
});

// Delete a project by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});


module.exports = router;
