const { Payment } = require("../models/payment.model");
const { User } = require("../models/users.model");
const {creatOrder} = require("../config/paypal")


const createPayment = async (req, res) => {
  try {
    const { paymentMethod, currency } = req.body;
    const userId = req.user.id; // Store just the user ID
    const newPayment = new Payment({
      user: userId, // Store user ID
      paymentMethod,
      currency,
      paymentDate: new Date(), 
    });
    await newPayment.save();
    
    res.status(200).send({ message: "Payment created successfully" });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
};

const paidBills = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.hasPaid) { // Implement your logic for checking if user has paid
      user.role = "premium";
      await user.save();
      res.status(200).json({ message: "User upgraded to premium successfully" });
    } else {
      res.status(400).json({ error: "User has not paid yet" });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const create_paypal_order = async (req, res, paypal) => {
  try {
    const order = await paypal.createOrder(); // Corrected typo
    res.json(order);
  } catch(err) {
    console.error("Error creating PayPal order:", err);
    res.status(500).send(err.message);
  }
};

const capture_paypal_order = async (req, res, paypal) => {
  const { orderID } = req.body;
  try {
    const captureData = await paypal.captureOrder(orderID);
    res.json(captureData);
  } catch(err) {
    console.error("Error capturing PayPal order:", err);
    res.status(500).send(err.message);
  }
};

module.exports = { createPayment, paidBills, create_paypal_order, capture_paypal_order };

      //       gateway.transaction.sale({
      //         amount: amount.toString(), 
      //         paymentMethodToken: "theToken",
      //         transactionSource: "recurring",
      //         options: {
      //           submitForSettlement: true,
      //         }
      //       }, function(err, result) {
      //         if (err) {
      //           console.error("Braintree error:", err);
      //           return res.status(500).json({ success: false, message: "An error occurred while processing the payment." });
      //         }
      //         if (result.success) {
      //           return res.status(200).json({ success: true, message: "Payment processed successfully.", transactionId: result.transaction.id });
      //         } else {
      //           return res.status(400).json({ success: false, message: result.message });
      //         }
      //       });
      
      //     } catch (error) {
      //       console.error("Error:", error);
      //       return res.status(500).json({ success: false, message: "An error occurred while processing the payment." });
      //     }
      // }