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
        orderQuantity: [
            {
                productId: String,
                quantity: Number
            }
        ],
        deliveryAddress: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

const Orders = model('Orders', ordersSchema);
export default Orders;