class Drink {
  constructor(info) {
    this.name = info.strDrink;
    this.isAlcohol = this.getAlcoholInfo(info);
    this.category = info.strCategory;
    this.image = info.strDrinkThumb;
    this.glassType = info.strGlass;
    this.ingredients = this.getIngredientsInfo(info);
    this.instructions = this.getInstructions(info);
  }

  getAlcoholInfo(info) {
    return info.strAlcoholic.toLowerCase().split(" ")[0] === "alcoholic"
      ? "Yes"
      : info.strAlcoholic.toLowerCase().split(" ")[0] === "non"
      ? "No"
      : "Optional";
  }

  getIngredientsInfo(info) {
    const ing = [];
    for (let i = 1; i < 16; i++) {
      if (info[`strIngredient${i}`] || info[`strMeasure${i}`]) {
        ing.push({
          name: info[`strIngredient${i}`] || "",
          quantity: info[`strMeasure${i}`] || "",
        });
      }
    }
    return ing;
  }

  getInstructions(info) {
    return {
      en: info.strInstructions,
      de: info.strInstructionsDE,
      es: info.strInstructionsES,
      fr: info.strInstructionsFR,
      it: info.strInstructionsIT,
    };
  }
}

export default Drink;
