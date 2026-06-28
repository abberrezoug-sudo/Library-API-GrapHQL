import Author from "../models/Author";
import Category from "../models/Category";
import Book from "../models/Book";

export const resolvers = {
  Query: {
    // Tous les auteurs
    authors: async () => {
      return await Author.find();
    },

    // Un seul auteur
    author: async (_: any, { id }: { id: string }) => {
      return await Author.findById(id);
    },

    // Toutes les catégories
    categories: async () => {
      return await Category.find();
    },

    // Une seule catégorie
    category: async (_: any, { id }: { id: string }) => {
      return await Category.findById(id);
    },

    // Tous les livres
    books: async () => {
      return await Book.find();
    },

    // Un seul livre
    book: async (_: any, { id }: { id: string }) => {
      return await Book.findById(id);
    },
  },
  Mutation: {
    createAuthor : async (_: any, { input }: any)=>{
           const author = await Author.create(input);
    return author;
    },
    createCategory : async(_: any, { input }: any )=>{
        const category = await Category.create(input);
        return category;
    },
    createBook: async (_: any, { input }: any) => {
  const book = await Book.create(input);
  return book;
},
  }
};