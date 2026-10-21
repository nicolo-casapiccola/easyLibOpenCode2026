import "dotenv/config";
import mongoose from "mongoose";
import Book from "../app/models/book.js";

const books = [
  {
    title: "I promessi sposi",
    author: "Alessandro Manzoni",
    isbn: "9788804668237",
    available: true,
  },
  {
    title: "Il nome della rosa",
    author: "Umberto Eco",
    isbn: "9788845272738",
    available: false,
  },
  {
    title: "Il Gattopardo",
    author: "Giuseppe Tomasi di Lampedusa",
    isbn: "9788804677754",
    available: true,
  },
  {
    title: "Se una notte d'inverno un viaggiatore",
    author: "Italo Calvino",
    isbn: "9788804668626",
    available: true,
  },
  {
    title: "La coscienza di Zeno",
    author: "Italo Svevo",
    isbn: "9788838901989",
    available: true,
  },
  {
    title: "Il fu Mattia Pascal",
    author: "Luigi Pirandello",
    isbn: "9788817155120",
    available: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connesso a MongoDB");

    await Book.deleteMany({});
    const inserted = await Book.insertMany(books);
    console.log(`Inseriti ${inserted.length} libri di prova`);
  } catch (error) {
    console.error("Impossibile eseguire il seed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
