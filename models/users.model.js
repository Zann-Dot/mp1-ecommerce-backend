import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            default: "guest",
            enum: ['customer', 'seller', 'guest']
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        ISDCode: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            addressLine: String,
            city: String,
            state: String,
            pincode: {
                type: String,
                required: true,
            },
        },
        shopName: { type: String || null },
    },
    { timestamps: true },
);

const Users = mongoose.model("Users", userSchema);
export default Users;
