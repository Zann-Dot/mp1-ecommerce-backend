import { model, Schema } from "mongoose";
const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        ratings: {
            type: Number,
            required: true,
        },
        priceRupees: {
            type: Number,
            required: true,
        },
        isDiscount: {
            type: Boolean,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        isReturnable: {
            type: Boolean,
            required: true,
        },
        isPayOnDelivery: {
            type: Boolean,
            required: true,
        },
        isFreeDelivery: {
            type: Boolean,
            required: true,
        },
        isWishlist: {
            type: Boolean,
            required: true
        },
        description: {
            type: [String],
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        merchantName: {
            type: String,
            required: true
        }
    },
    { timestamps: true },
);

const Products = model("Products", productSchema);
export default Products;
