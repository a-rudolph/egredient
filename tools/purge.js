let MongoClient = require("mongodb").MongoClient;
let inquirer = require("inquirer");
require("dotenv").config();

let dbo = undefined;
let url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}.mongodb.net/test?retryWrites=true&w=majority`;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  if (err) {
    console.log("error connecting database: ", err);
    return;
  }
  dbo = db.db("e-gredient");
  let collections = ["auth", "users", "sessions", "recipes", "done"];
  //   let collections = dbo.runCommand({
  //     listCollections: 1.0,
  //     authorizedCollections: true,
  //     nameOnly: true
  //   });
  console.log("Collections: ", collections.join(", "));
  let inquire = () => {
    inquirer
      .prompt([
        // {
        //   type: "list",
        //   choices: collections,
        //   name: "collection",
        //   message: "Choose a collection to purge?"
        // }
        {
          type: "input",
          name: "collection",
          message: "Choose a collection to purge",
          default: "done"
        }
      ])
      .then(answer => {
        if (answer.collection === "done") {
          console.log("Happy coding!");
          db.close();
          return;
        }
        console.log("purging: ", answer.collection);
        dbo = db
          .db("e-gredient")
          .collection(answer.collection)
          .deleteMany({});
        console.log("purge complete");
        inquire();
      });
  };
  inquire();
});
