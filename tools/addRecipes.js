let MongoClient = require("mongodb").MongoClient;
let inquirer = require("inquirer");

let dbo = undefined;
let url =
  "mongodb+srv://adam:bobsuebob@cluster0-kjakq.mongodb.net/test?retryWrites=true&w=majority";

let recipes = [
  {
    title: "Best Green Bean Casserole",
    description:
      "\nThis great variation of the traditional green bean casserole is topped with French fried onions and Cheddar cheese.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/1656932.jpg",
    tags: ["Side Dish", "Casseroles", "Green Bean Casserole"],
    ingredients: [
      "2 (14.5 ounce) cans green beans, drained",
      "1 (10.75 ounce) can condensed cream of mushroom soup",
      "1 (6 ounce) can French fried onions",
      "1 cup shredded Cheddar cheese"
    ],
    steps: [
      "Preheat oven to 350 degrees F (175 degrees C).",
      "Place green beans and soup in a large microwave-safe bowl.Mix well and heat in the microwave on HIGH until warm (3 to 5 minutes). Stir in 1/2 cup of cheese and heat mixture for another 2 to 3 minutes. Transfer green bean mixture to a casserole dish and sprinkle with French fried onions and remaining cheese.",
      "Bake in a preheated 350 degrees F (175 degrees C) oven until the cheese melts and the onions just begin to brown.",
      ""
    ]
  },
  {
    title: "Reindeer Cookies",
    description:
      "\nThese reindeer cookies are really adorable! Children enjoy making and eating them. Add a red M&M® and make the Rudolph.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/3168649.jpg",
    tags: ["Desserts", "Cookies"],
    ingredients: [
      "1 cup butter, softened",
      "1 cup white sugar",
      "1 cup smooth peanut butter",
      "2 eggs",
      "1 teaspoon vanilla extract",
      "1/2 teaspoon salt",
      "3 cups all-purpose flour",
      "2 teaspoons baking soda",
      "72 small pretzel twists, or as needed",
      "1/2 cup chocolate chips, or as needed"
    ],
    steps: [
      "Preheat oven to 375 degrees F (190 degrees C).",
      "Beat butter, sugar, peanut butter, eggs, vanilla extract, and salt together in a bowl until smooth and creamy. Stir flour and baking soda into creamed butter mixture until well incorporated.",
      "Roll dough into 36 balls. Flatten each ball and shape into an upside-down triangle. Press two pretzels into the two top corners of each triangle for the antlers. Press two chocolate chips into the center of each triangle for the eyes, and one chocolate chip or M&M on the bottom of the triangle for the nose. Arrange cookies on baking sheets.",
      "Bake in the preheated oven until cookies are golden brown, 10 to 15 minutes.",
      ""
    ]
  },
  {
    title: "Yeast-Free Cinnamon Rolls",
    description: "\nDelicious cinnamon goodness. A total winner.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/4546484.jpg",
    tags: ["Bread", "Quick Bread"],
    ingredients: [
      "cooking spray",
      "3/4 cup all-purpose flour",
      "2 tablespoons white sugar, divided",
      "1/2 teaspoon baking powder",
      "1/4 teaspoon baking soda",
      "1/8 teaspoon salt",
      "5 tablespoons milk",
      "1/4 cup butter, melted, divided",
      "1 teaspoon apple cider vinegar",
      "3 tablespoons light brown sugar",
      "1 teaspoon ground cinnamon"
    ],
    steps: [
      "Preheat oven to 375 degrees F (190 degrees C). Spray 4 muffin cups with cooking spray.",
      "Mix flour, 1 tablespoon white sugar, baking powder, baking soda, and salt together in a bowl.",
      "Whisk milk, 2 tablespoons butter, and apple cider vinegar together in a small bowl. Pour over the flour mixture; mix until a soft dough forms.",
      "Dust a flat work surface with flour. Roll dough out to a 6x7-inch rectangle. Spread remaining 2 tablespoons butter on top.",
      "Mix remaining 1 tablespoon white sugar, brown sugar, and cinnamon in a small bowl. Sprinkle evenly over the buttered dough.",
      "Roll dough lengthwise into a log. Cut into 4 pieces using a sharp serrated knife. Place 1 piece in each muffin cup.",
      "Bake in the preheated oven until golden brown on all sides, 13 to 15 minutes.",
      ""
    ]
  },
  {
    title: "Healing Cabbage Soup",
    description:
      "\nMy body craves this soup whenever I have a cold, but it's good anytime. Due to the garlic, however, it might be a good idea to be sure that everyone around you eats it, too!        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/3016182.jpg",
    tags: ["Soups, Stews and Chili", "Soup", "Vegetable Soup", "Cabbage Soup"],
    ingredients: [
      "3 tablespoons olive oil",
      "1/2 onion, chopped",
      "2 cloves garlic, chopped",
      "2 quarts water",
      "4 teaspoons chicken bouillon granules",
      "1 teaspoon salt, or to taste",
      "1/2 teaspoon black pepper, or to taste",
      "1/2 head cabbage, cored and coarsely chopped",
      "1 (14.5 ounce) can Italian-style stewed tomatoes, drained and diced"
    ],
    steps: [
      "In a large stockpot, heat olive oil over medium heat. Stir in onion and garlic; cook until onion is transparent, about 5 minutes.",
      "Stir in water, bouillon, salt, and pepper. Bring to a boil, then stir in cabbage. Simmer until cabbage wilts, about 10 minutes.",
      "Stir in tomatoes. Return to a boil, then simmer 15 to 30 minutes, stirring often.",
      ""
    ]
  },
  {
    title: "Healthier Mediterranean Tuna Salad",
    description:
      "\nA very refreshing and light snack or meal! This dish makes a great Mediterranean alternative to your stereotypical tuna salad made with mayonnaise. Serve with whole grain crackers.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/1740673.jpg",
    tags: ["Salad", "Seafood Salad", "Tuna Salad"],
    ingredients: [
      "2 (5 ounce) cans chunk light tuna in water, drained",
      "1/4 cup finely chopped red onion",
      "1/4 cup chopped fresh parsley",
      "3 tablespoons olive oil",
      "2 tablespoons freshly squeezed lemon juice",
      "1/2 teaspoon lemon zest",
      "1/4 teaspoon salt",
      "1/4 teaspoon ground black pepper"
    ],
    steps: [
      "Combine tuna, onion, and parsley in a medium bowl.",
      "Whisk oil, lemon juice, lemon zest, salt, and pepper to make the dressing. Toss with the tuna mixture.",
      ""
    ]
  },
  {
    title: "Instant Pot® Turkey Breast",
    description:
      "\nThe Instant Pot® made the moistest turkey breast I have ever made. I usually let this cook in the slow cooker all day, but this turned out so much better. I couldn't believe that I had such a wonderful meal ready in less than an hour total!        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/6030057.jpg",
    tags: ["Meat and Poultry", "Turkey", "Breasts"],
    ingredients: [
      "1 (1 ounce) package onion soup mix",
      "1 (6 pound) turkey breast, thawed",
      "2 ribs celery, cut into large chunks",
      "1 onion, cut into large chunks",
      "1 cup chicken broth",
      "2 tablespoons water",
      "1 tablespoon cornstarch, or more as needed"
    ],
    steps: [
      "Sprinkle onion soup mix all over turkey breast and place in the pot of an electric pressure cooker (such as Instant Pot(R)). Place celery and onion chunks over and around turkey breast. Pour chicken broth over turkey breast.",
      "Seal pressure cooker and bring to high/low pressure on the 'Poultry' setting or according to manufacturer's instructions; cook until juices run clear, about 30 minutes. Release pressure through natural-release method for about 20 minutes. Transfer turkey breast to a plate and slice.",
      "Change the electric pressure cooker setting to 'Saute.' Mix water and cornstarch together in a bowl; add a small amount of hot liquid from the pot. Mix until dissolved; pour into the pot and whisk well until thickened, about 3 minutes. Serve gravy alongside turkey.",
      ""
    ]
  },
  {
    title: "Cranberry Sauce",
    description:
      "\nA Thanksgiving classic. Originally submitted to ThanksgivingRecipe.com.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/743657.jpg",
    tags: ["Side Dish", "Sauces and Condiments", "Sauces", "Cranberry Sauce"],
    ingredients: [
      "12 ounces cranberries",
      "1 cup white sugar",
      "1 cup orange juice"
    ],
    steps: [
      "In a medium sized saucepan over medium heat, dissolve the sugar in the orange juice. Stir in the cranberries and cook until the cranberries start to pop (about 10 minutes). Remove from heat and place sauce in a bowl. Cranberry sauce will thicken as it cools.",
      ""
    ]
  },
  {
    title: "Chile Verde Quiche",
    description:
      "\nA Southwestern quiche with roasted green chile for the crust! Make a bunch the day before for a breakfast/brunch party.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/7103492.jpg",
    tags: ["Breakfast and Brunch", "Eggs", "Quiche"],
    ingredients: [
      "cooking spray",
      "8 canned whole green chiles, or more to taste",
      "7 eggs",
      "1/2 cup chopped onions",
      "3 tablespoons heavy cream",
      "3/4 teaspoon garlic salt",
      "1/2 teaspoon ground cumin",
      "1/4 teaspoon ground black pepper",
      "1/4 pound sharp Cheddar cheese, cubed",
      "2 tomatoes, sliced, or to taste (optional)"
    ],
    steps: [
      "Preheat the oven to 325 degrees F (165 degrees C). Spray a pie plate with cooking spray.",
      "Cut chiles lengthwise into strips. Line strips over the bottom of pie plate to form a crust, placing pointed ends toward the center.",
      "Beat eggs in a bowl and mix in onions, cream, garlic salt, cumin, and pepper. Fold in Cheddar cheese. Layer tomatoes over the chile 'crust,' and pour egg mixture on top.",
      "Bake in the preheated oven until quiche is set, 30 to 35 minutes.",
      ""
    ]
  },
  {
    title: "Best Chocolate Chip Cookies",
    description: "\nCrisp edges, chewy middles.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/4462051.jpg",
    tags: ["Desserts", "Cookies", "Drop Cookies"],
    ingredients: [
      "1 cup butter, softened",
      "1 cup white sugar",
      "1 cup packed brown sugar",
      "2 eggs",
      "2 teaspoons vanilla extract",
      "1 teaspoon baking soda",
      "2 teaspoons hot water",
      "1/2 teaspoon salt",
      "3 cups all-purpose flour",
      "2 cups semisweet chocolate chips",
      "1 cup chopped walnuts"
    ],
    steps: [
      "Preheat oven to 350 degrees F (175 degrees C).",
      "Cream together the butter, white sugar, and brown sugar until smooth. Beat in the eggs one at a time, then stir in the vanilla. Dissolve baking soda in hot water.Add to batter along with salt. Stir in flour, chocolate chips, and nuts. Drop by large spoonfuls onto ungreased pans.",
      "Bake for about 10 minutes in the preheated oven, or until edges are nicely browned.",
      ""
    ]
  },
  {
    title: "Southern Grits Casserole",
    description:
      "\nIf you're from the South you will definitely love this recipe, which includes grits, eggs, sausage, and cheese. When I cook it, I place it in the slow cooker to stay warm. There is nothing worse than cold grits.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/1031379.jpg",
    tags: ["Side Dish", "Grains", "Grits"],
    ingredients: [
      "6 cups water",
      "2 cups uncooked grits",
      "1/2 cup butter, divided",
      "3 cups shredded Cheddar cheese, divided",
      "1 pound ground pork sausage",
      "12 eggs",
      "1/2 cup milk",
      "salt and pepper to taste"
    ],
    steps: [
      "Preheat oven to 350 degrees F (175 degrees C). Lightly grease a large baking dish.",
      "Bring water to a boil in a large saucepan, and stir in grits. Reduce heat, cover, and simmer about 5 minutes, until liquid has been absorbed. Mix in 1/2 the butter and 2 cups cheese until melted.",
      "In a skillet over medium-high heat, cook the sausage until evenly browned. Drain, and mix into the grits. Beat together the eggs and milk in a bowl, and pour into the skillet. Lightly scramble, then mix into the grits.",
      "Pour the grits mixture into the prepared baking dish. Dot with remaining butter, and top with remaining cheese. Season with salt and pepper.",
      "Bake 30 minutes in the preheated oven, until lightly browned.",
      ""
    ]
  },
  {
    title: "Slow Cooker Pork Loin Roast with Brown Sugar and Sweet Potatoes",
    description:
      "\nOne of my favorite recipes passed on to me from a friend many years ago. This pork loin roast with brown sugar is easy to prepare and when it's done, it's so delicious! Serve with a green vegetable or salad and dinner rolls.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/7092749.jpg",
    tags: ["Main Dish", "Pork", "Pork Roast"],
    ingredients: [
      "1 tablespoon pork rub seasoning, or to taste",
      "1/4 teaspoon Chinese five-spice powder",
      "1 (3 pound) pork loin roast",
      "2 medium sweet potatoes, peeled and cut into bite-size pieces",
      "1/2 cup brown sugar",
      "3 tablespoons butter",
      "salt and ground black pepper to taste"
    ],
    steps: [
      "Mix pork rub seasoning and Chinese five-spice powder together in a small bowl. Rub all over pork roast.",
      "Place sweet potatoes into the bottom of a slow cooker; add brown sugar and butter. Place roast on top and season with salt and pepper.",
      "Cook on Low until roast is fork-tender, 6 to 7 hours. An instant-read thermometer inserted into the center should read at least 145 degrees F (63 degrees C).",
      ""
    ]
  },
  {
    title: "Baked Ziti III",
    description:
      "\nA delicious side or main dish with beef, basil and lots of cheese. You can substitute the beef for Italian sausage or add a combination. Serve with crusty warm bread and a green salad, if desired.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/5643924.jpg",
    tags: ["Pasta and Noodles", "Pasta by Shape", "Ziti"],
    ingredients: [
      "1 (16 ounce) package dry ziti pasta",
      "1 pound lean ground beef",
      "1 onion, chopped",
      "2 (28 ounce) jars spaghetti sauce",
      "6 ounces sliced provolone cheese",
      "6 ounces sliced mozzarella cheese",
      "1 1/2 cups sour cream",
      "1/2 cup grated Parmesan cheese",
      "1/4 cup chopped fresh basil"
    ],
    steps: [
      "Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.",
      "In a large skillet, brown beef over medium heat. Add onions; saute until tender. Drain off fat and add spaghetti sauce; simmer for about 15 minutes.",
      "Preheat oven to 350 degrees F (175 degrees C).",
      "In a lightly greased 2 quart baking dish, place about half of the pasta; top with a layer of provolone and mozzarella cheese slices. Spread on a layer of half the spaghetti sauce mixture and sour cream.",
      "Cover with remaining pasta, cheese and sauce; sprinkle a layer of Parmesan cheese and fresh basil.",
      "Bake in preheated oven for about 30 minutes or until cheese and sauce are bubbly; serve.",
      ""
    ]
  },
  {
    title: "Hungarian Mushroom Soup",
    description:
      "\nMy family loves soup and this is one of their favorites. It has lots of flavor and is fairly quick to make. It's primarily a mushroom soup but derives a lot of its flavor from other ingredients.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/8261.jpg",
    tags: ["Soups, Stews and Chili", "Soup", "Vegetable Soup"],
    ingredients: [
      "4 tablespoons unsalted butter",
      "2 cups chopped onions",
      "1 pound fresh mushrooms, sliced",
      "2 teaspoons dried dill weed",
      "1 tablespoon paprika",
      "1 tablespoon soy sauce",
      "2 cups chicken broth",
      "1 cup milk",
      "3 tablespoons all-purpose flour",
      "1 teaspoon salt",
      "ground black pepper to taste",
      "2 teaspoons lemon juice",
      "1/4 cup chopped fresh parsley",
      "1/2 cup sour cream"
    ],
    steps: [
      "Melt the butter in a large pot over medium heat. Saute the onions in the butter for 5 minutes. Add the mushrooms and saute for 5 more minutes. Stir in the dill, paprika, soy sauce and broth. Reduce heat to low, cover, and simmer for 15 minutes.",
      "In a separate small bowl, whisk the milk and flour together. Pour this into the soup and stir well to blend. Cover and simmer for 15 more minutes, stirring occasionally.",
      "Finally, stir in the salt, ground black pepper, lemon juice, parsley and sour cream. Mix together and allow to heat through over low heat, about 3 to 5 minutes. Do not boil. Serve immediately.",
      ""
    ]
  },
  {
    title: "Double Layer Pumpkin Cheesecake",
    description:
      "\nA great alternative to pumpkin pie, especially for those cheesecake fans out there. Serve topped with whipped cream.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/303675.jpg",
    tags: ["Fruits and Vegetables", "Vegetables", "Squash"],
    ingredients: [
      "2 (8 ounce) packages cream cheese, softened",
      "1/2 cup white sugar",
      "1/2 teaspoon vanilla extract",
      "2 eggs",
      "1 (9 inch) prepared graham cracker crust",
      "1/2 cup pumpkin puree",
      "1/2 teaspoon ground cinnamon",
      "1 pinch ground cloves",
      "1 pinch ground nutmeg",
      "1/2 cup frozen whipped topping, thawed"
    ],
    steps: [
      "Preheat oven to 325 degrees F (165 degrees C).",
      "In a large bowl, combine cream cheese, sugar and vanilla. Beat until smooth. Blend in eggs one at a time. Remove 1 cup of batter and spread into bottom of crust; set aside.",
      "Add pumpkin, cinnamon, cloves and nutmeg to the remaining batter and stir gently until well blended. Carefully spread over the batter in the crust.",
      "Bake in preheated oven for 35 to 40 minutes, or until center is almost set. Allow to cool, then refrigerate for 3 hours or overnight. Cover with whipped topping before serving.",
      ""
    ]
  },
  {
    title: "Yummy Sweet Potato Casserole",
    description:
      "\nMy family begs me to make this creamy baked dish every Thanksgiving and Christmas. What makes it so good is the pecan topping! Try it and I'm sure it will become your new tradition!        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/4573472.jpg",
    tags: ["Side Dish", "Vegetables", "Sweet Potatoes"],
    ingredients: [
      "4 cups sweet potato, cubed",
      "1/2 cup white sugar",
      "2 eggs, beaten",
      "1/2 teaspoon salt",
      "4 tablespoons butter, softened",
      "1/2 cup milk",
      "1/2 teaspoon vanilla extract",
      "1/2 cup packed brown sugar",
      "1/3 cup all-purpose flour",
      "3 tablespoons butter, softened",
      "1/2 cup chopped pecans"
    ],
    steps: [
      "Preheat oven to 325 degrees F (165 degrees C). Put sweet potatoes in a medium saucepanwith water to cover. Cook over medium high heat until tender; drain and mash.",
      "In a large bowl, mix together the sweet potatoes, white sugar, eggs, salt, butter, milk and vanilla extract. Mix until smooth. Transfer to a 9x13 inch baking dish.",
      "In medium bowl, mix the brown sugar and flour. Cut in the butter until the mixture is coarse. Stir in the pecans. Sprinkle the mixture over the sweet potato mixture.",
      "Bake in the preheated oven 30 minutes, or until the topping is lightly brown.",
      ""
    ]
  },
  {
    title: "Arizona Hatch Chili",
    description:
      "\nI've been making this Hatch green chili for years and it never fails to please!        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/5679204.jpg",
    tags: ["Soups, Stews and Chili", "Chili", "Pork Chili"],
    ingredients: [
      "1 pound Hatch chile peppers, halved and seeded",
      "1 (3 pound) boneless pork roast, cubed",
      "2 cups all-purpose flour",
      "3 tablespoons salt, divided",
      "3 tablespoons coarsely ground black pepper, divided",
      "1/4 cup vegetable oil",
      "2 cups chicken stock",
      "1 (15 ounce) can diced tomatoes with green chile peppers",
      "1 large sweet onion, chopped",
      "2 tablespoons ground cumin",
      "3 cloves garlic"
    ],
    steps: [
      "Set oven rack about 6 inches from the heat source and preheat the oven's broiler. Line a baking sheet with aluminum foil. Place peppers with cut sides down onto the prepared baking sheet.",
      "Cook under the preheated broiler until the skin of the peppers has blackened and blistered, 5 to 8 minutes. Place blackened peppers into a bowl and cover tightly with plastic wrap. Allow peppers to steam as they cool, about 20 minutes. Remove and discard skins; chop peppers into smaller pieces.",
      "Place cubed pork in a resealable plastic bag; coat with flour, 2 tablespoons salt, and 2 tablespoons pepper. Heat oil in a skillet over medium heat. Cook pork in the hot oil until browned, 5 to 7 minutes. Transfer to a slow cooker set to High.",
      "Add the Hatch chiles, remaining salt and pepper, chicken stock, diced tomatoes with peppers, onion, cumin, and garlic to the slow cooker. Mix and cover. Cook on High until pork is tender and flavors blend, about 4 hours.",
      ""
    ]
  },
  {
    title: "Perfect Pumpkin Pie",
    description:
      "\nThe one and only!  EAGLE BRAND® makes this traditional dessert the perfect ending to a Thanksgiving feast.        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/5895606.jpg",
    tags: ["Trusted Brands: Recipes and Tips", "EAGLE BRAND&#174;"],
    ingredients: [
      "1 (15 ounce) can pumpkin",
      "1 (14 ounce) can EAGLE BRAND® Sweetened Condensed Milk",
      "2 large eggs",
      "1 teaspoon ground cinnamon",
      "1/2 teaspoon ground ginger",
      "1/2 teaspoon ground nutmeg",
      "1/2 teaspoon salt",
      "1 (9 inch) unbaked pie crust"
    ],
    steps: [
      "Preheat oven to 425 degrees F. Whisk pumpkin, sweetened condensed milk, eggs, spices and salt in medium bowl until smooth. Pour into crust. Bake 15 minutes.",
      "Reduce oven temperature to 350 degrees F and continue baking 35 to 40 minutes or until knife inserted 1 inch from crust comes out clean. Cool. Garnish as desired. Store leftovers covered in refrigerator.",
      ""
    ]
  },
  {
    title: "Apple Pie by Grandma Ople",
    description:
      "\nThis was my grandmother's apple pie recipe.  I have never seen another one quite like it.  It will always be my favorite and has won me several first place prizes in local competitions.  I hope it becomes one of your favorites as well!        ",
    image: "https://images.media-allrecipes.com/userphotos/560x315/736203.jpg",
    tags: ["Desserts", "Pies", "Apple Pie"],
    ingredients: [
      "1 recipe pastry for a 9 inch double crust pie",
      "1/2 cup unsalted butter",
      "3 tablespoons all-purpose flour",
      "1/4 cup water",
      "1/2 cup white sugar",
      "1/2 cup packed brown sugar",
      "8 Granny Smith apples - peeled, cored and sliced"
    ],
    steps: [
      "Preheat oven to 425 degrees F (220 degrees C). Melt the butter in a saucepan. Stir in flour to form a paste. Add water, white sugar and brown sugar, and bring to a boil. Reduce temperature and let simmer.",
      "Place the bottom crust in your pan. Fill with apples, mounded slightly. Cover with a lattice work crust.Gently pour the sugar and butter liquid over the crust.Pour slowly so that it does not run off.",
      "Bake 15 minutes in the preheated oven. Reduce the temperature to 350 degrees F (175 degrees C). Continue baking for 35 to 45 minutes, until apples are soft.",
      ""
    ]
  }
];

MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  if (err) {
    console.log("error connecting database: ", err);
    return;
  }
  dbo = db.db("e-gredient");
  console.log("database connected");
  dbo.collection("recipes").insertMany(recipes);
  console.log("insert complete");
  db.close();
});
