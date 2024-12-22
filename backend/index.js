const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/books", require("./routes/books"));
app.use("/readers", require("./routes/readers"));
app.use("/loans", require("./routes/loans"));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));