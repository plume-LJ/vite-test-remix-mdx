export interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  directions: string;
}

export interface FormDataValues {
  title: string;
  ingredients: string;
  directions: string;
}

export const recipes = {
  list: [] as Recipe[],
  async create(formData: FormData) {
    const data = Object.fromEntries(formData);
    console.log(data);
    const title = formData.get("title");
    const ingredients = formData.get("ingredients");
    const directions = formData.get("directions");
    const recipe: Recipe = {
      id: Math.random().toString(36),
      title: title as string,
      ingredients: ingredients as string,
      directions: directions as string,
    };
    recipes.list.push(recipe);
    return recipe;
  },
};
