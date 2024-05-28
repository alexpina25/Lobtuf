const Team = require('../models/Team');

const createTeam = async (req, res) => {
  const { name } = req.body;

  try {
    const teamExists = await Team.findOne({ name });

    if (teamExists) {
      return res.status(400).json({ message: 'El equipo ya existe' });
    }

    const team = await Team.create({
      name,
      members: [req.user._id],
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { createTeam, getTeams };
