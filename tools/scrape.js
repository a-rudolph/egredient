const request = require("request");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

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
  });
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
  "https://www.allrecipes.com/recipe/17897/hungarian-mushroom-soup/?internalSource=previously%20viewed&referringContentType=Homepage";

newRecipe(url);
// getVegetables();
