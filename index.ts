import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { connectDB } from "./config/db";

const PORT = Number(process.env.PORT) || 4000;

async function start() {
	await connectDB();

	const server = new ApolloServer({ typeDefs, resolvers });

	const { url } = await startStandaloneServer(server, {
		listen: { port: PORT },
		context: async ({ req }) => ({ req }),
	});

	console.log(`Server ready at ${url}`);
}

start().catch((err) => {
	console.error(err);
	process.exit(1);
});
