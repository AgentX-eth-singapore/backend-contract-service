const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const contractRoutes = require("./routes/contractRoutes");
const db = require("./config/db");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Connect to MongoDB
db.connect();

// Routes
app.use("/api/contracts", contractRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
