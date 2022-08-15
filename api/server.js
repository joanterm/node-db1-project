const express = require("express");

const server = express();

server.use(express.json());

//MIDDLEWARE
const router = require("./accounts/accounts-router")
server.use("/api/accounts", router)

//SANITY CHECK
server.get("/", (req, res) => {
    res.send("Express is working correctly!")
})

module.exports = server;
