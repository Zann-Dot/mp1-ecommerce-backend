import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: String,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 0
    },
    size: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Cart = model('Cart', cartSchema);
export default Cart;