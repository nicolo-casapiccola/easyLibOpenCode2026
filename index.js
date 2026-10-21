import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import booksRouter from "./app/books.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(booksRouter);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

async function start() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connesso a MongoDB");

    app.listen(port, () => {
      console.log(`Server EasyLib in ascolto sulla porta ${port}`);
    });
  } catch (error) {
    console.error("Impossibile avviare il server:", error.message);
    process.exit(1);
  }
}

start();
