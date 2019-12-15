const tags = [
  "breakfast",
  "lunch",
  "dinner",
  "dessert",
  "healthy",
  "spicy",
  "gourmet",
  "budget",
  "french",
  "vegan",
  "chinese",
  "indian",
  "japanese",
  "rustic",
  "sweet",
  "salad",
  "appetizer",
  "vegetarian",
  "seafood",
  "holiday",
  "family",
  "baking",
  "simple"
];

const vegetables = [
  {
    name: "Artichoke",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Artichoke_Cynara_cardunculus_Head_2000px.jpg/220px-Artichoke_Cynara_cardunculus_Head_2000px.jpg",
    category: "vegetable"
  },
  {
    name: "Aubergine",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/4/49/Solanum_melongena_ja02.jpg/240px-Solanum_melongena_ja02.jpg",
    category: "vegetable"
  },
  {
    name: "Asparagus",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/6/65/Asperge_planten_Asparagus_officinalis.jpg/200px-Asperge_planten_Asparagus_officinalis.jpg",
    category: "vegetable"
  },
  {
    name: "Alfalfa",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/e/eb/75_Medicago_sativa_L.jpg/200px-75_Medicago_sativa_L.jpg",
    category: "vegetable"
  },
  {
    name: "Azuki bean",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/6/6d/W_azuki2111.jpg/240px-W_azuki2111.jpg",
    category: "vegetable"
  },
  {
    name: "Sprouting",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/7/75/Science-symbol-2.svg/30px-Science-symbol-2.svg.png",
    category: "vegetable"
  },
  {
    name: "Chickpea",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/e/eb/100331_dulce_de_garbanzos_guatemala.JPG/200px-100331_dulce_de_garbanzos_guatemala.JPG",
    category: "vegetable"
  },
  {
    name: "Green bean",
    img: "//upload.wikimedia.org/wikipedia/commons/c/cd/CDC_greenbean.jpg",
    category: "vegetable"
  },
  {
    name: "Kidney bean",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/2/27/Red_Rajma_BNC.jpg/250px-Red_Rajma_BNC.jpg",
    category: "vegetable"
  },
  {
    name: "Lentil",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/d/da/3_types_of_lentil.jpg/250px-3_types_of_lentil.jpg",
    category: "vegetable"
  },
  {
    name: "Pea",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/5/5b/NCI_peas_in_pod.jpg/240px-NCI_peas_in_pod.jpg",
    category: "vegetable"
  },
  {
    name: "Broccoflower",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Cauliflower_broccoflower.jpg/150px-Cauliflower_broccoflower.jpg",
    category: "vegetable"
  },
  {
    name: "Broccoli",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Broccoli_bunches.jpg/220px-Broccoli_bunches.jpg",
    category: "vegetable"
  },
  {
    name: "Brussels sprout",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Rosenkohl-2.jpg/220px-Rosenkohl-2.jpg",
    category: "vegetable"
  },
  {
    name: "Cabbage",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/1/11/Brassica_oleracea0.jpg/240px-Brassica_oleracea0.jpg",
    category: "vegetable"
  },
  {
    name: "Kohlrabi",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/2/25/Apple_bitten.svg/32px-Apple_bitten.svg.png",
    category: "vegetable"
  },
  {
    name: "Cauliflower",
    img: "//upload.wikimedia.org/wikipedia/commons/2/25/Cauliflower.JPG",
    category: "vegetable"
  },
  {
    name: "Celery",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/2/23/Snijselderij_Apium_graveolens.jpg/220px-Snijselderij_Apium_graveolens.jpg",
    category: "vegetable"
  },
  {
    name: "Endive",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cichorium_endivia_field.jpg/220px-Cichorium_endivia_field.jpg",
    category: "vegetable"
  },
  {
    name: "Fennel",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/3/31/Foeniculum_vulgare.JPG/250px-Foeniculum_vulgare.JPG",
    category: "vegetable"
  },
  {
    name: "Bok choy",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bok_Choy.JPG/250px-Bok_Choy.JPG",
    category: "vegetable"
  },
  {
    name: "Chard",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/b/be/Swiss_Chard.jpg/220px-Swiss_Chard.jpg",
    category: "vegetable"
  },
  {
    name: "Collard greens",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/2/23/Morpho_menelaus_huebneri_MHNT_Male_Dos.jpg/30px-Morpho_menelaus_huebneri_MHNT_Male_Dos.jpg",
    category: "vegetable"
  },
  {
    name: "Kale",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/2/20/Boerenkool.jpg/240px-Boerenkool.jpg",
    category: "vegetable"
  },
  {
    name: "Spinach",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/3/37/Spinacia_oleracea_Spinazie_bloeiend.jpg/240px-Spinacia_oleracea_Spinazie_bloeiend.jpg",
    category: "vegetable"
  },
  {
    name: "Anise",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Koehler1887-PimpinellaAnisum.jpg/220px-Koehler1887-PimpinellaAnisum.jpg",
    category: "vegetable"
  },
  {
    name: "Basil",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/9/90/Basil-Basilico-Ocimum_basilicum-albahaca.jpg/240px-Basil-Basilico-Ocimum_basilicum-albahaca.jpg",
    category: "vegetable"
  },
  {
    name: "Caraway",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/4/42/Carum_carvi_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-172.jpg/220px-Carum_carvi_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-172.jpg",
    category: "vegetable"
  },
  {
    name: "Coriander",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/1/13/Coriandrum_sativum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg/240px-Coriandrum_sativum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg",
    category: "vegetable"
  },
  {
    name: "Coriander",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/1/13/Coriandrum_sativum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg/240px-Coriandrum_sativum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-193.jpg",
    category: "vegetable"
  },
  {
    name: "Chamomile",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Matricaria_February_2008-1.jpg/220px-Matricaria_February_2008-1.jpg",
    category: "vegetable"
  },
  {
    name: "Dill",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/1/10/Illustration_Anethum_graveolens0.jpg/240px-Illustration_Anethum_graveolens0.jpg",
    category: "vegetable"
  },
  {
    name: "Fennel",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/3/31/Foeniculum_vulgare.JPG/250px-Foeniculum_vulgare.JPG",
    category: "vegetable"
  },
  {
    name: "Lavender",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/6/60/Single_lavendar_flower02.jpg/250px-Single_lavendar_flower02.jpg",
    category: "vegetable"
  },
  {
    name: "Marjoram",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Origanum_majorana.jpg/220px-Origanum_majorana.jpg",
    category: "vegetable"
  },
  {
    name: "Oregano",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/1/14/Origanum_vulgare_-_harilik_pune.jpg/240px-Origanum_vulgare_-_harilik_pune.jpg",
    category: "vegetable"
  },
  {
    name: "Parsley",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Petroselinum_crispum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-103.jpg/250px-Petroselinum_crispum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-103.jpg",
    category: "vegetable"
  },
  {
    name: "Rosemary",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/9/92/Rosemary_bush.jpg/250px-Rosemary_bush.jpg",
    category: "vegetable"
  },
  {
    name: "Thyme",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Thymus_vulgaris.jpg/240px-Thymus_vulgaris.jpg",
    category: "vegetable"
  },
  {
    name: "Lettuce",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/d/da/Iceberg_lettuce_in_SB.jpg/250px-Iceberg_lettuce_in_SB.jpg",
    category: "vegetable"
  },
  {
    name: "Fungus",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Fungi_collage.jpg/290px-Fungi_collage.jpg",
    category: "vegetable"
  },
  {
    name: "Plant",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Diversity_of_plants_image_version_5.png/220px-Diversity_of_plants_image_version_5.png",
    category: "vegetable"
  },
  {
    name: "Okra",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/7/75/Abelmoschus_esculentus_%28cropped%29.jpg/220px-Abelmoschus_esculentus_%28cropped%29.jpg",
    category: "vegetable"
  },
  {
    name: "Chives",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Illustration_Allium_schoenoprasum_and_Allium_cepa0_clean.jpg/220px-Illustration_Allium_schoenoprasum_and_Allium_cepa0_clean.jpg",
    category: "vegetable"
  },
  {
    name: "Garlic",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/7/74/Warzywa_czosnek002.jpg/200px-Warzywa_czosnek002.jpg",
    category: "vegetable"
  },
  {
    name: "Onion",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Onions.jpg/240px-Onions.jpg",
    category: "vegetable"
  },
  {
    name: "Shallot",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Shallot_onion_Allium_cepa.jpg/200px-Shallot_onion_Allium_cepa.jpg",
    category: "vegetable"
  },
  {
    name: "Scallion",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Green_onions.jpg/220px-Green_onions.jpg",
    category: "vegetable"
  },
  {
    name: "Parsley",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Petroselinum_crispum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-103.jpg/250px-Petroselinum_crispum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-103.jpg",
    category: "vegetable"
  },
  {
    name: "Capsicum",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/d/da/Red_capsicum_and_cross_section.jpg/250px-Red_capsicum_and_cross_section.jpg",
    category: "vegetable"
  },
  {
    name: "Chili pepper",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/2/26/Cubanelle_Peppers.jpg/220px-Cubanelle_Peppers.jpg",
    category: "vegetable"
  },
  {
    name: "Jalapeño",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/5/57/Illustration_Capsicum_annuum0.jpg/240px-Illustration_Capsicum_annuum0.jpg",
    category: "vegetable"
  },
  {
    name: "Paprika",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/9/97/Spanishsmokedpaprika.jpg/280px-Spanishsmokedpaprika.jpg",
    category: "vegetable"
  },
  {
    name: "Tabasco pepper",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tabasco_peppers.JPG/220px-Tabasco_peppers.JPG",
    category: "vegetable"
  },
  {
    name: "Cayenne pepper",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Large_Cayenne.jpg/220px-Large_Cayenne.jpg",
    category: "vegetable"
  },
  {
    name: "Rhubarb",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rheum_rhabarbarum.2006-04-27.uellue.jpg/220px-Rheum_rhabarbarum.2006-04-27.uellue.jpg",
    category: "vegetable"
  },
  {
    name: "Beet",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Beta_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-167.jpg/240px-Beta_vulgaris_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-167.jpg",
    category: "vegetable"
  },
  {
    name: "Carrot",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/b/bd/13-08-31-wien-redaktionstreffen-EuT-by-Bi-frie-037.jpg/220px-13-08-31-wien-redaktionstreffen-EuT-by-Bi-frie-037.jpg",
    category: "vegetable"
  },
  {
    name: "Corm",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Colocasia_esculenta_dsc07801.jpg/300px-Colocasia_esculenta_dsc07801.jpg",
    category: "vegetable"
  },
  {
    name: "Konjac",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Wiki_letter_w.svg/30px-Wiki_letter_w.svg.png",
    category: "vegetable"
  },
  {
    name: "Taro",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/7/70/TaroAKL.jpg/220px-TaroAKL.jpg",
    category: "vegetable"
  },
  {
    name: "Ginger",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/3/34/Zingiber_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-146.jpg/220px-Zingiber_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-146.jpg",
    category: "vegetable"
  },
  {
    name: "Parsnip",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PastinakePflanzegeerntet.jpg/220px-PastinakePflanzegeerntet.jpg",
    category: "vegetable"
  },
  {
    name: "Radish",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Radish_3371103037_4ab07db0bf_o.jpg/220px-Radish_3371103037_4ab07db0bf_o.jpg",
    category: "vegetable"
  },
  {
    name: "Wasabi",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Wasabia_japonica_1.JPG/220px-Wasabia_japonica_1.JPG",
    category: "vegetable"
  },
  {
    name: "Horseradish",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Armoracia_rusticana.jpg/220px-Armoracia_rusticana.jpg",
    category: "vegetable"
  },
  {
    name: "Tuber",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Potato_EarlyRose_sprouts.jpg/240px-Potato_EarlyRose_sprouts.jpg",
    category: "vegetable"
  },
  {
    name: "Jerusalem artichoke",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Sunroot_top.jpg/220px-Sunroot_top.jpg",
    category: "vegetable"
  },
  {
    name: "Potato",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Potato_and_cross_section.jpg/220px-Potato_and_cross_section.jpg",
    category: "vegetable"
  },
  {
    name: "Sweet potato",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ipomoea_batatas.jpg/220px-Ipomoea_batatas.jpg",
    category: "vegetable"
  },
  {
    name: "Yam",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/e/eb/YamsatBrixtonMarket.jpg/220px-YamsatBrixtonMarket.jpg",
    category: "vegetable"
  },
  {
    name: "Turnip",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Turnip_2622027.jpg/220px-Turnip_2622027.jpg",
    category: "vegetable"
  },
  {
    name: "Acorn squash",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Cucurbita_pepo_Acorn_squash_-_Squash_V.jpg/249px-Cucurbita_pepo_Acorn_squash_-_Squash_V.jpg",
    category: "vegetable"
  },
  {
    name: "Banana squash",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/1/11/Cucurbita_maxima_Banana_squash_0.jpg/220px-Cucurbita_maxima_Banana_squash_0.jpg",
    category: "vegetable"
  },
  {
    name: "Zucchini",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Cucurbita_pepo1.jpg/240px-Cucurbita_pepo1.jpg",
    category: "vegetable"
  },
  {
    name: "Cucumber",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/9/96/ARS_cucumber.jpg/220px-ARS_cucumber.jpg",
    category: "vegetable"
  },
  {
    name: "Spaghetti squash",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/9/91/Spaghetti_Squash_Prepared_500.jpg/220px-Spaghetti_Squash_Prepared_500.jpg",
    category: "vegetable"
  },
  {
    name: "Tat soi",
    img: "/static/images/wikimedia-button.png",
    category: "vegetable"
  },
  {
    name: "Tomato",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bright_red_tomato_and_cross_section02.jpg/220px-Bright_red_tomato_and_cross_section02.jpg",
    category: "vegetable"
  },
  {
    name: "Watercress",
    img:
      "//upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Watercress_%282%29.JPG/220px-Watercress_%282%29.JPG",
    category: "vegetable"
  }
];

export { vegetables, tags };
