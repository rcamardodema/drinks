import axios from "axios";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

const api = async (method, { operation, query = "" }) => {
  try {
    const resp = await axios({
      method: method,
      url: `${BASE_URL}/${operation}${query}`,
    });
    const { status } = resp;
    if (status !== 200) {
      throw new Error("Something went wrong");
    }
    return resp;
  } catch (err) {
    throw new Error("Not valid Request");
  }
};

export const operations = {
  categoriesFilterList: "list.php?c=list",
  glassesFilterList: "list.php?g=list",
  ingredientsFilterList: "list.php?i=list",
  alcoholFilterList: "list.php?a=list",

  drinksByCategory: "filter.php?c=",
  drinksByGlasses: "filter.php?g=",
  drinksByIngredients: "filter.php?i=",
  drinksByAlcoholFilter: "filter.php?a=",

  drinkById: "lookup.php?i=",

  lookupByDrinkName: "search.php?s=",
};

export default api;
