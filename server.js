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

/**USEFUL FUNCTIONS */
let genID = () => Math.floor(Math.random() * 1000000);

let findSID = uid => {
  let sid = new Promise((resolve, reject) => {
    dbo.collection("sessions").findOne({ uid }, (err, found) => {
      if (err) {
        reject("error finding session: ", err);
        return;
      }
      resolve(found);
    });
  });
  return sid;
};

let setSID = (uid, res) => {
  findSID(uid).then(found => {
    if (found !== null) {
      dbo.collection("sessions").deleteOne({ uid });
    }
    let sid = genID();
    dbo.collection("sessions").insertOne({ uid, sid });
    res.cookie("sid", sid);
    res.send(SUCCESS);
  });
};

/**STATIC ENDPOINTS */
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

/**ENDPOINTS */

app.post("/signup", upload.none(), (req, res) => {
  console.log("... signup request by: ", req.body.username);
  let username = req.body.username;
  let nameAvailable = true;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log("error bcrypt hashing: ", err);
      return;
    }
    dbo.collection("auth").findOne({ username }, (err, found) => {
      if (err) {
        console.log("error checking username: ", err);
        res.send(FAILURE);
        return;
      }
      if (found !== null) {
        res.send(FAILURE);
        nameAvailable = false;
        return;
      }
    });
    if (nameAvailable) {
      let uid = genID();
      let recipes = [];
      let saved = [];
      console.log("adding to db");
      dbo.collection("sessions").insertOne({ uid: "test", sid: "test" });
      dbo.collection("auth").insertOne({ username, hash });
      dbo.collection("users").insertOne({ username, uid, recipes, saved });
      setSID(username, res); //sets sid & sends SUCCESS
    }
  });
});

/**BOILERPLATE THINGS */
app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
