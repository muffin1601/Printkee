const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/subcategoryRoutes"));
app.use("/api", require("./routes/productRoutes"));

const PORT = process.env.PORT || 5030;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
