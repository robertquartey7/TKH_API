import axios from "axios";

const RECIPE_API_KEY = "10bead5092f4312f4c8007cb8aaacec2";
const RECIPE_API_ID = "47e1a744";

const main = document.getElementById("recipe-box");
const search = document.getElementById("search");

let query = "";

const getData = async (query) => {
  const foodRecipe = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${RECIPE_API_ID}&app_key=${RECIPE_API_KEY}`;

  try {
    const data = await axios.get(foodRecipe);

    // const data = await fetch("./data.json");

    const results = data.data;

    const elementData = results.hits;

    elementData.forEach((e) => {
      const ingredientLinesData = e.recipe.ingredientLines;
      main.insertAdjacentHTML(
        "afterbegin",
        `<div class="border col-md-6 col-lg-4 recipe">
      <div class="top ">
        <img
        src=${e.recipe.image}
        alt=""
        class="img-fluid  "
      />
      <div class="recipe-body">
        <h1>${e.recipe.label}</h1>
       <ul id="ingredientLines">
       </ul>
      </div>
      </div>
      </div> `
      );
      const ingredientLines = document.getElementById("ingredientLines");

      ingredientLinesData.forEach((e) => {
        ingredientLines.insertAdjacentHTML("afterbegin", `<li>${e}</li>`);
      });
    });
  } catch (error) {
    console.log(error.message);
    main.insertAdjacentHTML(
      "afterbegin",`<h1 class='text-center'>Food not Found</h1>`)
  }
};

search.addEventListener("keydown", function (event) {
  main.innerHTML = ``;
  if (event.key === "Enter") {
    query = search.value;
    console.log(query);
    getData(query);
  }
});
