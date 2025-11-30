const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Usuario no encontrado o token inválido.');
      }

      next();

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'No autorizado, token fallido o expirado.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token.' });
  }
};

module.exports = { protect };