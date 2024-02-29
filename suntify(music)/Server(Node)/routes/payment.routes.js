const {Router} = require('express');
const router = Router();
const { createPayment, paidBills, create_paypal_order, capture_paypal_order } = require('../controllers/payment.controller');
const { auth } = require('../middleware/auth');

router.post('/create-payment', auth, createPayment);
router.patch('/userPaid', paidBills);
router.post('/create-paypal-order', auth , create_paypal_order);
router.post('/capture-paypal-order', auth , capture_paypal_order);

module.exports = router;
