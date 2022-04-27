const express = require('express');
const helmet = require("helmet");
const morgan = require("morgan");
const genres = require("./routes/genres");
const customers = require('./routes/customers')
const home = require("./routes/home");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log("connected to mongo db..."))
.catch(()=>console.log("Cannot connect to mongodb...", err)); 

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log("Listening on port 3000..."))
