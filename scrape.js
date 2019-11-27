const request = require("request");
const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fs = require("fs");
const writeStream = fs.createWriteStream("recipes.csv");

let newRecipe = async url => {
  request(url, (err, res, html) => {
    /**check for errors */
    if (err) {
      console.log("error: ", err);
      return;
    }
    if (res.statusCode !== 200) {
      console.log("failed status code");
      return;
    }
    /**start scraping */
    const $ = cheerio.load(html);

    const getIngredients = () => {
      let ingredients = Array.from($(`span[itemprop=recipeIngredient]`));
      writeStream.write("Ingredients\n");
      return ingredients.map(el => {
        let ingredient = $(el).text();
        writeStream.write(`-${ingredient}\n`);
        return ingredient;
      });
    };
    const getSteps = () => {
      let steps = Array.from($(`li[class=step]`));
      writeStream.write("Steps\n");
      return steps.map(el => {
        let step = $(el)
          .text()
          .replace(/\s\s+/g, "");
        writeStream.write(`-${step}\n`);
        return step;
      });
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
      .replace(/\"/g, "");

    writeStream.write(`${title}`);
    writeStream.write(`${description}`);

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
      steps
    };
    console.log(recipe);
    return recipe;
  });
};

let scrapeRecipe = async () => {
  let recipe = await newRecipe(
    "https://www.allrecipes.com/recipe/46968/southern-grits-casserole/?internalSource=previously%20viewed&referringContentType=Homepage"
  );
};

scrapeRecipe();
