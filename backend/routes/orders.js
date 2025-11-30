const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Crear nuevo pedido (PROTEGIDA)
// @access  Private
router.post('/', protect, async (req, res, next) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    return res.json({ message: 'No hay productos en el pedido' });
  }

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (err) {
    next(err);
  }
});

module.exports = router;