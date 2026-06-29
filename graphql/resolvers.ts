import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import Author from "../models/Author";
import Category from "../models/Category";
import Book from "../models/Book";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const getTokenPayload = (context: any) => {
  const authHeader = context?.req?.headers?.authorization;
  if (!authHeader || typeof authHeader !== "string") return null;

  const token = authHeader.replace("Bearer ", "");
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
};

export const resolvers = {
  Query: {
    authors: async () => {
      return await Author.find();
    },

    author: async (_: any, { id }: { id: string }) => {
      return await Author.findById(id);
    },

    categories: async () => {
      return await Category.find();
    },

    category: async (_: any, { id }: { id: string }) => {
      return await Category.findById(id);
    },

    books: async () => {
      return await Book.find();
    },

    book: async (_: any, { id }: { id: string }) => {
      return await Book.findById(id);
    },

    me: async (_: any, _args: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload?.userId) return null;
      const user = await User.findById(payload.userId);
      if (!user) return null;
      return { id: user._id.toString(), username: user.username, role: user.role };
    },
  },

  Book: {
    author: async (parent: any) => {
      return await Author.findById(parent.author);
    },

    category: async (parent: any) => {
      return await Category.findById(parent.category);
    },
  },

  Mutation: {
    register: async (_: any, { input }: any) => {
      const user = await User.create(input);
      const token = jwt.sign({ userId: user._id.toString(), username: user.username, role: user.role }, JWT_SECRET, {
        expiresIn: "1d",
      });

      return {
        token,
        user: { id: user._id.toString(), username: user.username, role: user.role },
      };
    },

    login: async (_: any, { input }: any) => {
      const user = await User.findOne({ username: input.username });
      if (!user) throw new Error("Invalid credentials");

      const isValid = await user.comparePassword(input.password);
      if (!isValid) throw new Error("Invalid credentials");

      const token = jwt.sign({ userId: user._id.toString(), username: user.username, role: user.role }, JWT_SECRET, {
        expiresIn: "1d",
      });

      return {
        token,
        user: { id: user._id.toString(), username: user.username, role: user.role },
      };
    },

    createAuthor: async (_: any, { input }: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload) throw new Error("Unauthorized");
      return await Author.create(input);
    },

    updateAuthor: async (_: any, { id, input }: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload) throw new Error("Unauthorized");
      return await Author.findByIdAndUpdate(id, input, { new: true });
    },

    deleteAuthor: async (_: any, { id }: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload) throw new Error("Unauthorized");
      return await Author.findByIdAndDelete(id);
    },

    createCategory: async (_: any, { input }: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload) throw new Error("Unauthorized");
      return await Category.create(input);
    },

    updateCategory: async (_: any, { id, input }: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload) throw new Error("Unauthorized");
      return await Category.findByIdAndUpdate(id, input, { new: true });
    },

    deleteCategory: async (_: any, { id }: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload) throw new Error("Unauthorized");
      return await Category.findByIdAndDelete(id);
    },

    createBook: async (_: any, { input }: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload) throw new Error("Unauthorized");
      return await Book.create(input);
    },

    updateBook: async (_: any, { id, input }: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload) throw new Error("Unauthorized");
      return await Book.findByIdAndUpdate(id, input, { new: true });
    },

    deleteBook: async (_: any, { id }: any, context: any) => {
      const payload = getTokenPayload(context);
      if (!payload) throw new Error("Unauthorized");
      return await Book.findByIdAndDelete(id);
    },

    uploadFile: async (_: any, { fileName, base64Content }: any) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(base64Content, "base64");
      fs.writeFileSync(filePath, buffer);

      return { filename: fileName, path: filePath };
    },
  },
};