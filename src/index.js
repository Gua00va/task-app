const express = require("express");
const connectToMongo = require("./database/db");
const cluster = require("cluster");
const os = require('os');
const numCpus = os.cpus().length;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './vars/.env') })

// Server Optimization Using Cluster
if(cluster.isMaster) {
    // console.log(numCpus);
    console.log(`Master ${process.pid} is running`);

    for(let i = 0; i < numCpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    })
}  else {
  connectToMongo();
  const app = express();
  const port = process.env.PORT;
  
  app.use(express.json());
  //Routes
  app.use("/api", require("./routes/users"));
  app.use("/api", require("./routes/tasks"));
  
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
}


