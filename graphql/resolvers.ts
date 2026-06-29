import Author from "../models/Author";
import Category from "../models/Category";
import Book from "../models/Book";

const formatAuthor = (author: any) => ({
  id: author?._id?.toString() ?? author?.id ?? "",
  name: author?.name ?? "",
  biography: author?.biography ?? "",
  country: author?.country ?? "",
});

const formatCategory = (category: any) => ({
  id: category?._id?.toString() ?? category?.id ?? "",
  name: category?.name ?? "",
});

const formatBook = (book: any, author: any, category: any) => ({
  id: book?._id?.toString() ?? book?.id ?? "",
  title: book?.title ?? "",
  description: book?.description ?? "",
  publishedYear: book?.publishedYear ?? 0,
  pages: book?.pages ?? 0,
  author: formatAuthor(author),
  category: formatCategory(category),
});

export const resolvers = {
  Query: {
    authors: async () => {
      const authors = await Author.find().lean();
      return authors.map(formatAuthor);
    },

    author: async (_: any, { id }: { id: string }) => {
      const author = await Author.findById(id).lean();
      return author ? formatAuthor(author) : null;
    },

    categories: async () => {
      const categories = await Category.find().lean();
      return categories.map(formatCategory);
    },

    category: async (_: any, { id }: { id: string }) => {
      const category = await Category.findById(id).lean();
      return category ? formatCategory(category) : null;
    },

    books: async () => {
      const books = await Book.find().lean();
      return await Promise.all(
        books.map(async (book: any) => {
          const author = book.author ? await Author.findById(book.author).lean() : null;
          const category = book.category ? await Category.findById(book.category).lean() : null;
          return formatBook(book, author, category);
        })
      );
    },

    book: async (_: any, { id }: { id: string }) => {
      const book = await Book.findById(id).lean();
      if (!book) return null;

      const author = book.author ? await Author.findById(book.author).lean() : null;
      const category = book.category ? await Category.findById(book.category).lean() : null;
      return formatBook(book, author, category);
    },
  },

  Mutation: {
    createAuthor: async (_: any, { input }: any) => {
      const author = await Author.create(input);
      const authorData = author.toObject() as { biography?: string; country?: string };

      return formatAuthor({
        ...input,
        ...authorData,
        biography: input?.biography ?? authorData?.biography ?? "",
        country: input?.country ?? authorData?.country ?? "",
      });
    },

    createCategory: async (_: any, { input }: any) => {
      const category = await Category.create(input);
      return formatCategory(category.toObject());
    },

    createBook: async (_: any, { input }: any) => {
      const createdBook = await Book.create(input);
      const book = await Book.findById(createdBook._id).lean();
      const author = book?.author ? await Author.findById(book.author).lean() : null;
      const category = book?.category ? await Category.findById(book.category).lean() : null;
      return book ? formatBook(book, author, category) : null;
    },
  },
};