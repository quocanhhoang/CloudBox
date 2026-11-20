const express = require("express");
const cors = require("cors");

require("dotenv").config();

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes); // Tiền tố /api cho tất cả các route trong healthRoutes
app.use("/api", authRoutes); // Tiền tố /api cho tất cả các route trong authRoutes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});