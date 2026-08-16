const prisma = require('../utils/prisma');

// GET /api/user - Get current user
const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// GET /api/users - Get all users (limited fields)
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true
      }
    });
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: `${user.firstname} ${user.lastname}`
    }));
    res.json(formattedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  getUser,
  getAllUsers
};
