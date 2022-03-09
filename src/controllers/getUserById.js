const { User } = require('../models');

module.exports = async (req, res, _next) => {
  try {
    const { params: { id } } = req;
    const user = await User.findOne({ where: { id } });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'algo deu ruim', error: error.message });
  }
};
