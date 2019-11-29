let MongoClient = require("mongodb").MongoClient;
let inquirer = require("inquirer");

let dbo = undefined;
let url =
  "mongodb+srv://adam:bobsuebob@cluster0-kjakq.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  if (err) {
    console.log("error connecting database: ", err);
    return;
  }
  dbo = db.db("e-gredient");
  let collections = [
    "auth",
    "users",
    "sessions",
    "recipes",
    "ingredients",
    "done"
  ];
  //   let collections = dbo.runCommand({
  //     listCollections: 1.0,
  //     authorizedCollections: true,
  //     nameOnly: true
  //   });
  // console.log("Collections: ", collections.join(", "));
  let inquire = () => {
    inquirer
      .prompt([
        {
          type: "list",
          choices: collections,
          name: "collection",
          message: "Choose a collection to purge?"
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
