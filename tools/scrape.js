const request = require("request");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
let MongoClient = require("mongodb").MongoClient;
let inquirer = require("inquirer");

let newRecipe = async url => {
  let res = await fetch(url);
  let html = await res.text();

  /**start scraping */
  const $ = cheerio.load(html);

  const getIngredients = () => {
    let ingredients = Array.from($(`span[itemprop=recipeIngredient]`));
    return ingredients.map(el => {
      let ingredient = $(el).text();
      // console.log($(el).parent);
      // if ($(el).parent.class !== "checkList__item") {
      //   return "<b>" + ingredient + "</b>";
      // }
      return ingredient;
    });
  };
  const getSteps = () => {
    let steps = Array.from($(`li[class=step]`));
    return steps
      .map(el => {
        let step = $(el)
          .text()
          .replace(/\s\s+/g, "");
        return step;
      })
      .slice(0, -1);
  };
  const getTags = () => {
    let tags = Array.from($("meta[itemprop=recipeCategory]"));
    return tags.map(el => {
      return $(el).attr("content");
    });
  };

  let title = $("title")
    .text()
    .split(" Recipe")[0];
  let description = $("div[itemprop=description]")
    .text()
    .replace(/\\n|\"/g, "");
  let chef = $("span[class=submitter__name]").text();
  let rid = Math.floor(Math.random() * 1000000);
  let image = $("img[class=rec-photo]").attr("src");
  let tags = getTags();
  let ingredients = getIngredients();
  let steps = getSteps();
  let recipe = {
    title,
    description,
    image,
    tags,
    ingredients,
    steps,
    rid,
    chef
  };
  return recipe;
};

let addToDb = arr => {
  let url =
    "mongodb+srv://adam:bobsuebob@cluster0-kjakq.mongodb.net/test?retryWrites=true&w=majority";
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) {
      console.log("error connecting database: ", err);
      return;
    }
    console.log("database connected");
    inquirer
      .prompt([
        {
          type: "input",
          name: "query",
          message: "would you like to add to db (y/n)",
          default: "n"
        }
      ])
      .then(answer => {
        if (answer.query === "n") {
          console.log("Happy coding!");
          db.close();
          return;
        }
        db.db("e-gredient")
          .collection("recipes")
          .insertMany(arr);
        console.log("insert complete");
        db.close();
      });
  });
};

let getUrls = async url => {
  let resp = await fetch(url);
  let html = await resp.text();

  /**start scraping */
  const $ = cheerio.load(html);

  let tiles = Array.from($("article[class=fixed-recipe-card]")).splice(0, 50);
  let urls = tiles.map(tile => {
    let url = $(tile)
      .find("div")
      .find("a")
      .attr("href");
    return url;
  });
  return urls;
};

let getVegetables = async url => {
  request(
    "https://simple.wikipedia.org/wiki/List_of_vegetables",
    async (err, res, html) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      if (res.statusCode !== 200) {
        console.log("failed status code");
        return;
      }
      /**scrape for the links to each veg */
      let $ = cheerio.load(html);

      let links = Array.from($(`li`).find(`a`));
      let filteredLinks = links.filter(elem => {
        let ret = $(elem).attr("class") === undefined;
        if (ret) {
          ret = !(
            $(elem)
              .attr("href")
              .includes("vegetable") ||
            $(elem)
              .attr("href")
              .includes(":") ||
            $(elem)
              .attr("href")
              .includes("Main") ||
            $(elem)
              .attr("href")
              .includes("foundation")
          );
        }
        if (ret) {
          ret = $(elem)
            .attr("href")
            .includes("/wiki");
        }
        if (ret) {
          ret = $(elem)
            .attr("href")
            .includes("/wiki");
        }
        return ret;
      });
      let endpoints = filteredLinks.map(a => {
        return $(a).attr("href");
      });

      /**scrape each vegetable link */
      let requests = endpoints.map(async link => {
        let res = await fetch("https://simple.wikipedia.org" + link);
        let html = await res.text();

        let $ = cheerio.load(html);
        let name = $(`title`)
          .text()
          .split(" - ")[0];
        let img = $(`a`)
          .find(`img`)
          .attr(`src`);
        let category = "vegetable";
        return { name, img, category };
      });
      let vegetables = await Promise.all(requests);
      console.log(vegetables);
    }
  );
};

/** enter the url you want and call the function to scrape */

let url =
  "https://www.allrecipes.com/recipe/230050/kale-quinoa-and-avocado-salad-with-lemon-dijon-vinaigrette/?internalSource=hub%20recipe&referringContentType=Search";

// newRecipe(url);
getUrls("https://www.allrecipes.com/?page=4").then(urls => {
  console.log(urls);
  let ret = undefined;
  inquirer
    .prompt([
      {
        type: "input",
        name: "query",
        message: "scrape these urls? (y/n)",
        default: "n"
      }
    ])
    .then(answer => {
      if (answer.query === "n") {
        console.log("Happy coding!");
        return;
      }
      ret = Promise.all(
        urls.map(url => {
          return newRecipe(url);
        })
      );
      return ret;
    })
    .then(arr => {
      if (arr !== undefined) {
        let filteredArr = arr.filter(recipe => {
          return recipe.image !== "";
        });
        console.log(filteredArr);
        addToDb(filteredArr);
      }
    });
});
// getVegetables();
