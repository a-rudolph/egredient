let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer();
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let bcrypt = require("bcryptjs");
let saltRounds = 10;
let reloadMagic = require("./reload-magic.js");

reloadMagic(app);

/**CONNECTING THE DATABASE */
let dbo = undefined;
let url =
  "mongodb+srv://adam:bobsuebob@cluster0-kjakq.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  if (err) {
    console.log("error connecting database: ", err);
    return;
  }
  dbo = db.db("e-gredient");
  console.log("database is online");
});

/**SOME GLOBAL THINGS*/
const SUCCESS = JSON.stringify({ success: true });
const FAILURE = JSON.stringify({ success: false });
/**COLLECTIONS */
const AUTH = "auth";
const SESSIONS = "sessions";
const USERS = "users";
const RECIPES = "recipes";
const RATINGS = "ratings";

/**USEFUL FUNCTIONS */
let genID = () => Math.floor(Math.random() * 1000000);
let setSID = (username, res) => {
  findSingle({ username }, SESSIONS).then(found => {
    if (found !== null) {
      dbo.collection("sessions").deleteOne({ username });
    }
    let sid = genID();
    dbo.collection("sessions").insertOne({ username, sid });
    res.cookie("sid", sid);
    res.send(SUCCESS);
  });
};

/** for searching in db */
let findSingle = (query, collection) => {
  let ret = new Promise((resolve, reject) => {
    dbo.collection(collection).findOne(query, (err, found) => {
      if (err) {
        reject("error: ", err);
        return;
      }
      resolve(found);
    });
  });
  return ret;
};

let findMany = (query, collection) => {
  return; // MORE ON THIS LATER
};

/**STATIC ENDPOINTS */
app.use("/", express.static("build"));
app.use("/", express.static("public"));

/********************* ENDPOINTS *****************************/

/** AUTHENTICATION */

app.post("/signup", upload.none(), (req, res) => {
  console.log("... signup request by: ", req.body.username);
  let username = req.body.username;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log("error bcrypt hashing: ", err);
      return;
    }
    findSingle({ username }, AUTH).then(found => {
      if (found !== null) {
        res.send(FAILURE);
        nameAvailable = false;
        return;
      }
      let uid = genID();
      let recipes = [];
      let saved = [];
      dbo.collection(AUTH).insertOne({ username, hash });
      dbo.collection(USERS).insertOne({ username, uid, recipes, saved });
      setSID(username, res); //sets sid & sends SUCCESS
    });
  });
});

app.post("/login", upload.none(), (req, res) => {
  console.log("... login request by: ", req.body.username);
  let username = req.body.username;
  findSingle({ username }, AUTH).then(found => {
    if (found === null) {
      console.log("username doesn't exist");
      res.send(FAILURE);
      return;
    }
    bcrypt.compare(req.body.password, found.hash).then(match => {
      if (match) {
        setSID(username, res);
        return;
      }
      console.log("invalid password");
      res.send(FAILURE);
    });
  });
});

app.post("/logout", upload.none(), (req, res) => {
  console.log("... logout");
  res.clearCookie("sid");
  res.send(SUCCESS);
});

app.post("/checkCookie", upload.none(), (req, res) => {
  console.log("... checking cookie");
  let sid = req.cookies.sid;
  if (sid !== undefined) {
    findSingle({ sid }, SESSIONS).then(found => {
      if (found.uid !== undefined) {
        res.send(SUCCESS);
        return;
      }
      res.send(FAILURE);
    });
  } else {
    res.send(FAILURE);
  }
});

/** RECIPES AND SUCH */

app.get("/recipes", (req, res) => {});

app.post("/new-recipe", upload.none(), (req, res) => {
  console.log("... new recipe: ", req.body);
  //recieves: "title", "description", [ingredients], [steps], [tags]
  let sid = req.cookies.sid;
  findSingle({ sid }, SESSIONS).then(found => {
    // if (found === null) {
    //   console.log("invalid sid");
    //   res.send(FAILURE);
    //   return;
    // }
    let chef = "guest chef";
    let rid = genID();
    let date = new Date();
    let title = req.body.title;
    let image = req.body.image;
    let description = req.body.description;
    let ingredients = JSON.parse(req.body.ingredients);
    let steps = JSON.parse(req.body.steps);
    let tags = JSON.parse(req.body.tags);
    let newRecipe = {
      chef,
      rid,
      date,
      title,
      image,
      description,
      ingredients,
      steps,
      tags
    };
    console.log("new recipe: ", newRecipe);
    //dbo.collection(RECIPES).insertOne(newRecipe);
    res.send(SUCCESS);
  });
});

/**BOILERPLATE THINGS */
app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
