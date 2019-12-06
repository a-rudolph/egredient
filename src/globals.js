const LOGIN = "login";
const LOGOUT = "logout";
const MODAL = "modal";
const QUERY = "query";

const exampleRecipe = {
  title: "Kale, Quinoa, and Avocado Salad with Lemon Dijon Vinaigrette",
  description:
    "\nSteaming the kale removes some of the bitterness. The salad dressing ties all the flavors together. A quartet of super foods (kale, quinoa, avocado, and olive oil) make this a healthy meal!        ",
  image: "https://images.media-allrecipes.com/userphotos/560x315/4539934.jpg",
  tags: [
    "Side Dish",
    "Sauces and Condiments",
    "Salad Dressings",
    "Vinaigrette Dressing"
  ],
  ingredients: [
    "Salad",
    "2/3 cup quinoa",
    "1 1/3 cups water",
    "1 bunch kale, torn into bite-sized pieces",
    "1/2 avocado - peeled, pitted, and diced",
    "1/2 cup chopped cucumber",
    "1/3 cup chopped red bell pepper",
    "2 tablespoons chopped red onion",
    "1 tablespoon crumbled feta cheese",
    "Dressing",
    "1/4 cup olive oil",
    "2 tablespoons lemon juice",
    "1 1/2 tablespoons Dijon mustard",
    "3/4 teaspoon sea salt",
    "1/4 teaspoon ground black pepper"
  ],
  steps: [
    "Bring the quinoa and 1 1/3 cup water to a boil in a saucepan. Reduce heat to medium-low, cover, and simmer until the quinoa is tender, and the water has been absorbed, about 15 to 20 minutes. Set aside to cool.",
    "Place kale in a steamer basket over 1 inch of boiling water in a saucepan. Cover saucepan with a lid and steam kale until hot, about 45 seconds; transfer to a large plate. Top kale with quinoa, avocado, cucumber, bell pepper, red onion, and feta cheese.",
    "Whisk olive oil, lemon juice, Dijon mustard, sea salt, and black pepper together in a bowl until the oil emulsifies into the dressing; pour over the salad.",
    ""
  ],
  chef: "Le Chadam",
  date: new Date(),
  rid: "1413545345"
};

export { LOGIN, LOGOUT, MODAL, QUERY, exampleRecipe };
