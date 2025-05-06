
const express = require('express')
const router = express.Router()
const Project = require('../models/Project') // Adjust based on your structure

// Create a new project
router.post('/', async (req, res) => {
  try {
    const { name } = req.body

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: 'Project name is required' })
    }

    const project = new Project({ name })
    await project.save()

    res.status(201).json({ message: 'Project created successfully', project })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
