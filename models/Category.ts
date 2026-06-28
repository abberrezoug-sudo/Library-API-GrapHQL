import mongoose, { Model, Schema } from "mongoose";

export interface CategoryDocument {
  name: string;
  description?: string;
}

const categorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

const Category =
  (mongoose.models.Category as Model<CategoryDocument> | undefined) ||
  mongoose.model<CategoryDocument>("Category", categorySchema);

export default Category;
