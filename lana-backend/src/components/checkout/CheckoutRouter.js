const express = require('express');

const router = express.Router();
const Controller = require('./CheckoutController');

router.post('/checkout', Controller.createBasket);
router.get('/checkout', Controller.getBasket);
router.delete('/checkout', Controller.deleteBasket);

router.post('/checkout/:code', Controller.addItem);
router.delete('/checkout/:code', Controller.removeItem);

module.exports = router;
