import app from "./app";
import { ENV } from "./config/env";
import { prisma } from "./config/database";

const startServer = async () => {
  let isDatabaseConnected = false;

  try {
    await prisma.$connect();
    isDatabaseConnected = true;
    console.log("Database connected");
  } catch (error) {
    console.warn("Database connection unavailable. Server will start, but database-backed APIs will fail until PostgreSQL is running.");
    console.warn(error);
  }

  app.locals.isDatabaseConnected = isDatabaseConnected;

  app.listen(ENV.PORT, () => {
    console.log(`Server running on http://localhost:${ENV.PORT}`);
    console.log(`Environment: ${ENV.NODE_ENV}`);
  });
};

startServer();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Server shut down");
  process.exit(0);
});
