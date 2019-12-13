let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer();
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let MongoClient = require("mongodb").MongoClient;
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
let genID = () => "" + Math.floor(Math.random() * 1000000);
let setSID = (username, res) => {
  findSingle({ username }, SESSIONS).then(found => {
    if (found !== null) {
      dbo.collection(SESSIONS).deleteOne({ username });
    }
    let sid = genID();
    dbo.collection(SESSIONS).insertOne({ username, sid });
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
      let saved = {};
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
        findSingle({ username }, SESSIONS).then(found => {
          if (found !== null) {
            dbo.collection(SESSIONS).deleteOne({ username });
          }
          let sid = genID();
          dbo.collection(SESSIONS).insertOne({ username, sid });
          res.cookie("sid", sid);
          findSingle({ username }, USERS).then(found => {
            res.send(
              JSON.stringify({
                success: true,
                username,
                favourites: found.saved
              })
            );
          });
        });
        return;
      }
      console.log("invalid password");
      res.send(FAILURE);
    });
  });
});

app.get("/logout", (req, res) => {
  console.log("... logout");
  res.clearCookie("sid");
  res.send(SUCCESS);
});

app.post("/checkCookie", upload.none(), (req, res) => {
  let sid = req.cookies.sid;
  console.log("... checking cookie, ", sid);
  if (sid !== undefined) {
    findSingle({ sid }, SESSIONS).then(found => {
      console.log(found);
      if (found === null) {
        console.log("found null");
        res.send(FAILURE);
        return;
      }
      if (found.username !== undefined) {
        let username = found.username;
        findSingle({ username }, USERS).then(found => {
          res.send(
            JSON.stringify({ success: true, username, favourites: found.saved })
          );
        });
        return;
      }
      res.send(FAILURE);
    });
  } else {
    console.log("no cookie");
    res.send(FAILURE);
  }
});

/** RECIPES AND SUCH */

app.get("/tags", (req, res) => {
  console.log("... getting tags");
  dbo
    .collection(RECIPES)
    .find({}, { tags: 1 })
    .toArray((err, arr) => {
      if (err) {
        console.log("error: ", err);
        res.send(FAILURE);
        return;
      }
      if (arr === null) {
        console.log("no recipes found");
        res.send(FAILURE);
        return;
      }
      // arr [{ tags: [...] }, { tags: [...] }, ...]
      let uniqueTags = {};
      arr.forEach(rec => {
        rec.tags.forEach(tag => {
          if (uniqueTags[tag] === undefined) {
            uniqueTags[tag] = 1;
          }
        });
      });
      let tagArray = Object.keys(uniqueTags);
      res.send(JSON.stringify(tagArray));
    });
});

app.get("/get-recipes", (req, res) => {
  console.log("... getting recipes");
  dbo
    .collection(RECIPES)
    .find({})
    .toArray((err, arr) => {
      if (err) {
        console.log("error: ", err);
        res.send(FAILURE);
        return;
      }
      if (arr === null) {
        console.log("no recipes found");
        res.send(FAILURE);
        return;
      }
      res.send(JSON.stringify(arr));
    });
});

app.post("/search-recipes", upload.none(), (req, res) => {
  console.log("... searching recipes, ", req.body);
  let queryString = req.body.query;
  let query = queryString.split(" ");
  let regexQ = query.map(q => {
    return {
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ]
    };
  });
  let searchQuery = {};
  searchQuery["$and"] = regexQ;

  //check tags
  if (req.body.tags !== undefined) {
    let tagsObj = JSON.parse(req.body.tags);
    let tags = Object.keys(tagsObj);
    if (tags.length !== 0) searchQuery.tags = { $all: tags };
  }
  // search db
  dbo
    .collection(RECIPES)
    .find(searchQuery)
    .toArray((err, arr) => {
      if (err) {
        console.log("error: ", err);
        res.send(FAILURE);
        return;
      }
      if (arr === null) {
        console.log("no recipes found");
      }
      res.send(JSON.stringify(arr));
    });
});

app.post("/search-ingredients", upload.none(), (req, res) => {
  console.log("... searching by ingredients, ", req.body);
  // arrays of the search criteria
  let ands = Object.keys(JSON.parse(req.body.and));
  let ors = Object.keys(JSON.parse(req.body.or));
  let nots = Object.keys(JSON.parse(req.body.not));
  // build search query
  let query = [];
  /** query structure
  { $and: [
    { ing:  { $regex: ands[0], $options: "i" } },
    { ing:  { $regex: ands[1], $options: "i" } },
    { ing: { $regex: ors[0]|ors[1]|ors[2], $options: "i" }},
    { $not: { ing: { $regex: nots[0]|nots[1]|nots[2], $options: "i" }} }
  ] }
   */
  ands.forEach(and => {
    query.push({ ingredients: { $regex: and, $options: "i" } });
  });
  if (ors.length !== 0)
    query.push({ ingredients: { $regex: ors.join("|"), $options: "i" } });
  if (nots.length !== 0)
    query.push({
      ingredients: { $not: { $regex: nots.join("|"), $options: "i" } }
    });

  let searchQuery = { $and: query };

  dbo
    .collection(RECIPES)
    .find(searchQuery)
    .toArray((err, arr) => {
      if (err) {
        console.log("error: ", err);
        res.send(FAILURE);
        return;
      }
      if (arr === null) {
        console.log("no recipes found");
      }
      res.send(JSON.stringify(arr));
    });
});

app.post("/new-recipe", upload.none(), (req, res) => {
  console.log("... new recipe: ", req.body);
  //recieves: "title", "description", [ingredients], [steps], [tags]
  let sid = req.cookies.sid;
  findSingle({ sid }, SESSIONS).then(found => {
    if (found === null) {
      console.log("invalid sid");
      res.send(FAILURE);
      return;
    }
    let chef = found.username;
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

/** HANDLING FAVOURITES */
app.post("/update-favourites", upload.none(), (req, res) => {
  console.log("... updating favourites, ", req.body);
  let rid = req.body.rid;
  let username = req.body.username;
  findSingle({ username }, USERS).then(found => {
    let favs = found.saved;
    if (favs[rid] === undefined) {
      favs[rid] = 1;
    } else {
      delete favs[rid];
    }
    dbo.collection(USERS).updateOne({ username }, { $set: { saved: favs } });
    res.send(JSON.stringify(favs));
  });
});

app.post("/get-favourites", upload.none(), (req, res) => {
  console.log("... getting favourites");
  let rids = JSON.parse(req.body.rids);
  let q = rids.map(rid => {
    return { rid: parseInt(rid) };
    // return { rid };
  });
  let searchQuery = { $or: q };
  dbo
    .collection(RECIPES)
    .find(searchQuery)
    .toArray((err, arr) => {
      if (err) {
        console.log("error: ", err);
        res.send(FAILURE);
        return;
      }
      res.send(JSON.stringify({ recipes: arr }));
    });
});

/**BOILERPLATE THINGS */
app.all("/*", (req, res, next) => {
  console.log("sending file");
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
