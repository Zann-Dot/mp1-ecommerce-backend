import { model, Schema } from "mongoose";
const productSchema = new Schema(
  {
    productName: String,
    imageUrl: String,
    ratings: Number,
    priceRupees: Number,
    isDiscount: Boolean,
    discount: Number,
    isReturnable: Boolean,
    isPayOnDelivery: Boolean,
    isFreeDelivery: Boolean,
    description: [String],
  },
  { timestamps: true },
);

const Products = model("Products", productSchema);
export default Products;
