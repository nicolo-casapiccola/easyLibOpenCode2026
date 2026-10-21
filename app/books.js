import express from "express";
import Book from "./models/book.js";

const router = express.Router();

// Neutralizza i caratteri speciali dell'input, così vengono cercati alla lettera.
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Ricerca per titolo e/o autore, senza distinguere maiuscole/minuscole e
// accettando corrispondenze parziali (AC-US01-01, 02, 05).
router.get("/api/v1/books", async (req, res) => {
  try {
    const { title, author } = req.query;
    const filter = {};

    if (typeof title === "string" && title.trim() !== "") {
      filter.title = { $regex: escapeRegex(title.trim()), $options: "i" };
    }

    if (typeof author === "string" && author.trim() !== "") {
      filter.author = { $regex: escapeRegex(author.trim()), $options: "i" };
    }

    // Restituisce solo i campi mostrati all'utente (AC-US01-03);
    // se nessun libro corrisponde, l'array è vuoto (AC-US01-04).
    const books = await Book.find(filter)
      .select("title author available")
      .sort({ title: 1 })
      .lean();

    res.json(books);
  } catch (error) {
    console.error("Errore nella ricerca dei libri:", error.message);
    res.status(500).json({ error: "Impossibile completare la ricerca" });
  }
});

export default router;
