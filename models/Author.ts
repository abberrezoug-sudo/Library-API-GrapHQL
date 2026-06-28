import mongoose, { Model, Schema } from "mongoose";

export interface AuthorDocument {
  name: string;
  bio?: string;
}

const authorSchema = new Schema<AuthorDocument>(
  {
    name: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
  },
  { timestamps: true }
);

const Author =
  (mongoose.models.Author as Model<AuthorDocument> | undefined) ||
  mongoose.model<AuthorDocument>("Author", authorSchema);

export default Author;
