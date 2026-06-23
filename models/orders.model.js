import { model, Schema } from "mongoose";

const ordersSchema = new Schema({
    productSummary: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        }
    ],
    orderSummary: {
        orderDate: {
            type: Date,
            default: Date.now(),
            required: true
        },
        cartItems: [
            {
                productId: String,
                quantity: Number,
                size: String
            }
        ],
        deliveryAddress: {
            addressLine: { type: String, required: true },
            addressLine2: String,
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        deliveryTime: {
            type: Number,
            required: true
        },
    },
    orderNumber: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Orders = model('Orders', ordersSchema);
export default Orders;