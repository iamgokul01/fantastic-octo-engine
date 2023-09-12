const express = require("express");
const app = express();
app.use(express.json());
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");
const path = require("path");
let dbPath = path.join(__dirname, "/todoApplication.db");
let db = null;

const initDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => console.log("The party has started"));
  } catch (error) {
    console.log(error.message);
  }
};

initDbAndServer();

app.get("/todos", async (request, response) => {
  try {
    let { status, search_q, priority } = request.query;

    const hasStatus = () => status !== undefined;
    const hasPriority = () => priority !== undefined;
    const hasStatusAndPriority = () =>
      status !== undefined && priority !== undefined;
    const hasSearch = () => search_q !== undefined;

    console.log(
      hasStatus(),
      hasPriority(),
      hasStatusAndPriority(),
      hasSearch()
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
