import { model, Schema } from "mongoose";
const checkoutSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        addressLine: {
            type: String,
            required: true,
        },

        addressLine2: String,

        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    shipping: {
        type: Number,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
});
const Checkout = model("Checkout", checkoutSchema);
export default Checkout;