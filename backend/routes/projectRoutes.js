// routes/projectRoute.js
const express = require("express");
const router = express.Router();
const prisma = require('../utils/prisma');
const auth = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");

// Create a new project (Admin & Manager)
router.post("/", auth, authorizeRole("admin", "manager"), async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Project name is required" });
  }

  try {
    const project = await prisma.project.create({
      data: { name }
    });
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Project name already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all projects (All roles)
router.get("/", auth, authorizeRole("admin", "manager", "employee"), async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    const mappedProjects = projects.map((project) => ({
      id: project.id,
      name: project.name,
      url: `/projects/${project.id}`,
    }));
    res.json(mappedProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load projects" });
  }
});

// Delete a project (Admin & Manager)
router.delete("/:id", auth, authorizeRole("admin", "manager"), async (req, res) => {
  try {
    const project = await prisma.project.findUnique({ where: { id: req.params.id } });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    await prisma.project.delete({ where: { id: req.params.id } });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
