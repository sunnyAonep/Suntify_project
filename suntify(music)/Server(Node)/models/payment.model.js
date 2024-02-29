const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Store user ID directly
        ref: 'User' // Reference to User model
    },
    paymentMethod: String, // Add more descriptive field names
    currency: String,
    paymentDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = { Payment };