import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            default: "guest",
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
    },
    { timestamps: true },
);

const Users = mongoose.model("Users", userSchema);
export default Users;
