const Match = require('../models/Match');

const createMatch = async (req, res) => {
  const { teamA, teamB, date } = req.body;

  try {
    const match = await Match.create({
      teamA,
      teamB,
      date,
    });

    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { createMatch, getMatches };
