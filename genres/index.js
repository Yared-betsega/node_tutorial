const express = require('express');

const helmet = require("helmet");
const morgan = require("morgan");
const genres = require("./routes/genres");
const home = require("./routes/home");



const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log("Listening on port 3000..."))
