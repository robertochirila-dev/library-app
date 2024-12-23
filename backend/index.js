const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();
app.use(cors());
app.use(bodyParser.json());


const uri = "mongodb://127.0.0.1:27017/library"; // Replace 'library' with your database name
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Routes
app.use("/books", require("./routes/books"));
app.use("/readers", require("./routes/readers"));
app.use("/borrow", require("./routes/loans"));


// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));