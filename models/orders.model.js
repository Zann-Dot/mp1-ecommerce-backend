import { model, Schema } from "mongoose";

const ordersSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    orderSummary: {
        orderDate: {
            type: Date,
            required: true
        },
        orderQuantity: {
            type: Number,
            required: true
        },
        deliveryAddress: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

const Orders = model('Orders', ordersSchema);
export default Orders;