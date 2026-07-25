// server.js
// Entry point for the Health Threat Detection backend (Phase 1).
// Boots Express + Socket.IO for the simplified live-security MVP.

require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");

const db = require("./database/database");
const createAuthRoutes = require("./routes/authRoutes");
const createActivityRoutes = require("./routes/activityRoutes");
const createAdminRoutes = require("./routes/adminRoutes");
const createCommunicationRoutes = require("./routes/communicationRoutes");
const createMlRoutes = require("./routes/mlRoutes");
const { initSocket, emitDoctorLogin } = require("./services/socketService");

const app = express();
const PORT = process.env.PORT || 3000;

// Demo mode: clear stale restrictions so doctor access is always recoverable after restart.
db.run("UPDATE account_restrictions SET status='Cleared' WHERE status='Active'", (err) => {
  if (err) console.warn('Restriction reset warning:', err.message);
});

// Trust proxy headers so req.ip is accurate across LAN/reverse-proxy setups.
app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check endpoint for quick network/uptime verification.
app.get("/api/health", (_req, res) => {
  res.json({ success: true, status: "ok", time: new Date().toISOString() });
});

// One HTTP server shared between Express and Socket.IO.
const server = http.createServer(app);
const io = initSocket(server);

// Wire auth routes with the Socket.IO instance so doctor logins are broadcast live.
app.use("/api/auth", createAuthRoutes(io, emitDoctorLogin));

// Phase 2: doctor activity + risk routes, and admin monitoring routes.
app.use("/api/activity", createActivityRoutes(io));
app.use("/api/admin", createAdminRoutes());
app.use("/api/communication", createCommunicationRoutes(io));
app.use("/api/ml", createMlRoutes(io));

// Catch-all for unknown API routes (registered AFTER real routes).
app.use("/api", (_req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Database connected");
  console.log("Socket.IO initialized");
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

// Graceful shutdown on Ctrl+C.
process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  io.close(() => {
    server.close(() => {
      db.close(() => process.exit(0));
    });
  });
});
