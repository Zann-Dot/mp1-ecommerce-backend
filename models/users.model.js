import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
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
            match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit phone number']
        },
        address: {
            addressLine: String,
            city: String,
            state: String,
            pincode: {
                type: String,
                required: true,
                match: [/^\d{6}$/, "Pincode must be number only"]
            },
        },
        shopName: {
            type: String || null
        },
        TnC: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true },
);

const Users = mongoose.model("Users", userSchema);
export default Users;
