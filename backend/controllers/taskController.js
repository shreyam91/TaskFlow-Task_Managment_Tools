const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      createdBy: req.user.id, // comes from auth middleware
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ]
    }).populate('assignedTo', 'name email').populate('createdBy', 'name email');

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Optional: Allow only creator or assignee to edit
    if (task.createdBy.toString() !== req.user.id && task.assignedTo?.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this task' });
    }

    await task.deleteOne();
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
