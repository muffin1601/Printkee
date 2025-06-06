const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/subcategoryRoutes"));
app.use("/api", require("./routes/productRoutes"));

// Start server
const PORT = process.env.PORT || 5030;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
