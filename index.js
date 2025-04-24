// Import modules for the app to use
import express from "express";
import bodyParser from "body-parser";

// Initialize the Express app and set the port for the server to listen to
const app = express();
const port = 3000;

// Middlewear to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Makes the contents of the "public" directory accessible to the client
app.use(express.static("public"));

// Main page route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
