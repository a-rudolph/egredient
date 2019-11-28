const request = require("request");
const cheerio = require("cheerio");

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
      return ingredients.map(el => {
        let ingredient = $(el).text();
        return ingredient;
      });
    };
    const getSteps = () => {
      let steps = Array.from($(`li[class=step]`));
      return steps.map(el => {
        let step = $(el)
          .text()
          .replace(/\s\s+/g, "");
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
      .replace(/\\n|\"/g, "");

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
    "https://www.allrecipes.com/recipe/17897/hungarian-mushroom-soup/?internalSource=previously%20viewed&referringContentType=Homepage"
  );
};

scrapeRecipe();
