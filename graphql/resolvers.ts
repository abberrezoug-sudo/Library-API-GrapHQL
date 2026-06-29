import Author from "../models/Author";
import Category from "../models/Category";
import Book from "../models/Book";

export const resolvers = {
  Query: {
    // ================= AUTHORS =================
    authors: async () => {
      return await Author.find();
    },

    author: async (_: any, { id }: { id: string }) => {
      return await Author.findById(id);
    },

    // ================= CATEGORIES =================
    categories: async () => {
      return await Category.find();
    },

    category: async (_: any, { id }: { id: string }) => {
      return await Category.findById(id);
    },

    // ================= BOOKS =================
    books: async () => {
      return await Book.find();
    },

    book: async (_: any, { id }: { id: string }) => {
      return await Book.findById(id);
    },
  },

  // ================= FIELD RESOLVERS =================
  Book: {
    author: async (parent: any) => {
      return await Author.findById(parent.author);
    },

    category: async (parent: any) => {
      return await Category.findById(parent.category);
    },
  },

  Mutation: {
    // ================= AUTHORS =================
    createAuthor: async (_: any, { input }: any) => {
      return await Author.create(input);
    },

    updateAuthor: async (_: any, { id, input }: any) => {
      return await Author.findByIdAndUpdate(id, input, {
        new: true,
      });
    },

    deleteAuthor: async (_: any, { id }: any) => {
      return await Author.findByIdAndDelete(id);
    },

    // ================= CATEGORIES =================
    createCategory: async (_: any, { input }: any) => {
      return await Category.create(input);
    },

    updateCategory: async (_: any, { id, input }: any) => {
      return await Category.findByIdAndUpdate(id, input, {
        new: true,
      });
    },

    deleteCategory: async (_: any, { id }: any) => {
      return await Category.findByIdAndDelete(id);
    },

    // ================= BOOKS =================
    createBook: async (_: any, { input }: any) => {
      return await Book.create(input);
    },

    updateBook: async (_: any, { id, input }: any) => {
      return await Book.findByIdAndUpdate(id, input, {
        new: true,
      });
    },

    deleteBook: async (_: any, { id }: any) => {
      return await Book.findByIdAndDelete(id);
    },
  },
};