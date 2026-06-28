import mongoose, { Model, Schema, Types } from "mongoose";

export interface BookDocument {
  title: string;
  description?: string;
  publishedYear?: number;
  author: Types.ObjectId;
  category: Types.ObjectId;
}

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    publishedYear: { type: Number },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

const Book =
  (mongoose.models.Book as Model<BookDocument> | undefined) ||
  mongoose.model<BookDocument>("Book", bookSchema);

export default Book;
