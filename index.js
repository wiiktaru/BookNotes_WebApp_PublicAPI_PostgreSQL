// Import modules for the app to use
import express from "express";
import bodyParser from "body-parser";
import { createdbClient } from "./dbConfig.js";

// Initialize the Express app and set the port for the server to listen to
const app = express();
const port = 3000;

// Create a db client to Node.js with pg library
const db = createdbClient();
db.connect();

// Middlewear to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Makes the contents of the "public" directory accessible to the client
app.use(express.static("public"));

async function getAllNotesFromdb() {
  try {
    const result = await db.query("SELECT * FROM notes");
    var notes = result.rows;

    console.log(notes);
  } catch (err) {
    console.log(err);
  }
  return notes;
}

// Main page route
app.get("/", async (req, res) => {
  const notes = await getAllNotesFromdb();
  res.render("index.ejs", {
    bookNotes: notes,
  });
});

// Add new note route
app.post("/new", (req, res) => {
  res.render("new.ejs");
});

// Add new note to db route
app.post("/add", async (req, res) => {
  const isbn = req.body.isbn;
  const title = req.body.title;
  const note = req.body.note;

  console.log(isbn + " " + title + " " + note);

  try {
    const result = await db.query(
      "INSERT INTO notes (isbn, title, note) VALUES ($1, $2, $3) RETURNING isbn",
      [isbn, title, note]
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  }

  res.redirect("/");
});

// Edit note route
app.post(`/edit/:isbn`, (req, res) => {
  const isbn = req.params.isbn;

  console.log(isbn);

  res.render("edit.ejs", {
    isbn: isbn,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
