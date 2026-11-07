
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start application
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`SafeRoute AI server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
