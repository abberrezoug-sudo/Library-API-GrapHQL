export const typeDefs = `

type Author {
  id: ID!
  name: String!
  biography: String!
  country: String!
}

type Category {
  id: ID!
  name: String!
}

type Book {
  id: ID!
  title: String!
  description: String!
  publishedYear: Int!
  pages: Int!
  author: Author!
  category: Category!
}

input CreateAuthorInput {
  name: String!
  biography: String!
  country: String!
}

input CreateCategoryInput {
  name: String!
}

input CreateBookInput {
  title: String!
  description: String!
  publishedYear: Int!
  pages: Int!
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
console.log("Schema loaded");