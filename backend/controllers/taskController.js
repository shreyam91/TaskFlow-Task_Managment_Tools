const prisma = require('../utils/prisma');

exports.createTask = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { title, description, dueDate, priority, status, assignedTo, project } = req.body;

    // Validate required fields
    if (!title || !assignedTo || !project) {
      return res.status(400).json({ msg: 'Title, Assigned To, and Project are required' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || 'low',
        status: status || 'not-started',
        assignedToId: assignedTo,
        projectId: project,
        createdById: req.user.id,
      }
    });

    res.status(201).json(task);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { createdById: req.user.id },
          { assignedToId: req.user.id }
        ]
      },
      include: {
        assignedTo: {
          select: { firstname: true, lastname: true, email: true }
        },
        createdBy: {
          select: { firstname: true, lastname: true, email: true }
        }
      }
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Optional: Allow only creator or assignee to edit
    if (task.createdById !== req.user.id && task.assignedToId !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const { title, description, dueDate, priority, status, assignedTo, project } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: req.params.id },
      data: {
        title: title !== undefined ? title : task.title,
        description: description !== undefined ? description : task.description,
        dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : task.dueDate,
        priority: priority !== undefined ? priority : task.priority,
        status: status !== undefined ? status : task.status,
        assignedToId: assignedTo !== undefined ? assignedTo : task.assignedToId,
        projectId: project !== undefined ? project : task.projectId,
      }
    });

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: req.params.id } });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.createdById !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this task' });
    }

    await prisma.task.delete({ where: { id: req.params.id } });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get dashboard tasks
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const assignedTasks = await prisma.task.findMany({
      where: { assignedToId: userId },
      orderBy: { dueDate: 'asc' }
    });
    const createdTasks = await prisma.task.findMany({
      where: { createdById: userId },
      orderBy: { createdAt: 'desc' }
    });
    const overdueTasks = await prisma.task.findMany({
      where: {
        assignedToId: userId,
        dueDate: { lt: new Date() },
        status: { not: 'completed' }
      }
    });

    res.json({
      assignedTasks,
      createdTasks,
      overdueTasks,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Filter and search tasks
exports.searchAndFilterTasks = async (req, res) => {
  try {
    const { status, priority, dueBefore, search } = req.query;
    const userId = req.user.id;

    const where = {
      OR: [
        { createdById: userId },
        { assignedToId: userId }
      ]
    };

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (dueBefore) where.dueDate = { lt: new Date(dueBefore) };

    if (search) {
      where.AND = [
        {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ]
        }
      ];
    }

    const tasks = await prisma.task.findMany({ where });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};