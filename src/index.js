const express = require("express");
const connectToMongo = require("./database/db");

connectToMongo();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//Routes
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/tasks"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
