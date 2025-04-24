// Import modules for the app to use
import express from "express";
import bodyParser from "body-parser";
import { createdbClient } from "./dbConfig";

// Initialize the Express app and set the port for the server to listen to
const app = express();
const port = 3000;

const db = createdbClient();
db.connect();

// Middlewear to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Makes the contents of the "public" directory accessible to the client
app.use(express.static("public"));

//test data for notes
const notes = [
  { title: "AA", note: "Aa" },
  { title: "BB", note: "Bb" },
  { title: "CC", note: "Cc" },
];

// Main page route
app.get("/", (req, res) => {
  res.render("index.ejs", {
    bookNotes: notes,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
