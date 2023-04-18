const express = require('express');
const mongoose = require('mongoose');
const app = express();

// DB 연결
mongoose.connect('mongodb+srv://admin:elice1234@admin-cluster.dj8naev.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
})

app.get('/', (req,res) => {
  res.send('OK');
});

app.listen(8080);