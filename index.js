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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
