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

type User {
  id: ID!
  username: String!
  role: String!
}

type AuthPayload {
  token: String!
  user: User!
}

type UploadResponse {
  filename: String!
  path: String!
}

# ================= CREATE INPUTS =================

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

input RegisterInput {
  username: String!
  password: String!
}

input LoginInput {
  username: String!
  password: String!
}

# ================= UPDATE INPUTS =================

input UpdateAuthorInput {
  name: String
  biography: String
  country: String
}

input UpdateCategoryInput {
  name: String
}

input UpdateBookInput {
  title: String
  description: String
  publishedYear: Int
  pages: Int
  author: ID
  category: ID
}

# ================= QUERIES =================

type Query {
  authors: [Author!]!
  author(id: ID!): Author

  categories: [Category!]!
  category(id: ID!): Category

  books: [Book!]!
  book(id: ID!): Book

  me: User
}

# ================= MUTATIONS =================

type Mutation {
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!

  # ---------- Authors ----------
  createAuthor(input: CreateAuthorInput!): Author!
  updateAuthor(id: ID!, input: UpdateAuthorInput!): Author
  deleteAuthor(id: ID!): Author

  # ---------- Categories ----------
  createCategory(input: CreateCategoryInput!): Category!
  updateCategory(id: ID!, input: UpdateCategoryInput!): Category
  deleteCategory(id: ID!): Category

  # ---------- Books ----------
  createBook(input: CreateBookInput!): Book!
  updateBook(id: ID!, input: UpdateBookInput!): Book
  deleteBook(id: ID!): Book

  uploadFile(fileName: String!, base64Content: String!): UploadResponse!
}
`;

console.log("Schema loaded");