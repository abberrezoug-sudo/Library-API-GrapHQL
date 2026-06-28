import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    bio: String
  }

  type Category {
    id: ID!
    name: String!
    description: String
  }

  type Book {
    id: ID!
    title: String!
    description: String
    publishedYear: Int
    author: ID!
    category: ID!
  }

  input CreateAuthorInput {
    name: String!
    bio: String
  }

  input CreateCategoryInput {
    name: String!
    description: String
  }

  input CreateBookInput {
    title: String!
    description: String
    publishedYear: Int
    author: ID!
    category: ID!
  }

  type Query {
    authors: [Author!]!
    author(id: ID!): Author
    categories: [Category!]!
    category(id: ID!): Category
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createAuthor(input: CreateAuthorInput!): Author!
    createCategory(input: CreateCategoryInput!): Category!
    createBook(input: CreateBookInput!): Book!
  }
`;
