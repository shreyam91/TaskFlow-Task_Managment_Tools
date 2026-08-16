const prisma = require('../utils/prisma');

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name, description, project, users } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Team name is required" });
    }

    const team = await prisma.team.create({
      data: {
        name,
        description,
        projectId: project || null,
        users: {
          connect: (users || []).map(userId => ({ id: userId }))
        }
      }
    });

    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        project: { select: { name: true } },
        users: { select: { firstname: true, lastname: true, email: true } }
      }
    });

    const mappedTeams = teams.map((team) => ({
      id: team.id,
      name: team.name,
      description: team.description,
      project: team.project,
      users: team.users.map(u => ({ name: `${u.firstname} ${u.lastname}`, email: u.email })),
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    }));

    res.json(mappedTeams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Failed to load teams" });
  }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeam = await prisma.team.findUnique({ where: { id } });

    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    await prisma.team.delete({ where: { id } });
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ error: "Failed to delete team" });
  }
};

// Update a team by ID
exports.updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, description, project, users } = req.body;

  try {
    const existingTeam = await prisma.team.findUnique({ where: { id } });
    if (!existingTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    const dataToUpdate = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (description !== undefined) dataToUpdate.description = description;
    if (project !== undefined) dataToUpdate.projectId = project;
    if (users !== undefined) {
      dataToUpdate.users = {
        set: users.map(userId => ({ id: userId }))
      };
    }

    const updatedTeam = await prisma.team.update({
      where: { id },
      data: dataToUpdate,
      include: {
        project: { select: { name: true } },
        users: { select: { firstname: true, lastname: true, email: true } }
      }
    });

    res.json({
      message: "Team updated successfully",
      team: {
        id: updatedTeam.id,
        name: updatedTeam.name,
        description: updatedTeam.description,
        project: updatedTeam.project,
        users: updatedTeam.users.map(u => ({ name: `${u.firstname} ${u.lastname}`, email: u.email })),
        createdAt: updatedTeam.createdAt,
        updatedAt: updatedTeam.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Failed to update team" });
  }
};
