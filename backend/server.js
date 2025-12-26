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
app.use ("/api/visitors", require("./routes/visitor"));
app.use("/api", require("./routes/searchRoutes"));
app.use("/api", require("./routes/emailRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/subcategory", require("./routes/subcategoryRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


const PORT = process.env.PORT || 5030;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
